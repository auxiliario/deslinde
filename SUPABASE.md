# Supabase Database — OTM Deslinde

## Environment Setup

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Client is initialized in `src/lib/supabase.ts`.

---

## Tables

### `agrimensores` (tenants)

Primary tenant table. Each agrimensor gets one row.

| Column         | Type             | Notes                          |
|----------------|------------------|--------------------------------|
| id             | UUID (PK)        | Auto-generated                 |
| slug           | TEXT UNIQUE       | Subdomain identifier (e.g. `otm`) |
| short_name     | TEXT              | Display name (e.g. `OTM`)     |
| full_name      | TEXT              | Full firm name                 |
| owner_name     | TEXT              | Owner's full name              |
| codia          | TEXT              | CODIA credential string        |
| rnc            | TEXT              | Tax ID (RNC)                   |
| phone          | TEXT              | Mobile phone                   |
| whatsapp       | TEXT              | WhatsApp number (digits only)  |
| email          | TEXT              | Contact email                  |
| address        | TEXT              | Physical address               |
| lat            | DOUBLE PRECISION  | Latitude                       |
| lng            | DOUBLE PRECISION  | Longitude                      |
| website        | TEXT              | Website URL                    |
| facebook_url   | TEXT              | Facebook profile URL           |
| instagram_url  | TEXT              | Instagram profile URL          |
| whatsapp_url   | TEXT              | wa.me link                     |
| credentials    | TEXT[]            | Array of credential keys       |
| areas          | TEXT[]            | Array of coverage area keys    |
| created_at     | TIMESTAMPTZ       | Auto-set on insert             |
| updated_at     | TIMESTAMPTZ       | Auto-set on insert             |

### `services`

Composite PK: `(agrimensor_id, id)`.

| Column        | Type  | Notes                                  |
|---------------|-------|----------------------------------------|
| id            | TEXT  | Service key (e.g. `deslinde`)          |
| agrimensor_id | UUID  | FK → agrimensores.id (CASCADE delete)  |
| icon_key      | TEXT  | Icon identifier for the frontend       |
| sort_order    | INT   | Display order                          |

### `team_members`

Composite PK: `(agrimensor_id, id)`.

| Column        | Type    | Notes                                 |
|---------------|---------|---------------------------------------|
| id            | TEXT    | Member key (e.g. `team1`)             |
| agrimensor_id | UUID    | FK → agrimensores.id (CASCADE delete) |
| avatar_url    | TEXT    | URL to avatar image (nullable)        |
| is_primary    | BOOLEAN | `true` for the firm owner             |
| sort_order    | INT     | Display order                         |

### `portfolio_items`

Composite PK: `(agrimensor_id, id)`.

| Column        | Type | Notes                                 |
|---------------|------|---------------------------------------|
| id            | TEXT | Item key (e.g. `item1`)               |
| agrimensor_id | UUID | FK → agrimensores.id (CASCADE delete) |
| image_url     | TEXT | URL to project image (nullable)       |
| sort_order    | INT  | Display order                         |

### `testimonials`

Composite PK: `(agrimensor_id, id)`.

| Column        | Type | Notes                                 |
|---------------|------|---------------------------------------|
| id            | TEXT | Item key (e.g. `item1`)               |
| agrimensor_id | UUID | FK → agrimensores.id (CASCADE delete) |
| avatar_url    | TEXT | URL to client avatar (nullable)       |
| sort_order    | INT  | Display order                         |

### `translations`

For future dynamic content that goes beyond the static message files.

| Column        | Type | Notes                                            |
|---------------|------|--------------------------------------------------|
| id            | UUID (PK) | Auto-generated                              |
| agrimensor_id | UUID | FK → agrimensores.id (CASCADE delete)            |
| locale        | TEXT | Language code (`es`, `en`, `fr`, `it`)           |
| namespace     | TEXT | Section (e.g. `Services`, `About`)               |
| key           | TEXT | Translation key (e.g. `deslinde_title`)          |
| value         | TEXT | Translated string                                |

Unique constraint: `(agrimensor_id, locale, namespace, key)`.

---

## Indexes

| Index                      | Table          | Columns                            |
|----------------------------|----------------|-------------------------------------|
| idx_agrimensores_slug      | agrimensores   | slug                               |
| idx_translations_lookup    | translations   | agrimensor_id, locale, namespace   |

---

## Row-Level Security (RLS)

All 6 tables have RLS enabled.

| Policy               | Access  | Condition                       |
|-----------------------|---------|---------------------------------|
| Public read *         | SELECT  | `true` (anyone can read)        |
| Auth write *          | ALL     | `auth.role() = 'authenticated'` |

This means the site reads data via the anon key (public), and only authenticated users (e.g. admin dashboard) can insert/update/delete.

---

## Seed Data

The migration seeds one tenant: **OTM** (Daniel Omar Martínez Soler).

- **slug:** `otm`
- **7 services:** deslinde, subdivision, refundicion, condominio, saneamiento, actualizacion, levantamiento
- **4 team members:** team1 (primary), team2, team3, team4
- **6 portfolio items:** item1–item6
- **3 testimonials:** item1–item3
- **6 coverage areas:** higuey, bavaro, puntaCana, veron, bayahibe, laRomana
- **4 credentials:** codia, abogado, master, tasador

All translatable text (service titles/descriptions, team names/roles, testimonial content) lives in `messages/*.json` files, not in the database.

---

## Query Pattern

The `fetchTenantBySlug()` function in `src/lib/getAgrimensorData.ts` fetches a tenant with all related data in a single query using Supabase's nested select:

```ts
const { data, error } = await supabase
  .from("agrimensores")
  .select(`
    *,
    services (*),
    team_members (*),
    portfolio_items (*),
    testimonials (*)
  `)
  .eq("slug", slug)
  .single();
```

The result is mapped to the `TenantConfig` TypeScript interface defined in `src/lib/types.ts`.

---

## Current Status

The site currently uses **hardcoded tenant data** from `src/lib/data/otm-tenant.ts`, resolved by `src/lib/get-tenant.ts`. To switch to Supabase:

1. Create a Supabase project and add credentials to `.env.local`
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor
3. Update `src/lib/get-tenant.ts` to call `fetchTenantBySlug()` instead of returning hardcoded data

---

## File Reference

| File | Purpose |
|------|---------|
| `supabase/migrations/001_initial_schema.sql` | Schema + seed data |
| `src/lib/supabase.ts` | Supabase client |
| `src/lib/getAgrimensorData.ts` | Query function |
| `src/lib/get-tenant.ts` | Tenant resolver (currently hardcoded) |
| `src/lib/types.ts` | TypeScript interfaces |
| `.env.local.example` | Environment variable template |
