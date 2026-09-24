import { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const DEFAULTS = {
  phone_landline: '+265 1 876 966',
  phone_mobile: '+265 883 449 299',
  whatsapp: '265883449299',
  email: 'info@hopedentals.com',
  address: 'Chichiri Shopping Centre',
  area: 'Blantyre, Malawi',
  hours_weekdays: 'Mon – Thu 08:00 – 16:30',
  hours_friday: 'Fri 08:00 – 11:00',
  hours_weekend: 'Sat – Sun Closed',
};

export default function useSettings() {
  const [settings, setSettings] = useState(DEFAULTS);

  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setSettings((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  return settings;
}