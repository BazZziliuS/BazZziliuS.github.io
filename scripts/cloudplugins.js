(function () {
    'use strict'

    /** Иконки категорий */
    const icons = {
        add_interface_plugin: '🖼️',
        add_management_plugin: '⚙️',
        add_online_plugin: '🌐',
        add_torrent_plugin: '🌀',
        add_tv_plugin: '📺'
    }

    /** Список плагинов */
    const pluginsList = [
        { component: 'add_interface_plugin', key: 'in_quality', name: 'В качестве', description: 'Добавляет закладку с новинками в качестве', url: 'https://bazzzilius.github.io/scripts/in_quality.js', author: '@bylampa' },
        { component: 'add_management_plugin', key: 'exit_menu', name: 'Выход', description: 'Пункт выхода в меню', url: 'https://tsynik.github.io/lampa/e.js', author: '@tsynik' },
        { component: 'add_online_plugin', key: 'online_mod', name: 'Online_Mod', description: '7 балансеров для онлайн-просмотра', url: 'https://nb557.github.io/plugins/online_mod.js', author: '@t_anton' },
        { component: 'add_torrent_plugin', key: 'switch_parser', name: 'Переключение парсеров', description: 'Список jacketts для выбора', url: 'https://bazzzilius.github.io/scripts/jackett.js', author: '@AndreyURL54' },
        { component: 'add_tv_plugin', key: 'diesel', name: 'Дизель ТВ', description: 'Бесплатные телеканалы', url: 'https://andreyurl54.github.io/diesel5/diesel.js', author: '@AndreyURL54' }
    ]

    /** Установка плагина */
    function installPlugin(plugin) {
        const plugins = Lampa.Storage.get('plugins') || []
        if (plugins.find(p => p.url === plugin.url)) {
            return Lampa.Noty.show('Уже установлено')
        }
        plugins.push({ author: plugin.author, url: plugin.url, name: plugin.name, status: 1 })
        Lampa.Storage.set('plugins', plugins)

        const script = document.createElement('script')
        script.src = plugin.url
        document.head.appendChild(script)

        Lampa.Noty.show('Установлен: ' + plugin.name)
    }

    function removePlugin(plugin) {
        const plugins = Lampa.Storage.get('plugins') || []
        const updated = plugins.filter(p => p.url !== plugin.url)
        Lampa.Storage.set('plugins', updated)
        Lampa.Noty.show('Удалён: ' + plugin.name)
    }

    /** Экран категории */
    function AddonsCategory(object) {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $('<div class="addons_category"><div class="addons_category__body"></div></div>')
        const body = html.find('.addons_category__body')
        let items = []

        this.create = () => {
            this.activity.loader(true)
            body.append(scroll.render(true))

            const list = pluginsList.filter(p => p.component === object.url)

            list.forEach(plugin => {
                const el = $(`<div class="selector addon__item">
                    <div style="font-size:1.2em; color:#ff9800">${plugin.name}</div>
                    <div style="font-size:0.9em; color:#ccc; margin:.3em 0">${plugin.description}</div>
                    <div style="font-size:0.8em; color:#666">Автор: ${plugin.author}</div>
                    <div style="margin-top:.5em;">
                        <button class="addon__btn install">Установить</button>
                        <button class="addon__btn remove">Удалить</button>
                    </div>
                </div>`)

                el.find('.install').on('click', () => installPlugin(plugin))
                el.find('.remove').on('click', () => removePlugin(plugin))

                el.on('hover:focus', () => scroll.update(el))
                scroll.append(el)
                items.push(el)
            })

            this.activity.loader(false)
            this.activity.toggle()
            return this.render()
        }

        this.start = () => {
            Lampa.Controller.add('addons_category', {
                toggle() {
                    Lampa.Controller.collectionSet(scroll.render())
                    Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render())
                },
                back: this.back
            })
            Lampa.Controller.toggle('addons_category')
        }

        this.back = () => Lampa.Activity.backward()
        this.render = () => html
    }

    /** Экран со списком категорий */
    function AddonsRoot() {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $('<div class="addons_root"><div class="addons_root__body"></div></div>')
        const body = html.find('.addons_root__body')
        let items = []

        const categories = [
            { title: 'Интерфейс', component: 'add_interface_plugin' },
            { title: 'Управление', component: 'add_management_plugin' },
            { title: 'Онлайн', component: 'add_online_plugin' },
            { title: 'Торренты', component: 'add_torrent_plugin' },
            { title: 'ТВ', component: 'add_tv_plugin' }
        ]

        this.create = () => {
            this.activity.loader(true)
            body.append(scroll.render(true))

            categories.forEach(cat => {
                const count = pluginsList.filter(p => p.component === cat.component).length
                const el = $(`<div class="selector addons_root__item">
                    <span style="font-size:1.5em; margin-right:.5em">${icons[cat.component]}</span>
                    <span>${cat.title} (${count})</span>
                </div>`)

                el.on('hover:enter', () => {
                    Lampa.Activity.push({
                        title: cat.title,
                        component: 'addons_category',
                        url: cat.component
                    })
                })
                el.on('hover:focus', () => scroll.update(el))
                scroll.append(el)
                items.push(el)
            })

            this.activity.loader(false)
            this.activity.toggle()
            return this.render()
        }

        this.start = () => {
            Lampa.Controller.add('addons_root', {
                toggle() {
                    Lampa.Controller.collectionSet(scroll.render())
                    Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render())
                },
                back: this.back
            })
            Lampa.Controller.toggle('addons_root')
        }

        this.back = () => Lampa.Activity.backward()
        this.render = () => html
    }

    /** Регистрируем экраны */
    Lampa.Component.add('addons_root', AddonsRoot)
    Lampa.Component.add('addons_category', AddonsCategory)

    /** Кнопка в Настройках */
    Lampa.Settings.add({
        title: 'Плагины',
        group: 'plugins',
        onSelect: () => Lampa.Activity.push({ title: 'Плагины', component: 'addons_root' })
    })

})()
