import { Router } from 'express';
import { query } from '../db.js';

const router = Router();

// GET /api/services — list active services for the booking form dropdown
// and the public service cards. Must return the full row: the cards render
// description + image, and the detail page renders long_description.
router.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT id, name, description, long_description, image_url, sort_order
       FROM services WHERE is_active = true ORDER BY sort_order ASC, id ASC`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not load services.' });
  }
});

export default router;
