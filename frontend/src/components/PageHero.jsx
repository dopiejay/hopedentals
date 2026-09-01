import { Link } from 'react-router-dom';

export default function PageHero({ eyebrow, title, crumb, image }) {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-20 text-center text-white">
      {/* Background image with dark overlay */}
      {image && (
        <div className="absolute inset-0">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-ink/80" />
        </div>
      )}
      {/* Fallback gradient if no image */}
      {!image && (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-shalom-gold/20 to-shalom-navy/20" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-3xl">
        <nav className="mb-4 text-[0.78rem] text-white/50">
          <Link to="/" className="transition-colors hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-white/80">{crumb}</span>
        </nav>
        <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-shalom-teal uppercase">{eyebrow}</p>
        <h1 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-medium leading-tight text-white">
          {title}
        </h1>
      </div>
    </section>
  );
}
