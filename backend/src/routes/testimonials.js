import { Router } from 'express';
import { pool } from '../db.js';

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

export default router;
