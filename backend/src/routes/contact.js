import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO contact_messages (name, email, phone, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, phone || null, message]
    );
    res.status(201).json({ id: rows[0].id, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('POST /api/contact error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /api/contact — admin only, inbox of contact form submissions
router.get('/', requireAdmin, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, name, email, phone, message, is_read, created_at
       FROM contact_messages
       ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('GET /api/contact error:', err);
    res.status(500).json({ error: 'Could not load messages.' });
  }
});

// PATCH /api/contact/:id — admin only, mark a message read/unread
router.patch('/:id', requireAdmin, async (req, res) => {
  const { is_read } = req.body;

  if (typeof is_read !== 'boolean') {
    return res.status(400).json({ error: 'is_read must be true or false.' });
  }

  try {
    const { rows } = await pool.query(
      'UPDATE contact_messages SET is_read = $1 WHERE id = $2 RETURNING id, is_read',
      [is_read, req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Message not found.' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('PATCH /api/contact/:id error:', err);
    res.status(500).json({ error: 'Could not update message.' });
  }
});

export default router;
