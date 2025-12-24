(function () {
    'use strict';

    /**
     * Константы
     */
    const CONSTANTS = {
        STORAGE_KEYS: {
            PLUGINS: 'plugins',
            NEED_REBOOT: 'needReboot',
            NEED_REBOOT_SETTINGS_EXIT: 'needRebootSettingExit',
            PLUGINS_INITED: 'addons_plugins_inited',
            AD_INITED: 'addons_ad_inited'
        },
        TIMEOUTS: {
            PLUGIN_INSTALL: 300,
            SETTINGS_UPDATE: 50,
            MENU_REORDER: 60,
            AD_INJECT: 100,
            STATUS_RENDER: 100
        },
        SELECTORS: {
            SETTINGS_BODY: '.settings .settings__content .settings__body > div',
            SETTINGS_LAYER: '#settings_layer',
            SETTINGS_CONTENT: '#settings_layer .settings-content',
            HIDE_INSTALL: '#hideInstall'
        }
    };

    /**
     * Иконки (вынесены в объект)
     */
    const icons = {
        add_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-category"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h6v6h-6z" /><path d="M14 4h6v6h-6z" /><path d="M4 14h6v6h-6z" /><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>',
        add_interface_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-app-window"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M6 8h.01" /><path d="M9 8h.01" /></svg>',
        add_management_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-layout-cards"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /></svg>',
        add_online_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-google-analytics"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 9m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v9.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z" /><path d="M17 3m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v15.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z" /><path d="M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></svg>',
        add_torrent_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-current-location"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" /><path d="M12 2l0 2" /><path d="M12 20l0 2" /><path d="M20 12l2 0" /><path d="M2 12l2 0" /></svg>',
        add_tv_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-device-tv"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M16 3l-4 4l-4 -4" /></svg>',
        add_theme_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brush"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21v-4a4 4 0 1 1 4 4h-4" /><path d="M21 3a16 16 0 0 0 -12.8 10.2" /><path d="M21 3a16 16 0 0 1 -10.2 12.8" /><path d="M10.6 9a9 9 0 0 1 4.4 4.4" /></svg>'
    };

    /**
     * HTML рекламы
     */
    const ads = `
        <div style="padding: 0.5em;">
            <div
                class="addon-promo-block"
                style="background:#383838; border-radius:0.8em; overflow:hidden; text-align:center; outline: none; transition: all 0.3s ease;"
                tabindex="0"
            >
                <!-- текстовый блок -->
                <div style="padding:0.8em;">
                    <div style="font-size:1.2em; font-weight:bold; color:#ff9800; margin-bottom:0.3em;">
                        🔥 VEESP VPS — свой виртуальный сервер
                    </div>
                    <div style="font-size:0.95em; color:#ccc; margin-bottom:0.8em;">
                        Развёрни личный VPS на мощном и недорогом хостинге.
                    </div>

                    <!-- кнопка -->
                    <a href="https://cloudea.org/vps" target="_blank" rel="noopener noreferrer"
                    style="display:inline-block; background:#ff9800; color:#000; padding:0.5em 1.2em; border-radius:2em; font-weight:bold; text-decoration:none;">
                        Перейти →
                    </a>
                </div>
            </div>
        </div>
    `;

    /**
     * Утилиты
     */

    /**
     * Показывает модальное окно с предложением перезагрузки
     * @param {string} reloadText - Текст сообщения
     */
    function showReload(reloadText) {
        try {
            Lampa.Modal.open({
                title: '',
                align: 'center',
                zIndex: 300,
                html: $('<div class="about">').text(reloadText),
                buttons: [
                    {
                        name: 'Нет',
                        onSelect: () => {
                            Lampa.Modal.close();
                            $('.modal').remove();
                            Lampa.Controller.toggle('settings_component');
                        }
                    },
                    {
                        name: 'Да',
                        onSelect: () => window.location.reload()
                    }
                ]
            });
        } catch (error) {
            console.error('[Addons] Ошибка отображения модального окна:', error);
        }
    }

    /**
     * Отслеживает закрытие настроек через MutationObserver
     */
    function settingsWatch() {
        if (!Lampa.Storage.get(CONSTANTS.STORAGE_KEYS.NEED_REBOOT_SETTINGS_EXIT)) {
            return;
        }

        const targetNode = document.querySelector('#app');
        if (!targetNode) return;

        const observer = new MutationObserver(() => {
            const settingsElement = document.querySelector(CONSTANTS.SELECTORS.SETTINGS_BODY);

            if (!settingsElement) {
                observer.disconnect();
                showReload('Для полного удаления плагина перезагрузите приложение!');
            }
        });

        observer.observe(targetNode, {
            childList: true,
            subtree: true
        });
    }

    /**
     * Валидация URL плагина
     * @param {string} url - URL для проверки
     * @returns {boolean} - true если URL валиден
     */
    function isValidPluginUrl(url) {
        try {
            const parsedUrl = new URL(url);
            const allowedProtocols = ['http:', 'https:'];
            return allowedProtocols.includes(parsedUrl.protocol) && url.endsWith('.js');
        } catch {
            return false;
        }
    }

    /**
     * Загрузка скрипта плагина
     * @param {string} url - URL скрипта
     * @returns {Promise} - Promise загрузки скрипта
     */
    function loadScript(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * Установка плагина
     * @param {string} url - URL плагина
     * @param {string} name - Название плагина
     * @param {string} author - Автор плагина
     * @param {string} key - Ключ плагина
     */
    function itemON(url, name, author, key) {
        try {
            if ($(`div[data-name="${key}"]`).find('.settings-param__status').hasClass('active')) {
                return Lampa.Noty.show('Плагин уже установлен!');
            }

            if (!isValidPluginUrl(url)) {
                return Lampa.Noty.show('Недопустимый URL плагина!');
            }

            if (Lampa.Storage.get(CONSTANTS.STORAGE_KEYS.NEED_REBOOT)) {
                return;
            }

            const pluginsArray = Lampa.Storage.get(CONSTANTS.STORAGE_KEYS.PLUGINS) || [];
            pluginsArray.push({ author, url, name, status: 1 });
            Lampa.Storage.set(CONSTANTS.STORAGE_KEYS.PLUGINS, pluginsArray);

            loadScript(url)
                .then(() => {
                    setTimeout(() => {
                        Lampa.Settings.update();
                        Lampa.Noty.show(`Плагин ${name} успешно установлен`);
                    }, CONSTANTS.TIMEOUTS.PLUGIN_INSTALL);
                })
                .catch((error) => {
                    console.error('[Addons] Ошибка загрузки плагина:', error);
                    Lampa.Noty.show(`Ошибка загрузки плагина ${name}`);
                    // Откатываем изменения
                    const plugins = Lampa.Storage.get(CONSTANTS.STORAGE_KEYS.PLUGINS) || [];
                    const rollback = plugins.filter((p) => p.url !== url);
                    Lampa.Storage.set(CONSTANTS.STORAGE_KEYS.PLUGINS, rollback);
                });
        } catch (error) {
            console.error('[Addons] Ошибка установки плагина:', error);
            Lampa.Noty.show('Ошибка установки плагина');
        }
    }

    /**
     * Удаление плагина
     * @param {string} pluginUrl - URL плагина для удаления
     */
    function deletePlugin(pluginUrl) {
        try {
            const plugins = Lampa.Storage.get(CONSTANTS.STORAGE_KEYS.PLUGINS) || [];
            const updated = plugins.filter((p) => p.url !== pluginUrl);
            Lampa.Storage.set(CONSTANTS.STORAGE_KEYS.PLUGINS, updated);
            Lampa.Settings.update();
            Lampa.Noty.show('Плагин успешно удален');
            Lampa.Storage.set(CONSTANTS.STORAGE_KEYS.NEED_REBOOT_SETTINGS_EXIT, true);
            settingsWatch();
        } catch (error) {
            console.error('[Addons] Ошибка удаления плагина:', error);
            Lampa.Noty.show('Ошибка удаления плагина');
        }
    }

    /**
     * Проверка установки плагина
     * @param {string} url - URL плагина
     * @returns {boolean} - true если плагин установлен
     */
    function checkPlugin(url) {
        try {
            const plugins = Lampa.Storage.get(CONSTANTS.STORAGE_KEYS.PLUGINS) || [];
            return plugins.some((p) => p.url === url && p.status !== 0);
        } catch (error) {
            console.error('[Addons] Ошибка проверки плагина:', error);
            return false;
        }
    }

    /**
     * Отрисовка статуса плагина
     * @param {jQuery} item - Элемент плагина
     * @param {string} pluginUrl - URL плагина
     * @param {string} pluginKey - Ключ плагина
     */
    function renderPluginStatus(item, pluginUrl, pluginKey) {
        try {
            $('.settings-param__name', item).css('color', '#f3d900');

            $(CONSTANTS.SELECTORS.HIDE_INSTALL).remove();
            $('body').append(
                '<div id="hideInstall"><style>div.settings-param__value{opacity:0!important;display:none;}</style></div>'
            );

            setTimeout(() => {
                const statusContainer = $('<div class="settings-param__status one"></div>');
                $(`div[data-name="${pluginKey}"]`).append(statusContainer);
                statusContainer
                    .removeClass('active error wait')
                    .addClass(checkPlugin(pluginUrl) ? 'active' : 'error');
            }, CONSTANTS.TIMEOUTS.STATUS_RENDER);
        } catch (error) {
            console.error('[Addons] Ошибка отрисовки статуса:', error);
        }
    }

    /**
     * Обработка изменения состояния плагина
     * @param {string} value - Значение (1 - установить, 2 - удалить)
     * @param {string} pluginUrl - URL плагина
     * @param {string} name - Название плагина
     * @param {string} author - Автор плагина
     * @param {string} key - Ключ плагина
     */
    function handlePluginChange(value, pluginUrl, name, author, key) {
        if (value === '1') itemON(pluginUrl, name, author, key);
        if (value === '2') deletePlugin(pluginUrl);
    }

    /**
     * Добавляем главную категорию и вложенные подкатегории
     */

    /**
     * Конфигурация подкатегорий
     */
    const subcategories = [
        { c: 'add_interface_plugin', n: 'Интерфейс', i: icons.add_interface_plugin },
        { c: 'add_theme_plugin', n: 'Темы и оформление', i: icons.add_theme_plugin },
        { c: 'add_online_plugin', n: 'Онлайн', i: icons.add_online_plugin },
        { c: 'add_management_plugin', n: 'Управление', i: icons.add_management_plugin },
        { c: 'add_torrent_plugin', n: 'Торренты', i: icons.add_torrent_plugin },
        { c: 'add_tv_plugin', n: 'ТВ', i: icons.add_tv_plugin }
    ];

    /**
     * Создание HTML для пункта подкатегории
     * @param {Object} sc - Объект подкатегории
     * @returns {string} - HTML строка
     */
    function createSubcategoryHTML(sc) {
        return `
            <div class="settings-folder" style="padding:0!important;display:flex;align-items:center">
                <div style="width:1.8em;height:1.3em;padding-right:.5em;flex-shrink:0;display:flex;align-items:center;justify-content:center">
                    ${sc.i}
                </div>
                <div style="font-size:1.3em">${sc.n}</div>
            </div>
        `;
    }

    /**
     * Инициализация подкатегорий
     */
    function initSubcategories() {
        subcategories.forEach(sc => {
            // Добавляем экран подкатегории
            Lampa.SettingsApi.addComponent({
                component: sc.c,
                name: sc.n,
                icon: sc.i
            });

            // Добавляем пункт в «Плагинах»
            Lampa.SettingsApi.addParam({
                component: 'add_plugin',
                param: { name: sc.c, type: 'static', default: true },
                field: { name: sc.n },
                onRender: (item) => {
                    item.find('.settings-param__name').html(createSubcategoryHTML(sc));

                    item.on('hover:enter', () => {
                        Lampa.Settings.create(sc.c);
                        const ctrl = Lampa.Controller.enabled();
                        if (ctrl && ctrl.controller) {
                            ctrl.controller.back = () => Lampa.Settings.create('add_plugin');
                        }
                    });
                }
            });
        });

        Lampa.Storage.set(CONSTANTS.STORAGE_KEYS.PLUGINS_INITED, true);
    }

    /**
     * Инициализация рекламы
     */
    function initAdvertisement() {
        Lampa.SettingsApi.addParam({
            component: 'add_plugin',
            param: { name: 'add_ads', type: 'title' },
            field: { name: ads }
        });

        Lampa.Storage.set(CONSTANTS.STORAGE_KEYS.AD_INITED, true);

        // Добавляем обработчик фокуса для рекламного блока
        requestAnimationFrame(() => {
            const promoBlock = document.querySelector('.addon-promo-block');
            if (promoBlock) {
                promoBlock.addEventListener('focus', function() {
                    this.style.boxShadow = '0 0 10px 3px #ff9800';
                    this.style.transform = 'scale(1.02)';
                });
                promoBlock.addEventListener('blur', function() {
                    this.style.boxShadow = 'none';
                    this.style.transform = 'scale(1)';
                });
            }
        });
    }

    /**
     * Реорганизация DOM элементов настроек
     */
    function reorganizeSettings() {
        requestAnimationFrame(() => {
            // Удаляем плитки подкатегорий из корня
            subcategories.forEach(sc => {
                const component = document.querySelector(`div[data-component="${sc.c}"]`);
                if (component) component.remove();
            });

            // Поднимаем «Плагины» выше стандартного блока
            const pluginsBlock = document.querySelector('div[data-component="plugins"]');
            const addPluginBlock = document.querySelector('div[data-component="add_plugin"]');

            if (pluginsBlock && addPluginBlock) {
                pluginsBlock.parentNode.insertBefore(addPluginBlock, pluginsBlock);
            }

            // Переносим рекламный блок в конец
            const adsElement = document.querySelector(`${CONSTANTS.SELECTORS.SETTINGS_LAYER} .settings-param[data-name="add_ads"]`);
            const settingsContent = document.querySelector(CONSTANTS.SELECTORS.SETTINGS_CONTENT);

            if (adsElement && settingsContent) {
                settingsContent.appendChild(adsElement);
            }
        });
    }

    // Главная категория «Плагины»
    Lampa.SettingsApi.addComponent({
        component: 'add_plugin',
        name: 'Плагины',
        icon: icons.add_plugin
    });

    // При открытии главного меню
    Lampa.Settings.listener.follow('open', (e) => {
        if (e.name !== 'main') return;

        try {
            // Инициализация подкатегорий (только один раз)
            if (!Lampa.Storage.get(CONSTANTS.STORAGE_KEYS.PLUGINS_INITED)) {
                initSubcategories();
            }

            // Инициализация рекламы (только один раз)
            if (!Lampa.Storage.get(CONSTANTS.STORAGE_KEYS.AD_INITED)) {
                setTimeout(() => initAdvertisement(), CONSTANTS.TIMEOUTS.AD_INJECT);
            }

            // Реорганизация DOM
            reorganizeSettings();
        } catch (error) {
            console.error('[Addons] Ошибка инициализации настроек:', error);
        }
    });


    /**
     * Список всех плагинов
     */
    const pluginsList = [
        // Интерфейс
        { component: 'add_interface_plugin', key: 'in_quality', name: 'В качестве', description: 'Добавляет в левое меню закладку с новинками в качестве', url: 'https://bazzzilius.github.io/scripts/in_quality.js', author: '@bylampa' },
        { component: 'add_interface_plugin', key: 'inter_movie', name: 'Зарубежные подборки', description: 'Плагин добавляет в левом меню пункт с зарубежными подборками', url: 'https://bazzzilius.github.io/scripts/inter_movie.js', author: '@bylampa' },
        { component: 'add_interface_plugin', key: 'rus_movie', name: 'Русские новинки', description: 'Плагин добавляет в левом меню пункт с русскими новинками фильмов и сериалов общим списком и отсортированных по онлайн кинотеатрам', url: 'https://bazzzilius.github.io/scripts/rus_movie.js', author: '@bylampa' },
        { component: 'add_interface_plugin', key: 'notice', name: 'Уведомления', description: 'Плагин добавляет новости плагина', url: 'https://bazzzilius.github.io/scripts/notice.js', author: '@BazZziliuS' },
        { component: 'add_interface_plugin', key: 'fcp', name: 'FCP', description: 'Улучшает вашу жизнь', url: 'https://bazzzilius.github.io/scripts/fp.js', author: '@Serega007' },
        { component: 'add_interface_plugin', key: 'surs', name: 'SURS — уникальные подборки', description: 'Плагин создает уникальные подборки фильмов и сериалов на главной странице по жанрам, стримингам, популярности, просмотрам и кассовым сборам.', url: 'https://aviamovie.github.io/surs.js', author: '@aviamovie' },
        { component: 'add_interface_plugin', key: 'filter_content', name: 'Фильтр контента', description: 'Плагин позволяет фильтровать вывод карточек в приложении через настройки в разделе интерфейс - пункт Фильтр контента', url: 'https://bazzzilius.github.io/scripts/filter_content.js', author: '@bylampa' },
        { component: 'add_interface_plugin', key: 'lampa_source', name: 'Источник ByLAMPA', description: 'Плагин добавляет источник ByLAMPA, в котором можно сортировать/изменять отображение разделов под свой вкус', url: 'https://bazzzilius.github.io/scripts/lampa_source.js', author: '@bylampa' },
        { component: 'add_interface_plugin', key: 'my_bookmarks', name: 'Мои закладки', description: 'Плагин позволяет создавать свои папки в закладках', url: 'https://bazzzilius.github.io/scripts/my_bookmarks.js', author: '@bylampa' },
        { component: 'add_interface_plugin', key: 'seas_and_eps', name: 'Состояние сериала', description: 'Плагин отображает текущее состояние сериала (сезон/серия). Отключить/включить можно в настройках приложения', url: 'https://bazzzilius.github.io/scripts/seas_and_eps.js', author: '@bylampa' },
        { component: 'add_interface_plugin', key: 'smart_source', name: 'Дополнительные источники 8шт', description: 'Плагин добавляет дополнительные источники для получения информации о фильмах', url: 'https://bazzzilius.github.io/scripts/smart_source.js', author: '@scabrum' },
        { component: 'add_interface_plugin', key: 'source', name: 'Дополнительные источники 2шт', description: 'Плагин добавляет дополнительные источники для получения информации о фильмах', url: 'https://bazzzilius.github.io/scripts/source.js', author: '@scabrum' },
        { component: 'add_interface_plugin', key: 'feedback', name: 'Отзывы', description: 'Добавляет в карточке кнопку с отзывами', url: 'http://newtv.mail66.org/o.js', author: '@elenatv99' },
        { component: 'add_interface_plugin', key: 'tricks', name: 'Tricks', description: 'Приятные Мелочи', url: 'https://andreyurl54.github.io/diesel5/tricks.js', author: '@AndreyURL54' },
        { component: 'add_interface_plugin', key: 'rating', name: 'Рейтинг КиноПоиск и IMDB', description: 'Показ рейтинга КиноПоиск и IMDB в карточке. Функционал аналогичен части из MODSs, так что их не следует использовать вместе', url: 'https://nb557.github.io/plugins/rating.js', author: '@t_anton' },
        { component: 'add_interface_plugin', key: 'back_menu_tv', name: 'Фишки для ТВ', description: 'Плагин добавляет новые функции в меню выхода (работает только на телевизоре)', url: 'https://nb557.github.io/plugins/back.js', author: '@bylampa' },
        { component: 'add_interface_plugin', key: 'want', name: 'Старый стиль пунктов (Закладки, Нравится, Позже)', description: 'Плагин возвращает в главное меню старый стиль отображения пунктов (Закладки, Нравится, Позже)', url: 'http://github.freebie.tom.ru/want.js', author: '@VitalikPVA' },
        { component: 'add_interface_plugin', key: 'sub_reset', name: 'Сброс настроек субтитров', description: 'Плагин сбрасывает настройки субтитров по умолчанию', url: 'https://nb557.github.io/plugins/reset_subs.js', author: '@t_anton' },
        { component: 'add_interface_plugin', key: 'new_cat', name: 'Дополнительные категории', description: 'Плагин позволяет добавить на выбор в главное меню категории (Документалки, Концерты и Мультфильмы)', url: 'https://lampame.github.io/main/nc/nc.js', author: '@GwynnBleiidd' },

        // Темы и оформление
        { component: 'add_theme_plugin', key: 'interface', name: 'Стильный интерфейс', description: 'Новый стильный интерфейс для каталога TMDB и CUB. Понравится тем, кому нравится интерфейс в кинопоиске или netflix', url: 'https://bazzzilius.github.io/scripts/interface.js', author: '@lampa' },
        { component: 'add_theme_plugin', key: 'cardify', name: 'Стильныe карточки', description: 'Расширение преобразует привычный вид карточек, предлагая обновленный интерфейс — более яркий, красочный и привлекательный.', url: 'https://bazzzilius.github.io/scripts/cardify.js', author: '@lampa' },
        { component: 'add_theme_plugin', key: 'cub_off', name: 'Cub Off', description: 'Плагин убирает элементы, предлагающие оформить cub premium', url: 'https://bazzzilius.github.io/scripts/cub_off.js', author: '@scabrum' },
        { component: 'add_theme_plugin', key: 'weather', name: 'Погода', description: 'Плагин будет поочередно показывать время и погоду, чередуя их показания', url: 'https://bazzzilius.github.io/scripts/weather.js', author: '@scabrum' },
        { component: 'add_theme_plugin', key: 'snow', name: 'Снег', description: 'Добавляет новогоднее настроение.', url: 'https://bazzzilius.github.io/scripts/snow.js', author: '@undefined' },
        { component: 'add_theme_plugin', key: 'goldtheme', name: 'Золотая тема', description: 'Плагин включает золотую тему которая доступна для премиум пользователей', url: 'https://bazzzilius.github.io/scripts/gold_theme.js', author: '@lampa' },
        { component: 'add_theme_plugin', key: 'color_vote', name: 'Цветные оценки', description: 'Плагин окрашивает оценки на карточках в зависимости от значения', url: 'https://bazzzilius.github.io/scripts/color_vote.js', author: '@fovway' },
        { component: 'add_theme_plugin', key: 'full_center', name: 'Card elems center', description: 'Плагин центрирует элементы в карточке для мобильной версии приложения', url: 'https://bazzzilius.github.io/scripts/full_center.js', author: '@bylampa' },
        { component: 'add_theme_plugin', key: 'lable_serial', name: 'Лейбл сериала', description: 'Плагин заменяет названия лейблов на карточках сериалов (с TV на Сериал)', url: 'https://bazzzilius.github.io/scripts/lable_serial.js', author: '@bylampa' },

        // Управление
        { component: 'add_management_plugin', key: 'exit_menu', name: 'Выход', description: 'Плагин добавляет пункт Выход в главное меню', url: 'https://tsynik.github.io/lampa/e.js', author: '@tsynik' },
        { component: 'add_management_plugin', key: 'new_version', name: 'Проверка новой версии', description: 'Проверяет наличие новой версии приложения на Android TV', url: 'https://nemiroff.github.io/lampa/updater.js', author: '@nemiroff' },
        { component: 'add_management_plugin', key: 'hot_buttons', name: 'Горячие кнопки', description: 'Плагин вызывает меню плеера лампы по кнопкам пульта: 5 - плейлист, 8 - аудиодорожки, 0 - субтитры, channel+/- следующий/предыдущий файл в плейлисте', url: 'https://nnmdd.github.io/lampa_hotkeys/hotkeys.js', author: '@nnmd' },
        { component: 'add_management_plugin', key: 'dlna', name: 'DLNA (Tizen, Orsay)', description: 'Плагин работает на устройстве Orsay, для Tizen необходимо обновить виджет до версии 1.9.1', url: 'http://cub.red/plugin/dlna', author: '@lampa' },
        { component: 'add_management_plugin', key: 'wsoff', name: 'Wsoff', description: 'Плагин отключения ошибки (Request was denied for security) на старых версиях Android.Не устанавливать, если ошибки нет', url: 'http://plugin.rootu.top/wsoff.js', author: '@rootu' },
        { component: 'add_management_plugin', key: 'redirect', name: 'Смена сервера', description: 'Плагин позволяет сменить сервер приложения', url: 'https://bazzzilius.github.io/scripts/redirect.js', author: '@scabrum' },
        { component: 'add_management_plugin', key: 'cub_sync', name: 'CUB Sync', description: 'Синхронизация закладок и истории с CUB в локальное хранилище приложения', url: 'https://bazzzilius.github.io/scripts/cub_sync.js', author: '@levende' },

        // Онлайн
        { component: 'add_online_plugin', key: 'online_mod', name: 'Online_Mod', description: 'Плагин позволяет смотреть фильмы и сериалы в онлайн. На выбор доступно 7 балансеров', url: 'https://nb557.github.io/plugins/online_mod.js', author: '@t_anton' },
        { component: 'add_online_plugin', key: 'showy', name: 'Showy', description: 'Плагин для просмотра фильмов и сериалов в онлайн', url: 'http://showwwy.com/m.js', author: '@showy' },
        { component: 'add_online_plugin', key: 'modss', name: 'Modss', description: 'Плагин позволяет смотреть фильмы и сериалы в онлайн. На выбор доступно 17 балансеров и различные дополнения через меню настроек Modss. VIP 4K можно подключить через телеграм-бота @modssmy_bot', url: 'http://lampa.stream/modss', author: '@Nikolai4' },
        { component: 'add_online_plugin', key: 'bwa_cloud', name: 'Онлайн BWA Cloud', description: 'Плагин для просмотра фильмов и сериалов в онлайн, менее капризный для работы и более подходит для старых устройств, чем Online BWA', url: 'http://bwa.to/cloud.js', author: '@rik' },
        { component: 'add_online_plugin', key: 'prestige', name: 'Онлайн Prestige', description: 'Аналог плагина Online от разработчика приложения Lampa, но с новым информативным интерфейсом для просмотра фильмов и сериалов в онлайн', url: 'https://bwa.to/plugins/prestige.js', author: '@lampa' },
        { component: 'add_online_plugin', key: 'smotret_ru', name: 'Смотреть RU', description: 'Плагин для просмотра фильмов и сериалов в онлайн, используется один стабильный источник. Больше подходит кому ближе РФ', url: 'http://smotret24.ru/online.js', author: '@showy' },
        { component: 'add_online_plugin', key: 'smotret_eu', name: 'Смотреть EU', description: 'Плагин для просмотра фильмов и сериалов в онлайн, используется один стабильный источник. Больше подходит кому ближе Нидерланды', url: 'http://smotret24.com/online.js', author: '@showy' },
        { component: 'add_online_plugin', key: 'smotret_4k', name: 'Смотреть 4K', description: 'Плагин для просмотра фильмов и сериалов в онлайн, используется один стабильный источник в качестве 4К', url: 'http://smotretk.com/online.js', author: '@showy' },

        // Торренты
        { component: 'add_torrent_plugin', key: 'switch_parser', name: 'Переключение парсеров', description: 'Плагин позволяет переключаться между парсерами jackett из списка с уже забитыми правильными параметрами. В настройках парсера появится пункт со списком общедоступных jacketts', url: 'https://bazzzilius.github.io/scripts/jackett.js', author: '@AndreyURL54' },
        { component: 'add_torrent_plugin', key: 'tracks', name: 'Tracks', description: 'Плагин заменяет название аудиодорожек и субтитров в плеере (работает только в торрентах)', url: 'http://cub.red/plugin/tracks', author: '@lampa' },
        { component: 'add_torrent_plugin', key: 'etor', name: 'Настройка торрентов (Web OS, Tizen)', description: 'Плагин для ТВ, на которых Lampa установлена через официальные магазины LG Store и Tizen App Store. Включает в настройках отображение пунктов Парсер и Torrserver, необходимых для просмотра торрентов', url: 'http://cub.red/plugin/etor', author: '@lampa' },

        // ТВ
        { component: 'add_tv_plugin', key: 'diesel', name: 'Дизель ТВ', description: 'Плагин для бесплатного просмотра телеканалов и коммерческих плейлистов с телепрограммой и записью архива', url: 'https://andreyurl54.github.io/diesel5/diesel.js', author: '@AndreyURL54' },
        { component: 'add_tv_plugin', key: 'kulik', name: 'Kulik', description: 'Плагин для просмотра IPTV каналов, отсортированных по различным категориям. Есть возможность поменять стиль плагина, сервер вещания, а также добавить каналы в избранное', url: 'http://cdn.kulik.uz/cors', author: '@SawamuraRen' },
        { component: 'add_tv_plugin', key: 'iptv', name: 'IPTV', description: 'Плагин для просмотра IPTV каналов. Сортировка каналов по группам и возможность добавить каналы в избранное. Работает только со своим плейлистом, добавленным на сайте https://cub.watch/iptv', url: 'http://cub.red/plugin/iptv', author: '@lampa' },
        { component: 'add_tv_plugin', key: 'hacktv', name: 'Hack TV', description: 'Плагин для просмотра IPTV каналов', url: 'https://bazzzilius.github.io/scripts/tv.js', author: '@scabrum' },
    ];


    /**
     * Регистрация плагинов из массива
     */
    function registerPlugins() {
        try {
            pluginsList.forEach((plugin) => {
                Lampa.SettingsApi.addParam({
                    component: plugin.component,
                    param: {
                        name: plugin.key,
                        type: 'select',
                        values: { 1: 'Установить', 2: 'Удалить' }
                    },
                    field: {
                        name: plugin.name,
                        description: plugin.description
                    },
                    onChange: (value) => handlePluginChange(
                        value,
                        plugin.url,
                        plugin.name,
                        plugin.author,
                        plugin.key
                    ),
                    onRender: (item) => renderPluginStatus(item, plugin.url, plugin.key)
                });
            });
        } catch (error) {
            console.error('[Addons] Ошибка регистрации плагинов:', error);
        }
    }

    /**
     * Инициализация Яндекс.Метрики
     */
    function initYandexMetrika() {
        try {
            const METRIKA_ID = 87238418;
            const METRIKA_SCRIPT_URL = 'https://mc.yandex.ru/metrika/tag.js';

            // Проверяем, не загружен ли уже скрипт
            const scripts = document.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].src === METRIKA_SCRIPT_URL) {
                    return;
                }
            }

            // Загружаем скрипт метрики
            (function (m, e, t, r, i, k, a) {
                m[i] = m[i] || function () {
                    (m[i].a = m[i].a || []).push(arguments);
                };
                m[i].l = 1 * new Date();

                k = e.createElement(t);
                a = e.getElementsByTagName(t)[0];
                k.async = 1;
                k.src = r;
                a.parentNode.insertBefore(k, a);
            })(window, document, 'script', METRIKA_SCRIPT_URL, 'ym');

            // Инициализация счетчика
            if (window.ym) {
                window.ym(METRIKA_ID, 'init', {
                    clickmap: true,
                    trackLinks: true,
                    accurateTrackBounce: true
                });
            }

            // Добавляем noscript-тег
            const noscript = document.createElement('noscript');
            noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${METRIKA_ID}" style="position:absolute; left:-9999px;" alt="" /></div>`;
            document.body.appendChild(noscript);
        } catch (error) {
            console.error('[Addons] Ошибка инициализации Яндекс.Метрики:', error);
        }
    }

    /**
     * Инициализация всех компонентов аддона
     */
    function init() {
        registerPlugins();
        initYandexMetrika();
    }

    // Запуск инициализации
    init();

})();
