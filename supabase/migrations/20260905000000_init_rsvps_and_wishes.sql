-- Migration: 20260905000000_init_rsvps_and_wishes.sql
-- Description: Create rsvps and wishes tables matching Frontend fields with RLS policies

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  guest_name text not null,
  phone_code text default '+ 62',
  phone_number text,
  address text,
  email text,
  attendance text not null check (attendance in ('hadir', 'tidak_hadir')),
  events text[] default array[]::text[],
  guest_count integer not null default 1 check (guest_count >= 1 and guest_count <= 10),
  created_at timestamptz not null default now()
);

create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_rsvps_created_at on public.rsvps (created_at desc);
create index if not exists idx_wishes_created_at on public.wishes (created_at desc);

alter table public.rsvps enable row level security;
alter table public.wishes enable row level security;

drop policy if exists "Enable read access for all users on rsvps" on public.rsvps;
create policy "Enable read access for all users on rsvps"
  on public.rsvps for select
  to anon, authenticated
  using (true);

drop policy if exists "Enable insert access for all users on rsvps" on public.rsvps;
create policy "Enable insert access for all users on rsvps"
  on public.rsvps for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Enable read access for all users on wishes" on public.wishes;
create policy "Enable read access for all users on wishes"
  on public.wishes for select
  to anon, authenticated
  using (true);

drop policy if exists "Enable insert access for all users on wishes" on public.wishes;
create policy "Enable insert access for all users on wishes"
  on public.wishes for insert
  to anon, authenticated
  with check (true);
