import { Link } from 'react-router-dom';
import { CalendarIcon } from '../components/Icons';
import PageHero from '../components/PageHero';
import { services } from '../data/services';

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our services" title="Comprehensive dental care, close to you." crumb="Services" image="/images/general.jpg" />

      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            return (
              <Link
                key={s.title}
                to={`/services/${s.slug}`}
                className="group relative block overflow-hidden rounded-3xl border border-stone/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
              >
                {/* Service image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>

                <div className="relative z-10 p-6">
                  <h3 className="mb-2 font-display text-[1.15rem] font-bold text-ink">{s.title}</h3>
                  <p className="mb-5 flex-1 text-[0.9rem] text-slate leading-relaxed">{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-shalom-navy transition-colors group-hover:text-shalom-gold">
                    Explore Service <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-shalom-teal px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold">
            Not sure which service you need?
          </h2>
          <p className="mb-8 text-white/80">
            Book a consultation and we&apos;ll recommend the right treatment for you.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-shalom-navy transition-all hover:-translate-y-px hover:bg-white/90"
          >
            <CalendarIcon size={18} />
            Book an Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
