-- ============================================
-- OTM Deslinde — Initial Schema
-- ============================================

-- Agrimensores (tenants)
CREATE TABLE agrimensores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  short_name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  codia TEXT,
  rnc TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  website TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  whatsapp_url TEXT,
  credentials TEXT[] DEFAULT '{}',
  areas TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Services
CREATE TABLE services (
  id TEXT NOT NULL,
  agrimensor_id UUID NOT NULL REFERENCES agrimensores(id) ON DELETE CASCADE,
  icon_key TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  PRIMARY KEY (agrimensor_id, id)
);

-- Team members
CREATE TABLE team_members (
  id TEXT NOT NULL,
  agrimensor_id UUID NOT NULL REFERENCES agrimensores(id) ON DELETE CASCADE,
  avatar_url TEXT,
  is_primary BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  PRIMARY KEY (agrimensor_id, id)
);

-- Portfolio items
CREATE TABLE portfolio_items (
  id TEXT NOT NULL,
  agrimensor_id UUID NOT NULL REFERENCES agrimensores(id) ON DELETE CASCADE,
  image_url TEXT,
  sort_order INT DEFAULT 0,
  PRIMARY KEY (agrimensor_id, id)
);

-- Testimonials
CREATE TABLE testimonials (
  id TEXT NOT NULL,
  agrimensor_id UUID NOT NULL REFERENCES agrimensores(id) ON DELETE CASCADE,
  avatar_url TEXT,
  sort_order INT DEFAULT 0,
  PRIMARY KEY (agrimensor_id, id)
);

-- Translations (for future dynamic content)
CREATE TABLE translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agrimensor_id UUID NOT NULL REFERENCES agrimensores(id) ON DELETE CASCADE,
  locale TEXT NOT NULL,
  namespace TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  UNIQUE (agrimensor_id, locale, namespace, key)
);

-- Indexes
CREATE INDEX idx_agrimensores_slug ON agrimensores(slug);
CREATE INDEX idx_translations_lookup ON translations(agrimensor_id, locale, namespace);

-- RLS Policies
ALTER TABLE agrimensores ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read agrimensores" ON agrimensores FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read portfolio_items" ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read translations" ON translations FOR SELECT USING (true);

-- Authenticated write access
CREATE POLICY "Auth write agrimensores" ON agrimensores FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write portfolio_items" ON portfolio_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write translations" ON translations FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- Seed Data: Daniel Omar Martínez Soler / OTM
-- ============================================

INSERT INTO agrimensores (
  slug, short_name, full_name, owner_name, codia, rnc,
  phone, whatsapp, email, address, lat, lng, website,
  facebook_url, instagram_url, whatsapp_url,
  credentials, areas
) VALUES (
  'otm',
  'OTM',
  'Operaciones Topográficas y Mensuras',
  'Daniel Omar Martínez Soler',
  'CODIA 34525',
  'Pendiente',
  '+18292829999',
  '18292829999',
  'info@deslinde.do',
  'Higüey, La Altagracia, República Dominicana',
  18.6152,
  -68.7078,
  'https://otm.deslinde.do',
  'https://www.facebook.com/profile.php?id=100063689188342',
  'https://www.instagram.com/agrim.danielmartinez/',
  'https://wa.me/18292829999',
  ARRAY['codia', 'abogado', 'master', 'tasador'],
  ARRAY['santoDomingo', 'puntaCana', 'bavaro', 'capCana', 'santiago', 'laRomana', 'samana', 'puertoplata', 'higuey', 'jarabacoa', 'lasTerrenas', 'cabarete']
);

-- Get the agrimensor ID for FK references
DO $$
DECLARE
  otm_id UUID;
BEGIN
  SELECT id INTO otm_id FROM agrimensores WHERE slug = 'otm';

  -- Services
  INSERT INTO services (agrimensor_id, id, icon_key, sort_order) VALUES
    (otm_id, 'deslinde', 'deslinde', 1),
    (otm_id, 'subdivision', 'subdivision', 2),
    (otm_id, 'refundicion', 'refundicion', 3),
    (otm_id, 'condominio', 'condominio', 4),
    (otm_id, 'saneamiento', 'saneamiento', 5),
    (otm_id, 'actualizacion', 'actualizacion', 6),
    (otm_id, 'levantamiento', 'levantamiento', 7);

  -- Team members
  INSERT INTO team_members (agrimensor_id, id, is_primary, sort_order) VALUES
    (otm_id, 'team1', true, 1),
    (otm_id, 'team2', true, 2),
    (otm_id, 'team3', false, 3),
    (otm_id, 'team4', false, 4),
    (otm_id, 'team5', false, 5);

  -- Portfolio items
  INSERT INTO portfolio_items (agrimensor_id, id, sort_order) VALUES
    (otm_id, 'item1', 1),
    (otm_id, 'item2', 2),
    (otm_id, 'item3', 3),
    (otm_id, 'item4', 4),
    (otm_id, 'item5', 5),
    (otm_id, 'item6', 6);

  -- Testimonials
  INSERT INTO testimonials (agrimensor_id, id, sort_order) VALUES
    (otm_id, 'item1', 1),
    (otm_id, 'item2', 2),
    (otm_id, 'item3', 3);
END $$;
