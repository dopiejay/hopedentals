import { MapPinIcon, PhoneIcon, ClockIcon, MessageCircleIcon } from './Icons';
import useSettings from '../hooks/useSettings';

export default function FindUs() {
  const s = useSettings();
  const tel = (v) => `tel:${(v || '').replace(/[^\d+]/g, '')}`;

  const details = [
    { icon: MapPinIcon, label: 'Location', value: `${s.address} · ${s.area}` },
    { icon: PhoneIcon, label: 'Landline', value: s.phone_landline, href: tel(s.phone_landline) },
    { icon: PhoneIcon, label: 'Mobile', value: s.phone_mobile, href: tel(s.phone_mobile) },
    { icon: ClockIcon, label: 'Hours', value: `${s.hours_weekdays} · ${s.hours_friday}` },
  ];

  return (
    <section id="find-us" className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div>
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sun uppercase">Find the clinic</p>
          <h2 className="mb-6 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-tight">Visit us at Chichiri Shopping Centre</h2>

          <ul className="mb-7 flex flex-col gap-4">
            {details.map((d) => {
              const Icon = d.icon;
              const content = (
                <li key={d.label} className="flex items-start gap-3.5">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-hope-accent/10 text-hope-accent transition-colors group-hover:bg-hope-accent group-hover:text-white">
                    <Icon size={18} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <strong className="text-[0.75rem] font-normal tracking-[0.1em] text-slate/70 uppercase">{d.label}</strong>
                    <span className="font-bold text-ink">{d.value}</span>
                  </div>
                </li>
              );
              return d.href ? (
                <a key={d.label} href={d.href} className="group transition-opacity hover:opacity-80">
                  {content}
                </a>
              ) : content;
            })}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${s.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-hope-teal px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-px"
            >
              <MessageCircleIcon size={16} />
              Message on WhatsApp
            </a>
            <a
              href={tel(s.phone_landline)}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink px-6 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              <PhoneIcon size={16} />
              Call the clinic
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-ink/10">
          <iframe
            title="Hope Dental Surgery — Chichiri Shopping Centre, Blantyre"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3836.9!2d35.0!3d-15.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQ2JzQ4LjAiSyAzNcKwMDAnMDAuMCJF!5e0!3m2!1sen!2smw!4v1"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}