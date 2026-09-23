import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CalendarIcon, MessageCircleIcon } from '../components/Icons';
import Hero from '../components/Hero';
import TrustIntro from '../components/TrustIntro';
import ServicesPreview from '../components/ServicesPreview';
import WhyUs from '../components/WhyUs';
import FindUs from '../components/FindUs';
// import TeamPreview from '../components/TeamPreview';

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
      <FindUs />
      {/* <TreatmentJourney /> */}

      {/* CTA Section */}
      <section className="bg-hope-teal px-6 py-20 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <h2 className="mb-4 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-tight text-white">
              Your smile deserves <span className="text-hope-sun">dedicated care</span>.
            </h2>
            <p className="max-w-xl text-white/80">
              Book an appointment at Hope Dental Surgery and take the first step towards a
              healthier, more confident smile.
            </p>
          </div>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:justify-end lg:flex-col">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-hope-navy transition-all hover:-translate-y-px hover:bg-white/90"
            >
              <CalendarIcon size={18} />
              Book Your Appointment
            </Link>
            <a
              href="https://wa.me/265883449299"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-white/40 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10"
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
