import { useEffect, useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  fetchSettings,
  saveSettings,
  fetchAdminServices,
  createService,
  updateService,
  deleteService,
  fetchAdminTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  fetchAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../api';

const tabs = [
  { key: 'general', label: 'General' },
  { key: 'services', label: 'Services' },
  { key: 'team', label: 'Team' },
  { key: 'testimonials', label: 'Testimonials' },
];

const generalFields = [
  { key: 'phone_landline', label: 'Landline', type: 'text' },
  { key: 'phone_mobile', label: 'Mobile', type: 'text' },
  { key: 'whatsapp', label: 'WhatsApp number', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'address', label: 'Address', type: 'text' },
  { key: 'area', label: 'Area / City', type: 'text' },
  { key: 'hours_weekdays', label: 'Hours — Weekdays', type: 'text' },
  { key: 'hours_friday', label: 'Hours — Friday', type: 'text' },
  { key: 'hours_weekend', label: 'Hours — Weekend', type: 'text' },
];

function Field({ label, type = 'text', value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-[1.5px] border-stone px-3.5 py-2.5 text-sm focus:border-hope-accent focus:outline-none"
      />
    </label>
  );
}

function IconField({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-[1.5px] border-stone px-3.5 py-2.5 text-sm focus:border-hope-accent focus:outline-none"
      />
    </label>
  );
}

function Alarm({ text }) {
  if (!text) return null;
  return <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{text}</p>;
}

function Note({ text }) {
  if (!text) return null;
  return <p className="mb-4 rounded-xl bg-hope-teal/5 px-4 py-3 text-sm font-semibold text-hope-navy">{text}</p>;
}

export default function Settings() {
  const { auth } = useAdminAuth();
  const [tab, setTab] = useState('general');

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold">Site Settings</h1>
        <p className="text-slate">Manage contact details, services, team members, and testimonials.</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              tab === t.key ? 'bg-hope-navy text-white' : 'bg-white text-ink hover:bg-stone'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'general' && <GeneralTab token={auth.token} />}
      {tab === 'services' && <ServicesTab token={auth.token} />}
      {tab === 'team' && <TeamTab token={auth.token} />}
      {tab === 'testimonials' && <TestimonialsTab token={auth.token} />}
    </div>
  );
}

function GeneralTab({ token }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    fetchSettings(token)
      .then(setSettings)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, [token]);

  if (loading) return <Card><p className="p-6 text-sm text-slate">Loading…</p></Card>;

  if (error && !settings) return <Card><Alarm text={error} /></Card>;

  function setField(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    setNote('');
    try {
      await saveSettings(token, settings);
      setNote('Settings saved. The public site picks them up automatically.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <Alarm text={error} />
      <Note text={note} />
      <div className="grid gap-5 sm:grid-cols-2">
        {generalFields.map((f) => (
          <Field
            key={f.key}
            label={f.label}
            type={f.type}
            value={settings[f.key] ?? ''}
            onChange={(v) => setField(f.key, v)}
          />
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-hope-navy px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-hope-teal disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
      </div>
    </Card>
  );
}

function ServicesTab({ token }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [editing, setEditing] = useState(null);

  function load() {
    setLoading(true);
    fetchAdminServices(token)
      .then(setServices)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, [token]);

  const formFor = (s) => ({
    name: s.name,
    description: s.description || '',
    long_description: s.long_description || '',
    sort_order: s.sort_order || 0,
  });

  function beginCreate() {
    setError('');
    setEditing({ id: null, ...formFor({ name: '', description: '', long_description: '', sort_order: services.length + 1 }) });
  }

  function beginEdit(s) {
    setError('');
    setEditing({ id: s.id, ...formFor(s) });
  }

  async function submit() {
    if (!editing.name.trim()) {
      setError('Service name is required.');
      return;
    }
    setError('');
    try {
      if (editing.id == null) {
        await createService(token, editing);
      } else {
        await updateService(token, editing.id, editing);
      }
      setNote(editing.id == null ? 'Service added — it now appears on the public site.' : 'Service updated.');
      setEditing(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(s) {
    if (!window.confirm(`Hide service "${s.name}" from the public site?`)) return;
    setError('');
    try {
      await deleteService(token, s.id);
      setNote('Service hidden from the public site.');
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Card>
      <Alarm text={error} />
      <Note text={note} />
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate">These appear on the home page, Services page, and booking form.</p>
        <button
          onClick={beginCreate}
          className="rounded-full bg-hope-navy px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-hope-teal"
        >
          Add Service
        </button>
      </div>

      {loading ? (
        <p className="py-4 text-sm text-slate">Loading…</p>
      ) : (
        <div className="divide-y divide-stone/60">
          {services.map((s) => (
            <div key={s.id} className="flex items-center justify-between gap-4 py-3.5">
              <div className="min-w-0">
                <p className="font-semibold text-ink">
                  {s.name}
                  {!s.is_active && <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-[0.7rem] font-bold text-yellow-800">hidden</span>}
                </p>
                <p className="truncate text-sm text-slate">{s.description || 'No short description.'}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => beginEdit(s)} className="rounded-lg border border-stone px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-stone">
                  Edit
                </button>
                {s.is_active && (
                  <button onClick={() => remove(s)} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50">
                    Hide
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="mt-6 rounded-2xl bg-stone/40 p-5">
          <h3 className="mb-4 font-display text-lg font-bold">{editing.id == null ? 'New Service' : 'Edit Service'}</h3>
          <div className="grid gap-4">
            <Field label="Name" value={editing.name} onChange={(v) => setEditing((e) => ({ ...e, name: v }))} />
            <Field label="Short description" value={editing.description} onChange={(v) => setEditing((e) => ({ ...e, description: v }))} />
            <Field label="Detailed description" value={editing.long_description} onChange={(v) => setEditing((e) => ({ ...e, long_description: v }))} />
            <Field label="Display order" type="number" value={editing.sort_order} onChange={(v) => setEditing((e) => ({ ...e, sort_order: Number(v) }))} />
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={submit} className="rounded-full bg-hope-navy px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-hope-teal">
              Save
            </button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-stone px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-stone">
              Cancel
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

function TeamTab({ token }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [editing, setEditing] = useState(null);

  function load() {
    setLoading(true);
    fetchAdminTeam(token)
      .then(setMembers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, [token]);

  const formFor = (m) => ({
    name: m.name || '',
    role: m.role || 'Dentist',
    bio: m.bio || '',
    photo_url: m.photo_url || '',
    sort_order: m.sort_order || 0,
  });

  function beginCreate() {
    setError('');
    setEditing({ id: null, ...formFor({ name: '', role: 'Dentist', bio: '', photo_url: '', sort_order: members.length + 1 }) });
  }

  function beginEdit(m) {
    setError('');
    setEditing({ id: m.id, ...formFor(m) });
  }

  async function submit() {
    if (!editing.name.trim()) {
      setError('Name is required.');
      return;
    }
    setError('');
    try {
      if (editing.id == null) {
        await createTeamMember(token, editing);
      } else {
        await updateTeamMember(token, editing.id, editing);
      }
      setNote(editing.id == null ? 'Team member added.' : 'Team member updated.');
      setEditing(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(m) {
    if (!window.confirm(`Remove team member "${m.name}" from the public site?`)) return;
    setError('');
    try {
      await deleteTeamMember(token, m.id);
      setNote('Team member removed.');
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Card>
      <Alarm text={error} />
      <Note text={note} />
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate">The clinical team shown on the About page.</p>
        <button onClick={beginCreate} className="rounded-full bg-hope-navy px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-hope-teal">
          Add Member
        </button>
      </div>

      {loading ? (
        <p className="py-4 text-sm text-slate">Loading…</p>
      ) : (
        <div className="divide-y divide-stone/60">
          {members.map((m) => (
            <div key={m.id} className="flex items-center justify-between gap-4 py-3.5">
              <div className="min-w-0">
                <p className="font-semibold text-ink">
                  {m.name}
                  {!m.is_active && <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-[0.7rem] font-bold text-yellow-800">hidden</span>}
                </p>
                <p className="truncate text-sm text-slate">{m.role}{m.bio ? ` — ${m.bio}` : ''}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => beginEdit(m)} className="rounded-lg border border-stone px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-stone">
                  Edit
                </button>
                {m.is_active && (
                  <button onClick={() => remove(m)} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50">
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="mt-6 rounded-2xl bg-stone/40 p-5">
          <h3 className="mb-4 font-display text-lg font-bold">{editing.id == null ? 'New Member' : 'Edit Member'}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" value={editing.name} onChange={(v) => setEditing((e) => ({ ...e, name: v }))} />
            <Field label="Role" value={editing.role} onChange={(v) => setEditing((e) => ({ ...e, role: v }))} />
            <IconField label="Photo URL" value={editing.photo_url} onChange={(v) => setEditing((e) => ({ ...e, photo_url: v }))} />
            <Field label="Display order" type="number" value={editing.sort_order} onChange={(v) => setEditing((e) => ({ ...e, sort_order: Number(v) }))} />
            <div className="sm:col-span-2">
              <Field label="Bio" value={editing.bio} onChange={(v) => setEditing((e) => ({ ...e, bio: v }))} />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={submit} className="rounded-full bg-hope-navy px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-hope-teal">
              Save
            </button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-stone px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-stone">
              Cancel
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

function TestimonialsTab({ token }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [editing, setEditing] = useState(null);

  function load() {
    setLoading(true);
    fetchAdminTestimonials(token)
      .then(setItems)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, [token]);

  const formFor = (t) => ({
    patient_name: t.patient_name || '',
    quote: t.quote || '',
    rating: t.rating || 5,
    is_featured: Boolean(t.is_featured),
  });

  function beginCreate() {
    setError('');
    setEditing({ id: null, ...formFor({ patient_name: '', quote: '', rating: 5, is_featured: false }) });
  }

  function beginEdit(t) {
    setError('');
    setEditing({ id: t.id, ...formFor(t) });
  }

  async function submit() {
    if (!editing.patient_name.trim() || !editing.quote.trim()) {
      setError('Patient name and quote are required.');
      return;
    }
    setError('');
    try {
      if (editing.id == null) {
        await createTestimonial(token, editing);
      } else {
        await updateTestimonial(token, editing.id, editing);
      }
      setNote(editing.id == null ? 'Testimonial added.' : 'Testimonial updated.');
      setEditing(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(t) {
    if (!window.confirm(`Delete this testimonial?`)) return;
    setError('');
    try {
      await deleteTestimonial(token, t.id);
      setNote('Testimonial deleted.');
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Card>
      <Alarm text={error} />
      <Note text={note} />
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm text-slate">Patient reviews shown on the home page.</p>
        <button onClick={beginCreate} className="rounded-full bg-hope-navy px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-hope-teal">
          Add Testimonial
        </button>
      </div>

      {loading ? (
        <p className="py-4 text-sm text-slate">Loading…</p>
      ) : (
        <div className="divide-y divide-stone/60">
          {items.map((t) => (
            <div key={t.id} className="flex items-start justify-between gap-4 py-3.5">
              <div className="min-w-0">
                <p className="font-semibold text-ink">
                  {t.patient_name}
                  <span className="ml-2 text-sm text-hope-sun">{'★'.repeat(t.rating)}</span>
                  {t.is_featured && <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[0.7rem] font-bold text-blue-700">featured</span>}
                </p>
                <p className="text-sm text-slate italic">“{t.quote}”</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => beginEdit(t)} className="rounded-lg border border-stone px-3 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-stone">
                  Edit
                </button>
                <button onClick={() => remove(t)} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="mt-6 rounded-2xl bg-stone/40 p-5">
          <h3 className="mb-4 font-display text-lg font-bold">{editing.id == null ? 'New Testimonial' : 'Edit Testimonial'}</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Patient name" value={editing.patient_name} onChange={(v) => setEditing((e) => ({ ...e, patient_name: v }))} />
            <Field label="Rating" type="number" value={editing.rating} onChange={(v) => setEditing((e) => ({ ...e, rating: Number(v) }))} />
            <div className="sm:col-span-2">
              <Field label="Quote" value={editing.quote} onChange={(v) => setEditing((e) => ({ ...e, quote: v }))} />
            </div>
            <label className="flex items-center gap-2 text-sm font-semibold text-ink sm:col-span-2">
              <input
                type="checkbox"
                checked={editing.is_featured}
                onChange={(e) => setEditing((prev) => ({ ...prev, is_featured: e.target.checked }))}
                className="h-4 w-4 rounded border-stone text-hope-accent focus:ring-hope-accent"
              />
              Show as a featured review
            </label>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={submit} className="rounded-full bg-hope-navy px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-hope-teal">
              Save
            </button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-stone px-5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-stone">
              Cancel
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

function Card({ children }) {
  return <div className="overflow-hidden rounded-2xl border border-stone bg-white p-6 shadow-sm">{children}</div>;
}