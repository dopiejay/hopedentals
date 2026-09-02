import { useState } from 'react';
import { StarIcon, ArrowLeftIcon, ArrowRightIcon } from './Icons';

const reviews = [
  {
    quote: 'Absolutely fantastic experience! The team made me feel so comfortable and the results exceeded my expectations. Highly recommend Shalom Dental.',
    author: 'Grace M.',
    rating: 5,
  },
  {
    quote: 'My children actually look forward to their dental visits now. The team is incredibly patient and gentle with kids at the Limbe branch. We love it here.',
    author: 'Chimwemwe K.',
    rating: 5,
  },
  {
    quote: 'Professional, modern, and genuinely caring. Booking at a branch near us was simple and the whole process was seamless. Best dental experience in Blantyre.',
    author: 'Thandizo P.',
    rating: 5,
  },
];

export default function Reviews() {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i - 1 + reviews.length) % reviews.length);
  }

  function next() {
    setIndex((i) => (i + 1) % reviews.length);
  }

  const active = reviews[index];

  return (
    <section id="reviews" className="relative overflow-hidden bg-ink px-6 py-24 text-white">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-shalom-gold/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-shalom-teal/5 blur-3xl" />

      <div className="relative z-10 mx-auto mb-14 max-w-xl text-center">
        <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-shalom-teal uppercase">Patient Testimonials</p>
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium text-white">
          Real experiences. Real smiles.
        </h2>
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <blockquote className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] px-8 py-12 text-center sm:px-14">
          <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-shalom-gold/5 blur-xl" />

          <div className="relative z-10">
            <div className="mb-5 flex justify-center gap-0.5">
              {Array.from({ length: active.rating }).map((_, j) => (
                <StarIcon key={j} size={16} className="text-shalom-teal" filled />
              ))}
            </div>
            <p className="mb-6 text-[1.05rem] text-white/85 leading-relaxed">&ldquo;{active.quote}&rdquo;</p>
            <cite className="text-[0.9rem] text-shalom-gold not-italic font-medium">— {active.author}</cite>
          </div>
        </blockquote>

        {/* Controls */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-shalom-gold hover:text-shalom-gold"
          >
            <ArrowLeftIcon size={20} />
          </button>

          <div className="flex gap-2.5">
            {reviews.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-7 bg-shalom-gold' : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-shalom-gold hover:text-shalom-gold"
          >
            <ArrowRightIcon size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}