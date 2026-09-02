import { Link } from 'react-router-dom';
import { branches } from '../data/branches';
import { MapPinIcon, PhoneIcon, ArrowRightIcon } from './Icons';

export default function Branches() {
  return (
    <section id="branches" className="bg-white px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-shalom-navy uppercase">
          Find a Branch
        </p>
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium">
          Choose your nearest <span className="text-shalom-gold">Shalom</span> clinic.
        </h2>
        <p className="mt-4 text-slate">
          Three branches across Blantyre and Limbe bring comprehensive dental care closer to you.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {branches.map((b) => (
          <div
            key={b.slug}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone bg-gradient-to-b from-white to-stone/30 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-shalom-gold/5"
          >
            <h3 className="mb-4 font-display text-xl font-medium text-ink">{b.name}</h3>
            <p className="mb-4 flex items-start gap-2 text-[0.9rem] text-slate">
              <MapPinIcon size={16} className="mt-0.5 shrink-0 text-shalom-navy" />
              <span>
                {b.address}
                <br />
                {b.area}
              </span>
            </p>
            <p className="mb-5 flex items-center gap-2 text-[0.9rem] text-slate">
              <PhoneIcon size={15} className="shrink-0 text-shalom-navy" />
              {b.phone}
            </p>
            <p className="mb-6 text-[0.85rem] text-slate leading-relaxed">{b.note}</p>
            <Link
              to="/contact"
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-shalom-navy transition-colors group-hover:text-shalom-gold"
            >
              View Branch <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/book"
          className="inline-flex items-center gap-2 rounded-full bg-shalom-navy px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-shalom-teal"
        >
          Book at a Branch
        </Link>
      </div>
    </section>
  );
}
