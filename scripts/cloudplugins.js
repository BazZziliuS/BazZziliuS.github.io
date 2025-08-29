(function () {
    const ID = 'cloudplugins'
    const TITLE = 'Плагины'

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
        { component: 'add_interface_plugin', key: 'in_quality', name: 'В качестве', description: 'Новинки в качестве', url: 'https://bazzzilius.github.io/scripts/in_quality.js', author: '@bylampa' },
        { component: 'add_management_plugin', key: 'exit_menu', name: 'Выход', description: 'Кнопка выхода в меню', url: 'https://tsynik.github.io/lampa/e.js', author: '@tsynik' },
        { component: 'add_online_plugin', key: 'online_mod', name: 'Online_Mod', description: '7 балансеров для онлайн-просмотра', url: 'https://nb557.github.io/plugins/online_mod.js', author: '@t_anton' },
        { component: 'add_torrent_plugin', key: 'switch_parser', name: 'Переключение парсеров', description: 'Список jacketts для выбора', url: 'https://bazzzilius.github.io/scripts/jackett.js', author: '@AndreyURL54' },
        { component: 'add_tv_plugin', key: 'diesel', name: 'Дизель ТВ', description: 'Бесплатные телеканалы', url: 'https://andreyurl54.github.io/diesel5/diesel.js', author: '@AndreyURL54' }
    ]

    /** Установка/удаление */
    function installPlugin(plugin) {
        const plugins = Lampa.Storage.get('plugins') || []
        if (plugins.find(p => p.url === plugin.url)) return Lampa.Noty.show('Уже установлено')
        plugins.push({ author: plugin.author, url: plugin.url, name: plugin.name, status: 1 })
        Lampa.Storage.set('plugins', plugins)
        const script = document.createElement('script')
        script.src = plugin.url
        document.head.appendChild(script)
        Lampa.Noty.show('Установлен: ' + plugin.name)
    }

    function removePlugin(plugin) {
        const plugins = Lampa.Storage.get('plugins') || []
        Lampa.Storage.set('plugins', plugins.filter(p => p.url !== plugin.url))
        Lampa.Noty.show('Удалён: ' + plugin.name)
    }

    /** Экран категорий */
    function Screen() {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $(`<div class="${ID}-screen"><div class="${ID}-screen__body"></div></div>`)
        const body = html.find(`.${ID}-screen__body`)
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
                const el = $(`<div class="selector ${ID}__category">
          <span style="font-size:1.5em;margin-right:.5em">${icons[cat.component]}</span>
          <span>${cat.title} (${count})</span>
        </div>`)

                el.on('hover:enter', () => this.openCategory(cat))
                el.on('hover:focus', () => scroll.update(el))

                scroll.append(el)
                items.push(el)
            })

            this.activity.loader(false)
            this.activity.toggle()
            return this.render()
        }

        this.openCategory = (cat) => {
            const list = pluginsList.filter(p => p.component === cat.component)
            const container = $('<div class="category__list"></div>')
            list.forEach(plugin => {
                const el = $(`<div class="selector ${ID}__item">
            <div style="font-size:1.2em; color:#ff9800">${plugin.name}</div>
            <div style="font-size:0.9em; color:#ccc">${plugin.description}</div>
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
            })
        }

        this.start = () => {
            Lampa.Controller.add(ID, {
                toggle() {
                    Lampa.Controller.collectionSet(scroll.render())
                    Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render())
                },
                back: this.back
            })
            Lampa.Controller.toggle(ID)
        }

        this.back = () => Lampa.Activity.backward()
        this.render = () => html
        this.destroy = () => { Lampa.Arrays.destroy(items); scroll.destroy(); html.remove() }
    }

    /** Добавляем кнопку в настройки */
    function addSettings() {
        Lampa.Settings.add({
            title: TITLE,
            group: 'plugins',
            subtitle: 'Управление плагинами',
            onSelect: () => Lampa.Activity.push({ title: TITLE, component: ID })
        })
    }

    /** Инициализация */
    function init() {
        if (!window.Lampa) return console.log('[cloudplugins] Lampa not ready')
        Lampa.Component.add(ID, Screen)
        addSettings()
    }

    if (window.appready) init()
    else Lampa.Listener.follow('app', (e) => { if (e.type === 'ready') init() })
})()
