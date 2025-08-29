(function () {
    'use strict';

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
        add_radio_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-radio"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3l-9.371 3.749a1 1 0 0 0 -.629 .928v11.323a1 1 0 0 0 1 1h14a1 1 0 0 0 1 -1v-11a1 1 0 0 0 -1 -1h-14.5" /><path d="M4 12h16" /><path d="M7 12v-2" /><path d="M17 16v.01" /><path d="M13 16v.01" /></svg>',
        add_sisi_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-rating-18-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M11.5 10.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" /><path d="M11.5 13.5m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0 -3 0" /><path d="M7 15v-6" /><path d="M15.5 12h3" /><path d="M17 10.5v3" /></svg>',
    };

    // HTML рекламы
    const ads = `
        <div style="padding: 0.5em;">
            <div style="display:flex; align-items:center; background:#383838; border-radius:0.8em; padding:0.6em; gap:0.8em;">
                <img src="https://i.imgur.com/yJCQucC.png" style="width:60px; border-radius:0.5em;">
                <div style="flex:1;">
                <div style="font-size:1.1em; font-weight:bold; color:#ff9800;">🔥 Наш партнёр</div>
                <div style="font-size:0.9em; color:#ccc;">Переходи и получи бонус для пользователей</div>
                </div>
                <a href="https://aeza.net/ru?ref=507375" target="_blank"
                style="background:#ff9800; color:#000; padding:0.4em 1em; border-radius:2em; font-weight:bold; text-decoration:none;">
                Перейти
                </a>
            </div>
        </div>
        `;

    /** Утилиты */
    function showReload(reloadText) {
        Lampa.Modal.open({
            title: '',
            align: 'center',
            zIndex: 300,
            html: $('<div class="about">' + reloadText + '</div>'),
            buttons: [
                { name: 'Нет', onSelect: () => { Lampa.Modal.close(); $('.modal').remove(); Lampa.Controller.toggle('settings_component'); } },
                { name: 'Да', onSelect: () => window.location.reload() },
            ],
        });
    }

    function settingsWatch() {
        if (Lampa.Storage.get('needRebootSettingExit')) {
            const intervalSettings = setInterval(() => {
                const elementSettings = $('#app > div.settings > div.settings__content.layer--height > div.settings__body > div');
                if (!elementSettings.length > 0) {
                    clearInterval(intervalSettings);
                    showReload('Для полного удаления плагина перезагрузите приложение!');
                }
            }, 1000);
        }
    }

    function itemON(url, name, author, key) {
        if ($(`div[data-name="${key}"]`).find('.settings-param__status').hasClass('active')) {
            return Lampa.Noty.show('Плагин уже установлен!');
        }

        if (!Lampa.Storage.get('needReboot')) {
            const pluginsArray = Lampa.Storage.get('plugins') || [];
            pluginsArray.push({ author, url, name, status: 1 });
            Lampa.Storage.set('plugins', pluginsArray);

            const script = document.createElement('script');
            script.src = url;
            document.head.appendChild(script);

            setTimeout(() => {
                Lampa.Settings.update();
                Lampa.Noty.show(`Плагин ${name} успешно установлен`);
            }, 300);
        }
    }

    function deletePlugin(pluginUrl) {
        const plugins = Lampa.Storage.get('plugins') || [];
        const updated = plugins.filter((p) => p.url !== pluginUrl);
        Lampa.Storage.set('plugins', updated);
        Lampa.Settings.update();
        Lampa.Noty.show('Плагин успешно удален');
        Lampa.Storage.set('needRebootSettingExit', true);
        settingsWatch();
    }

    function checkPlugin(url) {
        const plugins = Lampa.Storage.get('plugins') || [];
        return plugins.some((p) => p.url === url && p.status !== 0);
    }

    function renderPluginStatus(item, pluginUrl, pluginKey) {
        $('.settings-param__name', item).css('color', '#f3d900');
        $('#hideInstall').remove();
        $('body').append('<div id="hideInstall"><style>div.settings-param__value{opacity:0!important;display:none;}</style></div>');
        setTimeout(() => {
            const statusContainer = $('<div class="settings-param__status one"></div>');
            $(`div[data-name="${pluginKey}"]`).append(statusContainer);
            statusContainer.removeClass('active error wait').addClass(checkPlugin(pluginUrl) ? 'active' : 'error');
        }, 100);
    }

    function handlePluginChange(value, pluginUrl, name, author, key) {
        if (value === '1') itemON(pluginUrl, name, author, key);
        if (value === '2') deletePlugin(pluginUrl);
    }

    /**
    * Добавляем главную категорию и вложенные подкатегории
    */
    // Главная категория «Плагины»
    Lampa.SettingsApi.addComponent({
        component: 'add_plugin',
        name: 'Плагины',
        icon: icons.add_plugin
    });

    const subcategories = [
        { c: 'add_interface_plugin', n: 'Интерфейс', i: icons.add_interface_plugin },
        { c: 'add_management_plugin', n: 'Управление', i: icons.add_management_plugin },
        { c: 'add_online_plugin', n: 'Онлайн', i: icons.add_online_plugin },
        { c: 'add_torrent_plugin', n: 'Торренты', i: icons.add_torrent_plugin },
        { c: 'add_tv_plugin', n: 'ТВ', i: icons.add_tv_plugin },
        { c: 'add_radio_plugin', n: 'Радио', i: icons.add_radio_plugin },
        { c: 'add_sisi_plugin', n: '18+', i: icons.add_sisi_plugin },
    ];

    let pluginsInited = false; // 👈 флаг инициализации

    // При открытии главного меню
    Lampa.Settings.listener.follow('open', (e) => {
        if (e.name !== 'main') return;

        if (!pluginsInited) {
            // создаём сабкатегории только один раз
            subcategories.forEach(sc => {
                // экран
                Lampa.SettingsApi.addComponent({
                    component: sc.c,
                    name: sc.n,
                    icon: sc.i
                });

                // пункт в «Плагинах»
                Lampa.SettingsApi.addParam({
                    component: 'add_plugin',
                    param: { name: sc.c, type: 'static', default: true },
                    field: { name: sc.n },
                    onRender: (item) => {
                        const html = `
            <div class="settings-folder" style="padding:0!important;display:flex;align-items:center">
              <div style="width:1.8em;height:1.3em;padding-right:.5em;flex-shrink:0;display:flex;align-items:center;justify-content:center">
                ${sc.i}
              </div>
              <div style="font-size:1.3em">${sc.n}</div>
            </div>
          `;
                        item.find('.settings-param__name').html(html);

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

            pluginsInited = true; // ⚡️ больше не добавляем повторно
        }

        // удаляем плитки сабкатегорий из корня
        setTimeout(() => {
            subcategories.forEach(sc => $(`div[data-component="${sc.c}"]`).remove());
        }, 50);

        // поднимаем «Плагины» выше стандартного блока
        setTimeout(() => {
            $('div[data-component=plugins]').before($('div[data-component=add_plugin]'));
        }, 60);
    });






    let adInited = false;

    Lampa.Settings.listener.follow('open', (e) => {
        if (e.name === 'add_plugin') {
            setTimeout(() => {
                if (!adInited) {
                    // добавляем блок
                    Lampa.SettingsApi.addParam({
                        component: 'add_plugin',
                        param: { name: 'add_ads', type: 'title' },
                        field: { name: ads }
                    });

                    adInited = true;
                }

                // переносим рекламу в самый низ каждый раз, чтобы точно оказалась в конце
                $('#settings_layer .settings-param[data-name="add_ads"]').insertAfter(
                    $('#settings_layer .settings-param').last()
                );
            }, 100); // ждём 100ms, чтобы DOM успел нарисоваться
        }
    });




    /**
     * Список всех плагинов
     */
    const pluginsList = [
        // Интерфейс
        { component: 'add_interface_plugin', key: 'notice', name: 'Уведомления', description: 'Плагин добавляет новости плагина', url: 'https://bazzzilius.github.io/scripts/notice.js', author: '@bylampa' },
        { component: 'add_interface_plugin', key: 'Feedback', name: 'Отзывы', description: 'Кнопка с отзывами в карточке', url: 'http://newtv.mail66.org/o.js', author: '@elenatv99' },
        { component: 'add_interface_plugin', key: 'Tricks', name: 'Приятные мелочи', description: 'Скринсейверы, стилизация кнопок, часы в плеере и т.п.', url: 'https://andreyurl54.github.io/diesel5/tricks.js', author: '@AndreyURL54' },
        { component: 'add_interface_plugin', key: 'Rating', name: 'Рейтинг КиноПоиск и IMDB', description: 'Показ рейтинга КиноПоиск и IMDB', url: 'https://nb557.github.io/plugins/rating.js', author: '@t_anton' },
        { component: 'add_interface_plugin', key: 'back_menu_tv', name: 'Фишки для ТВ', description: 'Новые функции в меню выхода для ТВ', url: 'https://bazzzilius.github.io/scripts/back.js', author: '@bylampa' },
        { component: 'add_interface_plugin', key: 'Want', name: 'Старый стиль пунктов', description: 'Возвращает старый стиль меню Закладки/Нравится/Позже', url: 'http://github.freebie.tom.ru/want.js', author: '@VitalikPVA' },
        { component: 'add_interface_plugin', key: 'Sub_reset', name: 'Сброс настроек субтитров', description: 'Плагин для сброса настроек субтитров', url: 'https://example.com/sub_reset.js', author: '@someone' },

        // Онлайн
        { component: 'add_online_plugin', key: 'rus_movie', name: 'Русские новинки', description: 'Русские новинки фильмов и сериалов', url: 'https://bazzzilius.github.io/scripts/rus_movie.js', author: '@bylampa' },
        { component: 'add_online_plugin', key: 'inter_movie', name: 'Зарубежные подборки', description: 'Подборки зарубежных фильмов', url: 'https://bazzzilius.github.io/scripts/inter_movie.js', author: '@bylampa' },
        { component: 'add_online_plugin', key: 'in_quality', name: 'В качестве', description: 'Новинки в высоком качестве', url: 'https://bazzzilius.github.io/scripts/in_quality.js', author: '@bylampa' },

        // Торренты
        { component: 'add_torrent_plugin', key: 'torrent_search', name: 'Торрент-поиск', description: 'Поиск торрентов прямо из Лампы', url: 'https://example.com/torrent_search.js', author: '@torrentDev' },

        // ТВ
        { component: 'add_tv_plugin', key: 'tv_online', name: 'Онлайн ТВ', description: 'Список онлайн-каналов ТВ', url: 'https://example.com/tv_online.js', author: '@tvDev' },

        // Радио
        { component: 'add_radio_plugin', key: 'radio_player', name: 'Радио', description: 'Онлайн радиостанции', url: 'https://example.com/radio.js', author: '@radioDev' },

        // 18+
        { component: 'add_sisi_plugin', key: 'adult_pack', name: '18+', description: 'Плагин с контентом 18+', url: 'https://example.com/adult.js', author: '@adultDev' },
    ];


    /**
     * Регистрация плагинов из массива
     */
    pluginsList.forEach((p) => {
        Lampa.SettingsApi.addParam({
            component: p.component,
            param: { name: p.key, type: 'select', values: { 1: 'Установить', 2: 'Удалить' } },
            field: { name: p.name, description: p.description },
            onChange: (value) => handlePluginChange(value, p.url, p.name, p.author, p.key),
            onRender: (item) => renderPluginStatus(item, p.url, p.key),
        });
    });
})();
