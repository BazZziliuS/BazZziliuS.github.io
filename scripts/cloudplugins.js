(function () {
    const ID = 'cloudplugins'
    const TITLE = 'Менеджер плагинов'

    // Список категорий
    const categories = [
        { id: 'interface', name: 'Интерфейс', icon: '🖥️' },
        { id: 'online', name: 'Онлайн', icon: '🌐' },
        { id: 'tv', name: 'ТВ', icon: '📺' },
        { id: 'torrent', name: 'Торренты', icon: '📥' },
        { id: 'radio', name: 'Радио', icon: '📻' },
        { id: 'adult', name: '18+', icon: '🔞' }
    ]

    // Список плагинов (пример!)
    const pluginsList = {
        interface: [
            { key: 'notice', name: 'Уведомления', description: 'Новости плагина', url: 'https://bazzzilius.github.io/scripts/notice.js', author: '@BazZziliuS' },
            { key: 'weather', name: 'Погода', description: 'Показывает время и погоду', url: 'https://bazzzilius.github.io/scripts/weather.js', author: '@lampishe' }
        ],
        online: [
            { key: 'online_mod', name: 'Online_Mod', description: 'Онлайн просмотр фильмов', url: 'https://nb557.github.io/plugins/online_mod.js', author: '@t_anton' }
        ]
    }

    /** ========================== ЭКРАН КОРНЯ ============================= */
    function RootScreen(object) {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $('<div class="plugins-root"><div class="plugins-root__body"></div></div>')
        const body = html.find('.plugins-root__body')
        let items = []

        this.create = () => {
            body.append(scroll.render(true))
            this.append(categories)
            this.activity.toggle()
            return this.render()
        }

        this.append = (list) => {
            list.forEach((cat) => {
                const el = $(`
          <div class="selector plugin-category" style="padding:1em; margin:0.5em; background:#383838; border-radius:0.8em; display:flex; align-items:center; gap:0.8em;">
            <div style="font-size:1.5em">${cat.icon}</div>
            <div style="font-size:1.2em; color:#fff">${cat.name}</div>
          </div>
        `)
                el.on('hover:enter', () => {
                    Lampa.Activity.push({ title: cat.name, component: ID + '_category', category: cat.id })
                })
                el.on('hover:focus', () => scroll.update(el))
                scroll.append(el)
                items.push(el)
            })
        }

        this.start = () => {
            Lampa.Controller.add(ID + '_root', {
                toggle() {
                    Lampa.Controller.collectionSet(scroll.render())
                    Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render())
                },
                back: this.back,
                up() { Navigator.move('up') },
                down() { Navigator.move('down') },
                left() { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu') },
                right() { Navigator.move('right') }
            })
            Lampa.Controller.toggle(ID + '_root')
        }

        this.back = () => Lampa.Activity.backward()
        this.render = () => html
    }

    /** ========================== ЭКРАН КАТЕГОРИИ ============================= */
    function CategoryScreen(object) {
        const cat = object.category
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $('<div class="plugins-category"><div class="plugins-category__body"></div></div>')
        const body = html.find('.plugins-category__body')
        let items = []

        this.create = () => {
            body.append(scroll.render(true))
            this.append(pluginsList[cat] || [])
            this.activity.toggle()
            return this.render()
        }

        this.append = (list) => {
            if (!list.length) {
                const empty = new Lampa.Empty({ descr: 'Нет плагинов' })
                body.append(empty.render(true))
                this.start = empty.start
                return
            }

            list.forEach((p) => {
                const installed = isInstalled(p.url)
                const el = $(`
          <div class="selector plugin-item" style="padding:1em; margin:0.5em; background:#2c2c2c; border-radius:0.8em;">
            <div style="font-size:1.1em; color:#ff9800; font-weight:bold">${p.name}</div>
            <div style="font-size:0.9em; color:#bbb; margin:0.3em 0">${p.description}</div>
            <div style="font-size:0.8em; color:#666">Автор: ${p.author}</div>
            <div style="margin-top:0.5em; color:${installed ? 'lime' : 'tomato'}">${installed ? 'Установлен' : 'Не установлен'}</div>
          </div>
        `)

                el.on('hover:enter', () => {
                    if (installed) removePlugin(p.url)
                    else installPlugin(p)
                    Lampa.Settings.update()
                    Lampa.Noty.show(installed ? 'Удалено' : 'Установлено')
                    this.back() // вернемся и обновим
                })

                el.on('hover:focus', () => scroll.update(el))
                scroll.append(el)
                items.push(el)
            })
        }

        this.start = () => {
            Lampa.Controller.add(ID + '_category', {
                toggle() {
                    Lampa.Controller.collectionSet(scroll.render())
                    Lampa.Controller.collectionFocus(items[0]?.[0] || false, scroll.render())
                },
                back: this.back,
                up() { Navigator.move('up') },
                down() { Navigator.move('down') },
                left() { if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu') },
                right() { Navigator.move('right') }
            })
            Lampa.Controller.toggle(ID + '_category')
        }

        this.back = () => Lampa.Activity.backward()
        this.render = () => html
    }

    /** ========================== УТИЛИТЫ ============================= */
    function getPlugins() {
        return Lampa.Storage.get('plugins', '[]')
    }

    function savePlugins(arr) {
        Lampa.Storage.set('plugins', arr)
    }

    function isInstalled(url) {
        const arr = getPlugins()
        return arr.some(p => p.url === url)
    }

    function installPlugin(p) {
        const arr = getPlugins()
        arr.push({ url: p.url, name: p.name, author: p.author, status: 1 })
        savePlugins(arr)
    }

    function removePlugin(url) {
        let arr = getPlugins()
        arr = arr.filter(p => p.url !== url)
        savePlugins(arr)
    }

    /** ========================== ИНИЦИАЛИЗАЦИЯ ============================= */
    function addSettings() {
        Lampa.SettingsApi.addComponent({
            component: ID,
            name: TITLE,
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM17 17a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/></svg>'
        })

        Lampa.SettingsApi.addParam({
            component: ID,
            param: { name: 'open', type: 'button' },
            field: { name: 'Открыть менеджер' },
            onSelect: () => {
                Lampa.Activity.push({ title: TITLE, component: ID + '_root' })
            }
        })
    }

    function init() {
        if (!window.Lampa) return
        Lampa.Component.add(ID + '_root', RootScreen)
        Lampa.Component.add(ID + '_category', CategoryScreen)
        addSettings()
    }

    if (window.appready) init()
    else Lampa.Listener.follow('app', (e) => { if (e.type === 'ready') init() })
})()
