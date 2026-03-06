(function () {
    'use strict';

    // Привязка к домену — плагин работает только с bazzzilius.github.io
    var ALLOWED_HOST = 'bazzzilius.github.io';
    var selfScript = Array.from(document.querySelectorAll('script[src]')).find(function (s) {
        return s.src.indexOf('market') >= 0;
    });
    if (selfScript && selfScript.src.indexOf(ALLOWED_HOST) === -1) return;

    var PLUGIN_ID = 'market';
    var BASE_URL  = 'https://bazzzilius.github.io/market/';

    var icons = {
        market: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h6v6h-6z"/><path d="M14 4h6v6h-6z"/><path d="M4 14h6v6h-6z"/><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/></svg>',
        interface: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/><path d="M6 8h.01"/><path d="M9 8h.01"/></svg>',
        themes: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21v-4a4 4 0 1 1 4 4h-4"/><path d="M21 3a16 16 0 0 0 -12.8 10.2"/><path d="M21 3a16 16 0 0 1 -10.2 12.8"/><path d="M10.6 9a9 9 0 0 1 4.4 4.4"/></svg>',
        online: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 9m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v9.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z"/><path d="M17 3m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v15.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z"/><path d="M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/></svg>',
        management: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/><path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/></svg>',
        torrents: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/><path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0"/><path d="M12 2l0 2"/><path d="M12 20l0 2"/><path d="M20 12l2 0"/><path d="M2 12l2 0"/></svg>',
        tv: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/><path d="M16 3l-4 4l-4 -4"/></svg>'
    };

    // =========================================================================
    //  Каталог плагинов
    // =========================================================================

    var categories = [
        { id: 'market_interface',  name: 'Интерфейс',          icon: icons.interface },
        { id: 'market_themes',     name: 'Темы и оформление',  icon: icons.themes },
        { id: 'market_online',     name: 'Онлайн',             icon: icons.online },
        { id: 'market_management', name: 'Управление',         icon: icons.management },
        { id: 'market_torrents',   name: 'Торренты',           icon: icons.torrents },
        { id: 'market_tv',         name: 'ТВ',                 icon: icons.tv }
    ];

    var plugins = [];

    // =========================================================================
    //  Стили
    // =========================================================================

    var css = document.createElement('style');
    css.textContent = [
        '.market-item { position: relative; }',
        '.market-item .settings-param__value { display: none !important; }',
        '.market-item .settings-param__name { color: #f3d900; }',
        '.market-status { position: absolute; right: 1em; top: 50%; transform: translateY(-50%); width: 0.7em; height: 0.7em; border-radius: 50%; }',
        '.market-status--on  { background-color: #4caf50; box-shadow: 0 0 6px #4caf50; }',
        '.market-status--off { background-color: #f44336; box-shadow: 0 0 6px #f44336; }',
        '.market-cat-row { display: flex; align-items: center; padding: 0 !important; }',
        '.market-cat-row__icon { width: 1.8em; height: 1.3em; padding-right: 0.5em; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }',
        '.market-cat-row__name { font-size: 1.3em; }',
        '.market-author { font-size: 0.8em; color: #999; margin-top: 0.2em; }',
        '.market-ad { background: #383838; border-radius: 0.8em; overflow: hidden; text-align: center; margin: 0.5em 0; padding: 0.8em; cursor: pointer; }',
        '.market-ad.focus { box-shadow: 0 0 0 2px #fff; transform: scale(1.02); }',
        '.market-ad__title { font-size: 1.1em; font-weight: bold; color: #ff9800; margin-bottom: 0.3em; }',
        '.market-ad__text { font-size: 0.9em; color: #ccc; margin-bottom: 0.5em; }',
        '.market-ad__btn { display: inline-block; background: #ff9800; color: #000; padding: 0.4em 1em; border-radius: 2em; font-weight: bold; font-size: 0.9em; }'
    ].join('\n');
    document.head.appendChild(css);

    // =========================================================================
    //  Работа с плагинами
    // =========================================================================

    function getPlugins() {
        return Lampa.Storage.get('plugins', '[]') || [];
    }

    function isInstalled(url) {
        return getPlugins().some(function (p) {
            return p.url === url && p.status !== 0;
        });
    }

    function installPlugin(plugin) {
        if (isInstalled(plugin.url)) {
            Lampa.Noty.show('Плагин уже установлен');
            return;
        }

        var list = getPlugins();
        list.push({
            author: plugin.author,
            url: plugin.url,
            name: plugin.name,
            status: 1
        });
        Lampa.Storage.set('plugins', list);

        var script = document.createElement('script');
        script.src = plugin.url;
        document.head.appendChild(script);

        Lampa.Noty.show(plugin.name + ' — установлен');
        Lampa.Settings.update();
    }

    function removePlugin(plugin) {
        var list = getPlugins().filter(function (p) {
            return p.url !== plugin.url;
        });
        Lampa.Storage.set('plugins', list);

        Lampa.Noty.show(plugin.name + ' — удалён. Перезагрузите приложение');
        Lampa.Settings.update();
    }

    // =========================================================================
    //  Показ действий по плагину через Select
    // =========================================================================

    function showPluginActions(plugin) {
        var installed = isInstalled(plugin.url);

        var items = [];

        if (!installed) {
            items.push({ title: 'Установить', value: 'install' });
        } else {
            items.push({ title: 'Удалить', value: 'remove' });
        }

        Lampa.Select.show({
            title: plugin.name,
            items: items,
            onBack: function () {
                Lampa.Controller.toggle('settings_component');
            },
            onSelect: function (item) {
                if (item.value === 'install') installPlugin(plugin);
                if (item.value === 'remove') removePlugin(plugin);

                Lampa.Controller.toggle('settings_component');
            }
        });
    }

    // =========================================================================
    //  Отображение статуса на элементе
    // =========================================================================

    function renderStatus(item, plugin) {
        var dot = $('<div class="market-status"></div>');
        dot.addClass(isInstalled(plugin.url) ? 'market-status--on' : 'market-status--off');
        item.addClass('market-item').append(dot);

        if (plugin.author) {
            item.find('.settings-param__name').after(
                '<div class="market-author">' + plugin.author + '</div>'
            );
        }
    }

    // =========================================================================
    //  Открытие категории через Settings.create с поддержкой back
    // =========================================================================

    function openCategory(categoryId) {
        Lampa.Settings.create(categoryId, {
            onBack: function () {
                Lampa.Settings.create(PLUGIN_ID);
            }
        });
    }

    // =========================================================================
    //  Регистрация компонентов и параметров
    // =========================================================================

    function register() {
        // Главный раздел «Маркет»
        Lampa.SettingsApi.addComponent({
            component: PLUGIN_ID,
            name: 'Маркет плагинов',
            icon: icons.market
        });

        // Подкатегории
        categories.forEach(function (cat) {
            // Регистрируем компонент-экран для каждой категории
            Lampa.SettingsApi.addComponent({ component: cat.id, name: cat.name, icon: cat.icon });

            // Пункт-ссылка внутри главного экрана маркета
            Lampa.SettingsApi.addParam({
                component: PLUGIN_ID,
                param: { name: cat.id, type: 'static' },
                field: { name: cat.name },
                onRender: function (item) {
                    item.find('.settings-param__name').html(
                        '<div class="market-cat-row settings-folder">' +
                            '<div class="market-cat-row__icon">' + cat.icon + '</div>' +
                            '<div class="market-cat-row__name">' + cat.name + '</div>' +
                        '</div>'
                    );

                    // Считаем установленные плагины в категории
                    var total = 0;
                    var installed = 0;
                    plugins.forEach(function (p) {
                        if (p.cat === cat.id) {
                            total++;
                            if (isInstalled(p.url)) installed++;
                        }
                    });

                    if (installed > 0) {
                        item.find('.market-cat-row__name').append(
                            '<span style="color:#4caf50;font-size:0.65em;margin-left:0.5em">' + installed + '/' + total + '</span>'
                        );
                    }

                    item.on('hover:enter', function () {
                        openCategory(cat.id);
                    });
                }
            });

            // Плагины внутри экрана категории
            plugins.forEach(function (plugin) {
                if (plugin.cat !== cat.id) return;

                Lampa.SettingsApi.addParam({
                    component: cat.id,
                    param: { name: 'market_p_' + plugin.key, type: 'static' },
                    field: { name: plugin.name, description: plugin.desc },
                    onRender: function (item) {
                        renderStatus(item, plugin);
                        item.on('hover:enter', function () {
                            showPluginActions(plugin);
                        });
                    }
                });
            });
        });
    }

    // =========================================================================
    //  Рекламный баннер (загрузка из JSON, ротация при каждом открытии)
    // =========================================================================

    var ADS_URL = 'https://bazzzilius.github.io/market/ads.json';
    var adsCache = null;
    var adsLastIndex = -1;

    function loadAds(callback) {
        if (adsCache) return callback(adsCache);

        var network = new Lampa.Reguest();
        network.timeout(5000);
        network.silent(ADS_URL, function (data) {
            if (data && data.length) {
                adsCache = data;
                callback(data);
            }
        }, function () {
            // при ошибке загрузки — не показываем баннер
        });
    }

    function pickAd(ads) {
        if (ads.length === 1) return ads[0];

        var index;
        do {
            index = Math.floor(Math.random() * ads.length);
        } while (index === adsLastIndex && ads.length > 1);

        adsLastIndex = index;
        return ads[index];
    }

    function createAdBanner(ad) {
        var color = ad.color || '#ff9800';
        var el = $(
            '<div class="market-ad selector">' +
                '<div class="market-ad__title"></div>' +
                '<div class="market-ad__text"></div>' +
                '<div class="market-ad__btn"></div>' +
            '</div>'
        );

        el.find('.market-ad__title').text(ad.title).css('color', color);
        el.find('.market-ad__text').text(ad.text);
        el.find('.market-ad__btn').text(ad.btn).css('background', color);

        el.on('hover:enter', function () {
            window.open(ad.url, '_blank');
        });

        return el;
    }

    // =========================================================================
    //  Позиционирование в меню настроек
    // =========================================================================

    function reposition() {
        Lampa.Settings.listener.follow('open', function (e) {
            if (e.name === 'main') {
                // Скрываем плитки подкатегорий из корня настроек
                categories.forEach(function (cat) {
                    e.body.find('[data-component="' + cat.id + '"]').remove();
                });

                // Ставим маркет перед стандартным разделом «Плагины»
                var standard = e.body.find('[data-component="plugins"]');
                var market   = e.body.find('[data-component="' + PLUGIN_ID + '"]');
                if (standard.length && market.length) {
                    standard.before(market);
                }
            }

            // Баннер внизу главного экрана маркета — новый при каждом открытии
            if (e.name === PLUGIN_ID) {
                var scroll = e.body.find('.scroll__content');
                if (scroll.length) {
                    scroll.find('.market-ad').remove();

                    loadAds(function (ads) {
                        var ad = pickAd(ads);
                        var banner = createAdBanner(ad);
                        scroll.append(banner);
                        Lampa.Controller.collectionAppend(banner[0]);
                    });
                }
            }
        });
    }

    // =========================================================================
    //  Яндекс.Метрика
    // =========================================================================

    function initMetrika() {
        (function (m, e, t, r, i, k, a) {
            m[i] = m[i] || function () {
                (m[i].a = m[i].a || []).push(arguments);
            };
            m[i].l = 1 * new Date();
            for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) return;
            }
            k = e.createElement(t);
            a = e.getElementsByTagName(t)[0];
            k.async = 1;
            k.src = r;
            a.parentNode.insertBefore(k, a);
        })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

        ym(87238418, 'init', {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true
        });

        $('body').append(
            '<noscript><div><img src="https://mc.yandex.ru/watch/87238418" style="position:absolute;left:-9999px;" alt=""></div></noscript>'
        );
    }

    // =========================================================================
    //  Инициализация
    // =========================================================================

    function loadPluginsList(callback) {
        var network = new Lampa.Reguest();
        network.timeout(8000);
        network.silent(BASE_URL + 'plugins.json', function (data) {
            if (data && data.length) {
                plugins = data;
            }
            callback();
        }, function () {
            callback();
        });
    }

    function init() {
        loadPluginsList(function () {
            register();
            reposition();
        });
        initMetrika();
    }

    if (window.appready) init();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') init();
    });

})();
