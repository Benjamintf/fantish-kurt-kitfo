-- Fantish Kurt and Kitfo: base schema, policies, protected order RPCs, and Realtime.
-- Run this migration in a fresh Supabase project before loading supabase/seed.sql.
create extension if not exists pgcrypto;

do $$ begin
  create type public.staff_role as enum ('admin', 'kitchen');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.order_status as enum ('new', 'preparing', 'ready', 'served', 'cancelled');
exception when duplicate_object then null; end $$;
do $$ begin
  create type public.request_status as enum ('new', 'in_progress', 'completed');
exception when duplicate_object then null; end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.staff_role not null default 'kitchen',
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.restaurant_tables (
  id uuid primary key default gen_random_uuid(),
  label text not null unique check (char_length(trim(label)) between 1 and 80),
  qr_token uuid not null unique default gen_random_uuid(),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  kind text not null check (kind in ('food', 'drink')),
  name_en text not null check (char_length(trim(name_en)) > 0),
  name_am text not null check (char_length(trim(name_am)) > 0),
  description_en text not null default '',
  description_am text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.menu_categories(id) on delete restrict,
  name_en text not null check (char_length(trim(name_en)) > 0),
  name_am text not null check (char_length(trim(name_am)) > 0),
  description_en text not null default '',
  description_am text not null default '',
  ingredients_en text not null default '',
  ingredients_am text not null default '',
  cultural_note_en text not null default '',
  cultural_note_am text not null default '',
  price_etb numeric(12,2) not null check (price_etb >= 0),
  sort_order integer not null default 0,
  is_available boolean not null default true,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menu_item_images (
  id uuid primary key default gen_random_uuid(),
  menu_item_id uuid not null references public.menu_items(id) on delete cascade,
  image_url text not null check (image_url ~ '^https?://'),
  alt_en text not null default '',
  alt_am text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  unique (menu_item_id, sort_order)
);

create table if not exists public.hotel_services (
  id uuid primary key default gen_random_uuid(),
  title_en text not null,
  title_am text not null,
  description_en text not null default '',
  description_am text not null default '',
  request_label_en text not null,
  request_label_am text not null,
  image_url text not null check (image_url ~ '^https?://'),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  table_id uuid not null references public.restaurant_tables(id) on delete restrict,
  status public.order_status not null default 'new',
  guest_note text,
  subtotal_etb numeric(12,2) not null check (subtotal_etb >= 0),
  tracking_token uuid not null unique default gen_random_uuid(),
  idempotency_key uuid not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (table_id, idempotency_key)
);
create index if not exists orders_status_created_at_idx on public.orders(status, created_at desc);
create index if not exists orders_tracking_token_idx on public.orders(tracking_token);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  menu_item_id uuid references public.menu_items(id) on delete set null,
  item_name_en text not null,
  item_name_am text not null,
  unit_price_etb numeric(12,2) not null check (unit_price_etb >= 0),
  quantity integer not null check (quantity between 1 and 20),
  preparation_note text,
  created_at timestamptz not null default now()
);

create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  table_id uuid not null references public.restaurant_tables(id) on delete restrict,
  hotel_service_id uuid not null references public.hotel_services(id) on delete restrict,
  note text,
  status public.request_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists service_requests_status_created_at_idx on public.service_requests(status, created_at desc);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$ begin insert into public.profiles (id, display_name) values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))) on conflict (id) do nothing; return new; end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
drop trigger if exists restaurant_tables_updated_at on public.restaurant_tables;
create trigger restaurant_tables_updated_at before update on public.restaurant_tables for each row execute procedure public.set_updated_at();
drop trigger if exists menu_categories_updated_at on public.menu_categories;
create trigger menu_categories_updated_at before update on public.menu_categories for each row execute procedure public.set_updated_at();
drop trigger if exists menu_items_updated_at on public.menu_items;
create trigger menu_items_updated_at before update on public.menu_items for each row execute procedure public.set_updated_at();
drop trigger if exists hotel_services_updated_at on public.hotel_services;
create trigger hotel_services_updated_at before update on public.hotel_services for each row execute procedure public.set_updated_at();
drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders for each row execute procedure public.set_updated_at();
drop trigger if exists service_requests_updated_at on public.service_requests;
create trigger service_requests_updated_at before update on public.service_requests for each row execute procedure public.set_updated_at();

create or replace function public.is_staff() returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin', 'kitchen')); $$;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

alter table public.profiles enable row level security;
alter table public.restaurant_tables enable row level security;
alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;
alter table public.menu_item_images enable row level security;
alter table public.hotel_services enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.service_requests enable row level security;

create policy "profiles: user reads own" on public.profiles for select to authenticated using (id = auth.uid());
create policy "profiles: admin manages" on public.profiles for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "tables: admins manage" on public.restaurant_tables for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "categories: public active read" on public.menu_categories for select to anon, authenticated using (is_active or public.is_admin());
create policy "categories: admins manage" on public.menu_categories for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "items: public available read" on public.menu_items for select to anon, authenticated using ((is_active and is_available) or public.is_admin());
create policy "items: admins manage" on public.menu_items for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "images: public read" on public.menu_item_images for select to anon, authenticated using (exists (select 1 from public.menu_items item where item.id = menu_item_id and ((item.is_active and item.is_available) or public.is_admin())));
create policy "images: admins manage" on public.menu_item_images for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "services: public active read" on public.hotel_services for select to anon, authenticated using (is_active or public.is_admin());
create policy "services: admins manage" on public.hotel_services for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "orders: staff read" on public.orders for select to authenticated using (public.is_staff());
create policy "orders: staff update" on public.orders for update to authenticated using (public.is_staff()) with check (public.is_staff());
create policy "order items: staff read" on public.order_items for select to authenticated using (public.is_staff());
create policy "service requests: staff read" on public.service_requests for select to authenticated using (public.is_staff());
create policy "service requests: staff update" on public.service_requests for update to authenticated using (public.is_staff()) with check (public.is_staff());

grant usage on schema public to anon, authenticated, service_role;
grant select on public.menu_categories, public.menu_items, public.menu_item_images, public.hotel_services to anon;
grant select on public.profiles, public.menu_categories, public.menu_items, public.menu_item_images, public.hotel_services, public.orders, public.order_items, public.service_requests to authenticated;
grant insert, update, delete on public.restaurant_tables, public.menu_categories, public.menu_items, public.menu_item_images, public.hotel_services to authenticated;
grant update on public.orders, public.service_requests to authenticated;

-- Guest writes use these RPCs only. They calculate totals from current database prices.
create or replace function public.place_table_order(
  p_qr_token uuid,
  p_items jsonb,
  p_guest_note text default '',
  p_idempotency_key uuid default gen_random_uuid()
) returns table (order_id uuid, tracking_token uuid, order_status public.order_status, subtotal_etb numeric)
language plpgsql security definer set search_path = public as $$
declare
  v_table public.restaurant_tables%rowtype;
  v_existing public.orders%rowtype;
  v_item public.menu_items%rowtype;
  v_line jsonb;
  v_item_id uuid;
  v_quantity integer;
  v_note text;
  v_total numeric(12,2) := 0;
  v_order_id uuid;
  v_tracking_token uuid;
begin
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 or jsonb_array_length(p_items) > 20 then raise exception 'Order must contain between 1 and 20 items'; end if;
  select * into v_table from public.restaurant_tables where qr_token = p_qr_token and is_active = true;
  if not found then raise exception 'Table QR code is not active'; end if;
  select * into v_existing from public.orders where table_id = v_table.id and idempotency_key = p_idempotency_key;
  if found then return query select v_existing.id, v_existing.tracking_token, v_existing.status, v_existing.subtotal_etb; return; end if;
  for v_line in select * from jsonb_array_elements(p_items) loop
    v_item_id := (v_line ->> 'menu_item_id')::uuid;
    v_quantity := (v_line ->> 'quantity')::integer;
    if v_quantity not between 1 and 20 then raise exception 'Invalid quantity'; end if;
    select * into v_item from public.menu_items where id = v_item_id and is_active = true and is_available = true;
    if not found then raise exception 'Item is not available'; end if;
    v_total := v_total + (v_item.price_etb * v_quantity);
  end loop;
  insert into public.orders (table_id, guest_note, subtotal_etb, idempotency_key) values (v_table.id, nullif(left(coalesce(p_guest_note, ''), 500), ''), v_total, p_idempotency_key) returning id, tracking_token into v_order_id, v_tracking_token;
  for v_line in select * from jsonb_array_elements(p_items) loop
    v_item_id := (v_line ->> 'menu_item_id')::uuid;
    v_quantity := (v_line ->> 'quantity')::integer;
    v_note := nullif(left(coalesce(v_line ->> 'note', ''), 280), '');
    select * into v_item from public.menu_items where id = v_item_id;
    insert into public.order_items (order_id, menu_item_id, item_name_en, item_name_am, unit_price_etb, quantity, preparation_note) values (v_order_id, v_item.id, v_item.name_en, v_item.name_am, v_item.price_etb, v_quantity, v_note);
  end loop;
  return query select v_order_id, v_tracking_token, 'new'::public.order_status, v_total;
end; $$;

create or replace function public.create_service_request(p_qr_token uuid, p_service_id uuid, p_note text default '') returns uuid
language plpgsql security definer set search_path = public as $$
declare v_table_id uuid; v_request_id uuid;
begin
  select id into v_table_id from public.restaurant_tables where qr_token = p_qr_token and is_active = true;
  if not found then raise exception 'Table QR code is not active'; end if;
  if not exists (select 1 from public.hotel_services where id = p_service_id and is_active = true) then raise exception 'Service is unavailable'; end if;
  insert into public.service_requests (table_id, hotel_service_id, note) values (v_table_id, p_service_id, nullif(left(coalesce(p_note, ''), 500), '')) returning id into v_request_id;
  return v_request_id;
end; $$;

revoke all on function public.place_table_order(uuid, jsonb, text, uuid) from public, anon, authenticated;
revoke all on function public.create_service_request(uuid, uuid, text) from public, anon, authenticated;
grant execute on function public.place_table_order(uuid, jsonb, text, uuid) to service_role;
grant execute on function public.create_service_request(uuid, uuid, text) to service_role;

insert into storage.buckets (id, name, public) values ('menu-media', 'menu-media', true) on conflict (id) do update set public = true;
create policy "menu media is public" on storage.objects for select to public using (bucket_id = 'menu-media');
create policy "admins manage menu media" on storage.objects for all to authenticated using (bucket_id = 'menu-media' and public.is_admin()) with check (bucket_id = 'menu-media' and public.is_admin());

alter publication supabase_realtime add table public.orders, public.service_requests;
