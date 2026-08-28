-- =============================================================
--  DURAN IMPORTS — Esquema do banco (Supabase / PostgreSQL)
--  Rode no Supabase:  Dashboard -> SQL Editor -> New query -> cole tudo -> Run
-- =============================================================

create extension if not exists "pgcrypto";

-- -------------------------------------------------------------
-- 1) TABELA PRODUTOS
-- -------------------------------------------------------------
create table if not exists public.produtos (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique,
  nome          text not null,
  categoria     text not null
                check (categoria in ('perfumes','pods','liquidos')),
  descricao     text,
  preco         numeric(10,2) check (preco is null or preco >= 0), -- null = "Consulte o preço"
  sabores       text[] not null default '{}',                      -- lista de sabores (pods/líquidos)
  imagem        text,        -- caminho "/products/..." (embutido) OU path do Storage OU URL http
  destaque      boolean not null default false,                    -- aparece em "Destaques"
  esgotado      boolean not null default false,
  ordem         integer not null default 0,
  criado_em     timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create index if not exists produtos_categoria_idx on public.produtos (categoria);
create index if not exists produtos_destaque_idx  on public.produtos (destaque) where destaque;

create or replace function public.tg_set_atualizado_em()
returns trigger language plpgsql as $$
begin
  new.atualizado_em = now();
  return new;
end;
$$;

drop trigger if exists set_atualizado_em on public.produtos;
create trigger set_atualizado_em
  before update on public.produtos
  for each row execute function public.tg_set_atualizado_em();

-- -------------------------------------------------------------
-- 2) ADMINS
-- -------------------------------------------------------------
create table if not exists public.admins (
  user_id   uuid primary key references auth.users (id) on delete cascade,
  criado_em timestamptz not null default now()
);

alter table public.admins enable row level security;

drop policy if exists "admin ve a si mesmo" on public.admins;
create policy "admin ve a si mesmo"
  on public.admins for select
  to authenticated
  using (user_id = auth.uid());

create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- -------------------------------------------------------------
-- 3) RLS na tabela produtos
--    SELECT  -> público (catálogo)
--    INSERT/UPDATE/DELETE -> só admin
-- -------------------------------------------------------------
alter table public.produtos enable row level security;

drop policy if exists "produtos: leitura publica" on public.produtos;
drop policy if exists "produtos: admin insere"    on public.produtos;
drop policy if exists "produtos: admin atualiza"  on public.produtos;
drop policy if exists "produtos: admin deleta"    on public.produtos;

create policy "produtos: leitura publica"
  on public.produtos for select using (true);

create policy "produtos: admin insere"
  on public.produtos for insert to authenticated
  with check (public.is_admin());

create policy "produtos: admin atualiza"
  on public.produtos for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

create policy "produtos: admin deleta"
  on public.produtos for delete to authenticated
  using (public.is_admin());

-- -------------------------------------------------------------
-- 4) STORAGE — bucket público "produtos" (fotos enviadas pelo painel)
-- -------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('produtos', 'produtos', true)
on conflict (id) do nothing;

drop policy if exists "storage produtos: leitura publica" on storage.objects;
drop policy if exists "storage produtos: admin envia"     on storage.objects;
drop policy if exists "storage produtos: admin atualiza"  on storage.objects;
drop policy if exists "storage produtos: admin deleta"    on storage.objects;

create policy "storage produtos: leitura publica"
  on storage.objects for select using (bucket_id = 'produtos');

create policy "storage produtos: admin envia"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'produtos' and public.is_admin());

create policy "storage produtos: admin atualiza"
  on storage.objects for update to authenticated
  using (bucket_id = 'produtos' and public.is_admin());

create policy "storage produtos: admin deleta"
  on storage.objects for delete to authenticated
  using (bucket_id = 'produtos' and public.is_admin());

-- -------------------------------------------------------------
-- 5) DEPOIS de criar seu usuário (Authentication -> Add user),
--    registre-o como admin (troque o e-mail):
--
--  insert into public.admins (user_id)
--  select id from auth.users where email = 'dono@duranimports.com';
-- -------------------------------------------------------------

-- -------------------------------------------------------------
-- 6) CATÁLOGO INICIAL (os 37 produtos que já estavam no site)
-- -------------------------------------------------------------
insert into public.produtos (slug, nome, categoria, imagem, sabores, ordem) values
  ('mugler-angel', 'Angel Body Lotion — Mugler', 'perfumes', '/products/perfumes/mugler-angel-body-lotion.png', '{}'::text[], 1),
  ('arina-ajyad', 'Arina — Ajyad', 'perfumes', '/products/perfumes/arina-ajyad.png', '{}'::text[], 2),
  ('asad-lattafa', 'Asad — Lattafa', 'perfumes', '/products/perfumes/asad-lattafa.jpeg', '{}'::text[], 3),
  ('asad-bourbon', 'Asad Bourbon — Lattafa', 'perfumes', '/products/perfumes/asad-bourbon-lattafa.jpg', '{}'::text[], 4),
  ('atheeri-lattafa', 'Atheeri — Lattafa', 'perfumes', '/products/perfumes/atheeri-lattafa.jpg', '{}'::text[], 5),
  ('fakhar-lattafa', 'Fakhar — Lattafa', 'perfumes', '/products/perfumes/fakhar-lattafa.jpg', '{}'::text[], 6),
  ('haussmann-boulevard', 'Haussmann — Boulevard Paris', 'perfumes', '/products/perfumes/haussmann-boulevard.jpg', '{}'::text[], 7),
  ('club-de-nuit-iconic', 'Club de Nuit Iconic — Armaf', 'perfumes', '/products/perfumes/club-de-nuit-iconic.jpg', '{}'::text[], 8),
  ('invictus-victory', 'Invictus Victory — Paco Rabanne', 'perfumes', '/products/perfumes/invictus-victory.jpg', '{}'::text[], 9),
  ('la-vie-est-belle', 'La Vie Est Belle — Lancôme', 'perfumes', '/products/perfumes/la-vie-est-belle.png', '{}'::text[], 10),
  ('musamam-white', 'Musamam White Intense — Lattafa', 'perfumes', '/products/perfumes/musamam-white-intense.png', '{}'::text[], 11),
  ('musamam-black', 'Musamam Black Intense — Lattafa', 'perfumes', '/products/perfumes/musamam-black-intense.jpg', '{}'::text[], 12),
  ('phantom-paco-rabanne', 'Phantom — Paco Rabanne', 'perfumes', '/products/perfumes/phantom-paco-rabanne.jpeg', '{}'::text[], 13),
  ('port-royal-boulevard', 'Port Royal — Boulevard Paris', 'perfumes', '/products/perfumes/port-royal-boulevard.png', '{}'::text[], 14),
  ('r2b2-space-x', 'R2B2 Space X — Reyane Tradition', 'perfumes', '/products/perfumes/r2b2-space-x.jpg', '{}'::text[], 15),
  ('vanilla-caramel-ajyad', 'Vanilla Caramel — Ajyad', 'perfumes', '/products/perfumes/vanilla-caramel-ajyad.jpeg', '{}'::text[], 16),
  ('yara-candy', 'Yara Candy — Lattafa', 'perfumes', '/products/perfumes/yara-candy-lattafa.jpeg', '{}'::text[], 17),
  ('black-sheep-40k', 'The Black Sheep Dual Flavor', 'pods', '/products/pods/black-sheep-40k.png', array['Cool Mint', 'Grape / Passion Fruit', 'Fresh Mint / Mango Orange', 'Grape / Grape Mango', 'Grape / Menthol', 'Blueberry Bubble / Sour Green Apple', 'Açaí Strawberry / Açaí Grape', 'Fresh Mint / Passion Fruit', 'Grape / Strawberry Kiwi', 'Strawberry Watermelon / Fresh Mint', 'Miami Mint / Strawberry Kiwi']::text[], 18),
  ('black-sheep-cartridge-15k', 'The Black Sheep Cartridge 15K', 'pods', '/products/pods/black-sheep-cartridge-15k.webp', array['Grape', 'Açaí Grape', 'Energy Drink', 'Aloe Grape', 'Miami Mint', 'Menthol', 'Passion Fruit', 'Strawberry Watermelon']::text[], 19),
  ('elfbar-duke', 'ElfBar Duke', 'pods', '/products/pods/elfbar-duke.jpg', array['Fanta Grape', 'Strawberry Kiwi ice', 'Peach Mango WaterMelon', 'Pineapple Ice']::text[], 20),
  ('elfbar-ice-king', 'ElfBar Ice King Turbo', 'pods', '/products/pods/elfbar-ice-king.jpg', array['Havaian Slush', 'WildBerry', 'Passion Flash']::text[], 21),
  ('elfbar-te30k', 'ElfBar TE30K', 'pods', '/products/pods/elfbar-te30k.jpg', array['Winter Mint', 'Bubaloo Grape', 'Bobaloo TutiFruit', 'Elf Love', 'Strawberry Ice']::text[], 22),
  ('elfbar-trio', 'ElfBar Trio Turbo', 'pods', '/products/pods/elfbar-trio.png', array['Raspberry Watermelon', 'Blue Razz Ice', 'Pineapple Lime']::text[], 23),
  ('ignite-frozen', 'Ignite Frozen', 'pods', '/products/pods/ignite-frozen.png', array['Icy Mint', 'Strawberry Banana', 'Pineapple Ice']::text[], 24),
  ('ignite-ice', 'Ignite Ice', 'pods', '/products/pods/ignite-ice.jpg', array['Strawberry', 'Menthol', 'PineApple kiwi']::text[], 25),
  ('ignite-mix', 'Ignite Mix (sabor duplo)', 'pods', '/products/pods/ignite-mix.png', array['WaterMelon Grape Ice / Acai Ice', 'Ice Mint / Peach Grape', 'Grape Ice / Watermelon Ice', 'Might Melon / Menthol']::text[], 26),
  ('ignite-v30', 'Ignite V300', 'pods', '/products/pods/ignite-v30.jpg', array['Banana Coconut Ice', 'Pineapple Ice']::text[], 27),
  ('ignite-v55', 'Ignite V55 Ultra Thin', 'pods', '/products/pods/ignite-v55.png', '{}'::text[], 28),
  ('ignite-blueberry-ice', 'Ignite V155', 'pods', '/products/pods/ignite-blueberry-ice.jpg', array['Menthol', 'Kiwi Passion', 'Green Apple', 'Strawberry W. ice', 'Banana Ice', 'Watermelon Ice', 'Strawberry Banana', 'Tropical Acai']::text[], 29),
  ('ignite-v50-special', 'Ignite V50 Special Edition — 5000 Puffs', 'pods', '/products/pods/ignite-v50-special.jpg', array['Strawberry Banana']::text[], 30),
  ('life-pod-one', 'Life Pod One 40K', 'pods', '/products/pods/life-pod-one.png', array['Passion Mango', 'Watermelon Bubblegum', 'Strawberry Bubblegum', 'Love 66 (Maracujá + Melão Ice)', 'Bluerazz Bubblegum', 'Miami Mint', 'Grape Ice']::text[], 31),
  ('ignite-v80', 'Ignite V80 — 8000 Puffs (Black Edition)', 'pods', '/products/pods/ignite-v80.png', array['Blueberry Lemon', 'Banana Ice', 'Blueberry Ice', 'Grape Fruit Mint', 'Icy Mint', 'Menthol', 'Strawberry Kiwi', 'Watermelon Ice']::text[], 32),
  ('waka-icon-50k', 'Waka Icon 50K', 'pods', '/products/pods/waka-icon-50k.png', array['Watermelon Ice', 'Blueberry Mint', 'Fresh Mint', 'Cool Mint', 'Cherry Watermelon', 'Grape Strawberry', 'Peach Mango Watermelon', 'Kiwi Dragon Berry', 'Strawberry Kiwi', 'Strawberry Guava']::text[], 33),
  ('ignite-v500', 'Ignite V500', 'pods', '/products/pods/ignite-v500.jpeg', array['Kiwi Acai', 'Pineapple Ice', 'Grape Ice', 'Green Apple', 'Strawberry Ice', 'Cool Menthol']::text[], 34),
  ('mr-freeze-pure-ice', 'Mr. Freeze Menthol 100ml', 'liquidos', '/products/liquidos/mr-freeze-pure-ice.jpg', array['Pure Ice', 'Grape Frost', 'Blue Razz Frost', 'Strawberry Banana Frost', 'Peach Frost', 'Watermelon Frost', 'Spearmint Frost', 'Apple Frost']::text[], 35),
  ('blvk-mint', 'BLVK Mint — Nicotine Salt 30ml', 'liquidos', '/products/liquidos/blvk-mint-spearmint.png', array['Original Spearmint', 'Double Spearmint', 'Melon Spearmint']::text[], 36),
  ('blvk-fruit-ice', 'BLVK Fruit Ice — Nicotine Salt 30ml', 'liquidos', '/products/liquidos/blvk-fruit-ice-lychee.jpg', array['Sweet Lychee']::text[], 37)
on conflict (slug) do nothing;
