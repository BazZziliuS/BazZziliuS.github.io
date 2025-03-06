(function () {
    'use strict';

    // Конфигурация плагинов
    const PluginConfig = {
        categories: [
            {
                id: 'add_interface_plugin',
                name: 'Интерфейс',
                icon: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg ...>Интерфейс</svg></div><div style="font-size:1.3em">Интерфейс</div></div>',
                plugins: [
                    {
                        id: 'TMDB',
                        url: 'http://cub.red/plugin/tmdb-proxy',
                        name: 'TMDB Proxy',
                        author: '@lampa',
                        description: 'Проксирование постеров для сайта TMDB'
                    },
                    {
                        id: 'notice',
                        url: 'https://bazzzilius.github.io/scripts/notice.js',
                        name: 'Уведомления',
                        author: '@bylampa',
                        description: 'Плагин добавляет новости плагина'
                    }
                ]
            },
            {
                id: 'add_tv_plugin',
                name: 'ТВ',
                icon: '<div class="settings-folder" style="padding:0!important"><div style="width:1.8em;height:1.3em;padding-right:.5em"><svg ...>ТВ</svg></div><div style="font-size:1.3em">ТВ</div></div>',
                plugins: [
                    {
                        id: 'Hack_TV',
                        url: 'https://bazzzilius.github.io/scripts/tv.js',
                        name: 'Hack TV',
                        author: '@scabrum',
                        description: 'Плагин для просмотра IPTV каналов'
                    }
                ]
            }
            // Добавьте другие категории здесь, например:
            // {
            //     id: 'add_torrent_plugin',
            //     name: 'Торренты',
            //     icon: '...',
            //     plugins: [...]
            // }
        ],
        mainIcon: '<svg ...>', // Иконка главного раздела "Плагины"
        ads: `
            <div style="padding: 0.3em 0.3em; padding-top: 0;">
                <div style="background: #ffffff; padding: 0.5em; border-radius: 1em;">
                    <a href="https://aeza.net/ru?ref=507375" target="_blank">
                        <img src="https://i.imgur.com/yJCQucC.png" style="max-width: 100%; border-radius: 0.5em;" alt="Реклама">
                    </a>
                </div>
            </div>
        `
    };

    // Основной объект управления плагинами
    const PluginManager = {
        init() {
            Lampa.Storage.set('needReboot', false);
            Lampa.Storage.set('needRebootSettingExit', false);
            this.setupComponents();
            this.setupListeners();
        },

        showReload(reloadText) {
            Lampa.Modal.open({
                title: '',
                align: 'center',
                zIndex: 300,
                html: $(`<div class="about">${reloadText}</div>`),
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
        },

        watchSettings() {
            if (!Lampa.Storage.get('needRebootSettingExit')) return;
            const interval = setInterval(() => {
                if (!$('#app > div.settings > div.settings__content.layer--height > div.settings__body > div').length) {
                    clearInterval(interval);
                    this.showReload('Для полного удаления плагина перезагрузите приложение!');
                }
            }, 1000);
        },

        installPlugin(url, name, author, itemName) {
            const $status = $(`div[data-name="${itemName}"] .settings-param__status`);
            if ($status.hasClass('active')) {
                return Lampa.Noty.show('Плагин уже установлен!');
            }

            if (Lampa.Storage.get('needReboot')) return;

            const plugins = Lampa.Storage.get('plugins') || [];
            plugins.push({ author, url, name, status: 1 });
            Lampa.Storage.set('plugins', plugins);

            const script = document.createElement('script');
            script.src = url;
            document.head.appendChild(script);

            setTimeout(() => {
                Lampa.Settings.update();
                Lampa.Noty.show(`Плагин ${name} успешно установлен`);
            }, 300);
        },

        deletePlugin(url) {
            const plugins = Lampa.Storage.get('plugins').filter(plugin => plugin.url !== url);
            Lampa.Storage.set('plugins', plugins);
            Lampa.Settings.update();
            Lampa.Noty.show('Плагин успешно удален');
            Lampa.Storage.set('needRebootSettingExit', true);
            this.watchSettings();
        },

        checkPlugin(url) {
            const plugins = Lampa.Storage.get('plugins') || [];
            return plugins.some(plugin => plugin.url === url);
        },

        hideInstall() {
            $("#hideInstall").remove();
            $('body').append('<div id="hideInstall"><style>div.settings-param__value{opacity:0%!important;display:none;}</style></div>');
        },

        setupComponents() {
            // Главный компонент "Плагины"
            Lampa.SettingsApi.addComponent({
                component: 'add_plugin',
                name: 'Плагины',
                icon: PluginConfig.mainIcon
            });

            // Регистрация всех категорий и их плагинов
            PluginConfig.categories.forEach(category => {
                // Регистрируем категорию как компонент
                Lampa.SettingsApi.addComponent({
                    component: category.id,
                    name: category.name,
                    icon: category.icon
                });

                // Добавляем ссылку на категорию в главный раздел
                Lampa.SettingsApi.addParam({
                    component: 'add_plugin',
                    param: {
                        name: `${category.id}_link`,
                        type: 'static',
                        default: true
                    },
                    field: {
                        name: category.icon
                    },
                    onRender: (item) => {
                        item.on('hover:enter', () => {
                            Lampa.Settings.create(category.id);
                            Lampa.Controller.enabled().controller.back = () => {
                                Lampa.Settings.create('add_plugin');
                            };
                        });
                    }
                });

                // Добавляем плагины для категории
                category.plugins.forEach(plugin => {
                    this.addPluginParam(category.id, plugin);
                });
            });

            // Реклама
            Lampa.SettingsApi.addParam({
                component: 'add_plugin',
                param: { name: 'add_ads', type: 'title' },
                field: { name: PluginConfig.ads },
                onRender: (item) => {
                    setTimeout(() => $('.settings-param-title').insertAfter($('.settings-param').last()), 0);
                }
            });
        },

        addPluginParam(component, { id, url, name, author, description }) {
            Lampa.SettingsApi.addParam({
                component,
                param: {
                    name: id,
                    type: 'select',
                    values: { 1: 'Установить', 2: 'Удалить' }
                },
                field: { name, description },
                onChange: (value) => {
                    if (value === '1') this.installPlugin(url, name, author, id);
                    if (value === '2') this.deletePlugin(url);
                },
                onRender: (item) => {
                    $('.settings-param__name', item).css('color', '#f3d900');
                    this.hideInstall();
                    setTimeout(() => {
                        const $status = $('<div class="settings-param__status one"></div>');
                        $(`div[data-name="${id}"]`).append($status);
                        $status.addClass(this.checkPlugin(url) ? 'active' : 'error');
                    }, 100);
                }
            });
        },

        setupListeners() {
            Lampa.Settings.listener.follow('open', (e) => {
                if (e.name === 'main') {
                    setTimeout(() => {
                        $('div[data-component^="add_"]').not('[data-component="add_plugin"]').remove();
                        $("#hideInstall").remove();
                        $('div[data-component=plugins]').before($('div[data-component=add_plugin]'));
                    }, 30);
                }

                if (e.name === 'add_plugin') {
                    setTimeout(() => {
                        const $extra = $('div > span:contains("Еще"), div > span:contains("Редактировать"), div > span:contains("История"), div > span:contains("Статус")');
                        if ($('div > span > div > span:contains("реклама")').length) $extra.parent().remove();
                    }, 0);
                }
            });
        }
    };

    if (window.appready) PluginManager.init();
    else Lampa.Listener.follow('app', (e) => { if (e.type === 'ready') PluginManager.init(); });
})();
