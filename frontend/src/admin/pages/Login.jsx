import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import ToothIcon from '../../components/ToothIcon';

export default function Login() {
  const { login } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/admin';

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Left panel */}
      <div className="relative hidden flex-col justify-between bg-ink p-12 text-white md:flex">
        <div className="flex items-center gap-2 font-display text-xl font-bold">
          <ToothIcon className="text-hope-accent" size={26} />
          Hope<em className="not-italic text-hope-teal">Dentals</em>
        </div>

        <div>
          <svg viewBox="0 0 400 300" width="100%" height="auto" className="mb-8 opacity-90" aria-hidden="true">
            <rect width="400" height="300" rx="24" fill="#ffffff0d" />
            <circle cx="140" cy="150" r="70" fill="#0F6E7E" opacity="0.45" />
            <circle cx="260" cy="120" r="45" fill="#1E93A0" opacity="0.55" />
          </svg>
          <p className="font-display text-2xl font-bold italic">
            "Manage your clinic. Deliver a better patient experience."
          </p>
        </div>

        <p className="text-sm text-white/40">HopeDentals Admin Portal — internal use only</p>
      </div>

      {/* Right panel */}
      <div className="flex flex-col justify-center px-8 py-16 sm:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 font-display text-xl font-bold md:hidden">
            <ToothIcon className="text-hope-accent" size={24} />
            Hope<em className="not-italic text-hope-teal">Dentals</em>
          </div>

          <h1 className="mb-1 font-display text-2xl font-bold">Sign in</h1>
          <p className="mb-8 text-sm text-slate">Access the HopeDentals admin portal.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stone px-3.5 py-3 focus:border-hope-accent focus:outline-none"
                placeholder="you@hopedentals.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-[1.5px] border-stone px-3.5 py-3 focus:border-hope-accent focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-px hover:bg-hope-navy disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-[0.8rem] text-slate">
            Admin accounts are created directly by the clinic&apos;s developer — there is no public
            sign-up.
          </p>
        </div>
      </div>
    </div>
  );
}
