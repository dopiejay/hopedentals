import { useEffect, useState } from 'react';
import { HeartHandshakeIcon, SparklesIcon } from '../components/Icons';
import PageHero from '../components/PageHero';

const aboutImage = '/images/team.jpg';
const placeholderImage = '/images/imagePlaceholder.jpg';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const purpose = [
  {
    icon: HeartHandshakeIcon,
    title: 'Our Mission',
    desc: 'To bring skilled, affordable dental care within easy reach of our patients — combining experienced clinicians, modern equipment, and a warm, patient-first approach at our Chichiri clinic.',
    color: 'bg-hope-accent/10 text-hope-accent',
    image: '/images/mission.jpg',
  },
  {
    icon: SparklesIcon,
    title: 'Our Vision',
    desc: "To be one of Blantyre's most trusted dental practices — recognised for quality, integrity, and lasting patient relationships built on every visit.",
    color: 'bg-emerald-100/60 text-emerald-600',
    image: '/images/vision.jpg',
  },
];

const approach = ['Listen', 'Diagnose', 'Treat', 'Follow Up'];

const fallbackTeam = [
  {
    name: 'Clinical Lead',
    role: 'Head of Department',
    desc: 'Experience in fixed orthodontics and prosthodontics, supporting the clinical team.',
    img: placeholderImage,
  },
  {
    name: 'Dentists',
    role: 'Clinical Care',
    desc: 'Qualified dentists (BDS/DDS) delivering general, orthodontic, and restorative treatment.',
    img: placeholderImage,
  },
  {
    name: 'Dental Therapists',
    role: 'Preventive Care',
    desc: 'Support routine and preventive dental care at the clinic.',
    img: placeholderImage,
  },
  {
    name: 'Patient Support',
    role: 'Front Desk',
    desc: 'Your first hello — appointments, reminders, payments, and answers to any question about your visit.',
    img: placeholderImage,
  },
];

export default function AboutPage() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    let stale = false;

    fetch(`${API_URL}/api/team`)
      .then((res) => (res.ok ? res.json() : null))
      .then((rows) => {
        if (stale || !rows || rows.length === 0) return;
        setTeam(
          rows.map((m) => ({
            name: m.name,
            role: m.role || 'Clinical Care',
            desc: m.bio || '',
            img: m.photo_url || placeholderImage,
          })),
        );
      })
      .catch(() => {});

    return () => {
      stale = true;
    };
  }, []);

  const teamMembers = team.length > 0 ? team : fallbackTeam;

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A legacy of caring for smiles."
        crumb="About Us"
        image="https://images.pexels.com/photos/3845729/pexels-photo-3845729.jpeg?auto=compress&cs=tinysrgb&w=800"
      />

      {/* Story Section */}
      <section className="bg-paper px-6 py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src={aboutImage}
              alt="Hope Dental Surgery clinic"
              className="aspect-[4/3] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-hope-teal/20 to-transparent" />
          </div>
          <div>
            <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sky uppercase">
              An established practice
            </p>
            <h2 className="mb-5 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-tight">
              A trusted name in Malawian dental care
            </h2>
            <p className="mb-4 text-slate leading-relaxed">
              Hope Dental Surgery is an established dental practice at Chichiri Shopping Centre
              in Blantyre, providing dental treatments, tooth replacement, and corrective
              orthodontic care in a convenient, accessible setting.
            </p>
            <p className="text-slate leading-relaxed">
              From routine check-ups and fillings to crowns, dentures, and braces, the practice
              combines experienced clinicians with a warm, patient-first approach — bringing
              comprehensive dentistry closer to the people it serves.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gradient-to-br from-stone to-white px-6 py-24">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sky uppercase">
            Our mission &amp; vision
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-tight text-ink">
            What drives us, every single day
          </h2>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {purpose.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-hope-accent/5"
              >
                <div className="relative mb-6 h-56 overflow-hidden rounded-2xl">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span
                    className={`absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110 ${p.color}`}
                  >
                    <Icon size={20} />
                  </span>
                </div>
                <h3 className="mb-2 font-display text-xl font-medium text-ink">{p.title}</h3>
                <p className="text-[0.92rem] text-slate leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-ink px-6 py-24 text-white">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sky uppercase">
            How we work
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-tight text-white">
            A four-step approach to <span className="italic text-hope-sky">every patient</span>
          </h2>
        </div>

        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
          {approach.map((step, i) => (
            <div key={step} className="flex items-center gap-6">
              <div className="flex flex-col items-center text-center">
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-hope-accent/20 font-display text-lg font-bold text-hope-sky">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-display text-lg font-medium text-white">{step}</p>
              </div>
              {i < approach.length - 1 && <span className="hidden text-2xl text-hope-accent/50 sm:inline">&rarr;</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="bg-paper px-6 py-24">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-sky uppercase">Meet the team</p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-medium leading-tight text-ink">
            The people behind your smile
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-4xl text-center text-[0.82rem] text-slate">
          Practitioner profiles to be confirmed directly with the clinic.
        </p>
      </section>
    </>
  );
}

function TeamCard({ member }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-stone bg-ink">
      <img
        src={member.img}
        alt={`${member.name} — ${member.role}`}
        className="aspect-[3/4] w-full object-cover"
        loading="lazy"
      />

      {/* Gradient for name legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />

      {/* Name + role */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-display text-lg font-medium leading-snug text-white">{member.name}</h3>
        <p className="mt-0.5 text-[0.72rem] font-bold tracking-[0.12em] text-hope-sky uppercase">
          {member.role}
        </p>
      </div>
    </div>
  );
}
