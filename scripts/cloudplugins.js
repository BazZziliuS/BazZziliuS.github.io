(function () {
    'use strict';

    /**
     * Иконки
     */
    const icons = {
        add_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-category"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4h6v6h-6z" /><path d="M14 4h6v6h-6z" /><path d="M4 14h6v6h-6z" /><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /></svg>',
        add_interface_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-app-window"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M6 8h.01" /><path d="M9 8h.01" /></svg>',
        add_management_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-layout-cards"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M14 4m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /></svg>',
        add_online_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-brand-google-analytics"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 9m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v9.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z" /><path d="M17 3m0 1.105a1.105 1.105 0 0 1 1.105 -1.105h1.79a1.105 1.105 0 0 1 1.105 1.105v15.79a1.105 1.105 0 0 1 -1.105 1.105h-1.79a1.105 1.105 0 0 1 -1.105 -1.105z" /><path d="M5 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /></svg>',
        add_torrent_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-current-location"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" /><path d="M12 2l0 2" /><path d="M12 20l0 2" /><path d="M20 12l2 0" /><path d="M2 12l2 0" /></svg>',
        add_tv_plugin: '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-device-tv"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M16 3l-4 4l-4 -4" /></svg>',
    };

    /**
     * Категории
     */
    const categories = [
        { title: 'Интерфейс', component: 'addons_interface', icon: icons.add_interface_plugin },
        { title: 'Управление', component: 'addons_management', icon: icons.add_management_plugin },
        { title: 'Онлайн', component: 'addons_online', icon: icons.add_online_plugin },
        { title: 'Торренты', component: 'addons_torrent', icon: icons.add_torrent_plugin },
        { title: 'ТВ', component: 'addons_tv', icon: icons.add_tv_plugin }
    ];

    /**
     * Список плагинов
     */
    const pluginsList = [
        { category: 'addons_interface', key: 'in_quality', name: 'В качестве', description: 'Закладка с новинками в качестве', url: 'https://bazzzilius.github.io/scripts/in_quality.js', author: '@bylampa', icon: icons.add_interface_plugin },
        { category: 'addons_online', key: 'online_mod', name: 'Online_Mod', description: 'Онлайн просмотр фильмов и сериалов', url: 'https://nb557.github.io/plugins/online_mod.js', author: '@t_anton', icon: icons.add_online_plugin },
        { category: 'addons_torrent', key: 'switch_parser', name: 'Переключение парсеров', description: 'Смена парсеров Jackett', url: 'https://bazzzilius.github.io/scripts/jackett.js', author: '@AndreyURL54', icon: icons.add_torrent_plugin },
        { category: 'addons_tv', key: 'diesel', name: 'Дизель ТВ', description: 'Бесплатные телеканалы + телепрограмма', url: 'https://andreyurl54.github.io/diesel5/diesel.js', author: '@AndreyURL54', icon: icons.add_tv_plugin }
        // ... остальные плагины
    ];

    /**
     * Главный экран «Плагины»
     */
    function AddonsRoot() {
        const scroll = new Lampa.Scroll({ mask: true, over: true });
        const html = $('<div class="addons"><div class="addons__body"></div></div>');
        const body = html.find('.addons__body');
        let items = [];

        this.create = () => {
            body.append(scroll.render(true));

            // 🔹 Блок категорий
            const catTitle = $('<div class="addons__title">Категории</div>');
            scroll.append(catTitle);
            categories.forEach(cat => {
                const el = $(`
                    <div class="selector addons__item" style="display:flex;align-items:center;gap:0.5em;">
                        <div style="width:1.6em;height:1.6em;flex-shrink:0;">${cat.icon}</div>
                        <div>${cat.title}</div>
                    </div>
                `);
                el.on('hover:enter', () => {
                    Lampa.Activity.push({ title: cat.title, component: cat.component });
                });
                el.on('hover:focus', () => scroll.update(el));
                scroll.append(el);
                items.push(el);
            });

            // 🔹 Блок плагинов
            const plugTitle = $('<div class="addons__title">Популярные плагины</div>');
            scroll.append(plugTitle);
            pluginsList.forEach(plugin => {
                const el = $(`
                    <div class="selector addons__item" style="display:flex;flex-direction:column;gap:0.3em;padding:0.4em 0;">
                        <div style="display:flex;align-items:center;gap:0.5em;">
                            <div style="width:1.2em;height:1.2em;flex-shrink:0;">${plugin.icon}</div>
                            <div style="font-weight:bold">${plugin.name}</div>
                        </div>
                        <div style="color:#aaa;font-size:0.9em">${plugin.description}</div>
                        <div style="color:#666;font-size:0.8em">${plugin.author}</div>
                    </div>
                `);
                el.on('hover:enter', () => {
                    installPlugin(plugin);
                });
                el.on('hover:focus', () => scroll.update(el));
                scroll.append(el);
                items.push(el);
            });

            this.activity.toggle();
            return this.render();
        };

        this.start = () => {
            Lampa.Controller.add('addons_root', {
                toggle() {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(items[0] ? items[0][0] : false, scroll.render());
                },
                back: this.back,
                up() { Navigator.move('up'); },
                down() { Navigator.move('down'); },
                left() { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu'); },
                right() { Navigator.move('right'); }
            });
            Lampa.Controller.toggle('addons_root');
        };

        this.back = () => Lampa.Activity.backward();
        this.render = () => html;
        this.destroy = () => { Lampa.Arrays.destroy(items); scroll.destroy(); html.remove(); };
    }

    /**
     * Установка плагина
     */
    function installPlugin(plugin) {
        if (checkPlugin(plugin.url)) {
            return Lampa.Noty.show('Плагин уже установлен!');
        }
        const pluginsArray = Lampa.Storage.get('plugins') || [];
        pluginsArray.push({ author: plugin.author, url: plugin.url, name: plugin.name, status: 1 });
        Lampa.Storage.set('plugins', pluginsArray);

        const script = document.createElement('script');
        script.src = plugin.url;
        document.head.appendChild(script);

        setTimeout(() => {
            Lampa.Noty.show(`Плагин ${plugin.name} установлен`);
        }, 300);
    }

    function checkPlugin(url) {
        const plugins = Lampa.Storage.get('plugins') || [];
        return plugins.some(p => p.url === url && p.status !== 0);
    }

    /**
     * Реклама
     */
    const ads = `
        <div style="padding: 0.5em;">
            <div style="background:#383838; border-radius:0.8em; overflow:hidden; text-align:center;">
                <img src="https://i.imgur.com/yJCQucC.png" style="width:100%; display:block;" alt="AEZA Hosting">
                <div style="padding:0.8em;">
                    <div style="font-size:1.2em; font-weight:bold; color:#ff9800; margin-bottom:0.3em;">🔥 AEZA Hosting — свой торрент-сервер</div>
                    <div style="font-size:0.95em; color:#ccc; margin-bottom:0.8em;">Развёрни личный торрент-сервер на мощном и недорогом хостинге.</div>
                    <a href="https://aeza.net/ru?ref=507375" target="_blank" style="display:inline-block; background:#ff9800; color:#000; padding:0.5em 1.2em; border-radius:2em; font-weight:bold; text-decoration:none;">Перейти →</a>
                </div>
            </div>
        </div>
    `;

    /**
     * Регистрация
     */
    // Регистрируем категорию «Плагины» в настройках
    Lampa.SettingsApi.addComponent({
        component: 'addons_root',
        name: 'Плагины',
        icon: icons.add_plugin
    });

    // При выборе — открываем экран с компонентом
    Lampa.Settings.listener.follow('open', (e) => {
        if (e.name === 'addons_root') {
            Lampa.Activity.push({
                title: 'Плагины',
                component: 'addons_root'
            });
        }
    });

    // Реклама при открытии
    Lampa.Listener.follow('settings', (e) => {
        if (e.name === 'addons_root') {
            $('#settings_layer .settings-content').append(ads);
        }
    });

})();
