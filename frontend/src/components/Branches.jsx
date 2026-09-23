import { Link } from 'react-router-dom';
import { branches } from '../data/branches';
import { ArrowRightIcon } from './Icons';

export default function Branches() {
  return (
    <section id="branches" className="bg-white px-6 py-24">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-teal uppercase">
          Find a Branch
        </p>
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-tight">
          Choose your nearest <span className="text-hope-accent">Shalom</span> clinic.
        </h2>
        <p className="mt-4 text-slate">
          Three branches across Blantyre and Limbe bring comprehensive dental care closer to you.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {branches.map((b) => (
          <div
            key={b.slug}
            className="group relative flex flex-col rounded-3xl border border-stone/80 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
          >
            <h3 className="mb-5 font-display text-xl font-bold text-ink">{b.name}</h3>
            <Link
              to="/contact"
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-hope-teal transition-colors group-hover:text-hope-navy"
            >
              View Branch <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/book"
          className="inline-flex items-center gap-2 rounded-full bg-hope-navy px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-hope-teal"
        >
          Book at a Branch
        </Link>
      </div>
    </section>
  );
}
