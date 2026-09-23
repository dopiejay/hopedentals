import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';
const doctorImage = 'images/imagePlaceholder.jpg';

const teamRoles = [
  { title: 'Dentists', desc: 'General, orthodontic, and restorative clinical care.' },
  { title: 'Dental Therapists', desc: 'Routine and preventive care at each branch.' },
  { title: 'Front Desk Team', desc: 'Your first hello — appointments, reminders, and questions answered.' },
];

export default function TeamPreview() {
  return (
    <section id="team" className="bg-paper px-6 py-24">
      <div className="mx-auto mb-14 max-w-xl text-center">
        <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sun uppercase">Meet the team</p>
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-tight">The hands behind your smile</h2>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-10 overflow-hidden rounded-3xl border border-stone bg-white md:grid-cols-[280px_1fr]">
        {/* Photo */}
        <div className="relative h-full min-h-[300px] overflow-hidden">
          <img
            src={doctorImage}
            alt="Shalom Dental clinical team — dentists and dental therapists"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
        </div>

        {/* Info */}
        <div className="p-8 text-center md:text-left">
          <h3 className="mb-1.5 font-display text-2xl font-bold">Shalom Clinical Team</h3>
          <p className="mb-3.5 text-sm font-bold text-hope-navy">Dentists · Dental Therapists · Our Branches</p>
          <p className="mb-4.5 text-slate leading-relaxed">
            A dedicated team of dentists and dental therapists delivers care across our Blantyre
            and Limbe branches — offering general, orthodontic, and restorative treatment with
            patient comfort always in mind.
          </p>
          <div className="mb-5 flex flex-wrap justify-center gap-2.5 md:justify-start">
            {['General Dentistry', 'Orthodontics', 'Restorative Care'].map((t) => (
              <span key={t} className="rounded-full bg-stone px-3.5 py-1.5 text-[0.8rem] font-semibold text-ink">
                {t}
              </span>
            ))}
          </div>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-bold text-hope-navy transition-colors hover:text-hope-accent"
          >
            Meet the full team <ArrowRightIcon size={16} />
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-5 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
        {teamRoles.map((r) => (
          <div key={r.title} className="rounded-3xl border border-stone bg-white p-6 text-center">
            <h4 className="mb-1 font-display text-base font-bold text-ink">{r.title}</h4>
            <p className="text-[0.82rem] text-slate leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
