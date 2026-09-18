import { useEffect, useMemo, useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { fetchMessages, updateMessageReadStatus } from '../api';
import { MailIcon, PhoneIcon } from '../../components/Icons';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'read', label: 'Read' },
];

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export default function Messages() {
  const { auth } = useAdminAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState(null);

  function load() {
    setLoading(true);
    fetchMessages(auth.token)
      .then(setMessages)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, [auth.token]);

  const unreadCount = messages.filter((m) => !m.is_read).length;

  const visible = useMemo(() => {
    if (filter === 'unread') return messages.filter((m) => !m.is_read);
    if (filter === 'read') return messages.filter((m) => m.is_read);
    return messages;
  }, [messages, filter]);

  async function handleToggleRead(message) {
    setUpdatingId(message.id);
    setError('');
    try {
      await updateMessageReadStatus(auth.token, message.id, !message.is_read);
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, is_read: !m.is_read } : m))
      );
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
          <h1 className="font-display text-2xl font-bold">Messages</h1>
          <p className="text-slate">
            Inquiries submitted through the contact page.
            {!loading && unreadCount > 0 && (
              <span className="ml-2 font-bold text-shalom-gold">{unreadCount} unread</span>
            )}
          </p>
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
            {f.key === 'unread' && unreadCount > 0 && ` (${unreadCount})`}
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
          <p className="p-6 text-sm text-slate">No messages match this filter.</p>
        ) : (
          <ul className="divide-y divide-stone/60">
            {visible.map((m) => (
              <li key={m.id} className={`px-5 py-4 ${m.is_read ? '' : 'bg-shalom-gold/[0.04]'}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className={`font-semibold ${m.is_read ? '' : 'text-shalom-navy'}`}>
                        {!m.is_read && (
                          <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-shalom-gold align-middle" />
                        )}
                        {m.name}
                      </p>
                      <span className="text-[0.75rem] text-slate">{formatDate(m.created_at)}</span>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-[0.85rem] text-slate">
                      <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 hover:text-shalom-gold hover:underline">
                        <MailIcon size={14} />
                        {m.email}
                      </a>
                      {m.phone && (
                        <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 hover:text-shalom-gold hover:underline">
                          <PhoneIcon size={14} />
                          {m.phone}
                        </a>
                      )}
                    </div>

                    <p className="mt-2.5 whitespace-pre-wrap text-[0.9rem] leading-relaxed text-ink/90">
                      {m.message}
                    </p>
                  </div>

                  <button
                    onClick={() => handleToggleRead(m)}
                    disabled={updatingId === m.id}
                    className="shrink-0 rounded-lg border-[1.5px] border-stone px-3 py-1.5 text-xs font-bold text-slate transition-colors hover:border-shalom-gold hover:text-shalom-gold disabled:opacity-50"
                  >
                    {m.is_read ? 'Mark Unread' : 'Mark Read'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
