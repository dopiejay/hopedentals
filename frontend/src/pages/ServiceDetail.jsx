import { Link, useParams } from 'react-router-dom';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  HeartHandshakeIcon,
} from '../components/Icons';
import PageHero from '../components/PageHero';
import { services } from '../data/services';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <section className="bg-paper px-6 py-32 text-center">
        <div className="mx-auto max-w-md">
          <h1 className="mb-3 font-display text-3xl font-semibold">Service not found</h1>
          <p className="mb-8 text-slate">
            The service you are looking for doesn&apos;t exist or has moved.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-shalom-teal px-8 py-4 text-sm font-bold text-ink transition-all hover:-translate-y-0.5 hover:bg-white hover:text-shalom-navy"
          >
            View All Services
          </Link>
        </div>
      </section>
    );
  }

  const Icon = service.icon;
  const hasIncludes = service.includes?.length > 0;
  const hasSteps = service.steps?.length > 0;

  return (
    <>
      <PageHero eyebrow="Our Services" title={service.title} crumb={service.title} image={service.img} />

      {/* What is this treatment? */}
      <section className="bg-paper px-6 py-20">
        <div className="mx-auto max-w-6xl grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_1.2fr]">
          <div className="relative overflow-hidden rounded-3xl">
            <img src={service.img} alt={service.title} className="aspect-[4/3] w-full object-cover" loading="lazy" />
            <div className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 shadow-lg">
              <Icon size={24} className={service.iconColor.split(' ')[0]} />
            </div>
          </div>
          <div>
            <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-shalom-teal uppercase">
              What is this treatment?
            </p>
            <p className="text-slate leading-relaxed">{service.intro}</p>
            {hasIncludes && (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {service.includes.map((item) => (
                  <span
                    key={item.title}
                    className="inline-flex items-center gap-1.5 rounded-full border border-stone bg-white px-4 py-2 text-[0.85rem] font-semibold text-ink"
                  >
                    <CheckCircleIcon size={15} className="text-shalom-gold" />
                    {item.title}
                  </span>
                ))}
              </div>
            )}
            {service.whoFor && (
              <div className="mt-8 rounded-3xl border border-stone bg-white p-6">
                <p className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <HeartHandshakeIcon size={20} className="text-shalom-gold" />
                  Who is it for?
                </p>
                <p className="text-[0.92rem] text-slate leading-relaxed">{service.whoFor}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What to expect */}
      {hasSteps && (
        <section className="bg-white px-6 py-24">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.4fr]">
            <div>
              <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-shalom-teal uppercase">
                What to expect
              </p>
              <h2 className="mb-4 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-semibold text-ink">
                A simple, guided process
              </h2>
              <p className="text-slate leading-relaxed">
                Every treatment follows a clear path — planned around your needs and reviewed with you at each step.
              </p>
            </div>
            <ol className="divide-y divide-stone border-y border-stone">
              {service.steps.map((step, i) => (
                <li key={step.title} className="flex items-start gap-5 py-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-shalom-gold/15 font-display text-lg font-bold text-shalom-navy">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="mb-1 font-display text-lg font-bold text-ink">{step.title}</h3>
                    <p className="text-[0.9rem] text-slate leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Back to all services */}
      <div className="bg-paper px-6 pb-16 pt-10 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-bold text-shalom-navy transition-colors hover:text-shalom-gold"
        >
          <ArrowRightIcon size={16} className="rotate-180" />
          Explore All Services
        </Link>
      </div>
    </>
  );
}
