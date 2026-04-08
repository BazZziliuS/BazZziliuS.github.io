window.PROJECTS_DATA = {
  "projects": [
    {
      "id": "anonmessage",
      "title": "СпросиМеня",
      "tagline": "Telegram-бот анонимных сообщений",
      "status": "buy",
      "image": "https://i.imgur.com/QyBpkmY.jpeg",
      "tags": ["Python", "Aiogram 3", "SQLAlchemy", "Docker"],
      "short": "Бот для анонимных вопросов с уникальными ссылками, системой раскрытий и покупкой за Telegram Stars.",
      "description": "Telegram-бот анонимных вопросов и сообщений. Пользователь получает уникальную ссылку, делится ей в соцсетях — люди переходят и отправляют анонимные сообщения (текст, фото, видео, голосовые, кружки, стикеры).\n\nВключает систему раскрытий (узнай кто написал за 10 уникальных отправителей), кастомные приветствия, статистику, покупку именной ссылки за Telegram Stars, локализацию RU/EN.\n\nАдмин-панель: рассылка, управление пользователями, просмотр сообщений с пагинацией, статистика, бэкапы.\n\nБезопасность: фильтр ссылок, фильтр банвордов с антиобходом (гомоглифы), система банов, антиспам с эскалацией.\n\n💰 Монетизация: заработок осуществляется автоматически за счёт продажи кастомных ссылок (Telegram Stars) и продажи рекламных рассылок по базе пользователей.\n\n🏷️ Тарифы:\n• Стандарт — 2 990 ₽ · бот + Telegram Stars + админка + фильтры + i18n\n• Под ключ — 5 490 ₽ · Стандарт + установка на ваш сервер + 14 дней поддержки\n\nРазовая оплата. Без подписок. Исходный код — ваш навсегда.",
      "features": [
        "Aiogram 3 + SQLAlchemy 2.0 async ORM",
        "Alembic миграции, Repository pattern",
        "Telegram Stars платежи",
        "i18n (RU/EN), Docker-ready"
      ],
      "links": {
        "buy": "https://t.me/BazZziliuS",
        "source": null,
        "demo": null
      }
    },
    {
      "id": "autoshop",
      "title": "AutoShop",
      "tagline": "Telegram-магазин с Web App витриной",
      "status": "buy",
      "image": "https://blog.cloudea.org/api/content/docs/bots/personal/autoshop/01-catalog.png",
      "tags": ["Python", "Next.js 16", "Tailwind v4", "shadcn/ui"],
      "short": "Готовый бот-магазин цифровых товаров с Web App витриной, 6 платёжками и 10-уровневым рефералом.",
      "description": "Готовый Telegram бот-магазин для продажи цифровых товаров с полноценной Web App витриной внутри Telegram. Поддерживает 6 платёжных систем, 10-уровневую реферальную программу, админ-панель и мгновенную выдачу товаров после оплаты.\n\nВитрина построена на Next.js 16 с Tailwind CSS v4 и shadcn/ui — работает нативно внутри Telegram через Web Apps API.\n\n💰 Монетизация: заработок за счёт продажи текстового или файлового контента — чем наполнять каталог решаете вы. Это могут быть аккаунты, ключи, программы, гайды, подписки или любые другие цифровые товары.\n\n🏷️ Тарифы:\n• Стандарт — 4 990 ₽ · бот + 6 платёжек + рефералы + промокоды + скидки\n• Премиум — 8 990 ₽ · всё из Стандарта + Web App витрина + веб-админка + Docker + Nginx\n• Под ключ — 14 990 ₽ · всё из Премиума + установка на ваш сервер + домен + SSL + 30 дней поддержки\n\nРазовая оплата. Без подписок. Исходный код — ваш навсегда.",
      "features": [
        "Web App витрина: Next.js 16 + Tailwind v4 + shadcn/ui",
        "Платёжки: CryptoBot, ЮMoney, Telegram Stars, Heleket, CrystalPay, Boosty",
        "10-уровневая настраиваемая реферальная система",
        "Админ-панель для каталога и заказов"
      ],
      "links": {
        "buy": "https://t.me/BazZziliuS",
        "source": null,
        "demo": "https://blog.cloudea.org/docs/bots/personal/autoshop"
      }
    },
    {
      "id": "boostylib",
      "title": "boostylib",
      "tagline": "Async Python library для Boosty API",
      "status": "opensource",
      "image": null,
      "tags": ["Python", "asyncio", "httpx", "OpenSource"],
      "short": "Асинхронная Python-библиотека для Boosty.to API с middleware, retry и автообновлением токенов.",
      "description": "Асинхронная Python-библиотека для работы с Boosty.to API. Позволяет управлять подписками, постами и донатами, а также автоматизировать взаимодействие с платформой.\n\nПолностью OpenSource — можно использовать, изучать и контрибьютить.",
      "features": [
        "Автообновление токенов с pluggable storage",
        "Retry с exponential backoff + rate limiting",
        "Middleware pipeline для кастомной обработки",
        "Browser-like HTTP fingerprint для write-операций"
      ],
      "links": {
        "buy": null,
        "source": "https://github.com/BazZziliuS/boostylib",
        "demo": "https://bazzzilius.github.io/boostylib/"
      }
    },
    {
      "id": "centurybot",
      "title": "CenturyBOT",
      "tagline": "Discord-бот для CenturyMine",
      "status": "private",
      "image": "https://i.imgur.com/pxvn8aN.png",
      "tags": ["Python", "discord.py", "Private"],
      "short": "Многофункциональный Discord-бот для автоматизации тикетов, вакансий и розыгрышей на сервере CenturyMine.",
      "description": "Многофункциональный Discord-бот для сервера CenturyMine. Автоматизирует работу персонала и внутренние процессы сервера.\n\nПриватный проект — разработан под нужды конкретного коммьюнити, не распространяется.",
      "features": [
        "Система тикетов поддержки",
        "Управление вакансиями и заявками",
        "Проведение розыгрышей",
        "Мониторинг сервера"
      ],
      "links": {
        "buy": null,
        "source": null,
        "demo": "https://fuix.io/discord"
      }
    }
  ]
};
