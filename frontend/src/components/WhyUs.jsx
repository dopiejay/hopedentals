import { Link } from 'react-router-dom';
import { SmileIcon, ShieldIcon, LayersIcon, AwardIcon } from './Icons';

const features = [
  {
    icon: SmileIcon,
    title: 'Patient-Centred Care',
    desc: 'Comfort and reassurance at every visit.',
    color: 'bg-white/15 text-white',
  },
  {
    icon: ShieldIcon,
    title: 'Modern Facilities',
    desc: 'A well-equipped clinic at Chichiri Shopping Centre.',
    color: 'bg-white/15 text-white',
  },
  {
    icon: AwardIcon,
    title: 'Experienced Team',
    desc: 'Dentists and therapists you can trust.',
    color: 'bg-white/15 text-white',
  },
  {
    icon: LayersIcon,
    title: 'Comprehensive Services',
    desc: 'Preventive to restorative care, all in one place.',
    color: 'bg-white/15 text-white',
  },
];

export default function WhyUs() {
  return (
    <section className="bg-hope-teal px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* Left: copy + points */}
        <div>
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-white uppercase">Why Hope</p>
          <h2 className="mb-4 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-tight text-white">
            The trusted choice for <span className="text-hope-sun">your care</span>.
          </h2>
          <p className="mb-10 max-w-xl text-white/80 leading-relaxed">
            Hope Dental Surgery is an established dental practice at Chichiri Shopping Centre,
            offering dental treatments, tooth replacement, and orthodontic care from an
            experienced clinical team that puts patient comfort first.
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
                    <h3 className="mb-1 font-display text-[1.05rem] font-bold text-white">{f.title}</h3>
                    <p className="text-[0.88rem] text-white/70 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-hope-accent px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-hope-navy"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative min-h-[320px] overflow-hidden rounded-3xl lg:self-stretch">
          <img
            src="images/why.jpg"
            alt="The Hope Dental Surgery team caring for a patient"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-hope-navy/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}
