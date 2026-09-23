import { useState } from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, MessageCircleIcon, SendIcon } from '../components/Icons';
import PageHero from '../components/PageHero';
import { branches } from '../data/branches';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const contactCards = [
  { icon: PhoneIcon, title: 'Call Us', value: '+265 1 876 966', action: 'tel:+2651876966', color: 'bg-teal-100/60 text-teal-700' },
  { icon: MessageCircleIcon, title: 'WhatsApp', value: '+265 883 449 299', action: 'https://wa.me/265883449299', color: 'bg-green-100/60 text-green-600' },
  { icon: MailIcon, title: 'Postal Address', value: 'P.O. Box 31574, Blantyre 3', color: 'bg-blue-100/60 text-blue-600' },
];

const hours = [
  { day: 'Monday – Thursday', time: '08:00 – 16:30', highlight: true },
  { day: 'Friday', time: '08:00 – 11:00', highlight: true },
  { day: 'Saturday – Sunday', time: 'Closed', highlight: false },
];

export default function ContactPage() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const form = e.target;
    const payload = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      message: form.message.value,
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Could not send your message.');
      }

      setStatus('sent');
      form.reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  return (
    <>
      <PageHero eyebrow="Find the clinic" title="Visit us at Chichiri Shopping Centre." crumb="Contact" image="https://images.pexels.com/photos/4269946/pexels-photo-4269946.jpeg?auto=compress&cs=tinysrgb&w=800" />

      {/* Clinic card */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-teal uppercase">Our location</p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold">One clinic, close to you</h2>
        </div>
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6">
          {branches.map((b) => (
            <div key={b.slug} className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={b.image}
                  alt={b.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <span className="absolute left-4 top-4 inline-block rounded-full bg-hope-teal/90 px-3 py-1 text-[0.72rem] font-bold tracking-[0.1em] text-white uppercase backdrop-blur">
                  {b.city}
                </span>
              </div>
              <div className="relative z-10 flex flex-1 flex-col p-6">
                <h3 className="mb-3 font-display text-xl font-bold text-ink">{b.name}</h3>
                <p className="mb-3 flex items-start gap-2 text-[0.9rem] text-slate">
                  <MapPinIcon size={16} className="mt-0.5 shrink-0 text-hope-teal" />
                  <span>{b.address}, {b.area}</span>
                </p>
                <p className="mb-4 flex items-center gap-2 text-[0.9rem] text-slate">
                  <PhoneIcon size={15} className="shrink-0 text-hope-teal" />
                  {b.phone}
                </p>
                <p className="mb-5 text-[0.85rem] text-slate leading-relaxed">{b.note}</p>
                <div className="mt-auto flex items-center gap-1.5 text-sm font-bold text-hope-navy transition-colors group-hover:text-hope-accent">
                  View Location <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact cards + Form + Hours */}
      <section className="bg-gradient-to-b from-stone to-paper px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {contactCards.map((c) => {
                const Icon = c.icon;
                const Wrapper = c.action ? 'a' : 'div';
                const wrapperProps = c.action
                  ? { href: c.action, target: c.action.startsWith('http') ? '_blank' : undefined, rel: c.action.startsWith('http') ? 'noopener noreferrer' : undefined }
                  : {};
                return (
                  <Wrapper
                    key={c.title}
                    {...wrapperProps}
                    className="group flex items-center gap-3.5 rounded-2xl border border-stone bg-gradient-to-b from-white to-stone/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-hope-accent hover:shadow-lg hover:shadow-hope-accent/5"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.color} transition-transform group-hover:scale-110`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-display text-base font-bold text-ink">{c.title}</h3>
                      <p className="text-[0.82rem] text-slate">{c.value}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-hope-navy/10 text-hope-navy">
                  <ClockIcon size={18} />
                </div>
                <h3 className="font-display text-lg font-bold">Opening Hours</h3>
              </div>
              <div className="flex flex-col gap-3">
                {hours.map((h) => (
                  <div key={h.day} className={`flex justify-between rounded-xl px-4 py-3 text-[0.92rem] ${h.highlight ? 'bg-stone/50' : ''}`}>
                    <span className="text-slate">{h.day}</span>
                    <span className={`font-medium ${h.highlight ? 'text-ink' : 'text-slate/50'}`}>{h.time}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[0.78rem] text-slate">
                Opening hours are being confirmed directly with the clinic.
              </p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="mb-2 font-display text-xl font-bold">Send us a message</h3>
            <p className="mb-6 text-[0.9rem] text-slate">We'll get back to you as soon as possible.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Full Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your name" className="w-full rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:bg-white focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="Your phone number" className="w-full rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:bg-white focus:outline-none" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Email</label>
                <input id="email" name="email" type="email" required placeholder="Your email address" className="w-full rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:bg-white focus:outline-none" />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Message</label>
                <textarea id="message" name="message" rows={4} required placeholder="How can we help you?" className="w-full resize-none rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:bg-white focus:outline-none" />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-hope-navy disabled:opacity-70"
              >
                <SendIcon size={16} />
                {status === 'sending' && 'Sending...'}
                {status === 'sent' && 'Message Sent!'}
                {(status === 'idle' || status === 'error') && 'Send Message'}
              </button>

              {status === 'error' && <p className="text-[0.85rem] font-semibold text-red-600">{error}</p>}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
