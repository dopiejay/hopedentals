import { XIcon } from '../../components/Icons';

export default function SlideOver({ open, title, onClose, children, footer }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close panel"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
        <header className="flex items-center justify-between gap-4 border-b border-stone px-6 py-4">
          <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate transition-colors hover:bg-stone hover:text-ink"
          >
            <XIcon size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>

        {footer && <footer className="border-t border-stone bg-stone/30 px-6 py-4">{footer}</footer>}
      </aside>
    </div>
  );
}