import { SmileIcon, ShieldIcon, ClockIcon, CreditCardIcon } from './Icons';

const features = [
  {
    icon: SmileIcon,
    title: 'Patient-Centred Care',
    desc: 'Comfort and reassurance at every visit, from check-up to surgery.',
    color: 'bg-hope-accent/10 text-hope-accent',
  },
  {
    icon: ShieldIcon,
    title: 'Modern Facilities',
    desc: 'A well-equipped clinic at Chichiri Shopping Centre.',
    color: 'bg-emerald-100/60 text-emerald-600',
  },
  {
    icon: ClockIcon,
    title: 'Convenient Hours',
    desc: 'Open through the week, plus Saturday mornings.',
    color: 'bg-amber-100/60 text-amber-600',
  },
  {
    icon: CreditCardIcon,
    title: 'Transparent Pricing',
    desc: 'Clear treatment plans explained before anything begins.',
    color: 'bg-blue-100/60 text-blue-600',
  },
];

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-stone px-6 py-24">
      {/* Decorative dot pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.03]" aria-hidden="true">
        <defs>
          <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#1B1F1D" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sky uppercase">Why Hope</p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-tight">
            The trusted choice for a <span className="italic text-hope-accent">healthier smile</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative rounded-3xl bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-hope-accent/5"
              >
                <span className="absolute top-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-b-full bg-hope-accent/40 transition-all duration-300 group-hover:w-20 group-hover:bg-hope-accent" />
                <span className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${f.color}`}>
                  <Icon size={24} />
                </span>
                <h3 className="mb-2 font-display text-lg font-medium text-ink">{f.title}</h3>
                <p className="text-[0.88rem] text-slate leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
