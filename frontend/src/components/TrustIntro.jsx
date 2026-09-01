import { AwardIcon, MapPinIcon, LayersIcon } from './Icons';
const aboutImage = 'images/dentist.jpg';

export default function TrustIntro() {
  return (
    <section className="bg-paper px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        {/* Image side */}
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={aboutImage}
            alt="Patient care at Shalom Dental Services"
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-shalom-navy/30 to-transparent" />
          {/* Floating badge */}
          <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 px-5 py-3 shadow-lg backdrop-blur-sm">
            <p className="text-[0.72rem] font-bold tracking-wider text-shalom-navy uppercase">Trusted for</p>
            <p className="font-display text-2xl font-medium text-ink">20+ Years</p>
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-shalom-navy uppercase">
            Welcome to Shalom Dental
          </p>
          <h2 className="mb-5 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium">
            A dental team built around<br />your care.
          </h2>
          <p className="mb-4 text-slate">
            Shalom Dental Services is an established dental organisation serving Blantyre and Limbe
            for over two decades — providing clinical dental care and a dental laboratory under one
            trusted name, across multiple branches.
          </p>
          <p className="mb-8 text-slate">
            From routine and preventive care to orthodontics, restorative treatment, and implants,
            our dedicated team of dentists and dental therapists keeps patient comfort at the heart
            of every visit.
          </p>

          <div className="flex gap-10">
            <Stat icon={<AwardIcon size={20} className="text-shalom-gold" />} value="20+" label="Years of Experience" />
            <Stat icon={<MapPinIcon size={20} className="text-shalom-gold" />} value="03" label="Branches" />
            <Stat icon={<LayersIcon size={20} className="text-shalom-gold" />} value="6+" label="Comprehensive Services" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }) {
  return (
    <div>
      <span className="mb-1 flex items-center gap-2">
        {icon}
        <strong className="block font-display text-2xl">{value}</strong>
      </span>
      <span className="text-[0.78rem] text-slate">{label}</span>
    </div>
  );
}
