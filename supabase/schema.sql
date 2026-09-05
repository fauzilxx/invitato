-- ==============================================================================
-- Schema Initialization for Invitato (RSVP & Wishes)
-- Full Frontend Feature Alignment
-- ==============================================================================

-- 1. Create table for RSVPs (Full fields from Frontend RSVP form)
create table if not exists public.rsvps (
    id uuid primary key default gen_random_uuid (),
    guest_name text not null,
    phone_code text default '+ 62',
    phone_number text,
    address text,
    email text,
    attendance text not null check (
        attendance in ('hadir', 'tidak_hadir')
    ),
    events text [] default array[]::text [],
    guest_count integer not null default 1 check (
        guest_count >= 1
        and guest_count <= 5
    ),
    created_at timestamptz not null default now()
);

-- 2. Create table for Wishes (Ucapan & Doa)
create table if not exists public.wishes (
    id uuid primary key default gen_random_uuid (),
    name text not null,
    message text not null,
    created_at timestamptz not null default now()
);

-- 3. Indexes for Optimized Querying & Sorting
create index if not exists idx_rsvps_created_at on public.rsvps (created_at desc);

create index if not exists idx_wishes_created_at on public.wishes (created_at desc);

-- 4. Enable Row Level Security (RLS)
alter table public.rsvps enable row level security;

alter table public.wishes enable row level security;

-- 5. RLS Policies for RSVPs (Allow public read & insert)
drop policy if exists "Enable read access for all users on rsvps" on public.rsvps;

create policy "Enable read access for all users on rsvps" on public.rsvps for
select to anon, authenticated using (true);

drop policy if exists "Enable insert access for all users on rsvps" on public.rsvps;

create policy "Enable insert access for all users on rsvps" on public.rsvps for insert to anon,
authenticated
with
    check (true);

-- 6. RLS Policies for Wishes (Allow public read & insert)
drop policy if exists "Enable read access for all users on wishes" on public.wishes;

create policy "Enable read access for all users on wishes" on public.wishes for
select to anon, authenticated using (true);

drop policy if exists "Enable insert access for all users on wishes" on public.wishes;

create policy "Enable insert access for all users on wishes" on public.wishes for insert to anon,
authenticated
with
    check (true);

-- 7. Seed Initial Data for Wishes (Optional sample entries)
insert into
    public.wishes (id, name, message, created_at)
values (
        gen_random_uuid (),
        'Invitato Team',
        'May your love continue to grow each and every year. Best wishes on your wedding Ricky & Fellycia! Thank you for trusting Invitato.',
        now() - interval '2 hours'
    ),
    (
        gen_random_uuid (),
        'Hafiz & Family',
        'Selamat untuk pernikahannya, ya! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah, dan bahagia selalu. 🤍',
        now() - interval '5 hours'
    ),
    (
        gen_random_uuid (),
        'Budi & Sarah',
        'Wishing you a lifetime of love, warmth, and happiness. Happy Wedding Ricky & Fellycia!',
        now() - interval '12 hours'
    )
on conflict do nothing;

-- 8. Enable Supabase Realtime for Wishes table
alter publication supabase_realtime add table public.wishes;