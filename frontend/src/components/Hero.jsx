import { Link } from 'react-router-dom';
import { PhoneIcon, CalendarIcon, MapPinIcon } from './Icons';
import useSettings from '../hooks/useSettings';

const tel = (v) => `tel:${(v || '').replace(/[^\d+]/g, '')}`;

const heroImage = '/images/hero-img.jpg';

export default function Hero() {
  const s = useSettings();

  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Full background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Patient smiling at dental clinic"
          className="h-full w-full object-cover object-top md:[object-position:40%_50%]"
        />
        {/* Mobile: heavy dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/70 to-ink/50 md:bg-gradient-to-r md:from-ink md:via-ink/70 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-ink/20" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-20 md:flex md:min-h-[600px] md:items-center md:py-24 lg:min-h-[700px]">
        {/* Left: Copy */}
        <div className="relative z-10 max-w-xl">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sky uppercase">
            Dental care at Chichiri, Blantyre
          </p>
          <h1 className="mb-5 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.1] text-white">
            Your smile, our <span className="text-hope-sky">priority.</span>
          </h1>
          <p className="mb-8 max-w-lg text-[1.05rem] text-white/80">
            Professional dental care from Hope Dental Surgery at Chichiri Shopping Centre &mdash;
            dental treatments, tooth replacement and orthodontic care in one accessible location.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-hope-sky px-7 py-4 text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-white hover:text-hope-teal"
            >
              <CalendarIcon size={16} />
              Book an appointment
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/30 px-7 py-4 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <PhoneIcon size={16} />
              Contact Us
            </Link>
          </div>

         
        </div>
      </div>

      {/* Wave divider into the paper background */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path
            d="M0 60C240 20 480 0 720 20C960 40 1200 60 1440 40V80H0V60Z"
            fill="#FAFAF9"
          />
        </svg>
      </div>
    </section>
  );
}
