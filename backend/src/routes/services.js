import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

// GET /api/services — list active services for the booking form dropdown
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT id, name FROM services WHERE is_active = true ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load services.' });
  }
});

export default router;
