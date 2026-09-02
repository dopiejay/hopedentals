import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, MapPinIcon, MessageCircleIcon } from './Icons';
import Wordmark from './Wordmark';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/book', label: 'Book Appointment' },
];

export default function Footer() {
  return (
    <footer className="bg-ink px-6 pt-15 pb-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4">
              <Wordmark light />
            </div>
            <p className="mb-6 max-w-xs text-[0.9rem] text-white/60">
              An established dental organisation serving Blantyre and Limbe for over 20 years —
              general, orthodontic, restorative, and preventive dental care from our multiple
              branches and on-site dental laboratory.
            </p>
            <div className="flex flex-col gap-2.5 text-[0.85rem] text-white/60">
              <span className="flex items-start gap-2">
                <MapPinIcon size={14} className="mt-0.5 shrink-0 text-shalom-gold" />
                <span>
                  Blantyre &middot; Ginnery Corner &middot; Limbe
                </span>
              </span>
              <a href="tel:+265998951880" className="flex items-center gap-2 transition-colors hover:text-white">
                <PhoneIcon size={14} className="text-shalom-gold" />
                +265 998 95 18 80
              </a>
              <a href="mailto:shalomdentalservices@yahoo.com" className="flex items-center gap-2 transition-colors hover:text-white">
                <MailIcon size={14} className="text-shalom-gold" />
                shalomdentalservices@yahoo.com
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
                <span>Monday – Friday</span>
                <span className="font-medium text-white">9:00 – 16:00</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium text-white">9:00 – 12:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium text-white/40">Closed</span>
              </div>
            </div>
            <a
              href="https://wa.me/265998951880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-shalom-teal px-5 py-2.5 text-sm font-bold text-ink transition-all hover:-translate-y-px"
            >
              <MessageCircleIcon size={15} />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-[0.78rem] text-white/40">
          <p>&copy; {new Date().getFullYear()} Shalom Dental Services Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
