import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM team_members WHERE is_active = true ORDER BY sort_order, id'
    );
    res.json(rows);
  } catch (err) {
    console.error('GET /api/team error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/team/all — admin, full list including inactive members
router.get('/all', requireAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM team_members ORDER BY sort_order, id'
    );
    res.json(rows);
  } catch (err) {
    console.error('GET /api/team/all error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM team_members WHERE id = $1', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Team member not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('GET /api/team/:id error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST /api/team — admin, create a team member
router.post('/', requireAdmin, async (req, res) => {
  const { name, role, bio, photo_url, specialties, sort_order } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Name is required.' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO team_members (name, role, bio, photo_url, specialties, sort_order)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name.trim(), role || 'Dentist', bio || null, photo_url || null, specialties || [], sort_order || 0]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('POST /api/team error:', err);
    res.status(500).json({ error: 'Could not create team member.' });
  }
});

// PATCH /api/team/:id — admin, update a team member
router.patch('/:id', requireAdmin, async (req, res) => {
  const { name, role, bio, photo_url, specialties, sort_order, is_active } = req.body;

  if (name !== undefined && !String(name).trim()) {
    return res.status(400).json({ error: 'Name cannot be empty.' });
  }

  try {
    const { rows } = await pool.query(
      `UPDATE team_members SET
        name = COALESCE($1, name),
        role = COALESCE($2, role),
        bio = COALESCE($3, bio),
        photo_url = COALESCE($4, photo_url),
        specialties = COALESCE($5, specialties),
        sort_order = COALESCE($6, sort_order),
        is_active = COALESCE($7, is_active)
       WHERE id = $8
       RETURNING *`,
      [
        name !== undefined ? String(name).trim() : null,
        role ?? null,
        bio ?? null,
        photo_url ?? null,
        specialties ?? null,
        sort_order ?? null,
        is_active ?? null,
        req.params.id,
      ]
    );
    if (!rows.length) return res.status(404).json({ error: 'Team member not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('PATCH /api/team/:id error:', err);
    res.status(500).json({ error: 'Could not update team member.' });
  }
});

// DELETE /api/team/:id — admin, soft delete
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      'UPDATE team_members SET is_active = false WHERE id = $1 RETURNING id, is_active',
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Team member not found.' });
    res.json(rows[0]);
  } catch (err) {
    console.error('DELETE /api/team/:id error:', err);
    res.status(500).json({ error: 'Could not remove team member.' });
  }
});

export default router;