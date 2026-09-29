import { Link } from 'react-router-dom';
import { ArrowRightIcon, StethoscopeIcon } from './Icons';
import useServices from '../hooks/useServices';

export default function ServicesPreview() {
  const { services, loading } = useServices();
  const previewServices = services.slice(0, 3);

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sky uppercase leading-eyebrow">What we offer</p>
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-heading">
          Dental care for every <span className="text-hope-accent">stage</span> of your smile.
        </h2>
      </div>

      {loading ? (
        <p className="py-12 text-center text-sm text-slate">Loading services…</p>
      ) : (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {previewServices.map((s) => {
            const Icon = s.icon || StethoscopeIcon;
            return (
              <Link
                key={s.id}
                to={`/services/${s.slug}`}
                className={`group relative block overflow-hidden rounded-3xl border border-stone/80 bg-gradient-to-br ${s.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-hope-accent/5`}
              >
                <div className="relative h-48 overflow-hidden">
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
                  <h3 className="mb-2 font-display text-[1.15rem] font-medium leading-heading text-ink">{s.title}</h3>
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

      <div className="mt-12 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-8 py-4 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-white"
        >
          View All Services
          <ArrowRightIcon size={16} />
        </Link>
      </div>
    </section>
  );
}
