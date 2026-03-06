-- Таблица для синхронизации данных Lampa между устройствами
-- Запустить в Supabase SQL Editor

create table if not exists sync_data (
    id         uuid default gen_random_uuid() primary key,
    token      text not null,
    data_key   text not null,
    data_value jsonb not null default '{}',
    updated_at timestamptz not null default now(),
    unique (token, data_key)
);

-- Индекс для быстрого поиска по токену
create index if not exists idx_sync_data_token on sync_data (token);

-- Права для анонимного доступа (через anon key)
grant usage on schema public to anon;
grant select, insert, update, delete on sync_data to anon;

-- RLS: токен >= 16 символов (31^16 ≈ 10^24 комбинаций, подбор невозможен)
alter table sync_data enable row level security;

create policy "select by token"
    on sync_data for select
    using (length(token) >= 16);

create policy "insert by token"
    on sync_data for insert
    with check (length(token) >= 16);

create policy "update by token"
    on sync_data for update
    using (length(token) >= 16)
    with check (length(token) >= 16);

create policy "delete by token"
    on sync_data for delete
    using (length(token) >= 16);
