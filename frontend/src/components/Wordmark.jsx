import { Link } from 'react-router-dom';

export default function Wordmark({ light = false }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 font-display text-xl font-bold ${light ? 'text-white' : 'text-ink'}`}
    >
      <span>
        Hope<em className="not-italic text-hope-teal">Dentals</em>
      </span>
    </Link>
  );
}
