import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Scrolls to top on route change, unless navigating to a hash (e.g. /#book)
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
  }, [pathname, hash]);

  return null;
}
