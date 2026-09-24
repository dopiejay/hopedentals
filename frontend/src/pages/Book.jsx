import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, ClockIcon, UserIcon, MessageCircleIcon, CheckCircleIcon, ArrowRightIcon, ArrowLeftIcon, PhoneIcon } from '../components/Icons';
import PageHero from '../components/PageHero';
import useServices from '../hooks/useServices';
import useSettings from '../hooks/useSettings';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const fallbackServices = [
  'General Consultation',
  'Dental Examination & Cleaning',
  'Tooth Fillings / Repair',
  'Tooth Extraction',
  'Tooth Replacement (Crowns, Bridges, Dentures)',
  'Orthodontics / Braces',
  'Root Canal Treatment',
  "Children's Dentistry",
  'Emergency Dental Care',
  'Dental X-rays / Imaging',
  'Not sure — advise me',
];

const timeSlots = [
  'Morning (09:00 – 10:00)',
  'Morning (10:00 – 11:00)',
  'Morning (11:00 – 12:00)',
  'Afternoon (13:00 – 14:00)',
  'Afternoon (14:00 – 15:00)',
  'Afternoon (15:00 – 16:00)',
];

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ service: '', date: '', time: '', name: '', phone: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const { services, loading } = useServices();
  const s = useSettings();
  const serviceNames = loading && services.length === 0 ? fallbackServices : services.map((svc) => svc.title);
  const wa = `https://wa.me/${s.whatsapp}`;

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }
  function canNext() {
    if (step === 1) return form.service !== '';
    if (step === 2) return form.date !== '' && form.time !== '';
    if (step === 3) return form.name.trim() !== '' && form.phone.trim() !== '';
    return true;
  }

  async function handleSubmit() {
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ branch: 'Chichiri Shopping Centre', service_name: form.service, preferred_date: form.date, preferred_time: form.time, patient_name: form.name, patient_phone: form.phone }),
      });
      if (!res.ok) { const body = await res.json().catch(() => ({})); throw new Error(body.error || 'Could not submit your request.'); }
      setStatus('sent');
    } catch (err) { setStatus('error'); setError(err.message); }
  }

  if (status === 'sent') {
    return (
      <>
        <PageHero eyebrow="Book Appointment" title="Let's schedule your visit." crumb="Book" image="https://images.pexels.com/photos/6627353/pexels-photo-6627353.jpeg?auto=compress&cs=tinysrgb&w=800" />
        <section className="bg-paper px-6 py-24">
          <div className="mx-auto max-w-lg text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-hope-teal/15 shadow-lg shadow-hope-teal/20">
                <CheckCircleIcon size={36} className="text-hope-teal" />
              </div>
            </div>
            <h2 className="mb-3 font-display text-2xl font-semibold">Appointment Request Received</h2>
            <p className="mb-3 text-slate">Thank you, {form.name}! We've received your request for <strong>{form.service}</strong> at <strong>Hope Dental Surgery</strong> on <strong>{form.date}</strong>.</p>
            <p className="mb-8 text-slate">We'll contact you shortly to confirm your appointment.</p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link to="/" className="rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-hope-navy">Back to Home</Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border-[1.5px] border-ink px-7 py-3.5 text-sm font-bold text-ink transition-colors hover:bg-ink hover:text-white">
                <MessageCircleIcon size={16} /> Prefer WhatsApp? Chat with us
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
        <PageHero eyebrow="Book Appointment" title="Let's schedule your visit." crumb="Book" image="https://images.pexels.com/photos/6627353/pexels-photo-6627353.jpeg?auto=compress&cs=tinysrgb&w=800" />
      <section className="bg-paper px-6 py-20">
        <div className="mx-auto max-w-2xl">
          {/* Progress bar */}
          <div className="mb-10 flex items-center justify-center gap-2.5">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2.5">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border-[2px] text-sm font-bold transition-all duration-300 ${
                  step >= s
                    ? 'border-hope-accent bg-hope-accent text-white'
                    : 'border-stone bg-white text-slate'
                }`}>
                  {step > s ? <CheckCircleIcon size={18} /> : s}
                </div>
                {s < 3 && <div className={`h-[2px] w-10 transition-colors duration-300 ${step > s ? 'bg-hope-accent' : 'bg-stone'}`} />}
              </div>
            ))}
          </div>

          <div className="mb-8 text-center">
            <p className="text-[0.78rem] font-bold tracking-wider text-hope-accent uppercase">Step {step} of 3</p>
            <h2 className="mt-1 font-display text-xl font-semibold text-ink">
              {step === 1 && 'What do you need help with?'}
              {step === 2 && 'When would you like to visit?'}
              {step === 3 && 'Your details'}
            </h2>
          </div>

          {step === 1 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {serviceNames.map((sName) => (
                <button
                  key={sName}
                  onClick={() => update('service', sName)}
                  className={`rounded-2xl border-[1.5px] p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                    form.service === sName
                      ? 'border-hope-accent bg-hope-accent/5 shadow-lg shadow-hope-accent/10'
                      : 'border-stone bg-white hover:border-hope-accent/50 hover:shadow-md'
                  }`}
                >
                  <span className="block font-bold text-ink">{sName}</span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="book-date" className="mb-2 flex items-center gap-2 text-[0.85rem] font-bold text-ink">
                  <CalendarIcon size={16} className="text-hope-accent" /> Preferred Date
                </label>
                <input id="book-date" type="date" value={form.date} onChange={(e) => update('date', e.target.value)} min={new Date().toISOString().split('T')[0]} required className="w-full rounded-xl border-[1.5px] border-stone bg-white px-4 py-3.5 text-[0.92rem] transition-colors focus:border-hope-accent focus:outline-none" />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-[0.85rem] font-bold text-ink">
                  <ClockIcon size={16} className="text-hope-accent" /> Preferred Time
                </label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {timeSlots.map((t) => (
                    <button
                      key={t}
                      onClick={() => update('time', t)}
                      className={`rounded-xl border-[1.5px] px-4 py-3 text-left text-[0.88rem] font-medium transition-all duration-200 ${
                        form.time === t
                          ? 'border-hope-accent bg-hope-accent/5 text-hope-navy shadow-md shadow-hope-accent/10'
                          : 'border-stone bg-white text-ink hover:border-hope-accent/50 hover:shadow-sm'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="book-name" className="mb-1.5 flex items-center gap-2 text-[0.85rem] font-bold text-ink">
                    <UserIcon size={16} className="text-hope-accent" /> Full Name
                  </label>
                  <input id="book-name" type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required placeholder="Your full name" className="w-full rounded-xl border-[1.5px] border-stone bg-white px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:outline-none" />
                </div>
                <div>
                  <label htmlFor="book-phone" className="mb-1.5 flex items-center gap-2 text-[0.85rem] font-bold text-ink">
                    <PhoneIcon size={16} className="text-hope-accent" /> Phone Number
                  </label>
                  <input id="book-phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} required placeholder="Your phone number" className="w-full rounded-xl border-[1.5px] border-stone bg-white px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:outline-none" />
                </div>
              </div>
              <div>
                <label htmlFor="book-email" className="mb-1.5 block text-[0.85rem] font-bold text-ink">Email (optional)</label>
                <input id="book-email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="Your email address" className="w-full rounded-xl border-[1.5px] border-stone bg-white px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:outline-none" />
              </div>
              <div>
                <label htmlFor="book-message" className="mb-1.5 flex items-center gap-2 text-[0.85rem] font-bold text-ink">
                  <MessageCircleIcon size={16} className="text-hope-accent" /> Message (optional)
                </label>
                <textarea id="book-message" rows={3} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Any specific concerns or notes?" className="w-full resize-none rounded-xl border-[1.5px] border-stone bg-white px-4 py-3 text-[0.92rem] transition-colors focus:border-hope-accent focus:outline-none" />
              </div>
              <div className="rounded-2xl border border-stone bg-gradient-to-br from-stone/50 to-white p-5">
                <p className="mb-3 text-[0.78rem] font-bold tracking-wider text-hope-accent uppercase">Booking Summary</p>
                <div className="flex flex-col gap-2 text-[0.9rem]">
                  <span className="flex justify-between"><strong className="text-slate">Location:</strong> <span className="text-ink">Chichiri Shopping Centre, Blantyre</span></span>
                  <span className="flex justify-between"><strong className="text-slate">Service:</strong> <span className="text-ink">{form.service}</span></span>
                  <span className="flex justify-between"><strong className="text-slate">Date:</strong> <span className="text-ink">{form.date}</span></span>
                  <span className="flex justify-between"><strong className="text-slate">Time:</strong> <span className="text-ink">{form.time}</span></span>
                  <span className="flex justify-between"><strong className="text-slate">Name:</strong> <span className="text-ink">{form.name}</span></span>
                  <span className="flex justify-between"><strong className="text-slate">Phone:</strong> <span className="text-ink">{form.phone}</span></span>
                </div>
              </div>
            </div>
          )}

          {error && <p className="mt-4 text-center text-[0.85rem] font-semibold text-red-600">{error}</p>}

          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-stone px-6 py-3 text-sm font-bold text-ink transition-colors hover:border-ink hover:bg-white">
                <ArrowLeftIcon size={16} /> Back
              </button>
            ) : <div />}
            {step < 3 ? (
              <button onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-hope-navy disabled:opacity-50">
                Next <ArrowRightIcon size={16} />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={!canNext() || status === 'sending'} className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-hope-navy disabled:opacity-50">
                {status === 'sending' ? 'Submitting...' : 'Confirm Booking'} <CheckCircleIcon size={16} />
              </button>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-[0.82rem] text-slate">Prefer WhatsApp?</p>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-hope-navy hover:text-hope-accent hover:underline">
              <MessageCircleIcon size={15} /> Chat with us directly
            </a>
          </div>
        </div>
      </section>
    </>
  );
}