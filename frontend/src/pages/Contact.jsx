import { useState } from 'react';
import { MapPinIcon, PhoneIcon, MailIcon, ClockIcon, MessageCircleIcon, SendIcon } from '../components/Icons';
import PageHero from '../components/PageHero';
import { branches } from '../data/branches';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const contactCards = [
  { icon: MapPinIcon, title: 'Visit Us', value: 'Blantyre · Ginnery Corner · Limbe', action: null, color: 'bg-shalom-navy/10 text-shalom-navy' },
  { icon: PhoneIcon, title: 'Call Us', value: '+265 998 95 18 80', action: 'tel:+265998951880', color: 'bg-teal-100/60 text-teal-700' },
  { icon: MessageCircleIcon, title: 'WhatsApp', value: 'Chat with us anytime', action: 'https://wa.me/265998951880', color: 'bg-green-100/60 text-green-600' },
  { icon: MailIcon, title: 'Email Us', value: 'shalomdentalservices@yahoo.com', action: 'mailto:shalomdentalservices@yahoo.com', color: 'bg-blue-100/60 text-blue-600' },
];

const hours = [
  { day: 'Monday – Friday', time: '9:00 – 16:00', highlight: true },
  { day: 'Saturday', time: '9:00 – 12:00', highlight: true },
  { day: 'Sunday', time: 'Closed', highlight: false },
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
      <PageHero eyebrow="Find a branch" title="Choose your nearest Shalom clinic." crumb="Branches" image="https://images.pexels.com/photos/4269946/pexels-photo-4269946.jpeg?auto=compress&cs=tinysrgb&w=800" />

      {/* Branch cards */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-shalom-navy uppercase">Our branches</p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-medium">Find a branch near you</h2>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {branches.map((b) => (
            <div key={b.slug} className="group flex flex-col rounded-3xl border border-stone bg-gradient-to-b from-white to-stone/30 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-shalom-gold/5">
              <span className="mb-3 inline-block w-fit rounded-full bg-shalom-navy px-3 py-1 text-[0.72rem] font-bold tracking-[0.1em] text-white uppercase">
                {b.city}
              </span>
              <h3 className="mb-1.5 font-display text-xl font-medium text-ink">{b.name}</h3>
              <p className="mb-3 flex items-start gap-2 text-[0.9rem] text-slate">
                <MapPinIcon size={16} className="mt-0.5 shrink-0 text-shalom-navy" />
                <span>{b.address}, {b.area}</span>
              </p>
              <p className="mb-4 flex items-center gap-2 text-[0.9rem] text-slate">
                <PhoneIcon size={15} className="shrink-0 text-shalom-navy" />
                {b.phone}
              </p>
              <p className="text-[0.85rem] text-slate leading-relaxed">{b.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Cards */}
      <section className="bg-paper px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                className="group flex flex-col items-center rounded-2xl border border-stone bg-gradient-to-b from-white to-stone/30 p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-shalom-gold hover:shadow-lg hover:shadow-shalom-gold/5"
              >
                <div className={`mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${c.color} transition-transform group-hover:scale-110`}>
                  <Icon size={24} />
                </div>
                <h3 className="mb-1 font-display text-lg font-medium text-ink">{c.title}</h3>
                <p className="text-[0.88rem] text-slate">{c.value}</p>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* Map + Form + Hours */}
      <section className="bg-gradient-to-b from-stone to-paper px-6 py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="relative overflow-hidden rounded-3xl shadow-xl shadow-ink/10">
              <iframe
                title="Shalom Dental Services Ltd Branches"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3836.9!2d35.0!3d-15.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDQ2JzQ4LjAiSyAzNcKwMDAnMDAuMCJF!5e0!3m2!1sen!2smw!4v1"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-shalom-navy/10 text-shalom-navy">
                  <ClockIcon size={18} />
                </div>
                <h3 className="font-display text-lg font-medium">Opening Hours</h3>
              </div>
              <div className="flex flex-col gap-3">
                {hours.map((h) => (
                  <div key={h.day} className={`flex justify-between rounded-xl px-4 py-3 text-[0.92rem] ${h.highlight ? 'bg-stone/50' : ''}`}>
                    <span className="text-slate">{h.day}</span>
                    <span className={`font-medium ${h.highlight ? 'text-ink' : 'text-slate/50'}`}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="mb-2 font-display text-xl font-medium">Send us a message</h3>
            <p className="mb-6 text-[0.9rem] text-slate">We'll get back to you as soon as possible.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Full Name</label>
                  <input id="name" name="name" type="text" required placeholder="Your name" className="w-full rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-shalom-gold focus:bg-white focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="Your phone number" className="w-full rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-shalom-gold focus:bg-white focus:outline-none" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Email</label>
                <input id="email" name="email" type="email" required placeholder="Your email address" className="w-full rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-shalom-gold focus:bg-white focus:outline-none" />
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-[0.82rem] font-bold text-ink">Message</label>
                <textarea id="message" name="message" rows={4} required placeholder="How can we help you?" className="w-full resize-none rounded-xl border-[1.5px] border-stone bg-stone/30 px-4 py-3 text-[0.92rem] transition-colors focus:border-shalom-gold focus:bg-white focus:outline-none" />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-shalom-navy disabled:opacity-70"
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
