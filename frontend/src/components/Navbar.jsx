import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, MessageCircleIcon, PhoneIcon, ClockIcon, MapPinIcon } from './Icons';
import Wordmark from './Wordmark';
import useSettings from '../hooks/useSettings';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const s = useSettings();

  const tel = (v) => `tel:${(v || '').replace(/[^\d+]/g, '')}`;
  const wa = `https://wa.me/${(s.whatsapp || '').replace(/[^\d]/g, '')}`;

  function isActive(to) {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone bg-paper">
      {/* Top contact strip — phone on the left, hours + location on the right */}
      <div className="bg-hope-navy text-[0.78rem] text-white/70">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1 px-6 py-2">
          <a href={tel(s.phone_mobile)} className="flex items-center gap-1.5 font-bold text-white transition-colors hover:text-hope-sky">
            <PhoneIcon size={13} className="text-hope-sky" />
            {s.phone_mobile}
          </a>
          <div className="flex items-center gap-x-6">
            <span className="flex items-center gap-1.5">
              <ClockIcon size={13} className="text-hope-sky" />
              Mon &ndash; Sat
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <MapPinIcon size={13} className="text-hope-sky" />
              {s.area}
            </span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 py-4">
        <div className="mr-auto">
          <Wordmark />
        </div>

        <nav aria-label="Primary" className="hidden gap-7 text-[0.92rem] font-semibold md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`transition-colors ${
                isActive(l.to) ? 'text-hope-teal' : 'text-ink opacity-75 hover:opacity-100'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-stone px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-hope-navy hover:text-white"
          >
            <MessageCircleIcon size={15} />
            WhatsApp
          </a>
          <Link
            to="/book"
            className="rounded-full bg-hope-teal px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-hope-navy"
          >
            Book Appointment
          </Link>
        </div>

        <button
          className="flex flex-col gap-1.5 p-1.5 md:hidden"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <XIcon size={24} className="text-ink" /> : <MenuIcon size={24} className="text-ink" />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-b border-stone bg-paper px-6 pb-6 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-semibold ${isActive(l.to) ? 'text-hope-teal' : 'text-ink'}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-stone px-5 py-3 text-sm font-bold text-ink"
          >
            <MessageCircleIcon size={15} />
            WhatsApp Us
          </a>
          <Link
            to="/book"
            className="rounded-full bg-hope-teal px-5 py-3 text-center text-sm font-bold text-white"
            onClick={() => setOpen(false)}
          >
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
}