import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import ToothIcon from '../../components/ToothIcon';
import { MonitorIcon, CalendarIcon, MailIcon } from '../../components/Icons';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: MonitorIcon, end: true },
  { to: '/admin/appointments', label: 'Appointments', icon: CalendarIcon },
  { to: '/admin/messages', label: 'Messages', icon: MailIcon },
];

export default function AdminLayout() {
  const { auth, logout } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-paper">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-ink text-white transition-transform md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-6 py-5 font-display text-lg font-medium">
          <ToothIcon className="text-shalom-gold" size={24} />
          Shalom<em className="not-italic text-shalom-teal">Dental</em>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-5">
          <p className="px-3 pb-2 text-[0.7rem] font-bold tracking-[0.1em] text-white/40 uppercase">Branches</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  isActive ? 'bg-shalom-navy text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 px-6 py-4">
          <p className="mb-2 truncate text-[0.8rem] text-white/50">{auth?.email}</p>
          <button
            onClick={logout}
            className="w-full rounded-lg border border-white/20 px-3 py-2 text-left text-sm font-semibold text-white/80 transition-colors hover:bg-white/10 hover:text-white"
          >
            Log Out
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-ink/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 md:pl-0">
        <header className="sticky top-0 z-20 flex items-center gap-4 border-b border-stone bg-ink px-5 py-3.5 backdrop-blur md:hidden">
          <button
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="flex flex-col gap-1.5 p-1.5"
          >
            <span className="h-0.5 w-5.5 rounded bg-white" />
            <span className="h-0.5 w-5.5 rounded bg-white" />
            <span className="h-0.5 w-5.5 rounded bg-white" />
          </button>
          <span className="font-display font-medium text-white">Shalom Dental Admin</span>
        </header>

        <main className="p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
