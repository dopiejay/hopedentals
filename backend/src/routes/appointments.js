import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// POST /api/appointments — public, called from the booking form
router.post('/', async (req, res) => {
  const { service_id, service_name, branch, patient_name, patient_phone, preferred_date, preferred_time } = req.body;

  if (!service_name || !patient_name || !patient_phone || !preferred_date || !preferred_time) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  try {
    const result = await query(
      `INSERT INTO appointments (service_id, service_name, branch, patient_name, patient_phone, preferred_date, preferred_time)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, status, created_at`,
      [service_id || null, service_name, branch || null, patient_name, patient_phone, preferred_date, preferred_time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not save appointment request.' });
  }
});

// GET /api/appointments — admin only, list all bookings (reception view)
router.get('/', requireAdmin, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, service_name, branch, patient_name, patient_phone, preferred_date, preferred_time, status, created_at
       FROM appointments
       ORDER BY preferred_date ASC, created_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load appointments.' });
  }
});

// PATCH /api/appointments/:id — admin only, update status (confirm/cancel/complete)
router.patch('/:id', requireAdmin, async (req, res) => {
  const { status } = req.body;
  const allowed = ['pending', 'confirmed', 'cancelled', 'completed'];

  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${allowed.join(', ')}` });
  }

  try {
    const result = await query(
      'UPDATE appointments SET status = $1 WHERE id = $2 RETURNING id, status',
      [status, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Appointment not found.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update appointment.' });
  }
});

export default router;
