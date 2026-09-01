import { Router } from 'express';
import { pool } from '../db.js';

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

export default router;
