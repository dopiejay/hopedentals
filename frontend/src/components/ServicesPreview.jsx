import { Link } from 'react-router-dom';
import { services } from '../data/services';

const previewServices = services.slice(0, 3);

export default function ServicesPreview() {
  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sun uppercase">What we offer</p>
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-tight">
          Dental care for every <span className="text-hope-accent">stage</span> of your smile.
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {previewServices.map((s) => {
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
                <h3 className="mb-2 font-display text-[1.15rem] font-bold text-hope-accent">{s.title}</h3>
                <p className="mb-5 flex-1 text-[0.9rem] text-slate leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-hope-navy transition-colors group-hover:text-hope-sun">
                  Explore Service <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View All button */}
      <div className="mt-12 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-8 py-4 text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-ink hover:text-white"
        >
          View All Services →
        </Link>
      </div>
    </section>
  );
}
