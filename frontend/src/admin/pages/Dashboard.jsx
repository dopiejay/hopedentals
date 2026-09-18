import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import { fetchAppointments } from '../api';
import { SmileIcon, CalendarIcon, ClockIcon, LayersIcon, PlanIcon } from '../../components/Icons';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
};

function isToday(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

function isThisWeek(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const start = new Date(now);
  start.setDate(now.getDate() - now.getDay());
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return d >= start && d < end;
}

export default function Dashboard() {
  const { auth } = useAdminAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments(auth.token)
      .then(setAppointments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [auth.token]);

  const stats = useMemo(() => {
    const today = appointments.filter((a) => isToday(a.preferred_date));
    const pending = appointments.filter((a) => a.status === 'pending');
    const week = appointments.filter((a) => isThisWeek(a.preferred_date));
    return {
      today: today.length,
      pending: pending.length,
      week: week.length,
      total: appointments.length,
    };
  }, [appointments]);

  const todaysSchedule = useMemo(
    () =>
      appointments
        .filter((a) => isToday(a.preferred_date))
        .sort((a, b) => a.preferred_time.localeCompare(b.preferred_time)),
    [appointments]
  );

  const recent = useMemo(
    () => [...appointments].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6),
    [appointments]
  );

  return (
    <div>
      <p className="mb-1 font-display text-2xl font-bold">Good day <SmileIcon size={22} className="inline-block align-[-0.15em]" /></p>
      <p className="mb-8 text-slate">Here&apos;s what&apos;s happening at Shalom Dental today.</p>

      {error && (
        <p className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>
      )}

      {/* Stats */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's Appointments" value={loading ? '—' : stats.today} icon={<CalendarIcon size={22} className="text-shalom-gold" />} accent="bg-shalom-gold/10" />
        <StatCard label="Pending Requests" value={loading ? '—' : stats.pending} icon={<ClockIcon size={22} className="text-amber-500" />} accent="bg-amber-50" />
        <StatCard label="This Week" value={loading ? '—' : stats.week} icon={<LayersIcon size={22} className="text-blue-500" />} accent="bg-blue-50" />
        <StatCard label="Total Bookings" value={loading ? '—' : stats.total} icon={<PlanIcon size={22} className="text-shalom-navy" />} accent="bg-shalom-teal/10" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Today's schedule */}
        <div className="rounded-2xl border border-stone bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">Today&apos;s Schedule</h2>
            <Link to="/admin/appointments" className="text-sm font-bold text-shalom-navy hover:underline">
              View All →
            </Link>
          </div>

          {loading ? (
            <p className="text-sm text-slate">Loading…</p>
          ) : todaysSchedule.length === 0 ? (
            <p className="text-sm text-slate">No appointments scheduled for today.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {todaysSchedule.map((a) => (
                <li key={a.id} className="flex items-center justify-between rounded-xl bg-shalom-teal/5 px-4 py-3">
                  <div>
                    <p className="text-[0.8rem] font-bold text-shalom-gold">{a.preferred_time}</p>
                    <p className="font-semibold">{a.patient_name}</p>
                    <p className="text-[0.85rem] text-slate">{a.service_name}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[0.72rem] font-bold capitalize ${statusStyles[a.status] || ''}`}>
                    {a.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent bookings */}
        <div className="rounded-2xl border border-stone bg-white p-6 shadow-sm">
          <h2 className="mb-5 font-display text-lg font-bold">Recent Bookings</h2>
          {loading ? (
            <p className="text-sm text-slate">Loading…</p>
          ) : recent.length === 0 ? (
            <p className="text-sm text-slate">No bookings yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone text-[0.72rem] text-slate uppercase">
                    <th className="pb-2 font-semibold">Patient</th>
                    <th className="pb-2 font-semibold">Service</th>
                    <th className="pb-2 font-semibold">Date</th>
                    <th className="pb-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((a) => (
                    <tr key={a.id} className="border-b border-stone/60 last:border-0">
                      <td className="py-2.5 font-semibold">{a.patient_name}</td>
                      <td className="py-2.5 text-slate">{a.service_name}</td>
                      <td className="py-2.5 text-slate">{a.preferred_date}</td>
                      <td className="py-2.5">
                        <span className={`rounded-full px-2.5 py-1 text-[0.7rem] font-bold capitalize ${statusStyles[a.status] || ''}`}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, accent = 'bg-stone/50' }) {
  return (
    <div className={`rounded-2xl border border-stone ${accent} p-5`}>
      <div className="mb-3">{icon}</div>
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="text-[0.8rem] text-slate">{label}</p>
    </div>
  );
}
