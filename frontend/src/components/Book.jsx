import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Book() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');

    const form = e.target;
    const payload = {
      service_name: form.service.value,
      preferred_date: form.date.value,
      preferred_time: form.time.value,
      patient_name: form.name.value,
      patient_phone: form.phone.value,
    };

    try {
      const res = await fetch(`${API_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Could not send your request.');
      }

      setStatus('sent');
      form.reset();
      setTimeout(() => setStatus('idle'), 3500);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  return (
    <section id="book" className="bg-white px-6 py-24">
      <div className="mx-auto mb-14 max-w-xl text-center">
        <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-shalom-navy uppercase">Book a visit</p>
        <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-medium">Three steps to your appointment</h2>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto flex max-w-xl flex-col gap-6 rounded-3xl border border-stone bg-paper p-9">
        <div>
          <span className="mb-1.5 block text-[0.72rem] font-extrabold tracking-[0.1em] text-shalom-gold uppercase">Step 1</span>
          <label htmlFor="service" className="mb-2.5 block font-bold">
            Choose a service
          </label>
          <select id="service" name="service" required defaultValue="" className="w-full rounded-[10px] border-[1.5px] border-stone bg-white px-3.5 py-3.5 focus:border-shalom-gold focus:outline-none">
            <option value="" disabled>
              Select a service
            </option>
            <option>General Check-up &amp; Cleaning</option>
            <option>Teeth Whitening</option>
            <option>Braces &amp; Orthodontics</option>
            <option>Crowns &amp; Bridges</option>
            <option>Root Canal Treatment</option>
            <option>Not sure — advise me</option>
          </select>
        </div>

        <div>
          <span className="mb-1.5 block text-[0.72rem] font-extrabold tracking-[0.1em] text-shalom-gold uppercase">Step 2</span>
          <label htmlFor="date" className="mb-2.5 block font-bold">
            Preferred date &amp; time
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input id="date" name="date" type="date" required className="w-full rounded-[10px] border-[1.5px] border-stone bg-white px-3.5 py-3.5 focus:border-shalom-gold focus:outline-none" />
            <select id="time" name="time" required defaultValue="" className="w-full rounded-[10px] border-[1.5px] border-stone bg-white px-3.5 py-3.5 focus:border-shalom-gold focus:outline-none">
              <option value="" disabled>
                Time
              </option>
              <option>Morning (9am–12pm)</option>
              <option>Afternoon (12pm–4pm)</option>
            </select>
          </div>
        </div>

        <div>
          <span className="mb-1.5 block text-[0.72rem] font-extrabold tracking-[0.1em] text-shalom-gold uppercase">Step 3</span>
          <label htmlFor="name" className="mb-2.5 block font-bold">
            Your details
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input id="name" name="name" type="text" placeholder="Full name" required className="w-full rounded-[10px] border-[1.5px] border-stone bg-white px-3.5 py-3.5 focus:border-shalom-gold focus:outline-none" />
            <input id="phone" name="phone" type="tel" placeholder="Phone number" required className="w-full rounded-[10px] border-[1.5px] border-stone bg-white px-3.5 py-3.5 focus:border-shalom-gold focus:outline-none" />
          </div>
        </div>

        <button
          type="submit"
          disabled={status === 'sending' || status === 'sent'}
          className="w-full rounded-full bg-ink px-7.5 py-4 text-base font-bold text-white transition-all hover:-translate-y-px hover:bg-shalom-navy disabled:opacity-70"
        >
          {status === 'sending' && 'Sending...'}
          {status === 'sent' && 'Request Sent — We\u2019ll Confirm Shortly'}
          {(status === 'idle' || status === 'error') && 'Confirm Appointment Request'}
        </button>

        {status === 'error' && (
          <p className="text-center text-[0.85rem] font-semibold text-red-600">{error}</p>
        )}
        <p className="text-center text-[0.78rem] text-slate">
          We'll follow up by phone or WhatsApp to confirm your slot.
        </p>
      </form>
    </section>
  );
}
