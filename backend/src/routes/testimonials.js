import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM testimonials ORDER BY sort_order, id'
    );
    res.json(rows);
  } catch (err) {
    console.error('GET /api/testimonials error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/testimonials — admin, create a testimonial
router.post('/', requireAdmin, async (req, res) => {
  const { patient_name, quote, rating, is_featured, sort_order } = req.body;

  if (!patient_name || !patient_name.trim() || !quote || !quote.trim()) {
    return res.status(400).json({ error: 'Patient name and quote are required.' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO testimonials (patient_name, quote, rating, is_featured, sort_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [patient_name.trim(), quote.trim(), rating ?? 5, Boolean(is_featured), sort_order || 0]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('POST /api/testimonials error:', err);
    res.status(500).json({ error: 'Could not create testimonial.' });
  }
});

// PATCH /api/testimonials/:id — admin, update a testimonial
router.patch('/:id', requireAdmin, async (req, res) => {
  const { patient_name, quote, rating, is_featured, sort_order } = req.body;

  if (patient_name !== undefined && !String(patient_name).trim()) {
    return res.status(400).json({ error: 'Patient name cannot be empty.' });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE testimonials SET
        patient_name = COALESCE($1, patient_name),
        quote = COALESCE($2, quote),
        rating = COALESCE($3, rating),
        is_featured = COALESCE($4, is_featured),
        sort_order = COALESCE($5, sort_order)
       WHERE id = $6
       RETURNING *`,
      [
        patient_name !== undefined ? String(patient_name).trim() : null,
        quote ?? null,
        rating ?? null,
        is_featured ?? null,
        sort_order ?? null,
        req.params.id,
      ]
    );
    if (!rows.length) return res.status(404).json({ error: 'Testimonial not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('PATCH /api/testimonials/:id error:', err);
    res.status(500).json({ error: 'Could not update testimonial.' });
  }
});

// DELETE /api/testimonials/:id — admin, hard delete
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING id', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Testimonial not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('DELETE /api/testimonials/:id error:', err);
    res.status(500).json({ error: 'Could not remove testimonial.' });
  }
});

export default router;