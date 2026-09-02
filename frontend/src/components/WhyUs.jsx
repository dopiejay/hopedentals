import { SmileIcon, ShieldIcon, LayersIcon, AwardIcon } from './Icons';

const features = [
  {
    icon: SmileIcon,
    title: 'Patient-Centred Care',
    desc: 'A calm, reassuring experience built around your comfort at every visit.',
    color: 'bg-shalom-gold/10 text-shalom-gold',
  },
  {
    icon: ShieldIcon,
    title: 'Modern Facilities',
    desc: 'Well-equipped branches supported by an on-site dental laboratory.',
    color: 'bg-teal-100/60 text-teal-700',
  },
  {
    icon: AwardIcon,
    title: 'Experienced Team',
    desc: 'Dentists and therapists dedicated to professional, reliable treatment.',
    color: 'bg-amber-100/60 text-amber-700',
  },
  {
    icon: LayersIcon,
    title: 'Comprehensive Services',
    desc: 'Preventive care, orthodontics, restorative work and implants — all in one place.',
    color: 'bg-blue-100/60 text-blue-700',
  },
];

export default function WhyUs() {
  return (
    <section className="bg-stone px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* Left: copy + points */}
        <div>
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-shalom-navy uppercase">Why Shalom</p>
          <h2 className="mb-4 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium text-ink">
            The trusted choice for <span className="text-shalom-gold">your care</span>.
          </h2>
          <p className="mb-10 max-w-xl text-slate leading-relaxed">
            For over two decades, Shalom Dental Services has delivered comfortable, professional
            dental care across Blantyre and Limbe — backed by experienced clinicians and an on-site
            dental laboratory.
          </p>

          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${f.color}`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="mb-1 font-display text-[1.05rem] font-medium text-ink">{f.title}</h3>
                    <p className="text-[0.88rem] text-slate leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: image */}
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src="images/destist.jpg"
            alt="A Shalom dental clinician with a patient"
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-shalom-navy/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}