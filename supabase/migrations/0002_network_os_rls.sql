-- ============================================================================
-- AI CREATOR NETWORK OS — Phase 1 — Row Level Security
-- ----------------------------------------------------------------------------
-- Access model: the OS is an internal back-office. Any authenticated user with
-- a row in cn_profiles is a member and can read. Writing requires role
-- owner | admin | editor. The service role key bypasses RLS entirely and is
-- what server-side jobs (metric sync, AI generation) use.
-- ============================================================================

create or replace function cn_is_member()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from cn_profiles p where p.user_id = auth.uid()
  );
$$;

create or replace function cn_can_write()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from cn_profiles p
    where p.user_id = auth.uid()
      and p.role in ('owner', 'admin', 'editor')
  );
$$;

create or replace function cn_is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from cn_profiles p
    where p.user_id = auth.uid() and p.role in ('owner', 'admin')
  );
$$;

-- ── Enable RLS + standard member/writer policies on every OS table ──────────

do $$
declare t text;
begin
  foreach t in array array[
    'cn_characters','cn_character_assets','cn_platform_accounts',
    'cn_references','cn_content_dna','cn_ideas','cn_hooks','cn_scripts',
    'cn_productions','cn_assets','cn_products','cn_product_character_scores',
    'cn_experiments','cn_experiment_variants','cn_publications',
    'cn_publication_metrics','cn_revenue','cn_monetisation_programmes',
    'cn_monetisation_progress','cn_prompts','cn_compliance_checks'
  ]
  loop
    execute format('alter table %I enable row level security', t);

    execute format(
      'create policy %I on %I for select to authenticated using (cn_is_member())',
      t || '_select', t);

    execute format(
      'create policy %I on %I for insert to authenticated with check (cn_can_write())',
      t || '_insert', t);

    execute format(
      'create policy %I on %I for update to authenticated
         using (cn_can_write()) with check (cn_can_write())',
      t || '_update', t);

    execute format(
      'create policy %I on %I for delete to authenticated using (cn_is_admin())',
      t || '_delete', t);
  end loop;
end $$;

-- ── Profiles: a member reads the roster, only admins change roles ──────────

alter table cn_profiles enable row level security;

create policy cn_profiles_select on cn_profiles
  for select to authenticated
  using (user_id = auth.uid() or cn_is_member());

create policy cn_profiles_self_update on cn_profiles
  for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and role = (select role from cn_profiles where user_id = auth.uid()));

create policy cn_profiles_admin_write on cn_profiles
  for all to authenticated
  using (cn_is_admin())
  with check (cn_is_admin());
