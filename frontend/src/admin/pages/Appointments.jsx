import { useEffect, useMemo, useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { fetchAppointments, updateAppointmentStatus } from '../api';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
};

const filters = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

export default function Appointments() {
  const { auth } = useAdminAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);

  function load() {
    setLoading(true);
    fetchAppointments(auth.token)
      .then(setAppointments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, [auth.token]);

  const visible = useMemo(() => {
    const list = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);
    return [...list].sort((a, b) => new Date(a.preferred_date) - new Date(b.preferred_date));
  }, [appointments, filter]);

  async function handleStatusChange(id, status) {
    setUpdatingId(id);
    setError('');
    try {
      await updateAppointmentStatus(auth.token, id, status);
      setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium">Appointments</h1>
          <p className="text-slate">Requests submitted through the public site, plus manual bookings.</p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === f.key ? 'bg-shalom-navy text-white' : 'bg-white text-ink hover:bg-stone'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && (
        <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}

      <div className="overflow-hidden rounded-2xl border border-stone bg-white shadow-sm">
        {loading ? (
          <p className="p-6 text-sm text-slate">Loading…</p>
        ) : visible.length === 0 ? (
          <p className="p-6 text-sm text-slate">No appointments match this filter.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-shalom-teal/5">
                <tr className="text-[0.72rem] text-slate uppercase">
                  <th className="px-5 py-3 font-semibold">Patient</th>
                  <th className="px-5 py-3 font-semibold">Service</th>
                  <th className="px-5 py-3 font-semibold">Branch</th>
                  <th className="px-5 py-3 font-semibold">Date &amp; Time</th>
                  <th className="px-5 py-3 font-semibold">Phone</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((a) => (
                  <tr key={a.id} className="border-t border-stone/60">
                    <td className="px-5 py-3.5 font-semibold">{a.patient_name}</td>
                    <td className="px-5 py-3.5 text-slate">{a.service_name}</td>
                    <td className="px-5 py-3.5 text-slate">{a.branch || '—'}</td>
                    <td className="px-5 py-3.5 text-slate">
                      {a.preferred_date}
                      <br />
                      <span className="text-[0.8rem]">{a.preferred_time}</span>
                    </td>
                    <td className="px-5 py-3.5 text-slate">{a.patient_phone}</td>
                    <td className="px-5 py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-[0.7rem] font-bold capitalize ${statusStyles[a.status] || ''}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <select
                        disabled={updatingId === a.id}
                        value={a.status}
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                        className="rounded-lg border-[1.5px] border-stone px-2.5 py-1.5 text-sm focus:border-shalom-gold focus:outline-none disabled:opacity-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="completed">Complete</option>
                        <option value="cancelled">Cancel</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
