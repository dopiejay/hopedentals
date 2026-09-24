-- HopeDentals — database schema
-- Run via `npm run migrate`, or paste directly into the Neon SQL editor.

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Add columns to services if they don't exist (for existing databases)
DO $$ BEGIN
  ALTER TABLE services ADD COLUMN IF NOT EXISTS description TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;
DO $$ BEGIN
  ALTER TABLE services ADD COLUMN IF NOT EXISTS long_description TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;
DO $$ BEGIN
  ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;
DO $$ BEGIN
  ALTER TABLE services ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- Deduplicate services that older seed statements created, keeping the lowest id
-- so existing appointment references stay valid.
DELETE FROM services a USING services b
  WHERE a.id > b.id AND a.name = b.name;

CREATE UNIQUE INDEX IF NOT EXISTS services_name_key ON services (name);

CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  service_id INTEGER REFERENCES services(id),
  service_name TEXT NOT NULL,
  branch TEXT,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DO $$
BEGIN
  ALTER TABLE appointments ADD COLUMN IF NOT EXISTS branch TEXT;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Dentist',
  bio TEXT,
  photo_url TEXT,
  specialties TEXT[],
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DELETE FROM team_members a USING team_members b
  WHERE a.id > b.id AND a.name = b.name;

CREATE UNIQUE INDEX IF NOT EXISTS team_members_name_key ON team_members (name);

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

DELETE FROM testimonials a USING testimonials b
  WHERE a.id > b.id AND a.patient_name = b.patient_name AND a.quote = b.quote;

CREATE UNIQUE INDEX IF NOT EXISTS testimonials_body_key ON testimonials (patient_name, quote);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO settings (key, value) VALUES
  ('phone_landline', '+265 1 876 966'),
  ('phone_mobile', '+265 883 449 299'),
  ('whatsapp', '265883449299'),
  ('email', 'info@hopedentals.com'),
  ('address', 'Chichiri Shopping Centre'),
  ('area', 'Blantyre, Malawi'),
  ('hours_weekdays', 'Mon – Thu 08:00 – 16:30'),
  ('hours_friday', 'Fri 08:00 – 11:00'),
  ('hours_weekend', 'Sat – Sun Closed')
ON CONFLICT (key) DO NOTHING;

-- Seed services with descriptions
INSERT INTO services (name, description, sort_order) VALUES
  ('General Consultation', 'Routine dental care and preventive treatment.', 1),
  ('Routine Check-up & Cleaning', 'Professional scaling and polishing for a healthier smile.', 2),
  ('Orthodontics / Braces', 'Straighter teeth and improved alignment for all ages.', 3),
  ('Restorative (Crowns, Bridges, Dentures)', 'Durable restorations built to match your natural teeth.', 4),
  ('Tooth Pain', 'Prompt care for toothaches and sensitivity.', 5),
  ('Oral Surgery', 'Extractions and minor surgical procedures.', 6),
  ('Dental Implants', 'Natural-looking, long-term tooth replacement.', 7),
  ('Dental Laboratory', 'Crowns, bridges, and prosthetics crafted in-house.', 8),
  ('Not sure — advise me', 'Book a consultation and we''ll recommend the right treatment.', 9)
ON CONFLICT (name) DO NOTHING;

-- Seed team members
INSERT INTO team_members (name, role, bio, specialties, sort_order) VALUES
  ('Clinical Lead', 'Head of Department', 'Leads the HopeDentals clinical department with experience in fixed orthodontics and prosthodontics, supporting the team across general, orthodontic, and restorative care.', ARRAY['Orthodontics', 'Prosthodontics'], 1)
ON CONFLICT (name) DO NOTHING;

-- Seed testimonials
INSERT INTO testimonials (patient_name, quote, rating, is_featured, sort_order) VALUES
  ('Grace M.', 'Absolutely fantastic experience! The team made me feel so comfortable and the results exceeded my expectations. Highly recommend HopeDentals.', 5, true, 1),
  ('Chimwemwe K.', 'My children actually look forward to their dental visits now. The team is incredibly patient and gentle with children. We love it here.', 5, true, 2),
  ('Thandizo P.', 'Professional, modern, and genuinely caring. Booking was simple and the whole process was seamless. Best dental experience in Blantyre.', 5, true, 3)
ON CONFLICT (patient_name, quote) DO NOTHING;
