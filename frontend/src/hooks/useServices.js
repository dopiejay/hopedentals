import { useEffect, useState } from 'react';
import { services as staticServices } from '../data/services';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

// Map DB service names to the existing rich detail pages so those keep their content.
const STATIC_SLUG_MAP = {
  'General Consultation': 'general-dentistry',
  'Routine Check-up & Cleaning': 'general-dentistry',
  'Orthodontics / Braces': 'orthodontics',
  'Restorative (Crowns, Bridges, Dentures)': 'restorative-dentistry',
  'Oral Surgery': 'oral-surgery',
  'Dental Implants': 'implant-dentistry',
};

const DEFAULT_IMAGE = '/images/general.jpg';

export function slugify(name) {
  return String(name)
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function serviceSlug(name) {
  return STATIC_SLUG_MAP[name] || slugify(name);
}

// Card presentation lives in the static data; the API supplies the live copy.
// The static entry is also the fallback for image/copy, so a service that has
// no image_url or description in the database yet still renders its own card
// instead of falling back to the same image and an empty description.
function presentation(slug) {
  const match = staticServices.find((s) => s.slug === slug);
  return {
    icon: match?.icon,
    color: match?.color || 'from-hope-accent/20 to-hope-sky/10',
    iconColor: match?.iconColor || 'text-hope-accent bg-hope-accent/10',
    image: match?.img || DEFAULT_IMAGE,
    desc: match?.desc || '',
    longDesc: match?.intro || '',
  };
}

const staticFallback = staticServices.map((s, i) => ({
  id: `static-${i}`,
  slug: s.slug,
  title: s.title,
  desc: s.desc,
  long_description: s.intro,
  image: s.img,
  icon: s.icon,
  color: s.color,
  iconColor: s.iconColor,
}));

export default function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let stale = false;

    fetch(`${API_URL}/api/services`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Could not load services.'))))
      .then((rows) => {
        if (stale) return;
        setServices(
          rows.map((r) => {
            const slug = serviceSlug(r.name);
            const base = presentation(slug);
            return {
              id: r.id,
              slug,
              title: r.name,
              desc: r.description || base.desc,
              long_description: r.long_description || base.longDesc,
              image: r.image_url || base.image,
              icon: base.icon,
              color: base.color,
              iconColor: base.iconColor,
            };
          }),
        );
      })
      .catch((err) => {
        if (stale) return;
        setError(err.message);
        setServices(staticFallback);
      })
      .finally(() => {
        if (!stale) setLoading(false);
      });

    return () => {
      stale = true;
    };
  }, []);

  return { services, loading, error };
}
