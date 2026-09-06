-- Treningslogg v2.1 – Supabase-oppsett
-- Kjør hele dette skriptet én gang i Supabase > SQL Editor.

create extension if not exists pgcrypto;

create table if not exists public.training_households (
  id uuid primary key default gen_random_uuid(),
  invite_code text not null unique,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.training_household_members (
  household_id uuid not null references public.training_households(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (household_id, user_id)
);

alter table public.training_households enable row level security;
alter table public.training_household_members enable row level security;

-- Ingen direkte tabelltilgang fra nettleseren. All tilgang går via funksjonene nedenfor,
-- som eksplisitt kontrollerer auth.uid().
revoke all on public.training_households from anon, authenticated;
revoke all on public.training_household_members from anon, authenticated;

create or replace function public.get_my_training_household()
returns table (
  household_id uuid,
  invite_code text,
  data jsonb,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  return query
  select h.id, h.invite_code, h.data, h.updated_at
  from public.training_household_members m
  join public.training_households h on h.id = m.household_id
  where m.user_id = auth.uid()
  order by m.joined_at asc
  limit 1;
end;
$$;

create or replace function public.create_training_household(initial_data jsonb default '{}'::jsonb)
returns table (
  household_id uuid,
  invite_code text,
  data jsonb,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  existing_id uuid;
  new_id uuid;
  new_code text;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select m.household_id into existing_id
  from public.training_household_members m
  where m.user_id = auth.uid()
  limit 1;

  if existing_id is not null then
    return query
    select h.id, h.invite_code, h.data, h.updated_at
    from public.training_households h
    where h.id = existing_id;
    return;
  end if;

  loop
    new_code := upper(encode(gen_random_bytes(6), 'hex'));
    exit when not exists (
      select 1 from public.training_households h where h.invite_code = new_code
    );
  end loop;

  insert into public.training_households(invite_code, data)
  values (new_code, coalesce(initial_data, '{}'::jsonb))
  returning id into new_id;

  insert into public.training_household_members(household_id, user_id)
  values (new_id, auth.uid());

  return query
  select h.id, h.invite_code, h.data, h.updated_at
  from public.training_households h
  where h.id = new_id;
end;
$$;

create or replace function public.join_training_household(code text)
returns table (
  household_id uuid,
  invite_code text,
  data jsonb,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  target_id uuid;
  current_id uuid;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  select m.household_id into current_id
  from public.training_household_members m
  where m.user_id = auth.uid()
  limit 1;

  if current_id is not null then
    return query
    select h.id, h.invite_code, h.data, h.updated_at
    from public.training_households h
    where h.id = current_id;
    return;
  end if;

  select h.id into target_id
  from public.training_households h
  where upper(h.invite_code) = upper(trim(code))
  limit 1;

  if target_id is null then
    raise exception 'Invalid invite code';
  end if;

  insert into public.training_household_members(household_id, user_id)
  values (target_id, auth.uid())
  on conflict do nothing;

  return query
  select h.id, h.invite_code, h.data, h.updated_at
  from public.training_households h
  where h.id = target_id;
end;
$$;

create or replace function public.save_training_state(p_household_id uuid, p_data jsonb)
returns table (updated_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  ts timestamptz;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;

  if not exists (
    select 1
    from public.training_household_members m
    where m.household_id = p_household_id
      and m.user_id = auth.uid()
  ) then
    raise exception 'Not a member of this household';
  end if;

  update public.training_households h
  set data = coalesce(p_data, '{}'::jsonb),
      updated_at = now()
  where h.id = p_household_id
  returning h.updated_at into ts;

  return query select ts;
end;
$$;

revoke all on function public.get_my_training_household() from public;
revoke all on function public.create_training_household(jsonb) from public;
revoke all on function public.join_training_household(text) from public;
revoke all on function public.save_training_state(uuid, jsonb) from public;

grant execute on function public.get_my_training_household() to authenticated;
grant execute on function public.create_training_household(jsonb) to authenticated;
grant execute on function public.join_training_household(text) to authenticated;
grant execute on function public.save_training_state(uuid, jsonb) to authenticated;
