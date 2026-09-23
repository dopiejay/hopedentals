import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon } from './Icons';

const heroImage = '/images/hero-img.jpg';

export default function Hero() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/60 to-ink/35 md:bg-gradient-to-r md:from-ink/80 md:via-ink/45 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-ink/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 md:flex md:min-h-[600px] md:items-center md:py-24 lg:min-h-[700px]">
        {/* Left: Copy */}
        <div className="relative z-10 max-w-xl">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-accent uppercase">
            Dental care at Chichiri, Blantyre
          </p>
          <h1 className="mb-5 font-display text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.1] text-white">
            Comprehensive dental care, <span className="mb-5 text-hope-accent">close to you.</span>
          </h1>
          <p className="mb-8 max-w-lg text-[1.05rem] text-white/80">
            Professional dental care from Hope Dental Surgery at Chichiri Shopping Centre —
            dental treatments, tooth replacement, and orthodontic care in one accessible location.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-hope-teal px-7 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-hope-navy"
            >
              <CalendarIcon size={16} />
              Book an appointment
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/30 px-7 py-4 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <MapPinIcon size={16} />
              Find the Clinic
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-[0.82rem] text-white/60">
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-hope-accent" />
              Established Practice
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-hope-accent" />
              Chichiri Shopping Centre
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-hope-accent" />
              Dental &amp; Orthodontic Care
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
