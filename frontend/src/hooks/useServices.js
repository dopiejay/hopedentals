import { useEffect, useState } from 'react';

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
          rows.map((r) => ({
            id: r.id,
            slug: serviceSlug(r.name),
            title: r.name,
            desc: r.description || '',
            long_description: r.long_description || '',
            image: r.image_url || DEFAULT_IMAGE,
          })),
        );
      })
      .catch((err) => {
        if (!stale) setError(err.message);
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