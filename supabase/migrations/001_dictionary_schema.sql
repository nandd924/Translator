create table if not exists public.dictionary_entries (
  id text primary key,
  ho_word text not null,
  hi_word text not null,
  alternate_spellings jsonb default '[]'::jsonb,
  meanings jsonb default '[]'::jsonb,
  status text not null default 'pending' check (status in ('verified', 'unverified', 'pending')),
  provenance text default 'unreviewed',
  reviewed_at timestamptz,
  source_page integer,
  examples jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.contributions (
  id text primary key,
  ho_text text not null,
  hindi_meaning text not null,
  script_used text not null,
  context text,
  dialect text,
  contributor_name text,
  consent boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

alter table public.dictionary_entries enable row level security;
alter table public.contributions enable row level security;

create policy "Public dictionary read access"
on public.dictionary_entries
for select
using (status = 'verified');

create policy "Contributions insert policy"
on public.contributions
for insert
with check (true);

create policy "Contributions private read for authenticated reviewers"
on public.contributions
for select
using (auth.role() = 'authenticated');

create policy "Dictionary management for authenticated reviewers"
on public.dictionary_entries
for all
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');
