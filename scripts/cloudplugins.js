(function () {
    const ID = 'cloudplugins'
    const TITLE = 'Менеджер плагинов'
    const STORAGE_KEY = 'cloud_plugins_list'

    const CATEGORIES = [
        { id: 'interface', name: 'Интерфейс', icon: '🖥️' },
        { id: 'management', name: 'Управление', icon: '⚙️' },
        { id: 'online', name: 'Онлайн', icon: '🌐' },
        { id: 'torrent', name: 'Торренты', icon: '📦' },
        { id: 'tv', name: 'ТВ', icon: '📺' },
        { id: 'radio', name: 'Радио', icon: '📻' },
        { id: 'adult', name: '18+', icon: '🔞' }
    ]

    // ---------------- STORAGE ----------------
    function getPlugins() {
        return Lampa.Storage.get(STORAGE_KEY, [])
    }

    function savePlugins(list) {
        Lampa.Storage.set(STORAGE_KEY, list)
    }

    function installPlugin(url) {
        let list = getPlugins()
        const idx = list.findIndex(p => p.url === url)
        if (idx === -1) list.push({ url, status: 1 })
        else list[idx].status = 1
        savePlugins(list)

        Lampa.Utils.putScript(
            url,
            () => Lampa.Noty.show('✅ Плагин установлен'),
            () => Lampa.Noty.show('❌ Ошибка загрузки плагина')
        )
    }

    function removePlugin(url) {
        let list = getPlugins().filter(p => p.url !== url)
        savePlugins(list)
        Lampa.Noty.show('🗑️ Плагин удалён')
    }

    // ---------------- ROOT SCREEN ----------------
    function RootScreen() {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $(`<div class="cloudplugins"><div class="cloudplugins__body"></div></div>`)
        const body = html.find('.cloudplugins__body')
        let items = []

        this.create = () => {
            body.append(scroll.render(true))

            // блок категорий
            const catBlock = $('<div class="cloudplugins__categories"></div>')
            CATEGORIES.forEach(cat => {
                const el = $(
                    `<div class="selector cloudplugins__cat">
             <div class="cloudplugins__cat-icon">${cat.icon}</div>
             <div class="cloudplugins__cat-name">${cat.name}</div>
           </div>`
                )
                el.on('hover:enter', () => {
                    Lampa.Activity.push({ title: cat.name, component: 'cloudplugins_category', id: cat.id })
                })
                el.on('hover:focus', () => scroll.update(el))
                catBlock.append(el)
                items.push(el)
            })
            scroll.append(catBlock)

            // блок установленных плагинов
            const pluginBlock = $('<div class="cloudplugins__plugins"><div class="cloudplugins__title">Установленные плагины</div></div>')
            const plugins = getPlugins()
            if (plugins.length === 0) {
                pluginBlock.append('<div class="cloudplugins__empty">Нет установленных плагинов</div>')
            } else {
                plugins.forEach(p => {
                    const row = $(
                        `<div class="selector cloudplugins__plugin">
               <div class="cloudplugins__plugin-url">${p.url}</div>
               <div class="cloudplugins__plugin-action">Удалить</div>
             </div>`
                    )
                    row.on('hover:enter', () => removePlugin(p.url))
                    row.on('hover:focus', () => scroll.update(row))
                    pluginBlock.append(row)
                    items.push(row)
                })
            }
            scroll.append(pluginBlock)

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
        this.pause = () => { }
        this.resume = () => { }
        this.destroy = () => { scroll.destroy(); html.remove() }
    }

    // ---------------- CATEGORY SCREEN ----------------
    function CategoryScreen(object) {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $(`<div class="cloudplugins-category"><div class="cloudplugins-category__body"></div></div>`)
        const body = html.find('.cloudplugins-category__body')
        let items = []

        this.create = () => {
            body.append(scroll.render(true))

            const urls = [
                `https://example.com/${object.id}/plugin1.js`,
                `https://example.com/${object.id}/plugin2.js`
            ]

            urls.forEach(url => {
                const row = $(
                    `<div class="selector cloudplugins__plugin cloudplugins__plugin--install">
             <div class="cloudplugins__plugin-url">${url}</div>
             <div class="cloudplugins__plugin-action">Установить</div>
           </div>`
                )
                row.on('hover:enter', () => installPlugin(url))
                row.on('hover:focus', () => scroll.update(row))
                scroll.append(row)
                items.push(row)
            })

            this.activity.toggle()
            return this.render()
        }

        this.start = () => {
            Lampa.Controller.add(`${ID}_${object.id}`, {
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
            Lampa.Controller.toggle(`${ID}_${object.id}`)
        }

        this.back = () => Lampa.Activity.backward()
        this.render = () => html
        this.pause = () => { }
        this.resume = () => { }
        this.destroy = () => { scroll.destroy(); html.remove() }
    }

    // ---------------- INIT ----------------
    function init() {
        if (!window.Lampa) return

        // добавляем стили
        const style = document.createElement('style')
        style.textContent = `
      .cloudplugins__categories { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px,1fr)); gap: 1em; margin-bottom: 1.5em; }
      .cloudplugins__cat { background:#2a2a2a; border-radius:1em; padding:1em; text-align:center; font-size:1.1em; }
      .cloudplugins__cat-icon { font-size:2em; margin-bottom:0.5em; }
      .cloudplugins__cat.focus { background:#ff9800; color:#000; }
      .cloudplugins__plugins { margin-top:1em; }
      .cloudplugins__title { font-size:1.2em; margin-bottom:0.5em; }
      .cloudplugins__plugin { display:flex; justify-content:space-between; align-items:center; background:#333; padding:0.7em 1em; border-radius:0.8em; margin-bottom:0.5em; }
      .cloudplugins__plugin-action { color:#ff9800; font-weight:bold; }
      .cloudplugins__plugin.focus { background:#ff9800; color:#000; }
      .cloudplugins__plugin.focus .cloudplugins__plugin-action { color:#000; }
      .cloudplugins__empty { opacity:0.6; font-size:0.9em; }
    `
        document.head.appendChild(style)

        // регистрируем экраны
        Lampa.Component.add(ID, RootScreen)
        Lampa.Component.add('cloudplugins_category', CategoryScreen)

        // кнопка в настройках
        Lampa.SettingsApi.addComponent({
            component: 'addons_root',
            name: 'Плагины',
            onSelect: () => {
                Lampa.Activity.push({ title: TITLE, component: ID })
            }
        })
    }

    if (window.appready) init()
    else Lampa.Listener.follow('app', (e) => { if (e.type === 'ready') init() })
})()
