import { PhoneIcon, MapPinIcon, ClockIcon } from './Icons';

export default function TopBar() {
  return (
    <div className="border-b border-stone bg-stone/50 text-[0.78rem] text-slate">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 py-2">
        <a href="tel:+265998951880" className="flex items-center gap-1.5 transition-colors hover:text-ink">
          <PhoneIcon size={13} />
          +265 998 95 18 80
        </a>
        <span className="hidden text-stone sm:inline">|</span>
        <span className="flex items-center gap-1.5">
          <ClockIcon size={13} />
          Mon – Sat
        </span>
        <span className="hidden text-stone sm:inline">|</span>
        <span className="flex items-center gap-1.5">
          <MapPinIcon size={13} />
          Blantyre, Malawi
        </span>
      </div>
    </div>
  );
}
