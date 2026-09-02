import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CalendarIcon, MessageCircleIcon } from '../components/Icons';
import Hero from '../components/Hero';
import TrustIntro from '../components/TrustIntro';
import ServicesPreview from '../components/ServicesPreview';
import WhyUs from '../components/WhyUs';
import Branches from '../components/Branches';
import TreatmentJourney from '../components/TreatmentJourney';
// import TeamPreview from '../components/TeamPreview';
import Reviews from '../components/Reviews';
// import FindUs from '../components/FindUs';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <TrustIntro />
      <ServicesPreview />
      <WhyUs />
      <Branches />
      <TreatmentJourney />
      <Reviews />

      {/* CTA Section */}
      <section className="bg-shalom-teal px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium text-white">
            Your smile deserves dedicated care.
          </h2>
          <p className="mb-8 text-white/80">
            Book an appointment at the branch closest to you and take the first step towards a healthier, more confident smile.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-shalom-navy transition-all hover:-translate-y-px hover:bg-white/90"
            >
              <CalendarIcon size={18} />
              Book Your Appointment
            </Link>
            <a
              href="https://wa.me/265998951880"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-white/40 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10"
            >
              <MessageCircleIcon size={18} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
