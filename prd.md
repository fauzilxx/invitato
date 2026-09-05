# Invitato — Wedding Invitation Website (Ricky + Felly)

## Ringkasan

Membangun halaman undangan pernikahan digital full-stack untuk **Ricky & Felly** dengan visual modern-luxury. Project menggunakan Next.js 16 (App Router) + TypeScript yang sudah di-setup, ditambah Supabase sebagai database persisten untuk RSVP & Wishes.

## User Review Required

> [!IMPORTANT]
> **Database Choice: Supabase**
> PRD menyebutkan Supabase (PostgreSQL). Saya akan menggunakan Supabase karena:
> - Gratis tier cukup untuk hometask
> - Mendukung realtime (bonus untuk wishes auto-update)
> - Setup cepat, client library TypeScript-friendly
>
> **Anda perlu membuat project Supabase** dan menyediakan `SUPABASE_URL` + `SUPABASE_ANON_KEY` di file `.env.local`.

> [!IMPORTANT]
> **Tailwind CSS 4 sudah terinstall** — akan digunakan sesuai yang sudah ada di project.

> [!WARNING]
> **Data Acara Placeholder**: Karena ini hometask, saya akan menggunakan data fiktif untuk detail acara (tanggal, waktu, lokasi). Anda bisa mengubahnya nanti di file config.

## Open Questions

> [!IMPORTANT]
> 1. **Apakah Anda sudah punya project Supabase?** Jika belum, saya bisa membantu guide setup-nya.
> 2. **Tanggal acara** — tanggal berapa yang ingin ditampilkan di countdown? (default: 25 Desember 2026)
> 3. **Lokasi acara** — alamat/venue apa yang ditampilkan di maps? (default: hotel mewah di Jakarta)
> 4. **Musik latar** — apakah Anda punya file mp3 yang ingin digunakan? Atau saya gunakan musik royalty-free?

---

## Tech Stack Final

| Layer | Teknologi | Alasan |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript | Sudah di-setup, SSR support, nilai plus di brief |
| Styling | Tailwind CSS 4 | Sudah terinstall, rapid development |
| Animation | GSAP + @gsap/react | Animasi transisi premium, scroll-based animations |
| Icons | Lucide React | Lightweight, tree-shakeable icon library |
| Validation | Zod | Schema validation client & server |
| Database | Supabase (PostgreSQL) | Persisten, gratis, realtime capable |
| API Docs | Swagger UI React | Interactive API documentation |
| Font | Google Fonts (Marcellus + Cormorant Upright + Jost) | Sesuai referensi asli |
| Deploy | Vercel | Native Next.js support, instant deploy |

---

## Design System (Extracted dari Referensi Asli)

> [!NOTE]
> Data berikut di-extract langsung dari source code website referensi:
> https://invitato.net/template-rickyfelly/?code=D3EC9693640

### Color Palette

| Token | Hex | Penggunaan |
|---|---|---|
| `bgPrimary` | `#D5DADE` | Background utama (abu-abu muda kebiruan) |
| `bgSecondary` | `#737373` | Background sekunder (abu medium) |
| `bgAlternative` | `#FFFFFF` | Background alternatif (putih) |
| `mainAssetColor` | `#2C3F4E` | Warna asset utama (dark blue-gray) |
| `bgOpacity` | `#323030` | Background overlay (gelap) |
| `mainColorText` | `#2C3F4E` | Teks utama (dark blue-gray) |
| `secondaryColorText` | `#737373` | Teks sekunder (abu) |
| `alternativeColorText` | `#FEFEFE` | Teks di atas dark background (putih) |

### Typography

| Fungsi | Font Family | Weight | Size |
|---|---|---|---|
| **Heading** | `Marcellus` (Google Fonts, serif/cursive) | 400 | 32px |
| **Body** | `Cormorant Upright` (Google Fonts, serif) | 500 | 19px |
| **Body lv2** | `Cormorant Upright` (Google Fonts, serif) | 500 | 17px |
| **"&" / And symbol** | `Boheme Floral` (custom decorative font) | 300 | 66px |
| **Sans-serif alt** | `Jost` (Google Fonts, sans-serif) | — | — |

> [!TIP]
> **Font `Boheme Floral`** adalah custom font (file `.ttf` di-host sendiri). Untuk hometask ini bisa:
> - Gunakan font decorative serupa dari Google Fonts (misal: `Great Vibes`, `Dancing Script`)
> - Atau cari file TTF Boheme Floral secara terpisah

### Visual Mood
- **Nuansa**: Cool gray-blue, classic-elegant (BUKAN flashy gold seperti tebakan awal)
- **Tone**: Muted, sophisticated, subdued — mirip palette editorial/magazine
- **Background texture**: White satin/silk fabric (`background.jpg` dari asset pack)

---

## Proposed Changes

### Project Structure

```
app/
├── layout.tsx              [MODIFY] - fonts, metadata, musik provider
├── page.tsx                [MODIFY] - main invitation page (single-page)
├── globals.css             [MODIFY] - design system, custom styles
├── api/
│   ├── rsvp/
│   │   └── route.ts        [NEW] - POST /api/rsvp
│   ├── wishes/
│   │   └── route.ts        [NEW] - GET & POST /api/wishes
│   └── docs/
│       └── route.ts        [NEW] - Swagger UI page
├── components/
│   ├── CoverSection.tsx    [NEW] - Opening/cover dengan CTA
│   ├── CoupleSection.tsx   [NEW] - Info pasangan
│   ├── EventSection.tsx    [NEW] - Detail acara (akad & resepsi)
│   ├── CountdownSection.tsx [NEW] - Countdown timer
│   ├── GallerySection.tsx  [NEW] - Photo gallery grid
│   ├── MapSection.tsx      [NEW] - Google Maps embed + link
│   ├── RsvpSection.tsx     [NEW] - Form RSVP
│   ├── WishesSection.tsx   [NEW] - Form wishes + list
│   ├── FooterSection.tsx   [NEW] - Footer/closing
│   ├── MusicToggle.tsx     [NEW] - Floating music button
│   └── ScrollReveal.tsx    [NEW] - Reusable scroll animation wrapper (GSAP)
├── lib/
│   ├── supabase.ts         [NEW] - Supabase client
│   ├── schemas.ts          [NEW] - Zod validation schemas
│   ├── swagger.ts          [NEW] - OpenAPI spec for Swagger UI
│   └── config.ts           [NEW] - Event data config (tanggal, lokasi, dll)
├── hooks/
│   ├── useCountdown.ts     [NEW] - Countdown logic hook
│   └── useMusic.ts         [NEW] - Music player hook
public/
├── assets/                 [NEW] - Optimized images (copy from hometask-assets)
│   ├── 1.png ... 10.png
│   └── background.jpg
├── music/
│   └── bg-music.mp3        [NEW] - Background music file
.env.local                  [NEW] - Supabase credentials
```

---

### 1. Design System & Global Styles

#### [MODIFY] globals.css

- Reset Tailwind defaults
- Define color palette sesuai referensi (`#D5DADE`, `#2C3F4E`, `#737373`, dll)
- Typography: Marcellus (headings), Cormorant Upright (body), Jost (alt sans)
- Custom GSAP-compatible animations: fade-in, slide-up, scale-in
- Section styling: full-height sections, smooth scroll behavior
- Form styling: elegant inputs sesuai tone referensi
- Scrollbar styling

---

### 2. Layout & Metadata

#### [MODIFY] layout.tsx

- Swap fonts to Marcellus + Cormorant Upright + Jost dari Google Fonts
- Update metadata (title: "The Wedding of Ricky & Fellycia by Invitato", description, OG tags)
- Add `scroll-behavior: smooth` ke html
- Wrap children dengan MusicProvider context

---

### 3. Sections (Components)

#### [NEW] CoverSection.tsx
**Cover/Opening** — Fullscreen dengan:
- Background image (asset 1.png) dengan overlay gradasi gelap
- Nama pasangan "Ricky & Fellycia" (font Marcellus heading, Boheme Floral untuk "&")
- Tanggal acara
- Animasi fade-in on load (GSAP)
- CTA button "Open Invitation" yang trigger scroll ke section berikutnya + play music
- Saat cover ditutup, animasi slide-up reveal konten utama

#### [NEW] CoupleSection.tsx
**Info Pasangan** — Split layout:
- Quote/ayat pernikahan
- Foto masing-masing dengan frame elegan
- Nama lengkap pasangan
- Scroll-triggered fade animations (GSAP ScrollTrigger)

#### [NEW] EventSection.tsx
**Detail Acara** — Card layout:
- Akad Nikah: tanggal, waktu, lokasi
- Resepsi: tanggal, waktu, lokasi
- Icon decorations (Lucide React icons)
- Dividers sesuai tone referensi

#### [NEW] CountdownSection.tsx
**Countdown Timer**:
- 4 kotak (Hari, Jam, Menit, Detik) dengan background semi-transparan
- Real-time update menggunakan `useCountdown` hook
- Background image dari asset pack
- Number animation

#### [NEW] GallerySection.tsx
**Photo Gallery**:
- Grid layout menggunakan foto dari asset pack
- Lazy loading dengan Next.js Image
- Hover effect (subtle zoom + overlay)
- Scroll-reveal animation per item (GSAP stagger)
- Lightbox on click (optional bonus)

#### [NEW] MapSection.tsx
**Lokasi & Maps**:
- Google Maps iframe embed
- Alamat venue
- Button "Buka di Google Maps" (external link, Lucide icon)
- Card design matching event section

#### [NEW] RsvpSection.tsx
**Form RSVP** (Client Component):
- Fields: Nama (text), Kehadiran (radio: Hadir/Tidak Hadir), Jumlah Tamu (number)
- Client-side validation dengan Zod
- Submit ke `/api/rsvp`
- Loading state, success toast, error handling

#### [NEW] WishesSection.tsx
**Form Wishes + List** (Client Component):
- Form: Nama (text), Pesan (textarea)
- Submit ke `/api/wishes`
- Daftar wishes (fetch dari `/api/wishes`)
- Pagination / load more
- Timestamp relative ("2 jam yang lalu")
- Auto-refresh setelah submit

#### [NEW] FooterSection.tsx
**Footer/Closing**:
- Pesan penutup dari pasangan
- "Made with ♥ by Invitato"
- Subtle animation

#### [NEW] MusicToggle.tsx
**Floating Music Button**:
- Fixed position di bottom-right
- Toggle play/pause
- Animated sound wave icon saat playing
- Auto-play attempt on "Open Invitation" click

#### [NEW] ScrollReveal.tsx
**Reusable Animation Wrapper**:
- Wraps children dengan GSAP ScrollTrigger
- Triggers animation on scroll into viewport
- Configurable: direction, delay, duration

---

### 4. Backend API

#### [NEW] app/api/rsvp/route.ts
```
POST /api/rsvp
Body: { guest_name: string, attendance: "hadir" | "tidak_hadir", guest_count: number }
Response: 201 { success: true, data: {...} }
         400 { success: false, errors: [...] }
         500 { success: false, message: "..." }
```
- Validasi server-side dengan Zod
- Insert ke Supabase table `rsvps`
- Sanitasi input (trim, escape)

#### [NEW] app/api/wishes/route.ts
```
GET /api/wishes?page=1&limit=10
Response: 200 { success: true, data: [...], total: number }

POST /api/wishes
Body: { name: string, message: string }
Response: 201 { success: true, data: {...} }
         400 { success: false, errors: [...] }
```
- GET: Fetch wishes dengan pagination, ordered by `created_at DESC`
- POST: Validasi + insert
- Sanitasi input

#### [NEW] app/api/docs/ — Swagger UI
- Swagger UI React rendering OpenAPI spec
- Dokumentasi interaktif untuk semua endpoint

---

### 5. Database (Supabase)

#### Tabel `rsvps`
```sql
CREATE TABLE rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('hadir', 'tidak_hadir')),
  guest_count INTEGER NOT NULL DEFAULT 1 CHECK (guest_count >= 1),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Tabel `wishes`
```sql
CREATE TABLE wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Row Level Security
- Enable RLS
- Allow anonymous INSERT on both tables
- Allow anonymous SELECT on `wishes`
- Deny all other operations for anonymous users

---

### 6. Utilities & Hooks

#### [NEW] app/lib/supabase.ts
- Supabase client using `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### [NEW] app/lib/schemas.ts
- Zod schemas untuk RSVP dan Wishes validation

#### [NEW] app/lib/swagger.ts
- OpenAPI 3.0 spec untuk Swagger UI

#### [NEW] app/lib/config.ts
- Centralized config: couple names, event date, venue details, map coordinates
- Easy to modify tanpa ubah komponen

#### [NEW] app/hooks/useCountdown.ts
- Hook yang menghitung sisa waktu ke target date
- Return { days, hours, minutes, seconds }
- Updates setiap detik via `setInterval`

#### [NEW] app/hooks/useMusic.ts
- Hook untuk manage audio element
- Play, pause, toggle, isPlaying state
- Handle autoplay policy (user interaction required)

---

### 7. Main Page Assembly

#### [MODIFY] page.tsx

Assemble semua section dalam urutan:
1. `<CoverSection />` — fullscreen cover
2. `<CoupleSection />` — info pasangan
3. `<EventSection />` — detail acara
4. `<CountdownSection />` — countdown
5. `<GallerySection />` — photo gallery
6. `<MapSection />` — lokasi & maps
7. `<RsvpSection />` — form RSVP
8. `<WishesSection />` — wishes
9. `<FooterSection />` — footer
10. `<MusicToggle />` — floating music button

---

### 8. Asset Optimization

- Copy images from `hometask-assets-rickyfelly/` ke `public/assets/` ✅ (sudah dilakukan)
- Use Next.js `<Image>` component untuk automatic optimization
- Set `sizes` prop untuk responsive images
- Use `priority` hanya untuk cover image (LCP)
- Lazy load semua gallery images

---

## Verification Plan

### Automated Tests
```bash
# Build check — memastikan tidak ada TypeScript/build error
npm run build

# Lint check
npm run lint
```

### Manual Verification
1. **Responsif**: Test di Chrome DevTools (iPhone SE, iPhone 14 Pro, iPad, Desktop 1920px)
2. **RSVP Flow**: Submit form → cek data masuk di Supabase dashboard
3. **Wishes Flow**: Submit wishes → lihat muncul di daftar tanpa refresh
4. **Countdown**: Verifikasi countdown berjalan real-time
5. **Music**: Test autoplay + toggle button
6. **Maps**: Pastikan embed load dan link "Buka di Maps" benar
7. **Animations**: Scroll through semua section, pastikan GSAP animasi smooth
8. **Error Handling**: Submit form kosong, cek validasi muncul
9. **Deploy**: Deploy ke Vercel, test live URL
10. **Swagger UI**: Buka `/api/docs`, test endpoint interaktif

### Performance Check
- Lighthouse score target: Performance > 80, Accessibility > 90
- Check image loading (lazy load benar)
- Check no layout shift (CLS)

---

## Timeline Eksekusi

| Phase | Fokus | Estimasi |
|---|---|---|
| 1 | Install deps, setup Supabase, design system, config | ~30 menit |
| 2 | Cover, Couple, Event sections + GSAP animations | ~1 jam |
| 3 | Countdown, Gallery, Maps sections | ~45 menit |
| 4 | RSVP form + API + Supabase integration | ~45 menit |
| 5 | Wishes form + API + list display | ~45 menit |
| 6 | Music player, floating button, Swagger UI | ~20 menit |
| 7 | Polish: responsive fixes, animations, performance | ~30 menit |
| 8 | README, deploy, final testing | ~30 menit |
| **Total** | | **~5 jam** |
