(function () {
    const ID = 'cloudplugins'
    const TITLE = 'Плагины'

    /** Иконки категорий */
    const icons = {
        add_interface_plugin: '🖥️',
        add_management_plugin: '⚙️',
        add_online_plugin: '🌐',
        add_torrent_plugin: '🌀',
        add_tv_plugin: '📺',
    }

    /** Категории */
    const categories = [
        { component: 'add_interface_plugin', title: 'Интерфейс' },
        { component: 'add_management_plugin', title: 'Управление' },
        { component: 'add_online_plugin', title: 'Онлайн' },
        { component: 'add_torrent_plugin', title: 'Торренты' },
        { component: 'add_tv_plugin', title: 'ТВ' },
    ]

    /** Плагины (сокращённый список для примера) */
    const pluginsList = [
        { component: 'add_interface_plugin', key: 'in_quality', name: 'В качестве', description: 'Добавляет новинки в качестве', url: 'https://bazzzilius.github.io/scripts/in_quality.js', author: '@bylampa' },
        { component: 'add_online_plugin', key: 'modss', name: 'Modss', description: '17 балансеров, онлайн кино', url: 'http://lampa.stream/modss', author: '@Nikolai4' },
        { component: 'add_tv_plugin', key: 'diesel', name: 'Дизель ТВ', description: 'Бесплатные телеканалы', url: 'https://andreyurl54.github.io/diesel5/diesel.js', author: '@AndreyURL54' }
    ]

    /** Экран */
    function Screen() {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $(`<div class="${ID}-screen"><div class="${ID}-screen__body"></div></div>`)
        const body = html.find(`.${ID}-screen__body`)
        let items = []

        this.create = () => {
            body.append(scroll.render(true))
            this.renderCategories()
            this.activity.toggle()
            return this.render()
        }

        /** Рендер категорий */
        this.renderCategories = () => {
            scroll.clear()
            items = []

            categories.forEach(c => {
                const count = pluginsList.filter(p => p.component === c.component).length
                const el = $(`<div class="selector ${ID}__category">
                  <span style="font-size:1.3em;margin-right:.5em">${icons[c.component] || '📦'}</span>
                  <span>${c.title} (${count})</span>
                </div>`)
                el.on('hover:enter', () => this.openCategory(c))
                el.on('hover:focus', () => scroll.update(el))
                scroll.append(el)
                items.push(el)
            })

            Lampa.Controller.collectionSet(scroll.render())
            Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render())
        }

        /** Рендер плагинов в выбранной категории */
        this.openCategory = (cat) => {
            scroll.clear()
            items = []

            // Кнопка назад
            const backEl = $(`<div class="selector ${ID}__back">⬅ Назад</div>`)
            backEl.on('hover:enter', () => this.renderCategories())
            backEl.on('hover:focus', () => scroll.update(backEl))
            scroll.append(backEl)
            items.push(backEl)

            const list = pluginsList.filter(p => p.component === cat.component)
            list.forEach(plugin => {
                const el = $(`<div class="selector ${ID}__item">
                    <div style="font-size:1.1em; color:#ff9800">${plugin.name}</div>
                    <div style="font-size:0.9em; color:#ccc">${plugin.description}</div>
                    <div style="font-size:0.8em; color:#666">Автор: ${plugin.author}</div>
                </div>`)

                el.on('hover:enter', () => {
                    Lampa.Noty.show(`Выбран плагин: ${plugin.name}`)
                })
                el.on('hover:focus', () => scroll.update(el))

                scroll.append(el)
                items.push(el)
            })

            Lampa.Controller.collectionSet(scroll.render())
            Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render())
        }

        this.start = () => {
            Lampa.Controller.add(ID, {
                toggle: () => {
                    Lampa.Controller.collectionSet(scroll.render())
                    Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render())
                },
                back: this.back,
                up() { Navigator.move('up') },
                down() { Navigator.move('down') },
                left() { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu') },
                right() { Navigator.move('right') }
            })
            Lampa.Controller.toggle(ID)
        }

        this.back = () => Lampa.Activity.backward()
        this.render = () => html
        this.destroy = () => { Lampa.Arrays.destroy(items); scroll.destroy(); html.remove() }
    }

    /** Добавляем пункт в меню */
    function addSettings() {
        // создаём категорию "Плагины"
        Lampa.SettingsApi.addComponent({
            component: 'addons_root',
            name: 'Плагины',
            icon: '📦'
        })

        // добавляем кнопку "Открыть"
        Lampa.SettingsApi.addParam({
            component: 'addons_root',
            param: { name: 'open_addons', type: 'button' },
            field: { name: 'Открыть менеджер', description: 'Категории и управление плагинами' },
            onSelect: () => Lampa.Activity.push({ title: TITLE, component: ID })
        })
    }


    function init() {
        if (!window.Lampa) return
        Lampa.Component.add(ID, Screen)
        addSettings()
    }

    if (window.appready) init()
    else Lampa.Listener.follow('app', (e) => { if (e.type === 'ready') init() })
})()
