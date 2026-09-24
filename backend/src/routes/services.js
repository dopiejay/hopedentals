import { Router } from 'express';
import { query } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/services — public, list active services for the booking form and services page
router.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT id, name, description, long_description, image_url, sort_order
       FROM services
       WHERE is_active = true
       ORDER BY sort_order ASC, id ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load services.' });
  }
});

// GET /api/services/all — admin, full list including hidden services
router.get('/all', requireAdmin, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, name, description, long_description, image_url, sort_order, is_active
       FROM services
       ORDER BY sort_order ASC, id ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load services.' });
  }
});

// POST /api/services — admin, create a service
router.post('/', requireAdmin, async (req, res) => {
  const { name, description, long_description, image_url, sort_order } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Service name is required.' });
  }

  try {
    const result = await query(
      `INSERT INTO services (name, description, long_description, image_url, sort_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, description, long_description, image_url, sort_order, is_active`,
      [name.trim(), description || null, long_description || null, image_url || null, sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not create service.' });
  }
});

// PATCH /api/services/:id — admin, update a service
router.patch('/:id', requireAdmin, async (req, res) => {
  const { name, description, long_description, image_url, sort_order, is_active } = req.body;

  if (name !== undefined && !String(name).trim()) {
    return res.status(400).json({ error: 'Service name cannot be empty.' });
  }

  try {
    const result = await query(
      `UPDATE services SET
        name = COALESCE($1, name),
        description = COALESCE($2, description),
        long_description = COALESCE($3, long_description),
        image_url = COALESCE($4, image_url),
        sort_order = COALESCE($5, sort_order),
        is_active = COALESCE($6, is_active)
       WHERE id = $7
       RETURNING id, name, description, long_description, image_url, sort_order, is_active`,
      [
        name !== undefined ? String(name).trim() : null,
        description ?? null,
        long_description ?? null,
        image_url ?? null,
        sort_order ?? null,
        is_active ?? null,
        req.params.id,
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update service.' });
  }
});

// DELETE /api/services/:id — admin, permanently delete a service.
// Booking history is preserved by detaching the service reference first.
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    await query('UPDATE appointments SET service_id = NULL WHERE service_id = $1', [req.params.id]);
    const result = await query('DELETE FROM services WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Service not found.' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not delete service.' });
  }
});

export default router;