import { Link } from 'react-router-dom';
import { ArrowRightIcon, StethoscopeIcon } from '../components/Icons';
import PageHero from '../components/PageHero';
import useServices from '../hooks/useServices';

export default function ServicesPage() {
  const { services, loading } = useServices();

  return (
    <>
      <PageHero
        eyebrow="What we treat"
        title="Dental care for every stage of your smile."
        crumb="Services"
        image="/images/general.jpg"
      />

      <section className="bg-white px-6 py-24">
        {loading ? (
          <p className="py-12 text-center text-sm text-slate">Loading services&hellip;</p>
        ) : (
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon || StethoscopeIcon;
              return (
                <Link
                  key={s.id}
                  to={`/services/${s.slug}`}
                  className={`group relative block overflow-hidden rounded-3xl border border-stone/80 bg-gradient-to-br ${s.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-hope-accent/5`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span
                      className={`absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl shadow-lg ${s.iconColor}`}
                    >
                      <Icon size={20} />
                    </span>
                  </div>

                  <div className="relative z-10 p-6">
                    <h3 className="mb-2 font-display text-[1.15rem] font-medium text-ink">{s.title}</h3>
                    <p className="mb-5 text-[0.9rem] text-slate leading-relaxed">{s.desc}</p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-hope-teal transition-colors group-hover:text-hope-accent">
                      Explore Service
                      <ArrowRightIcon size={16} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="bg-gradient-to-r from-hope-teal to-hope-accent px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-medium leading-tight">
            Not sure which service you need?
          </h2>
          <p className="mb-8 text-white/80">
            Book a consultation and we&apos;ll recommend the right treatment for you.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-hope-teal transition-colors hover:bg-white/90"
          >
            Book an Appointment
          </Link>
        </div>
      </section>
    </>
  );
}
