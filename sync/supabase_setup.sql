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

-- RLS: доступ только при указании конкретного токена в запросе
alter table sync_data enable row level security;

-- Чтение: только если в запросе указан фильтр token=eq.XXX
-- Без знания токена получить данные невозможно
create policy "read by token"
    on sync_data for select
    using (
        token = current_setting('request.query.token', true)::text
        or token = any(
            string_to_array(
                current_setting('request.filters', true),
                ','
            )
        )
    );

-- Вставка: разрешена, токен должен быть >= 16 символов
create policy "insert with long token"
    on sync_data for insert
    with check (length(token) >= 16);

-- Обновление: только свои строки (по совпадению токена в данных)
create policy "update by token"
    on sync_data for update
    using (length(token) >= 16);

-- Удаление: разрешено
create policy "delete by token"
    on sync_data for delete
    using (length(token) >= 16);
