import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { pool } from './db.js';

dotenv.config({ quiet: true });

// Usage: node src/seed-admin.js "you@example.com" "your-password"
async function seedAdmin() {
  const [, , email, password] = process.argv;

  if (!email || !password) {
    console.error('Usage: node src/seed-admin.js "you@example.com" "your-password"');
    process.exit(1);
  }

  const password_hash = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO admin_users (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [email, password_hash]
  );

  console.log(`Admin user ready: ${email}`);
  await pool.end();
}

seedAdmin().catch((err) => {
  console.error('Failed to seed admin:', err.message);
  process.exit(1);
});
