(function () {
    const ID = 'cloudplugins'
    const TITLE = 'Менеджер плагинов'

    /** Работа с плагинами в Storage */
    function getPlugins() {
        return Lampa.Storage.get('plugins', [])
    }

    function savePlugins(list) {
        Lampa.Storage.set('plugins', list)
    }

    function isInstalled(url) {
        return getPlugins().some(p => p.url === url && p.status === 1)
    }

    function installPlugin(url) {
        let list = getPlugins()
        const idx = list.findIndex(p => p.url === url)
        if (idx === -1) list.push({ url, status: 1 })
        else list[idx].status = 1
        savePlugins(list)
        Lampa.Utils.putScript(url, () => Lampa.Noty.show('✅ Плагин установлен'))
    }

    function removePlugin(url) {
        let list = getPlugins()
        const idx = list.findIndex(p => p.url === url)
        if (idx !== -1) list[idx].status = 0
        savePlugins(list)
        Lampa.Noty.show('❌ Плагин удалён')
    }

    /** Экран категорий */
    function RootScreen(object) {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $('<div class="cloudplugins-root"><div class="cloudplugins-body"></div></div>')
        const body = html.find('.cloudplugins-body')
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

            categories.forEach(cat => {
                const el = $(`
          <div class="selector" style="padding:1em; margin:0.5em; background:#383838; border-radius:0.6em; display:flex; gap:0.6em; align-items:center;">
            <div style="font-size:1.3em">${cat.icon}</div>
            <div style="font-size:1.1em; color:#fff">${cat.name}</div>
          </div>
        `)
                el.on('hover:enter', () => {
                    Lampa.Activity.push({ title: cat.name, component: ID + '_category', category: cat.id })
                })
                el.on('hover:focus', () => scroll.update(el))
                scroll.append(el)
                items.push(el)
            })

            this.activity.toggle()
            return this.render()
        }

        this.start = () => {
            Lampa.Controller.add(ID, {
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
            Lampa.Controller.toggle(ID)
        }

        this.back = () => Lampa.Activity.backward()
        this.render = () => html
        this.destroy = () => { scroll.destroy(); html.remove(); }
    }

    /** Экран плагинов в категории */
    function CategoryScreen(object) {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $('<div class="cloudplugins-category"><div class="cloudplugins-body"></div></div>')
        const body = html.find('.cloudplugins-body')
        let items = []

        // Пример плагинов (замени своими)
        const plugins = [
            { name: 'Plugin A', url: 'https://example.com/pluginA.js' },
            { name: 'Plugin B', url: 'https://example.com/pluginB.js' }
        ]

        this.create = () => {
            body.append(scroll.render(true))

            plugins.forEach(pl => {
                const el = $(`
          <div class="selector" style="padding:1em; margin:0.5em; background:#2e2e2e; border-radius:0.6em;">
            <div style="font-size:1.1em; color:#fff; margin-bottom:0.5em">${pl.name}</div>
            <div style="display:flex; gap:1em;">
              <div class="cloudplugins-btn" style="background:#ff9800; color:#000; padding:0.4em 1em; border-radius:0.5em; font-weight:bold; cursor:pointer;">
                ${isInstalled(pl.url) ? 'Удалить' : 'Установить'}
              </div>
            </div>
          </div>
        `)

                const btn = el.find('.cloudplugins-btn')
                btn.on('hover:enter', () => {
                    if (isInstalled(pl.url)) removePlugin(pl.url)
                    else installPlugin(pl.url)
                    btn.text(isInstalled(pl.url) ? 'Удалить' : 'Установить')
                })

                el.on('hover:focus', () => scroll.update(el))
                scroll.append(el)
                items.push(el)
            })

            this.activity.toggle()
            return this.render()
        }

        this.start = () => {
            Lampa.Controller.add(ID + '_cat', {
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
            Lampa.Controller.toggle(ID + '_cat')
        }

        this.back = () => Lampa.Activity.backward()
        this.render = () => html
        this.destroy = () => { scroll.destroy(); html.remove(); }
    }

    /** Добавляем пункт в настройки */
    function addSettings() {
        Lampa.SettingsApi.addComponent({
            component: ID,
            name: TITLE,
            icon: '🧩'
        })

        Lampa.SettingsApi.addParam({
            component: ID,
            param: { name: 'open', type: 'button' },
            field: { name: 'Открыть менеджер' },
            onChange: () => {
                Lampa.Activity.push({ title: TITLE, component: ID })
            }
        })
    }

    function init() {
        if (!window.Lampa) return
        Lampa.Component.add(ID, RootScreen)
        Lampa.Component.add(ID + '_category', CategoryScreen)
        addSettings()

        // загружаем установленные плагины при старте
        getPlugins().forEach(p => {
            if (p.status) Lampa.Utils.putScript(p.url)
        })
    }

    if (window.appready) init()
    else Lampa.Listener.follow('app', (e) => { if (e.type === 'ready') init() })
})()
