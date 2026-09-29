import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustIntro from '../components/TrustIntro';
import ServicesPreview from '../components/ServicesPreview';
//import WhyUs from '../components/WhyUs';
import TreatmentJourney from '../components/TreatmentJourney';
import Reviews from '../components/Reviews';
//import FindUs from '../components/FindUs';
import useSettings from '../hooks/useSettings';

export default function Home() {
  const { hash } = useLocation();
  const s = useSettings();
  const wa = `https://wa.me/${(s.whatsapp || '').replace(/[^\d]/g, '')}`;

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
      {/* <WhyUs /> */}
      <TreatmentJourney />
      <Reviews />
      {/* <FindUs /> */}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-hope-teal to-hope-accent px-6 py-20 text-center text-white">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-4 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-heading text-white">
            It&apos;s time to love your smile.
          </h2>
          <p className="mb-8 text-white/80">
            Book an appointment at Hope Dental Surgery and take the first step towards a healthier,
            more confident smile.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-hope-teal transition-colors hover:bg-white/90"
            >
              Book Your Appointment
            </Link>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-white/40 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
