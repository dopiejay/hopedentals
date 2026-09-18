import { Link } from 'react-router-dom';

export default function Wordmark({ light = false }) {
  return (
    <Link
      to="/"
      className={`flex items-center gap-2 font-display text-xl font-bold ${light ? 'text-white' : 'text-ink'}`}
    >
      <span>
        Shalom<em className="not-italic text-shalom-teal">Dental</em>
      </span>
    </Link>
  );
}
