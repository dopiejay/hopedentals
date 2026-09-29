import { StarIcon } from './Icons';

const reviews = [
  {
    quote: 'Absolutely fantastic experience! The team made me feel so comfortable and the results exceeded my expectations. Highly recommend Hope Dental Surgery.',
    author: 'Grace M.',
    rating: 5,
  },
  {
    quote: 'My children actually look forward to their dental visits now. The team is incredibly patient and gentle with kids. We love this clinic.',
    author: 'Chimwemwe K.',
    rating: 5,
  },
  {
    quote: 'Professional, modern, and genuinely caring. The digital X-ray was quick and the whole process was seamless. Best dental experience in Blantyre.',
    author: 'Thandizo P.',
    rating: 5,
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-ink px-6 py-24 text-white">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-hope-accent/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-hope-sky/5 blur-3xl" />

      <div className="relative z-10 mx-auto mb-14 max-w-xl text-center">
        <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sky uppercase">Patient Testimonials</p>
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium text-white">
          Real experiences. Real smiles.
        </h2>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3">
        {reviews.map((r, i) => (
          <blockquote
            key={i}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6.5 transition-all duration-300 hover:border-hope-accent/30 hover:bg-white/[0.07]"
          >
            <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-hope-accent/5 blur-xl transition-all group-hover:scale-150" />
            <div className="relative z-10">
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <StarIcon key={j} size={14} className="text-hope-sky" filled />
                ))}
              </div>
              <p className="mb-3.5 text-[0.95rem] italic text-white/85 leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
              <cite className="text-[0.82rem] text-hope-accent not-italic font-medium">— {r.author}</cite>
            </div>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
