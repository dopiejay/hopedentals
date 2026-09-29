import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

const SETTING_KEYS = [
  'phone_landline',
  'phone_mobile',
  'whatsapp',
  'email',
  'address',
  'area',
  'hours_weekdays',
  'hours_friday',
  'hours_weekend',
];

async function getSettingsObject() {
  const result = await query('SELECT key, value FROM settings');
  const obj = {};
  for (const row of result.rows) obj[row.key] = row.value;
  return obj;
}

// GET /api/settings — public, powers the site's contact details
router.get('/', async (req, res) => {
  try {
    res.json(await getSettingsObject());
  } catch (err) {
    console.error('GET /api/settings error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// PUT /api/settings — admin, upserts one or more settings (e.g. { phone_mobile: "+265 ..." })
router.put('/', requireAdmin, async (req, res) => {
  const body = req.body || {};
  const entries = Object.entries(body).filter(([key]) => SETTING_KEYS.includes(key));

  if (entries.length === 0) {
    return res.status(400).json({ error: 'No valid settings provided.' });
  }

  try {
    for (const [key, value] of entries) {
      await query(
        `INSERT INTO settings (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
        [key, String(value ?? '')]
      );
    }
    res.json(await getSettingsObject());
  } catch (err) {
    console.error('PUT /api/settings error:', err);
    res.status(500).json({ error: 'Could not save settings.' });
  }
});

export default router;