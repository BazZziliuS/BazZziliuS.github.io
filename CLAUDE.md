# CLAUDE.md — Контекст проекта для Claude Code

## Проект

Репозиторий плагинов для приложения **Lampa** — медиацентра для просмотра фильмов и сериалов.
- GitHub Pages: `https://bazzzilius.github.io/`
- Исходники Lampa: https://github.com/yumata/lampa-source / https://github.com/yumata/lampa

## Структура репозитория

```
scripts/          — Плагины для Lampa (JavaScript)
  addons.js       — Главный плагин: UI для установки/удаления остальных плагинов через настройки
  addon.js        — Альтернативная версия менеджера плагинов
  readme.md       — Документация по всем плагинам
img/              — Изображения (обложки, иконки)
font/             — Шрифты (Acrom)
notice/           — JSON-файлы уведомлений (notice.json)
index.html        — Лендинг
```

## Соглашения

- Язык комментариев и коммитов: **русский**
- Все скрипты — самодостаточные IIFE без внешних зависимостей (кроме Lampa API и jQuery)
- URL плагинов для установки: `https://bazzzilius.github.io/scripts/<name>.js`
- SVG-иконки хранятся как строковые константы внутри скриптов
- Формат записи плагина для addons.js:
  ```javascript
  { component: '<категория>', key: '<ключ>', name: '<Название>', description: '<Описание>', url: '<URL>', author: '<Автор>' }
  ```

## Архитектура Lampa (из исходников)

Lampa — SPA на jQuery, собранное через Gulp + Rollup. Глобальный объект `window.Lampa` содержит ~75 модулей. Подробная документация по API — в файле [LAMPA_API.md](./LAMPA_API.md).

### Жизненный цикл приложения

1. `initClass()` — создаёт `window.Lampa` со всеми модулями
2. `loadLang()` — загрузка языкового пакета
3. `loadTask()` — приоритетная загрузка: кэш, Storage, зеркала, **плагины**, VPN, аккаунт
4. `startApp()` — инициализация ~40 сервисов
5. `Lampa.Listener.send('app', {type: 'ready'})` — приложение готово, плагины могут стартовать

### Паттерн инициализации плагина

```javascript
(function () {
    'use strict';

    function start() {
        // Логика плагина
    }

    if (window.appready) {
        start();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') start();
        });
    }
})();
```
