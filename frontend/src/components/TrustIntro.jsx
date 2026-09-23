import { Link } from 'react-router-dom';
const aboutImage = 'images/welcome.jpg';

export default function TrustIntro() {
  return (
    <section className="bg-stone px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
        {/* Image side */}
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={aboutImage}
            alt="Patient care at Hope Dental Surgery"
            className="aspect-[4/3] w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-hope-navy/30 to-transparent" />
          {/* Floating badge */}
          <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 px-5 py-3 shadow-lg backdrop-blur-sm">
            <p className="text-[0.72rem] font-bold tracking-wider text-hope-navy uppercase">Located at</p>
            <p className="font-display text-2xl font-bold text-ink">Chichiri Mall</p>
          </div>
        </div>

        {/* Text side */}
        <div>
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sun uppercase">
            Welcome to Hope Dental Surgery
          </p>
          <h2 className="mb-5 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-tight">
            A dental team built around<br />your care.
          </h2>
          <p className="mb-4 text-slate">
            Hope Dental Surgery is a private dental practice at Chichiri Shopping Centre in
            Blantyre, bringing dental treatments, tooth replacement, and orthodontic care
            together in one accessible location.
          </p>
          <p className="mb-8 text-slate">
            From routine and preventive care to crowns, dentures, and braces, our dedicated
            team of dentists and dental therapists keeps patient comfort at the heart of
            every visit.
          </p>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full bg-hope-accent px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-hope-navy"
          >
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
