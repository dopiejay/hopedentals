import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowRightIcon,
  CheckCircleIcon,
  HeartHandshakeIcon,
  StethoscopeIcon,
} from '../components/Icons';
import PageHero from '../components/PageHero';
import { services as staticServices } from '../data/services';
import useServices from '../hooks/useServices';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { services, loading } = useServices();

  const staticService = staticServices.find((s) => s.slug === slug);
  if (staticService) return <Detail service={staticService} image={staticService.img} />;

  const dbService = services.find((s) => s.slug === slug);
  if (dbService) return <Detail service={dbService} image={dbService.image} />;

  return (
    <section className="bg-paper px-6 py-32 text-center">
      {loading ? (
        <p className="text-slate">Loading&hellip;</p>
      ) : (
        <div className="mx-auto max-w-md">
          <h1 className="mb-3 font-display text-3xl font-medium">Service not found</h1>
          <p className="mb-8 text-slate">
            The service you are looking for doesn&apos;t exist or has moved.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full bg-hope-sky px-8 py-4 text-sm font-bold text-ink transition-colors hover:bg-white hover:text-hope-teal"
          >
            View All Services
          </Link>
        </div>
      )}
    </section>
  );
}

function Detail({ service, image }) {
  const Icon = service.icon || StethoscopeIcon;
  const hasIncludes = service.includes?.length > 0;
  const hasSteps = service.steps?.length > 0;
  const hasFaqs = service.faqs?.length > 0;
  const intro =
    service.intro ||
    service.long_description ||
    service.desc ||
    `Personalised ${String(service.title).toLowerCase()} care, planned around your needs and delivered by the Hope Dental Surgery clinical team at Chichiri Shopping Centre, Blantyre.`;

  return (
    <>
      <PageHero eyebrow="Our Services" title={service.title} crumb={service.title} image={image} />

      {/* What is this treatment? */}
      <section className="bg-paper px-6 py-20">
        <div className="mx-auto max-w-6xl grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_1.2fr]">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={image}
              alt={service.title}
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <span className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 shadow-lg">
              <Icon size={24} className={service.iconColor?.split(' ')[0] || 'text-hope-accent'} />
            </span>
          </div>
          <div>
            <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-teal uppercase">
              What is this treatment?
            </p>
            <p className="text-slate leading-relaxed">{intro}</p>

            {hasIncludes && (
              <div className="mt-6 flex flex-wrap gap-2.5">
                {service.includes.map((item) => (
                  <span
                    key={item.title}
                    className="inline-flex items-center gap-1.5 rounded-full border border-stone bg-white px-4 py-2 text-[0.85rem] font-semibold text-ink"
                  >
                    <CheckCircleIcon size={15} className="text-hope-accent" />
                    {item.title}
                  </span>
                ))}
              </div>
            )}

            {service.whoFor && (
              <div className="mt-8 rounded-3xl border border-stone bg-white p-6">
                <p className="mb-2 flex items-center gap-2 font-display text-lg font-medium text-ink">
                  <HeartHandshakeIcon size={20} className="text-hope-accent" />
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
        <section className="bg-ink px-6 py-24 text-white">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sky uppercase">
              What to expect
            </p>
            <h2 className="font-display text-[clamp(1.7rem,3vw,2.3rem)] font-medium leading-tight text-white">
              A simple, guided process
            </h2>
          </div>

          <div
            className={`mx-auto grid max-w-5xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 ${
              service.steps.length >= 5 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            }`}
          >
            {service.steps.map((step, i) => (
              <div key={step.title}>
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-hope-accent/20 font-display text-lg font-bold text-hope-sky">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2 font-display text-lg font-medium text-white">{step.title}</h3>
                <p className="text-[0.9rem] text-white/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {hasFaqs && (
        <section className="bg-paper px-6 py-20">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-teal uppercase">
              Questions
            </p>
            <h2 className="font-display text-[clamp(1.7rem,3vw,2.3rem)] font-medium leading-tight text-ink">
              Frequently asked questions
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-3">
            {service.faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </section>
      )}

      <div className="bg-gradient-to-r from-hope-teal to-hope-accent px-6 py-14 text-center">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-hope-sky"
        >
          <ArrowRightIcon size={16} className="rotate-180" />
          Explore All Services
        </Link>
      </div>
    </>
  );
}

function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-2xl border border-stone bg-white">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span className="font-display text-[1.05rem] font-medium text-ink">{q}</span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone text-lg font-bold text-hope-teal transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-[0.92rem] text-slate leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}
