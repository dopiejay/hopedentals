import { useState } from 'react';
import {
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  ClockIcon,
  MessageCircleIcon,
  SendIcon,
} from '../components/Icons';
import PageHero from '../components/PageHero';
import { branches } from '../data/branches';
import useSettings from '../hooks/useSettings';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function ContactPage() {
  const s = useSettings();
  const tel = (v) => `tel:${(v || '').replace(/[^\d+]/g, '')}`;
  const wa = `https://wa.me/${(s.whatsapp || '').replace(/[^\d]/g, '')}`;

  const contactCards = [
    {
      icon: MapPinIcon,
      title: 'Visit Us',
      value: `${s.address}, ${s.area}`,
      color: 'bg-hope-accent/10 text-hope-accent',
    },
    {
      icon: PhoneIcon,
      title: 'Call Us',
      value: s.phone_mobile,
      action: tel(s.phone_mobile),
      color: 'bg-emerald-100/60 text-emerald-600',
    },
    {
      icon: MessageCircleIcon,
      title: 'WhatsApp',
      value: s.phone_mobile,
      action: wa,
      color: 'bg-green-100/60 text-green-600',
    },
    {
      icon: MailIcon,
      title: 'Email Us',
      value: s.email,
      action: `mailto:${s.email}`,
      color: 'bg-blue-100/60 text-blue-600',
    },
  ];

  const hours = [
    { day: 'Monday – Thursday', time: s.hours_weekdays, highlight: true },
    { day: 'Friday', time: s.hours_friday, highlight: true },
    { day: 'Saturday – Sunday', time: s.hours_weekend, highlight: false },
  ];

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
      <PageHero
        eyebrow="Get in touch"
        title="We'd love to welcome you."
        crumb="Contact"
        image="https://images.pexels.com/photos/4269946/pexels-photo-4269946.jpeg?auto=compress&cs=tinysrgb&w=800"
      />

      {/* Contact cards */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sky uppercase">
            Reach us
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-tight text-ink">
            One clinic, close to you
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((c) => {
            const Icon = c.icon;
            const Wrapper = c.action ? 'a' : 'div';
            const wrapperProps = c.action
              ? {
                  href: c.action,
                  target: c.action.startsWith('http') ? '_blank' : undefined,
                  rel: c.action.startsWith('http') ? 'noopener noreferrer' : undefined,
                }
              : {};
            return (
              <Wrapper
                key={c.title}
                {...wrapperProps}
                className="group rounded-2xl border border-stone bg-gradient-to-b from-white to-stone/30 p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-hope-accent hover:shadow-lg hover:shadow-hope-accent/5"
              >
                <span
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${c.color}`}
                >
                  <Icon size={22} />
                </span>
                <h3 className="mb-1 font-display text-base font-medium text-ink">{c.title}</h3>
                <p className="text-[0.85rem] text-slate">{c.value}</p>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Clinic + map */}
      <section className="bg-paper px-6 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sky uppercase">
            Our location
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-tight text-ink">
            Visit us at Chichiri Shopping Centre
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
          {branches.map((b) => (
            <div
              key={b.slug}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-hope-accent/5"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={b.image}
                  alt={b.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-4 left-4 inline-block rounded-full bg-hope-sky/90 px-3 py-1 text-[0.72rem] font-bold tracking-[0.1em] text-ink uppercase backdrop-blur">
                  {b.city}
                </span>
              </div>
              <div className="relative z-10 flex flex-1 flex-col p-6">
                <h3 className="mb-3 font-display text-xl font-medium text-ink">{b.name}</h3>
                <p className="mb-3 flex items-start gap-2 text-[0.9rem] text-slate">
                  <MapPinIcon size={16} className="mt-0.5 shrink-0 text-hope-accent" />
                  <span>
                    {b.address}, {b.area}
                  </span>
                </p>
                <p className="mb-4 flex items-center gap-2 text-[0.9rem] text-slate">
                  <PhoneIcon size={15} className="shrink-0 text-hope-accent" />
                  {s.phone_mobile || b.phone}
                </p>
                <p className="text-[0.85rem] text-slate leading-relaxed">{b.note}</p>
              </div>
            </div>
          ))}

          <div className="overflow-hidden rounded-3xl shadow-xl shadow-ink/10">
            <iframe
              title="Hope Dental Surgery — Chichiri Shopping Centre, Blantyre"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3836.9!2d35.0!3d-15.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQ2JzQ4LjAiSyAzNcKwMDAnMDAuMCJF!5e0!3m2!1sen!2smw!4v1"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* Hours + Form */}
      <section className="bg-gradient-to-b from-stone to-paper px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-hope-accent/10 text-hope-accent">
                <ClockIcon size={20} />
              </span>
              <h3 className="font-display text-lg font-medium text-ink">Opening Hours</h3>
            </div>
            <div className="flex flex-col gap-3">
              {hours.map((h) => (
                <div
                  key={h.day}
                  className={`flex justify-between rounded-xl px-4 py-3 text-[0.92rem] ${
                    h.highlight ? 'bg-stone/50' : ''
                  }`}
                >
                  <span className="text-slate">{h.day}</span>
                  <span className={`font-medium ${h.highlight ? 'text-ink' : 'text-slate/50'}`}>{h.time}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[0.78rem] text-slate">
              Opening hours are being confirmed directly with the clinic.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="mb-2 font-display text-xl font-medium text-ink">Send us a message</h3>
            <p className="mb-6 text-[0.9rem] text-slate">We&apos;ll get back to you as soon as possible.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    className="w-full rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email address"
                  className="w-full rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="How can we help you?"
                  className="w-full resize-none rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="inline-flex items-center justify-center gap-2 self-start rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition-colors hover:-translate-y-px hover:bg-hope-teal disabled:opacity-70"
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
