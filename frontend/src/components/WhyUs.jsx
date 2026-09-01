import { SmileIcon, ShieldIcon, LayersIcon, AwardIcon } from './Icons';

const features = [
  {
    icon: SmileIcon,
    title: 'Patient-Centred Care',
    desc: 'Your comfort comes first — a team committed to a calm, reassuring experience at every visit.',
    color: 'bg-shalom-gold/10 text-shalom-gold',
  },
  {
    icon: ShieldIcon,
    title: 'Modern Facilities',
    desc: 'Well-equipped branches supported by an on-site dental laboratory for quality, reliable treatment.',
    color: 'bg-teal-100/60 text-teal-700',
  },
  {
    icon: AwardIcon,
    title: 'Experienced Team',
    desc: 'Dentists and dental therapists dedicated to professional development and patient care.',
    color: 'bg-amber-100/60 text-amber-700',
  },
  {
    icon: LayersIcon,
    title: 'Comprehensive Services',
    desc: 'From preventive care and orthodontics to restorative treatment and implants — all in one place.',
    color: 'bg-blue-100/60 text-blue-700',
  },
];

export default function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-stone px-6 py-24">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#1B1F1D" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-shalom-navy uppercase">Why Shalom</p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium">
            The trusted choice for <span className="italic text-shalom-gold">your care</span>.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group relative rounded-3xl bg-white p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-shalom-gold/5"
              >
                <div className="absolute top-0 left-1/2 h-1 w-12 -translate-x-1/2 rounded-b-full bg-shalom-gold/40 transition-all group-hover:w-20 group-hover:bg-shalom-gold" />
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${f.color}`}>
                  <Icon size={26} />
                </div>
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
