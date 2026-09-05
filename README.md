# Invitato — Software Engineer Hometask
> built with Next.js 16, TypeScript, Tailwind CSS v4, GSAP 3, dan Supabase.

---

##  Daftar Deliverables

| # | Deliverable | Status | Keterangan |
|---|---|---|---|
| 1 | **Halaman Undangan Digital** | ✅ | Single-page, fully responsive (mobile-first) |
| 2 | **Cover / Opening Section** | ✅ | Fullscreen dengan animasi GSAP, CTA "Open Invitation" |
| 3 | **Couple Section** | ✅ | Profil pasangan dengan foto & quote |
| 4 | **Event Section** | ✅ | Detail akad & resepsi (tanggal, waktu, lokasi) |
| 5 | **Countdown Timer** | ✅ | Real-time countdown ke hari H |
| 6 | **Gallery Section** | ✅ | Accordion gallery & photo grid dengan animasi |
| 7 | **Map Section** | ✅ | Google Maps embed + tombol navigasi |
| 8 | **RSVP Form** | ✅ | Form konfirmasi kehadiran → tersimpan di Supabase |
| 9 | **Wishes Section** | ✅ | Form ucapan + list realtime via Supabase Realtime |
| 10 | **Music Player** | ✅ | Floating toggle, autoplay on interaction |
| 11 | **Footer Section** | ✅ | Pesan penutup pasangan |
| 12 | **Backend API — POST `/api/rsvp`** | ✅ | Validasi Zod + insert ke Supabase |
| 13 | **Backend API — GET/POST `/api/wishes`** | ✅ | Validasi Zod + query/insert Supabase |
| 14 | **API Documentation (Swagger UI)** | ✅ | Route `/docs` — interaktif, bisa try out |
| 15 | **Admin Dashboard** | ✅ | Route `/admin` — protected, stats + tabel data |
| 16 | **Export CSV** | ✅ | Download RSVP & Wishes dari admin dashboard |
| 17 | **Supabase Schema & Migrations** | ✅ | `supabase/schema.sql` siap dijalankan |
| 18 | **Row Level Security (RLS)** | ✅ | Public insert/select, akses admin via service key |

---

##  Panduan Memulai

### 1. Instalasi

```bash
git clone <repository-url>
cd invitato
npm install
```

### 2. Environment Variables

Buat file `.env.local` di root project dengan nilai berikut:

```env
NEXT_PUBLIC_SUPABASE_URL=https://nsavesotzraemkpblmyj.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_CzVf7prxPiFFr2TshkNU8g_DyPd6Npk
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_CzVf7prxPiFFr2TshkNU8g_DyPd6Npk
ADMIN_PASSWORD=invitato2026
```

> Kredensial di atas adalah project Supabase aktif yang sudah dikonfigurasi untuk hometask ini.
> Password admin dashboard: **`invitato2026`**

### 3. Setup Database Supabase

Buka **Supabase Dashboard → SQL Editor**, lalu jalankan isi file:

```
supabase/schema.sql
```

File ini akan membuat tabel `rsvps` dan `wishes`, mengaktifkan RLS, menambahkan policies, seed data awal, dan mengaktifkan Supabase Realtime untuk tabel wishes.

### 4. Jalankan Development Server

```bash
npm run dev
```

| URL | Deskripsi |
|---|---|
| `http://localhost:3000` | Halaman undangan utama |
| `http://localhost:3000/admin` | Admin Dashboard (login required) |
| `http://localhost:3000/docs` | Swagger UI — API Documentation |

---

##  Tech Stack

| Layer | Teknologi | Alasan |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript | SSR, Server Components, type safety |
| Styling | Tailwind CSS v4 | Rapid development, utility-first |
| Animation | GSAP 3 + ScrollTrigger | Scroll-based reveals, premium transitions |
| Icons | Lucide React | Lightweight, tree-shakeable |
| Validation | Zod | Schema validation client & server |
| Database | Supabase (PostgreSQL) | Persisten, gratis, realtime capable |
| API Docs | Swagger UI React | Interactive OpenAPI 3.0 documentation |
| Font | Google Fonts (Marcellus + Cormorant Upright + Great Vibes) | Sesuai referensi asli |

---

##  Database Schema

Schema lengkap ada di [`supabase/schema.sql`](./supabase/schema.sql). Ringkasan:

```sql
-- Tabel RSVPs
CREATE TABLE public.rsvps (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name   TEXT NOT NULL,
  phone_code   TEXT DEFAULT '+ 62',
  phone_number TEXT,
  address      TEXT,
  email        TEXT,
  attendance   TEXT NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir')),
  events       TEXT[] DEFAULT ARRAY[]::TEXT[],
  guest_count  INTEGER NOT NULL DEFAULT 1 CHECK (guest_count >= 1 AND guest_count <= 5),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tabel Wishes
CREATE TABLE public.wishes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

RLS diaktifkan dengan policy:
- `rsvps` → public **INSERT** diizinkan
- `wishes` → public **INSERT** dan **SELECT** diizinkan

---

##  Struktur Project

```
app/
├── admin/                          # Admin Dashboard (protected)
│   ├── (protected)/
│   │   ├── layout.tsx              # Auth guard (redirect ke /admin/login jika belum login)
│   │   ├── page.tsx                # Overview stats
│   │   ├── rsvps/page.tsx          # Tabel RSVP + filter + export CSV
│   │   ├── wishes/page.tsx         # Kartu Wishes + export CSV
│   │   └── components/
│   │       └── AdminSidebar.tsx    # Sidebar navigasi
│   └── login/page.tsx              # Halaman login admin
├── api/
│   ├── rsvp/route.ts               # POST /api/rsvp
│   ├── wishes/route.ts             # GET & POST /api/wishes
│   ├── docs/spec/route.ts          # GET /api/docs/spec (OpenAPI JSON)
│   └── admin/
│       ├── auth/route.ts           # POST/DELETE /api/admin/auth (login/logout)
│       ├── stats/route.ts          # GET /api/admin/stats
│       ├── rsvps/route.ts          # GET /api/admin/rsvps (+ CSV export)
│       └── wishes/route.ts         # GET /api/admin/wishes (+ CSV export)
├── components/                     # Section components
│   ├── HeroCoverSection.tsx
│   ├── CoupleSection.tsx
│   ├── EventSection.tsx
│   ├── CountdownSection.tsx
│   ├── GallerySection.tsx
│   ├── MapSection.tsx
│   ├── RsvpSection.tsx
│   ├── WishesSection.tsx
│   ├── FooterSection.tsx
│   └── MusicToggle.tsx
├── docs/                           # Swagger UI page
│   ├── layout.tsx
│   └── page.tsx
└── lib/
    ├── supabase.ts                 # Supabase client
    ├── schemas.ts                  # Zod schemas
    ├── config.ts                   # Event config (tanggal, venue, dll)
    └── swagger.ts                  # OpenAPI 3.0 spec
supabase/
├── schema.sql                      # Full schema + RLS + seed
└── migrations/
    └── 20260905000000_init_rsvps_and_wishes.sql
```

---

##  API Documentation

Dokumentasi API interaktif (Swagger UI) tersedia di:

 **`http://localhost:3000/docs`**

Endpoint yang didokumentasikan:

| Method | Endpoint | Deskripsi |
|---|---|---|
| `POST` | `/api/rsvp` | Submit konfirmasi kehadiran |
| `GET` | `/api/wishes` | Ambil daftar ucapan (max 5 terbaru) |
| `POST` | `/api/wishes` | Kirim ucapan baru |

---

##  Admin Dashboard

Akses admin di **`http://localhost:3000/admin`** menggunakan password dari `ADMIN_PASSWORD` di `.env.local`.

Fitur admin:
- **Overview** — statistik total RSVP, hadir/tidak hadir, headcount, total ucapan, progress bar komposisi
- **RSVP Table** — filter hadir/tidak, search nama/email, pagination, export CSV
- **Wishes** — list ucapan, search, pagination, export CSV
- **Logout** — hapus session cookie

---

##  Disclosure — Penggunaan AI Tools

Sesuai dengan petunjuk kandidat (Brief 1.8 — Penggunaan AI Coding Tools), pengerjaan project ini dibantu oleh **Antigravity AI Agent** (Google DeepMind) dengan rincian sebagai berikut:

### Bagian yang Dibantu AI

| Area | Detail Kontribusi AI |
|---|---|
| **Arsitektur & Setup** | Perancangan struktur App Router, konfigurasi Supabase client, setup middleware, dan penentuan tech stack |
| **UI Components** | Scaffolding awal komponen section (HeroCover, Couple, Event, Countdown, Gallery, Map, Footer) |
| **Animasi GSAP** | Implementasi ScrollTrigger reveals, DriftWall 3D particle effect, Starry Night canvas, Fireworks canvas, Accordion Gallery |
| **Backend API** | Pembuatan route handlers `/api/rsvp` dan `/api/wishes`, validasi Zod, integrasi Supabase insert/select |
| **Admin Dashboard** | Struktur route group `(protected)`, auth cookie session, halaman stats/RSVP/Wishes, CSV export |
| **Database Schema** | Penulisan SQL schema, RLS policies, seed data, dan index optimization |
| **Bug Fixing** | Debugging redirect loop admin, hydration mismatch, ScrollReveal visibility issues, autofill browser styling |
| **OpenAPI Docs** | Penulisan spesifikasi Swagger 3.0 dan setup Swagger UI page |

### Bagian yang Dikerjakan Sendiri

- Konsep desain visual dan pemilihan palet warna (dark luxury gold/amber)
- Kustomisasi detail UI — spacing, typography scale, ornamen SVG dekoratif
- Review dan revisi setiap komponen yang dihasilkan AI
- Testing fungsional RSVP, Wishes, dan Admin Dashboard
- Penulisan konfigurasi event (nama pasangan, tanggal, venue, koordinat maps)
- Keputusan arsitektur bisnis (field apa yang dikumpulkan di RSVP, struktur admin, dll)

### Tools yang Digunakan

- **Antigravity AI Agent** (Google DeepMind) — pair programming & code generation
- **Cursor / VS Code** — editor utama
- **Supabase Dashboard** — database management & SQL editor
- **Chrome DevTools** — debugging & responsiveness testing

---

