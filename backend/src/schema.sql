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

-- Seed services with copy and imagery. image_url points at the frontend's
-- /images/... assets so every card has its own picture instead of one shared
-- fallback. Re-running the migration only fills blanks, so anything edited in
-- the admin panel is left untouched.
INSERT INTO services (name, description, long_description, image_url, sort_order) VALUES
  ('General Consultation', 'Routine dental care and preventive treatment.', 'General dentistry covers the prevention, diagnosis and treatment of common dental conditions. Regular visits keep your teeth and gums healthy and catch small problems before they become bigger and more expensive ones.', '/images/general.jpg', 1),
  ('Routine Check-up & Cleaning', 'Professional scaling and polishing for a healthier smile.', 'A routine check-up examines your teeth, gums and overall oral health, followed by a professional clean that removes the plaque and tartar daily brushing cannot reach. We then talk through any next steps and how to keep things healthy between visits.', '/images/general.jpg', 2),
  ('Orthodontics / Braces', 'Straighter teeth and improved alignment for all ages.', 'Orthodontics straightens teeth and improves how your upper and lower teeth meet. Treatment uses traditional braces and careful follow-up, planned visit by visit for children, teenagers and adults alike.', '/images/orthodontics.jpg', 3),
  ('Restorative (Crowns, Bridges, Dentures)', 'Durable restorations built to match your natural teeth.', 'Restorative dentistry repairs and replaces teeth that are damaged or missing, restoring both function and appearance. Crowns, bridges and dentures are shaped and shaded to match your natural bite and smile.', '/images/crowns-bridges.jpg', 4),
  ('Tooth Pain', 'Prompt care for toothaches and sensitivity.', 'Toothache and sensitivity are common, and the cause is usually something that can be treated. We assess the tooth and the surrounding area, relieve the pain, and explain your options clearly before any treatment begins.', '/images/xray.jpg', 5),
  ('Oral Surgery', 'Extractions and minor surgical procedures.', 'Oral surgery covers the removal of teeth and other surgical procedures within the mouth. Whether a simple extraction or a more complex surgical removal, the procedure is planned carefully and carried out with your comfort in mind.', '/images/xray.jpg', 6),
  ('Dental Implants', 'Natural-looking, long-term tooth replacement.', 'Dental implants replace missing teeth with a titanium post placed in the jaw, topped with a natural-looking crown. They offer a strong, lasting alternative to removable teeth and are restored to match your smile.', '/images/cosmetic.jpg', 7),
  ('Dental Laboratory', 'Crowns, bridges, and prosthetics crafted in-house.', 'Restorations are crafted in our own on-site dental laboratory, so the team controlling shade, shape and fit of your crown, bridge or denture is the same team that will be fitting it.', '/images/crowns-bridges.jpg', 8),
  ('Not sure — advise me', 'Book a consultation and we''ll recommend the right treatment.', 'You do not need to know what is wrong before you call. Book a consultation and we will examine you, explain what we find in plain terms, and recommend the treatment that is right for you.', '/images/general.jpg', 9)
ON CONFLICT (name) DO UPDATE SET
  description = COALESCE(NULLIF(services.description, ''), EXCLUDED.description),
  long_description = COALESCE(NULLIF(services.long_description, ''), EXCLUDED.long_description),
  image_url = COALESCE(NULLIF(services.image_url, ''), EXCLUDED.image_url);

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
