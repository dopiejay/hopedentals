import { HeartHandshakeIcon, SparklesIcon } from '../components/Icons';
import PageHero from '../components/PageHero';
const aboutImage = 'images/team.jpg';

const purpose = [
  { icon: HeartHandshakeIcon, title: 'Our Mission', desc: 'To bring skilled, affordable dental care within easy reach of our patients — combining experienced clinicians, modern equipment, and a warm, patient-first approach at our Chichiri clinic.', color: 'bg-hope-teal/10 text-hope-teal', image: 'images/mission.jpg' },
  { icon: SparklesIcon, title: 'Our Vision', desc: 'To be one of Blantyre\u2019s most trusted dental practices — recognised for quality, integrity, and lasting patient relationships built on every visit.', color: 'bg-hope-accent/10 text-hope-accent', image: 'images/vision.jpg' },
];

const team = [
  {
    name: 'Clinical Lead',
    role: 'Head of Department',
    desc: 'Experience in fixed orthodontics and prosthodontics, supporting the clinical team.',
    img: 'images/imagePlaceholder.jpg',
  },
  {
    name: 'Dentists',
    role: 'Clinical Care',
    desc: 'Qualified dentists (BDS/DDS) delivering general, orthodontic, and restorative treatment.',
    img: 'images/imagePlaceholder.jpg',
  },
  {
    name: 'Dental Therapists',
    role: 'Preventive Care',
    desc: 'Support routine and preventive dental care at the clinic.',
    img: 'images/imagePlaceholder.jpg',
  },
  {
    name: 'Patient Support',
    role: 'Front Desk',
    desc: 'Your first hello — appointments, reminders, payments, and answers to any question about your visit.',
    img: 'images/imagePlaceholder.jpg',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Our story" title="A legacy of caring for smiles." crumb="About Us" image="https://images.pexels.com/photos/3845729/pexels-photo-3845729.jpeg?auto=compress&cs=tinysrgb&w=800" />

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
            <div className="absolute inset-0 bg-gradient-to-tr from-hope-navy/20 to-transparent" />
          </div>
          <div>
            <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-teal uppercase">An established practice</p>
            <h2 className="mb-5 font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold">
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
      <section className="bg-hope-navy px-6 py-24 text-white">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-accent uppercase">Our mission &amp; vision</p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold text-white">What drives us, every single day</h2>
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {purpose.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
                <div className="relative flex flex-1 flex-col p-6">
                  <h3 className="mb-2 flex items-center gap-2.5 font-display text-[1.15rem] font-bold text-ink">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${p.color}`}>
                      <Icon size={18} />
                    </span>
                    {p.title}
                  </h3>
                  <p className="text-[0.92rem] text-slate leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="bg-white px-6 py-24">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p className="mb-3 text-[0.8rem] font-bold tracking-[0.14em] text-hope-teal uppercase">Meet the team</p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-semibold">The people behind your smile</h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
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
        <h3 className="font-display text-lg font-bold leading-snug text-white">{member.name}</h3>
        <p className="mt-0.5 text-[0.72rem] font-bold tracking-[0.12em] text-hope-accent uppercase">{member.role}</p>
      </div>
    </div>
  );
}
