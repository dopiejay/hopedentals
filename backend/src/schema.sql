-- Shalom Dental Services — database schema
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

CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  patient_name TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

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
ON CONFLICT DO NOTHING;

-- Seed team members
INSERT INTO team_members (name, role, bio, specialties, sort_order) VALUES
  ('Clinical Lead', 'Head of Department', 'Leads a Shalom Dental Services branch department with experience in fixed orthodontics and prosthodontics, supporting the clinical team across general, orthodontic, and restorative care.', ARRAY['Orthodontics', 'Prosthodontics'], 1)
ON CONFLICT DO NOTHING;

-- Seed testimonials
INSERT INTO testimonials (patient_name, quote, rating, is_featured, sort_order) VALUES
  ('Grace M.', 'Absolutely fantastic experience! The team made me feel so comfortable and the results exceeded my expectations. Highly recommend Shalom Dental.', 5, true, 1),
  ('Chimwemwe K.', 'My children actually look forward to their dental visits now. The team is incredibly patient and gentle with kids at the Limbe branch. We love it here.', 5, true, 2),
  ('Thandizo P.', 'Professional, modern, and genuinely caring. Booking at a branch near us was simple and the whole process was seamless. Best dental experience in Blantyre.', 5, true, 3)
ON CONFLICT DO NOTHING;
