(function () {
    'use strict';

    // Основной объект с методами плагина
    const PluginManager = {
        // Константы иконок (SVG сокращены для примера, полные версии остаются в оригинале)
        icons: {
            main: '<svg ...>',
            interface: '<div class="settings-folder" ...>Интерфейс</div>',
            management: '<div class="settings-folder" ...>Управление</div>',
            online: '<div class="settings-folder" ...>Онлайн</div>',
            torrent: '<div class="settings-folder" ...>Торренты</div>',
            tv: '<div class="settings-folder" ...>ТВ</div>',
            radio: '<div class="settings-folder" ...>Радио</div>',
            adult: '<div class="settings-folder" ...>18+</div>'
        },

        // HTML рекламы
        ads: `
            <div style="padding: 0.3em 0.3em; padding-top: 0;">
                <div style="background: #3e3e3e; padding: 0.5em; border-radius: 1em;">
                    <div style="line-height: 1.2; text-align: center;">
                        <span style="color: #ffffff">Тут могла быть<br>ваша</br>
                            <span style="color: #f3d900">реклама</span>
                        </span>
                    </div>
                </div>
            </div>
        `,

        // Инициализация плагина
        init() {
            Lampa.Storage.set('needReboot', false);
            Lampa.Storage.set('needRebootSettingExit', false);
            this.setupComponents();
            this.setupListeners();
            this.addMetrika();
        },

        // Показ модального окна перезагрузки
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

        // Отслеживание настроек
        watchSettings() {
            if (!Lampa.Storage.get('needRebootSettingExit')) return;

            const interval = setInterval(() => {
                if (!$('#app > div.settings > div.settings__content.layer--height > div.settings__body > div').length) {
                    clearInterval(interval);
                    this.showReload('Для полного удаления плагина перезагрузите приложение!');
                }
            }, 1000);
        },

        // Установка плагина
        installPlugin(url, name, author, itemName) {
            const $status = $(`DIV[data-name="${itemName}"] .settings-param__status`);
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

        // Удаление плагина
        deletePlugin(url) {
            const plugins = Lampa.Storage.get('plugins').filter(plugin => plugin.url !== url);
            Lampa.Storage.set('plugins', plugins);
            Lampa.Settings.update();
            Lampa.Noty.show('Плагин успешно удален');
            Lampa.Storage.set('needRebootSettingExit', true);
            this.watchSettings();
        },

        // Проверка наличия плагина
        checkPlugin(url) {
            const plugins = Lampa.Storage.get('plugins') || [];
            return plugins.some(plugin => plugin.url === url);
        },

        // Скрытие элементов установки
        hideInstall() {
            $("#hideInstall").remove();
            $('body').append('<div id="hideInstall"><style>div.settings-param__value{opacity:0%!important;display:none;}</style></div>');
        },

        // Настройка компонентов интерфейса
        setupComponents() {
            Lampa.SettingsApi.addComponent({
                component: 'add_plugin',
                name: 'Плагины',
                icon: this.icons.main
            });

            this.addSubComponent('add_interface_plugin', this.icons.interface, 'add_plugin');
            this.addPluginParam('add_interface_plugin', {
                name: 'TMDB',
                url: 'http://cub.red/plugin/tmdb-proxy',
                title: 'TMDB Proxy',
                author: '@lampa',
                description: 'Проксирование постеров для сайта TMDB'
            });

            this.addPluginParam('add_interface_plugin', {
                name: 'notice',
                url: 'https://bazzzilius.github.io/scripts/notice.js',
                title: 'Уведомления',
                author: '@bylampa',
                description: 'Плагин добавляет новости плагина'
            });

            this.addPluginParam('add_tv_plugin', {
                name: 'Hack_TV',
                url: 'https://bazzzilius.github.io/scripts/tv.js',
                title: 'Hack TV',
                author: '@scabrum',
                description: 'Плагин для просмотра IPTV каналов'
            });

            Lampa.SettingsApi.addParam({
                component: 'add_plugin',
                param: { name: 'add_ads', type: 'title' },
                field: { name: this.ads },
                onRender: (item) => {
                    setTimeout(() => $('.settings-param-title').insertAfter($('.settings-param').last()), 0);
                }
            });
        },

        // Добавление подкомпонента
        addSubComponent(component, icon, parent) {
            Lampa.SettingsApi.addParam({
                component: parent,
                param: { name: component, type: 'static', default: true },
                field: { name: icon },
                onRender: (item) => {
                    item.on('hover:enter', () => {
                        Lampa.Settings.create(component);
                        Lampa.Controller.enabled().controller.back = () => Lampa.Settings.create(parent);
                    });
                }
            });
        },

        // Добавление параметров плагина
        addPluginParam(component, { name, url, title, author, description }) {
            Lampa.SettingsApi.addParam({
                component,
                param: {
                    name,
                    type: 'select',
                    values: { 1: 'Установить', 2: 'Удалить' }
                },
                field: { name: title, description },
                onChange: (value) => {
                    if (value === '1') this.installPlugin(url, title, author, name);
                    if (value === '2') this.deletePlugin(url);
                },
                onRender: (item) => {
                    $('.settings-param__name', item).css('color', '#f3d900');
                    this.hideInstall();
                    
                    setTimeout(() => {
                        const $status = $('<div class="settings-param__status one"></div>');
                        $(`div[data-name="${name}"]`).append($status);
                        $status.addClass(this.checkPlugin(url) ? 'active' : 'error');
                    }, 100);
                }
            });
        },

        // Настройка слушателей событий
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
        },

        // Добавление Яндекс.Метрики
        addMetrika() {
            window.ym = window.ym || function () { (window.ym.a = window.ym.a || []).push(arguments) };
            window.ym.l = 1 * new Date();
            
            const script = document.createElement('script');
            script.async = 1;
            script.src = 'https://mc.yandex.ru/metrika/tag.js';
            document.head.appendChild(script);
            
            ym(87238418, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true });
            $('body').append('<noscript><div><img src="https://mc.yandex.ru/watch/87238418" style="position:absolute; left:-9999px;" alt="" /></div></noscript>');
        }
    };

    // Запуск плагина
    if (window.appready) PluginManager.init();
    else Lampa.Listener.follow('app', (e) => { if (e.type === 'ready') PluginManager.init(); });
})();
