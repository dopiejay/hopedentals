import { ConsultIcon, PlanIcon, TreatIcon, ReviewIcon } from './Icons';

const steps = [
  { num: '01', icon: ConsultIcon, title: 'Consult', desc: 'Discuss your concerns, goals, and medical history in a relaxed setting.' },
  { num: '02', icon: PlanIcon, title: 'Diagnose', desc: 'Digital X-ray and clinical examination to understand your dental health.' },
  { num: '03', icon: TreatIcon, title: 'Treat', desc: 'Gentle, minimally invasive treatment tailored to your needs.' },
  { num: '04', icon: ReviewIcon, title: 'Follow Up', desc: 'Ongoing care to keep your smile healthy and confident.' },
];

export default function TreatmentJourney() {
  return (
    <section className="bg-stone px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="mb-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium leading-heading">
            Your journey to a <span className="text-hope-teal">healthier smile</span>.
          </h2>
          <p className="text-[1.05rem] text-slate">
            Three simple steps from your first call to your first appointment.
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start sm:gap-4">
          {/* Connecting line */}
          <div className="absolute top-7 left-0 right-0 hidden h-[2px] bg-gradient-to-r from-hope-accent/10 via-hope-accent/30 to-hope-accent/10 sm:block" />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative flex flex-1 flex-col items-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-hope-accent bg-white text-hope-accent transition-transform hover:scale-110 hover:bg-hope-accent hover:text-white">
                  <Icon size={24} />
                </div>
                <h3 className="mb-2 font-display text-lg font-medium leading-heading text-ink">{step.title}</h3>
                <p className="text-[0.88rem] text-slate leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
