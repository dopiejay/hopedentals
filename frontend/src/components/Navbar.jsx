import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon, MessageCircleIcon } from './Icons';
import Wordmark from './Wordmark';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Branches' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  function isActive(to) {
    if (to === '/') return pathname === '/';
    return pathname.startsWith(to);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-stone bg-paper">
      {/* Main nav */}
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
                isActive(l.to) ? 'text-shalom-navy' : 'opacity-75 text-ink hover:opacity-100'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <a
            href="https://wa.me/265998951880"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-stone px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-[#e2e4dd]"
          >
            <MessageCircleIcon size={15} />
            WhatsApp
          </a>
          <Link
            to="/book"
            className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-shalom-navy"
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
          {open ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-b border-stone bg-paper px-6 pb-6 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-semibold ${isActive(l.to) ? 'text-shalom-navy' : ''}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/265998951880"
            className="flex items-center justify-center gap-2 rounded-full bg-stone px-5 py-3 text-sm font-bold"
          >
            <MessageCircleIcon size={15} />
            WhatsApp Us
          </a>
          <Link
            to="/book"
            className="rounded-full bg-ink px-5 py-3 text-center text-sm font-bold text-white"
            onClick={() => setOpen(false)}
          >
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  );
}
