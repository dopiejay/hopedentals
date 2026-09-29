import { Link } from 'react-router-dom';
import { PhoneIcon, MapPinIcon, MailIcon, MessageCircleIcon } from './Icons';
import Wordmark from './Wordmark';
import useSettings from '../hooks/useSettings';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/book', label: 'Book Appointment' },
];

export default function Footer() {
  const s = useSettings();
  const tel = (v) => `tel:${(v || '').replace(/[^\d+]/g, '')}`;
  const wa = `https://wa.me/${(s.whatsapp || '').replace(/[^\d]/g, '')}`;

  return (
    <footer className="bg-ink px-6 pt-15 pb-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4">
              <Wordmark light />
            </div>
            <p className="mb-6 max-w-xs text-[0.9rem] text-white/60">
              An established private dental practice at Chichiri Shopping Centre, Blantyre &mdash;
              dental treatments, tooth replacement and orthodontic care from one dedicated clinical
              team.
            </p>
            <div className="flex flex-col gap-2.5 text-[0.85rem] text-white/60">
              <span className="flex items-start gap-2">
                <MapPinIcon size={14} className="mt-0.5 shrink-0 text-hope-accent" />
                <span>
                  {s.address} &middot; {s.area}
                </span>
              </span>
              <a href={tel(s.phone_mobile)} className="flex items-center gap-2 transition-colors hover:text-white">
                <PhoneIcon size={14} className="text-hope-accent" />
                {s.phone_mobile}
              </a>
              <a href={tel(s.phone_landline)} className="flex items-center gap-2 transition-colors hover:text-white">
                <PhoneIcon size={14} className="text-hope-accent" />
                {s.phone_landline}
              </a>
              <a href={`mailto:${s.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
                <MailIcon size={14} className="text-hope-accent" />
                {s.email}
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-[0.85rem] font-bold uppercase tracking-wider text-white/80">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-[0.9rem] text-white/60 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.85rem] font-bold uppercase tracking-wider text-white/80">
              Opening Hours
            </h4>
            <div className="mb-6 flex flex-col gap-2 text-[0.9rem] text-white/60">
              <div className="flex justify-between">
                <span className="font-semibold text-white">{s.hours_weekdays}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-white">{s.hours_friday}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-white/40">{s.hours_weekend}</span>
              </div>
            </div>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-hope-sky px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-hope-teal hover:text-white"
            >
              <MessageCircleIcon size={15} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-[0.78rem] text-white/40">
          <p>&copy; {new Date().getFullYear()} Hope Dental Surgery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
