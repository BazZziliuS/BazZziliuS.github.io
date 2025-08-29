(function () {
    const ID = 'cloudplugins'
    const TITLE = 'Менеджер плагинов'
    const STORAGE_KEY = 'cloudplugins_installed'

    // Загружаем сохранённые плагины
    let installed = Lampa.Storage.get(STORAGE_KEY, {})

    function saveInstalled() {
        Lampa.Storage.set(STORAGE_KEY, installed)
    }

    // Иконки категорий
    const icons = {
        interface: '💻',
        management: '⚙️',
        online: '🌐',
        torrent: '🌀',
        tv: '📺'
    }

    // Категории и плагины
    const categories = [
        {
            id: 'interface', title: 'Интерфейс', plugins: [
                { id: 'cuboff', name: 'Стильный интерфейс', url: 'https://bazzzilius.github.io/scripts/cub_off.js' },
                { id: 'snow', name: 'Снег', url: 'https://bazzzilius.github.io/scripts/snow.js' }
            ]
        },
        {
            id: 'management', title: 'Управление', plugins: [
                { id: 'exit', name: 'Выход', url: 'https://tsynik.github.io/lampa/e.js' },
                { id: 'hotkeys', name: 'Горячие кнопки', url: 'https://nnmdd.github.io/lampa_hotkeys/hotkeys.js' }
            ]
        },
        {
            id: 'online', title: 'Онлайн', plugins: [
                { id: 'online_mod', name: 'Online_Mod', url: 'https://nb557.github.io/plugins/online_mod.js' },
                { id: 'showy', name: 'Showy', url: 'http://showwwy.com/m.js' }
            ]
        },
        {
            id: 'torrent', title: 'Торренты', plugins: [
                { id: 'jackett', name: 'Переключение парсеров', url: 'https://bazzzilius.github.io/scripts/jackett.js' }
            ]
        },
        {
            id: 'tv', title: 'ТВ', plugins: [
                { id: 'diesel', name: 'Дизель ТВ', url: 'https://andreyurl54.github.io/diesel5/diesel.js' },
                { id: 'iptv', name: 'IPTV', url: 'http://cub.red/plugin/iptv' }
            ]
        }
    ]

    function Screen() {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $('<div class="cloudplugins"><div class="cloudplugins__body"></div></div>')
        const body = html.find('.cloudplugins__body')
        let items = []

        this.create = () => {
            body.append(scroll.render(true))
            this.appendCategories()
            this.activity.loader(false)
            this.activity.toggle()
            return this.render()
        }

        // Список категорий
        this.appendCategories = () => {
            categories.forEach(cat => {
                const el = $(`<div class="selector cloudplugins-category"></div>`).text(`${icons[cat.id]} ${cat.title}`)
                el.on('hover:enter', () => this.openCategory(cat))
                el.on('hover:focus', () => scroll.update(el))
                scroll.append(el)
                items.push(el)
            })
        }

        // Список плагинов внутри категории
        this.openCategory = (cat) => {
            scroll.clear()
            items = []

            const backBtn = $('<div class="selector cloudplugins-back">⬅️ Назад</div>')
            backBtn.on('hover:enter', () => {
                scroll.clear()
                items = []
                this.appendCategories()
                this.start()
            })
            backBtn.on('hover:focus', () => scroll.update(backBtn))
            scroll.append(backBtn)
            items.push(backBtn)

            cat.plugins.forEach(pl => {
                const el = $(`
          <div class="selector cloudplugins-plugin" style="display:flex; align-items:center; justify-content:space-between; padding:0.6em; background:#2b2b2b; margin:0.3em 0; border-radius:0.5em;">
            <div style="display:flex; align-items:center; gap:0.5em;">
              <div style="font-size:1.4em;">🧩</div>
              <div style="font-size:1.1em; font-weight:bold;">${pl.name}</div>
            </div>
            <div class="plugin-btn" style="background:${installed[pl.id] ? '#f44336' : '#4caf50'}; color:#fff; padding:0.3em 0.8em; border-radius:0.4em; font-size:0.9em;">
              ${installed[pl.id] ? 'Удалить' : 'Установить'}
            </div>
          </div>
        `)

                const btn = el.find('.plugin-btn')

                el.on('hover:enter', () => {
                    if (installed[pl.id]) {
                        delete installed[pl.id]
                        btn.text('Установить').css('background', '#4caf50')
                        Lampa.Noty.show(`Удалён: ${pl.name}`)
                    } else {
                        installed[pl.id] = pl.url
                        btn.text('Удалить').css('background', '#f44336')
                        Lampa.Noty.show(`Установлен: ${pl.name}`)
                        // тут можно подключить загрузку скрипта: Lampa.Utils.putScript(pl.url)
                    }
                    saveInstalled()
                })

                el.on('hover:focus', () => scroll.update(el))
                scroll.append(el)
                items.push(el)
            })

            this.start()
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

        this.back = () => {
            Lampa.Activity.backward()
        }

        this.render = () => html
        this.pause = () => { }
        this.resume = () => { }
        this.destroy = () => { scroll.destroy(); html.remove() }
    }

    function addSettings() {
        Lampa.SettingsApi.addComponent({
            component: 'addons_root',
            name: 'Плагины',
            icon: '🧩'
        })

        Lampa.SettingsApi.addParam({
            component: 'addons_root',
            param: { name: 'open_addons', type: 'button' },
            field: { name: 'Открыть менеджер', description: 'Категории и плагины' },
            onChange: () => {
                Lampa.Activity.push({ title: TITLE, component: ID })
            }
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
