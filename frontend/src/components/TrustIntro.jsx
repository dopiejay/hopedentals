import { Link } from 'react-router-dom';

const aboutImage = '/images/welcome.jpg';

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
          <div className="absolute inset-0 bg-gradient-to-tr from-hope-teal/30 to-transparent" />
          
        </div>

        {/* Text side */}
        <div>
          <h2 className="mb-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-heading">
            A dental team built around <span className="text-hope-teal">your care.</span>
          </h2>
          <p className="mb-6 text-[1.05rem] text-slate">
            Comprehensive dentistry, close to home in Blantyre.
          </p>
          <p className="mb-4 text-slate">
            Hope Dental Surgery is a private dental practice at Chichiri Shopping Centre in
            Blantyre, bringing dental treatments, tooth replacement and orthodontic care
            together in one accessible location.
          </p>
          <p className="mb-8 text-slate">
            From routine and preventive care to crowns, dentures and braces, our dedicated team
            of dentists and dental therapists keeps patient comfort at the heart of every visit.
          </p>

          <Link
            to="/about"
            className="inline-flex items-center gap-2 rounded-full bg-slate px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-hope-navy"
          >
            About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
