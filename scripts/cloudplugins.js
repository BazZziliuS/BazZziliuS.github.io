(function () {
    const ID = 'cloudplugins'
    const TITLE = 'Менеджер плагинов'

    // --- Работа с хранилищем ---
    function getPlugins() {
        return Lampa.Storage.get('plugins', '[]')
    }

    function savePlugins(list) {
        Lampa.Storage.set('plugins', list)
    }

    function isInstalled(url) {
        return getPlugins().some(p => p.url === url && p.status === 1)
    }

    function installPlugin(url, cb) {
        let list = getPlugins()
        if (!list.find(p => p.url === url)) {
            list.push({ url: url, status: 1 })
        } else {
            list = list.map(p => p.url === url ? { url: url, status: 1 } : p)
        }
        savePlugins(list)
        Lampa.Utils.putScript(url, () => {
            Lampa.Noty.show('✅ Плагин установлен')
            if (cb) cb()
        })
    }

    function removePlugin(url, cb) {
        let list = getPlugins().map(p => p.url === url ? { url: url, status: 0 } : p)
        savePlugins(list)
        Lampa.Noty.show('❌ Плагин удалён')
        if (cb) cb()
    }

    // --- Авто-загрузка установленных ---
    getPlugins().forEach(p => {
        if (p.status === 1) {
            Lampa.Utils.putScript(p.url)
        }
    })

    // --- Списки плагинов по категориям ---
    const pluginCategories = {
        interface: [
            { name: 'Cub Off', url: 'https://bazzzilius.github.io/scripts/cub_off.js', desc: 'Убирает рекламу Cub Premium' }
        ],
        online: [
            { name: 'HDRezka', url: 'https://bazzzilius.github.io/scripts/rezka.js', desc: 'Онлайн фильмы и сериалы' }
        ],
        tv: [
            { name: 'IPTV', url: 'https://bazzzilius.github.io/scripts/iptv.js', desc: 'Телевидение через интернет' }
        ],
        torrent: [
            { name: 'TorrServer', url: 'https://bazzzilius.github.io/scripts/torrserver.js', desc: 'Воспроизведение торрентов' }
        ],
        radio: [
            { name: 'Radio', url: 'https://bazzzilius.github.io/scripts/radio.js', desc: 'Интернет радио' }
        ],
        adult: [
            { name: 'XXX Plugin', url: 'https://bazzzilius.github.io/scripts/xxx.js', desc: '18+ контент' }
        ]
    }

    // --- UI: Экран категории ---
    function CategoryScreen(object) {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $(`<div class="plugins-category"><div class="plugins-category__body"></div></div>`)
        const body = html.find('.plugins-category__body')
        let items = []

        this.create = () => {
            body.append(scroll.render(true))
            this.append(pluginCategories[object.category] || [])
            this.activity.toggle()
            return this.render()
        }

        this.append = (list) => {
            list.forEach((pl) => {
                const card = $(`
          <div class="selector plugin-card" style="padding:1em; margin:0.5em; background:#2b2b2b; border-radius:0.8em;">
            <div style="font-size:1.2em; font-weight:bold; margin-bottom:0.3em; color:#fff">${pl.name}</div>
            <div style="font-size:0.9em; color:#ccc; margin-bottom:0.8em">${pl.desc}</div>
            <div class="plugin-card__actions"></div>
          </div>
        `)

                const btnInstall = $(`<div class="plugin-btn selector" style="display:inline-block; background:#4caf50; color:#fff; padding:0.4em 1em; border-radius:0.5em; margin-right:0.5em; cursor:pointer;">Установить</div>`)
                const btnRemove = $(`<div class="plugin-btn selector" style="display:inline-block; background:#f44336; color:#fff; padding:0.4em 1em; border-radius:0.5em; cursor:pointer;">Удалить</div>`)

                const actions = card.find('.plugin-card__actions')

                function refresh() {
                    actions.empty()
                    if (isInstalled(pl.url)) {
                        actions.append(btnRemove)
                    } else {
                        actions.append(btnInstall)
                    }
                }

                btnInstall.on('hover:enter', () => installPlugin(pl.url, refresh))
                btnRemove.on('hover:enter', () => removePlugin(pl.url, refresh))

                card.on('hover:focus', () => scroll.update(card))

                refresh()
                scroll.append(card)
                items.push(card)
            })
        }

        this.start = () => {
            Lampa.Controller.add(ID + '_' + object.category, {
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
            Lampa.Controller.toggle(ID + '_' + object.category)
        }

        this.back = () => Lampa.Activity.backward()
        this.render = () => html
    }

    // --- Корневой экран с категориями ---
    function RootScreen() {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $(`<div class="plugins-root"><div class="plugins-root__body"></div></div>`)
        const body = html.find('.plugins-root__body')
        let items = []

        const categories = [
            { id: 'interface', name: 'Интерфейс', icon: '🖥️' },
            { id: 'online', name: 'Онлайн', icon: '🌐' },
            { id: 'tv', name: 'ТВ', icon: '📺' },
            { id: 'torrent', name: 'Торренты', icon: '📥' },
            { id: 'radio', name: 'Радио', icon: '📻' },
            { id: 'adult', name: '18+', icon: '🔞' }
        ]

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

    // --- Добавляем в настройки ---
    function addSettings() {
        Lampa.SettingsApi.addComponent({
            component: ID,
            name: TITLE,
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM17 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/></svg>'
        })

        Lampa.SettingsApi.addParam({
            component: ID,
            param: { name: 'open_manager', type: 'static' },
            field: { name: 'Открыть менеджер' },
            onSelect: () => {
                Lampa.Activity.push({ title: TITLE, component: ID + '_root' })
            }
        })
    }

    function init() {
        Lampa.Component.add(ID + '_root', RootScreen)
        Lampa.Component.add(ID + '_category', CategoryScreen)
        addSettings()
    }

    if (window.appready) init()
    else Lampa.Listener.follow('app', (e) => { if (e.type === 'ready') init() })
})()
