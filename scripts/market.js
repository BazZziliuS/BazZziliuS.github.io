(function () {
    'use strict';

    var PLUGIN_ID = 'market';

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

    var plugins = [
        // Интерфейс
        { cat: 'market_interface', key: 'in_quality',     name: 'В качестве',                     desc: 'Добавляет в левое меню закладку с новинками в качестве',                                                                                     url: 'https://bazzzilius.github.io/scripts/in_quality.js',       author: '@bylampa' },
        { cat: 'market_interface', key: 'inter_movie',    name: 'Зарубежные подборки',             desc: 'Добавляет в левом меню пункт с зарубежными подборками',                                                                                     url: 'https://bazzzilius.github.io/scripts/inter_movie.js',      author: '@bylampa' },
        { cat: 'market_interface', key: 'rus_movie',      name: 'Русские новинки',                 desc: 'Новинки фильмов и сериалов общим списком и по онлайн-кинотеатрам',                                                                          url: 'https://bazzzilius.github.io/scripts/rus_movie.js',        author: '@bylampa' },
        { cat: 'market_interface', key: 'notice',         name: 'Уведомления',                     desc: 'Показывает новости плагина',                                                                                                                url: 'https://bazzzilius.github.io/scripts/notice.js',           author: '@BazZziliuS' },
        { cat: 'market_interface', key: 'fcp',            name: 'FCP',                             desc: 'Улучшает вашу жизнь',                                                                                                                       url: 'https://bazzzilius.github.io/scripts/fp.js',               author: '@Serega007' },
        { cat: 'market_interface', key: 'surs',           name: 'SURS — уникальные подборки',      desc: 'Уникальные подборки фильмов и сериалов по жанрам, стримингам, популярности, просмотрам и кассовым сборам',                                    url: 'https://aviamovie.github.io/surs.js',                     author: '@aviamovie' },
        { cat: 'market_interface', key: 'filter_content', name: 'Фильтр контента',                 desc: 'Фильтрация карточек через настройки раздела Интерфейс',                                                                                     url: 'https://bazzzilius.github.io/scripts/filter_content.js',   author: '@bylampa' },
        { cat: 'market_interface', key: 'lampa_source',   name: 'Источник ByLAMPA',                desc: 'Добавляет источник ByLAMPA с возможностью сортировки разделов',                                                                              url: 'https://bazzzilius.github.io/scripts/lampa_source.js',     author: '@bylampa' },
        { cat: 'market_interface', key: 'my_bookmarks',   name: 'Мои закладки',                    desc: 'Позволяет создавать свои папки в закладках',                                                                                                 url: 'https://bazzzilius.github.io/scripts/my_bookmarks.js',     author: '@bylampa' },
        { cat: 'market_interface', key: 'seas_and_eps',   name: 'Состояние сериала',               desc: 'Отображает текущий сезон и серию. Вкл/выкл в настройках',                                                                                    url: 'https://bazzzilius.github.io/scripts/seas_and_eps.js',     author: '@bylampa' },
        { cat: 'market_interface', key: 'smart_source',   name: 'Дополнительные источники (8 шт)', desc: 'Добавляет 8 дополнительных источников информации о фильмах',                                                                                url: 'https://bazzzilius.github.io/scripts/smart_source.js',     author: '@scabrum' },
        { cat: 'market_interface', key: 'source',         name: 'Дополнительные источники (2 шт)', desc: 'Добавляет 2 дополнительных источника информации о фильмах',                                                                                 url: 'https://bazzzilius.github.io/scripts/source.js',           author: '@scabrum' },
        { cat: 'market_interface', key: 'feedback',       name: 'Отзывы',                          desc: 'Добавляет в карточке кнопку с отзывами',                                                                                                     url: 'http://newtv.mail66.org/o.js',                             author: '@elenatv99' },
        { cat: 'market_interface', key: 'tricks',         name: 'Tricks',                          desc: 'Приятные мелочи для интерфейса',                                                                                                             url: 'https://andreyurl54.github.io/diesel5/tricks.js',          author: '@AndreyURL54' },
        { cat: 'market_interface', key: 'rating',         name: 'Рейтинг КиноПоиск и IMDB',       desc: 'Показ рейтинга КиноПоиск и IMDB в карточке. Не использовать одновременно с MODSs',                                                           url: 'https://nb557.github.io/plugins/rating.js',               author: '@t_anton' },
        { cat: 'market_interface', key: 'back_menu_tv',   name: 'Фишки для ТВ',                   desc: 'Новые функции в меню выхода (только телевизор)',                                                                                              url: 'https://nb557.github.io/plugins/back.js',                 author: '@bylampa' },
        { cat: 'market_interface', key: 'want',           name: 'Старый стиль пунктов',            desc: 'Возвращает старый стиль отображения пунктов (Закладки, Нравится, Позже)',                                                                     url: 'http://github.freebie.tom.ru/want.js',                    author: '@VitalikPVA' },
        { cat: 'market_interface', key: 'sub_reset',      name: 'Сброс настроек субтитров',        desc: 'Сбрасывает настройки субтитров по умолчанию',                                                                                                url: 'https://nb557.github.io/plugins/reset_subs.js',           author: '@t_anton' },
        { cat: 'market_interface', key: 'new_cat',        name: 'Дополнительные категории',        desc: 'Добавляет категории Документалки, Концерты, Мультфильмы в меню',                                                                             url: 'https://lampame.github.io/main/nc/nc.js',                 author: '@GwynnBleiidd' },

        // Темы и оформление
        { cat: 'market_themes', key: 'interface',    name: 'Стильный интерфейс',  desc: 'Новый стильный интерфейс для каталога TMDB и CUB в стиле Netflix или Кинопоиск',       url: 'https://bazzzilius.github.io/scripts/interface.js',    author: '@lampa' },
        { cat: 'market_themes', key: 'cardify',      name: 'Стильные карточки',   desc: 'Обновлённый вид карточек — более яркий, красочный и привлекательный',                   url: 'https://bazzzilius.github.io/scripts/cardify.js',     author: '@lampa' },
        { cat: 'market_themes', key: 'cub_off',      name: 'Cub Off',             desc: 'Убирает элементы, предлагающие оформить CUB Premium',                                  url: 'https://bazzzilius.github.io/scripts/cub_off.js',     author: '@scabrum' },
        { cat: 'market_themes', key: 'weather',      name: 'Погода',              desc: 'Поочерёдно показывает время и погоду',                                                  url: 'https://bazzzilius.github.io/scripts/weather.js',     author: '@scabrum' },
        { cat: 'market_themes', key: 'snow',         name: 'Снег',                desc: 'Добавляет новогоднее настроение',                                                       url: 'https://bazzzilius.github.io/scripts/snow.js',        author: '@undefined' },
        { cat: 'market_themes', key: 'goldtheme',    name: 'Золотая тема',        desc: 'Включает золотую тему для премиум-пользователей',                                       url: 'https://bazzzilius.github.io/scripts/gold_theme.js',  author: '@lampa' },
        { cat: 'market_themes', key: 'color_vote',   name: 'Цветные оценки',      desc: 'Окрашивает оценки на карточках в зависимости от значения',                              url: 'https://bazzzilius.github.io/scripts/color_vote.js',  author: '@fovway' },
        { cat: 'market_themes', key: 'full_center',  name: 'Card elems center',   desc: 'Центрирует элементы в карточке для мобильной версии',                                   url: 'https://bazzzilius.github.io/scripts/full_center.js', author: '@bylampa' },
        { cat: 'market_themes', key: 'lable_serial', name: 'Лейбл сериала',       desc: 'Заменяет TV на Сериал в лейбле карточки',                                               url: 'https://bazzzilius.github.io/scripts/lable_serial.js', author: '@bylampa' },

        // Управление
        { cat: 'market_management', key: 'exit_menu',   name: 'Выход',                   desc: 'Добавляет пункт Выход в главное меню',                                                                             url: 'https://tsynik.github.io/lampa/e.js',          author: '@tsynik' },
        { cat: 'market_management', key: 'new_version',  name: 'Проверка новой версии',   desc: 'Проверяет наличие новой версии приложения на Android TV',                                                           url: 'https://nemiroff.github.io/lampa/updater.js',  author: '@nemiroff' },
        { cat: 'market_management', key: 'hot_buttons',  name: 'Горячие кнопки',          desc: 'Вызов меню плеера по кнопкам пульта: 5 — плейлист, 8 — аудио, 0 — субтитры, ch+/- — переключение файла',           url: 'https://nnmdd.github.io/lampa_hotkeys/hotkeys.js', author: '@nnmd' },
        { cat: 'market_management', key: 'dlna',         name: 'DLNA (Tizen, Orsay)',     desc: 'Поддержка DLNA; для Tizen необходим виджет >= 1.9.1',                                                              url: 'http://cub.red/plugin/dlna',                   author: '@lampa' },
        { cat: 'market_management', key: 'wsoff',        name: 'Wsoff',                   desc: 'Отключает ошибку «Request was denied for security» на старых Android. Не ставить если ошибки нет',                 url: 'http://plugin.rootu.top/wsoff.js',             author: '@rootu' },
        { cat: 'market_management', key: 'redirect',     name: 'Смена сервера',           desc: 'Позволяет сменить сервер приложения',                                                                               url: 'https://bazzzilius.github.io/scripts/redirect.js', author: '@scabrum' },
        { cat: 'market_management', key: 'cub_sync',     name: 'CUB Sync',                desc: 'Синхронизация закладок и истории с CUB в локальное хранилище',                                                      url: 'https://bazzzilius.github.io/scripts/cub_sync.js', author: '@levende' },

        // Онлайн
        { cat: 'market_online', key: 'online_mod',  name: 'Online_Mod',       desc: 'Фильмы и сериалы онлайн, 7 балансеров',                                                                                             url: 'https://nb557.github.io/plugins/online_mod.js', author: '@t_anton' },
        { cat: 'market_online', key: 'showy',       name: 'Showy',            desc: 'Просмотр фильмов и сериалов онлайн',                                                                                                 url: 'http://showwwy.com/m.js',                      author: '@showy' },
        { cat: 'market_online', key: 'modss',       name: 'Modss',            desc: 'Онлайн с 17 балансерами и настройками. VIP 4K через бот @modssmy_bot',                                                                url: 'http://lampa.stream/modss',                    author: '@Nikolai4' },
        { cat: 'market_online', key: 'bwa_cloud',   name: 'Онлайн BWA Cloud', desc: 'Менее требователен к устройствам, подходит для старых моделей',                                                                       url: 'http://bwa.to/cloud.js',                       author: '@rik' },
        { cat: 'market_online', key: 'prestige',    name: 'Онлайн Prestige',  desc: 'Новый информативный интерфейс для онлайн-просмотра',                                                                                 url: 'https://bwa.to/plugins/prestige.js',           author: '@lampa' },
        { cat: 'market_online', key: 'smotret_ru',  name: 'Смотреть RU',      desc: 'Один стабильный источник, ближе к РФ',                                                                                               url: 'http://smotret24.ru/online.js',                author: '@showy' },
        { cat: 'market_online', key: 'smotret_eu',  name: 'Смотреть EU',      desc: 'Один стабильный источник, ближе к Нидерландам',                                                                                      url: 'http://smotret24.com/online.js',               author: '@showy' },
        { cat: 'market_online', key: 'smotret_4k',  name: 'Смотреть 4K',      desc: 'Один стабильный источник в качестве 4K',                                                                                             url: 'http://smotretk.com/online.js',                author: '@showy' },

        // Торренты
        { cat: 'market_torrents', key: 'switch_parser', name: 'Переключение парсеров', desc: 'Переключение между Jackett-парсерами из преднастроенного списка',                                                             url: 'https://bazzzilius.github.io/scripts/jackett.js',          author: '@AndreyURL54' },
        { cat: 'market_torrents', key: 'tracks',        name: 'Tracks',                desc: 'Замена названий аудиодорожек и субтитров в плеере (только торренты)',                                                          url: 'http://cub.red/plugin/tracks',                            author: '@lampa' },
        { cat: 'market_torrents', key: 'etor',          name: 'Etor (WebOS, Tizen)',   desc: 'Включает настройки Парсер и Torrserver для ТВ из официальных магазинов',                                                       url: 'http://cub.red/plugin/etor',                              author: '@lampa' },

        // ТВ
        { cat: 'market_tv', key: 'diesel',  name: 'Дизель ТВ', desc: 'Бесплатные каналы, EPG и архив просмотра',                                                                                                            url: 'https://andreyurl54.github.io/diesel5/diesel.js', author: '@AndreyURL54' },
        { cat: 'market_tv', key: 'kulik',   name: 'Kulik',     desc: 'IPTV-каналы по категориям с избранным и сменой сервера',                                                                                               url: 'http://cdn.kulik.uz/cors',                        author: '@SawamuraRen' },
        { cat: 'market_tv', key: 'iptv',    name: 'IPTV',      desc: 'Каналы по группам и избранное. Работает с плейлистом от cub.watch',                                                                                    url: 'http://cub.red/plugin/iptv',                      author: '@lampa' },
        { cat: 'market_tv', key: 'hacktv',  name: 'Hack TV',   desc: 'Дополнительный IPTV-плагин',                                                                                                                          url: 'https://bazzzilius.github.io/scripts/tv.js',      author: '@scabrum' }
    ];

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
                        scroll.append(createAdBanner(ad));
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

    function init() {
        register();
        reposition();
        initMetrika();
    }

    if (window.appready) init();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') init();
    });

})();
