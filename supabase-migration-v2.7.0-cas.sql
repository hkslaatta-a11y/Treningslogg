-- Treningslogg 2.7.0: atomisk versjonskontroll for delte treningsdata
-- Kjores EN GANG i Supabase SQL Editor etter at v2.6.2-data er sikkerhetskopiert.
-- Legger til nye, autentiserte RPC-er. Eldre 2.6.2-RPC-er beholdes for tilbakekompatibilitet.
--
-- VIKTIG: Eldre klienter bruker fortsatt save_training_state som ikke sjekker forventet
-- revisjon. Triggeren under teller ogsa deres lagringer, slik at v2.7 oppdager dem,
-- men kun oppdaterte klienter beskyttes mot aa overskrive hverandre.
begin;

alter table public.training_households
  add column if not exists revision bigint not null default 0;

-- Alle oppdateringer (ogsa legacy-RPC og adminendringer) utloser ny revisjon.
create or replace function public.training_household_increment_revision()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.revision := old.revision + 1;
  return new;
end;
$$;

drop trigger if exists trg_training_household_revision on public.training_households;
create trigger trg_training_household_revision
before update on public.training_households
for each row execute function public.training_household_increment_revision();

create or replace function public.get_my_training_household_checked()
returns table (
  household_id uuid,
  invite_code text,
  data jsonb,
  updated_at timestamptz,
  revision bigint
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'Not authenticated'; end if;
  return query
  select h.id, h.invite_code, h.data, h.updated_at, h.revision
  from public.training_household_members m
  join public.training_households h on h.id = m.household_id
  where m.user_id = auth.uid()
  order by m.joined_at asc
  limit 1;
end;
$$;

-- Atomisk compare-and-swap: to samtidige UPDATE-er laases og reevaluerer WHERE revision.
create or replace function public.save_training_state_checked(
  p_household_id uuid,
  p_data jsonb,
  p_expected_revision bigint
)
returns table (
  saved boolean,
  revision bigint,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_revision bigint;
  v_updated_at timestamptz;
begin
  if auth.uid() is null then raise exception 'Not authenticated'; end if;
  if p_expected_revision is null or p_expected_revision < 0 then
    raise exception 'Invalid expected revision';
  end if;
  if not exists (
    select 1 from public.training_household_members m
    where m.household_id = p_household_id and m.user_id = auth.uid()
  ) then
    raise exception 'Not a member of this household';
  end if;

  update public.training_households h
  set data = coalesce(p_data, '{}'::jsonb),
      updated_at = now()
  where h.id = p_household_id
    and h.revision = p_expected_revision
  returning h.revision, h.updated_at
  into v_revision, v_updated_at;

  if found then
    return query select true, v_revision, v_updated_at;
    return;
  end if;

  -- Konflikt: ingen data ble overskrevet. Klienten maa lese ny versjon og flette.
  return query
  select false, h.revision, h.updated_at
  from public.training_households h
  where h.id = p_household_id;
end;
$$;

revoke all on function public.get_my_training_household_checked() from public, anon;
revoke all on function public.save_training_state_checked(uuid,jsonb,bigint) from public, anon;
grant execute on function public.get_my_training_household_checked() to authenticated;
grant execute on function public.save_training_state_checked(uuid,jsonb,bigint) to authenticated;

commit;

-- Etter migrering kan dette kjor es for a bekrefte revisjoner (SQL Editor):
-- select id, revision, updated_at from public.training_households order by updated_at desc;
