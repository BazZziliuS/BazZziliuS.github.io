(function () {
    const ID = 'cloudplugins'
    const TITLE = 'Менеджер плагинов'

    // список плагинов
    const pluginsList = [
        { category: 'Интерфейс', name: 'В качестве', url: 'https://bazzzilius.github.io/scripts/in_quality.js', author: '@bylampa' },
        { category: 'Интерфейс', name: 'Зарубежные подборки', url: 'https://bazzzilius.github.io/scripts/inter_movie.js', author: '@bylampa' },
        { category: 'Онлайн', name: 'Online_Mod', url: 'https://nb557.github.io/plugins/online_mod.js', author: '@t_anton' },
        { category: 'Онлайн', name: 'Showy', url: 'http://showwwy.com/m.js', author: '@showy' },
        { category: 'ТВ', name: 'Дизель ТВ', url: 'https://andreyurl54.github.io/diesel5/diesel.js', author: '@AndreyURL54' },
        { category: 'ТВ', name: 'Kulik', url: 'http://cdn.kulik.uz/cors', author: '@SawamuraRen' },
        { category: 'Торренты', name: 'Переключение парсеров', url: 'https://bazzzilius.github.io/scripts/jackett.js', author: '@AndreyURL54' },
        { category: 'Торренты', name: 'Tracks', url: 'http://cub.red/plugin/tracks', author: '@lampa' }
    ]

    // Экран менеджера
    function Screen() {
        const scroll = new Lampa.Scroll({ mask: true, over: true })
        const html = $('<div class="cloudplugins"><div class="cloudplugins__body"></div></div>')
        const body = html.find('.cloudplugins__body')
        let items = []

        this.create = () => {
            body.append(scroll.render(true))

            // показываем категории
            this.appendCategories()

            this.activity.toggle()
            return this.render()
        }

        this.appendCategories = () => {
            const categories = [...new Set(pluginsList.map(p => p.category))]

            categories.forEach((cat) => {
                const el = $('<div class="selector cloudplugins__item"></div>').text('📂 ' + cat)

                el.on('hover:enter', () => {
                    this.showPlugins(cat)
                })

                el.on('hover:focus', () => scroll.update(el))

                scroll.append(el)
                items.push(el)
            })
        }

        this.showPlugins = (category) => {
            scroll.clear()
            items = []

            const backBtn = $('<div class="selector cloudplugins__back"></div>').text('← Назад')
            backBtn.on('hover:enter', () => {
                scroll.clear()
                items = []
                this.appendCategories()
            })
            backBtn.on('hover:focus', () => scroll.update(backBtn))
            scroll.append(backBtn)
            items.push(backBtn)

            pluginsList.filter(p => p.category === category).forEach((pl) => {
                const el = $('<div class="selector cloudplugins__item"></div>').html(`<b>${pl.name}</b> <span style="color:#999">(${pl.author})</span>`)

                el.on('hover:enter', () => {
                    Lampa.Noty.show(`Установка: ${pl.name}`)
                    const script = document.createElement('script')
                    script.src = pl.url
                    document.head.appendChild(script)
                })

                el.on('hover:focus', () => scroll.update(el))
                scroll.append(el)
                items.push(el)
            })
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
        this.destroy = () => { scroll.destroy(); html.remove() }
    }

    // Добавляем категорию в настройки
    function addSettings() {
        Lampa.SettingsApi.addComponent({
            component: 'addons_root',
            name: 'Плагины',
            icon: '📦'
        })

        Lampa.SettingsApi.addParam({
            component: 'addons_root',
            param: { name: 'open_addons', type: 'button' },
            field: { name: 'Открыть менеджер', description: 'Категории и управление плагинами' },
            onSelect: () => {
                Lampa.Activity.push({ title: TITLE, component: ID })
            }
        })
    }

    function init() {
        if (!window.Lampa) return console.log('[cloudplugins] Lampa not ready')

        Lampa.Component.add(ID, Screen)
        addSettings()
    }

    if (window.appready) init()
    else Lampa.Listener.follow('app', (e) => { if (e.type === 'ready') init() })
})()
