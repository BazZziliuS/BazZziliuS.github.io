# Lampa Plugin API — Полная документация

Справочник по API приложения Lampa для разработки плагинов. Основан на анализе исходного кода https://github.com/yumata/lampa-source.

---

## Глобальный объект `window.Lampa`

Создаётся в `initClass()` при запуске приложения. Содержит ~75 модулей. Основные:

| Модуль | Назначение |
|--------|-----------|
| `Listener` | Глобальная шина событий (экземпляр Subscribe) |
| `Storage` | Персистентное хранилище (localStorage + IndexedDB) |
| `SettingsApi` | API для добавления компонентов и параметров в настройки |
| `Settings` | Управление экраном настроек |
| `Controller` | Фокус, навигация, управление контроллерами |
| `Activity` | Стек экранов, навигация push/backward/replace |
| `Template` | Система HTML-шаблонов |
| `Select` | Selectbox (выбор из списка) |
| `Modal` | Модальные окна |
| `Noty` | Уведомления (toast) |
| `Reguest` | HTTP-запросы (класс, создавать через `new`) |
| `Network` | Готовый экземпляр `Reguest` |
| `Head` | Шапка приложения (иконки, заголовок) |
| `Menu` | Боковое меню |
| `Card` | Карточка контента (класс) |
| `Player` | Плеер |
| `Scroll` | Прокручиваемый контейнер (класс) |
| `Explorer` | Навигатор файлов/данных (класс, наследник Emit) |
| `Filter` | Фильтрация данных |
| `Platform` | Определение платформы |
| `TMDB` | API TMDB |
| `Lang` | Переводы |
| `Utils` | Утилиты |
| `Arrays` | Работа с массивами/объектами |
| `Favorite` | Закладки/избранное |
| `Background` | Управление фоном |
| `Account` | Аккаунт пользователя |
| `Socket` | WebSocket |
| `Manifest` | Метаданные приложения |
| `Plugins` | Система загрузки плагинов |
| `Extensions` | Расширения |
| `Subscribe` | Фабрика систем событий |
| `Emit` | Компонентная система событий (класс) |
| `Layer` | Управление слоями UI |
| `Loading` | Индикатор загрузки |
| `Input` | Экранная клавиатура для ввода |
| `Broadcast` | Межвкладочная коммуникация |
| `ParentalControl` | Родительский контроль |
| `Router` | Роутер |
| `Timer` | Таймеры |
| `Cache` | Кэширование |
| `DB` | IndexedDB |
| `Base64` | Кодирование Base64 |
| `Color` | Работа с цветами |
| `Maker` | Генерация элементов |
| `Endless` | Бесконечная прокрутка |
| `NavigationBar` | Нижняя панель навигации |

---

## Subscribe — Система событий

Фабрика: `Lampa.Subscribe()` возвращает новый экземпляр. Глобальный: `Lampa.Listener`.

```javascript
// Подписка
listener.follow('event_name', callback)
listener.follow('event1,event2', callback)  // несколько событий
listener.add('event_name', callback)        // то же, но одно событие

// Отправка
listener.send('event_name', data)

// Проверка
listener.has('event_name', callback)  // boolean

// Удаление
listener.remove('event_name', callback)

// Уничтожение
listener.destroy()
```

### Глобальные события (Lampa.Listener)

| Событие | Данные | Когда |
|---------|--------|-------|
| `app` | `{type: 'ready'}` | Приложение готово |
| `card` | `{type: 'build', object, card}` | Построение карточки |
| `full` | `{type: 'complite', data, object}` | Полная карточка загружена |
| `activity` | `{type: 'archive', activity}` | Событие активности |

### События Settings (Lampa.Settings.listener)

| Событие | Данные | Когда |
|---------|--------|-------|
| `open` | `{name, body}` | Открытие компонента настроек |

### События Select (Lampa.Select.listener)

| Событие | Данные | Когда |
|---------|--------|-------|
| `preshow` | `{active}` | Перед показом |
| `fullshow` | `{active, html}` | После полного показа |
| `toggle` | `{active, html}` | Переключение контроллера |
| `hide` | `{active}` | Скрытие |
| `close` | `{active}` | Закрытие |

### События Modal (Lampa.Modal.listener)

| Событие | Данные | Когда |
|---------|--------|-------|
| `preshow` | `{active}` | Перед показом |
| `fullshow` | `{active, html}` | После полного показа |
| `toggle` | `{active, html}` | Переключение контроллера |
| `update` | `{active, html, new_html}` | Обновление содержимого |
| `close` | `{active}` | Закрытие |

### События Controller (Lampa.Controller.listener)

| Событие | Данные | Когда |
|---------|--------|-------|
| `toggle` | `{name}` | Переключение контроллера |

---

## Storage — Хранилище

```javascript
Lampa.Storage.get(key, defaultValue)  // Получить значение (с автоконвертацией типов)
Lampa.Storage.set(key, value)         // Установить значение (JSON-сериализация)
Lampa.Storage.field(key)              // Получить значение параметра настроек (с учётом defaults)
Lampa.Storage.add(key, value)         // Добавить уникальное значение в массив
Lampa.Storage.cache(key, max, empty)  // Кэш с ограничением размера
Lampa.Storage.value(key, empty)       // Прямой доступ к localStorage (строка)
Lampa.Storage.remove(field, value)    // Удалить синхронизируемое значение
Lampa.Storage.clear(full)             // Очистить хранилище
```

Ключевые хранимые данные:
- `'plugins'` — массив `[{author, url, name, status}]`
- `'language'` — код языка (по умолчанию `'ru'`)
- `'source'` — источник данных (`'tmdb'` | `'cub'`)
- `'favorite'` — избранное
- `'setting_member'` — сохранённые пользователем значения

---

## SettingsApi — Добавление настроек из плагина

### addComponent — Добавить раздел в настройки

```javascript
Lampa.SettingsApi.addComponent({
    component: 'my_plugin',         // уникальный ID
    name: 'Мой плагин',             // отображаемое имя
    icon: '<svg>...</svg>',          // SVG-иконка
    before: 'plugins',               // (опц.) вставить перед этим компонентом
    after: 'interface'               // (опц.) вставить после этого компонента
})
```

Автоматически создаёт пустой шаблон `settings_my_plugin` через `Template.add()`.

### addParam — Добавить параметр в компонент

```javascript
Lampa.SettingsApi.addParam({
    component: 'my_plugin',         // ID компонента
    param: {
        name: 'param_key',          // ключ в Storage
        type: 'select',             // тип: select | trigger | input | static | title | button
        values: {                   // для select
            'val1': 'Вариант 1',
            'val2': 'Вариант 2'
        },
        default: 'val1',            // значение по умолчанию
        placeholder: ''             // для input
    },
    field: {
        name: 'Название параметра',
        description: 'Описание'     // (опц.)
    },
    onChange: function(value) {},    // (опц.) при изменении значения
    onRender: function(item) {}     // (опц.) при рендеринге (item — jQuery элемент)
})
```

### Типы параметров

| Тип | HTML data-type | Поведение |
|-----|---------------|-----------|
| `'select'` | `data-type="select"` | Открывает Selectbox со списком значений |
| `'trigger'` | `data-type="toggle"` | Циклическое переключение значений (true/false) |
| `'input'` | `data-type="input"` | Открывает экранную клавиатуру |
| `'static'` | `data-static="true"` | Статический элемент, только отображает имя |
| `'title'` | — | Заголовок-разделитель (div.settings-param-title) |
| `'button'` | `data-type="button"` | Кнопка, вызывает onChange при нажатии |

### Другие методы

```javascript
Lampa.SettingsApi.getComponent(name)    // Получить компонент
Lampa.SettingsApi.removeComponent(name) // Удалить компонент и его параметры
Lampa.SettingsApi.getParam(name)        // Получить параметры компонента (массив)
Lampa.SettingsApi.removeParams(name)    // Удалить параметры
Lampa.SettingsApi.allComponents()       // Все компоненты {name: data}
Lampa.SettingsApi.allParams()           // Все параметры {component: [data]}
```

---

## Settings — Экран настроек

```javascript
Lampa.Settings.create(component_name)       // Открыть компонент настроек
Lampa.Settings.create(name, {onBack: fn})   // С кастомным back
Lampa.Settings.update()                     // Перерисовать текущий компонент
Lampa.Settings.listener.follow('open', cb)  // Подписка на открытие
Lampa.Settings.render()                     // jQuery-элемент настроек
```

Событие `open` отправляется при открытии как `main`, так и любого компонента:
```javascript
Lampa.Settings.listener.follow('open', function(e) {
    // e.name — имя компонента ('main', 'interface', 'my_plugin', ...)
    // e.body — jQuery-элемент тела
})
```

---

## Controller — Навигация и фокус

Система контроллеров для управления фокусом на ТВ. Один контроллер активен в каждый момент.

```javascript
// Добавить контроллер
Lampa.Controller.add('my_controller', {
    toggle: function() {},   // при активации
    up: function() {},       // навигация вверх
    down: function() {},
    left: function() {},
    right: function() {},
    enter: function() {},    // OK/Enter
    back: function() {},     // назад
    long: function() {},     // долгое нажатие
    gone: function(to) {},   // при деактивации (to — имя нового)
    update: function() {},   // при обновлении
    invisible: true          // (опц.) разрешить пустую коллекцию
})

// Переключить
Lampa.Controller.toggle('my_controller')

// Получить текущий
Lampa.Controller.enabled()  // {name: string, controller: object}

// Управление коллекцией элементов
Lampa.Controller.collectionSet(html, append, visible_only)
Lampa.Controller.collectionFocus(target, html, visible_only)
Lampa.Controller.collectionAppend(elements)

// Фокус
Lampa.Controller.focus(target)   // Установить фокус
Lampa.Controller.clear()         // Очистить

// Действия
Lampa.Controller.move(direction) // 'up' | 'down' | 'left' | 'right'
Lampa.Controller.enter()
Lampa.Controller.back()
Lampa.Controller.long()
Lampa.Controller.toContent()     // Закрыть все оверлеи и вернуться к контенту
```

Класс `.selector` — элемент, на который можно навести фокус. При фокусе получает класс `.focus`.

### Навигация (Navigator)

Глобальный объект `Navigator` (без `Lampa.` префикса):
```javascript
Navigator.move('up' | 'down' | 'left' | 'right')
Navigator.focus(element)
Navigator.canmove(direction)        // boolean
Navigator.setCollection(elements)
Navigator.focused(element)
```

---

## Activity — Стек экранов

```javascript
Lampa.Activity.push({
    url: 'api/endpoint',
    title: 'Заголовок',
    component: 'category_full',  // имя компонента
    source: 'tmdb',
    page: 1,
    filter: {}
})

Lampa.Activity.backward()       // Назад
Lampa.Activity.replace({...})   // Заменить текущую
Lampa.Activity.refresh()        // Перезагрузить
Lampa.Activity.call(callback)   // Установить callback для back
```

### Встроенные компоненты

`main`, `full`, `category_full`, `category`, `bookmarks`, `favorite`, `person`, `torrents`, `mytorrents`, `feed`, `company`, `relise`, `timetable`, `subscribes`, `recommendations`, `episodes`, `nocomponent`

---

## Template — Шаблоны

```javascript
Lampa.Template.get(name, vars)         // jQuery-элемент с подстановкой переменных {name}
Lampa.Template.js(name, vars)          // Клонированный DOM-элемент (с кэшированием)
Lampa.Template.add(name, html_string)  // Добавить/заменить шаблон
Lampa.Template.string(name)            // Получить HTML-строку шаблона
Lampa.Template.all()                   // Все шаблоны

// Утилиты
Lampa.Template.prefix(root, prefix)    // Найти элементы по префиксу класса
Lampa.Template.elem(tag, {class, attr, text, html, children})  // Создать элемент
```

---

## Select — Selectbox

```javascript
Lampa.Select.show({
    title: 'Заголовок',
    items: [
        {
            title: 'Элемент 1',
            subtitle: 'Подзаголовок',    // (опц.)
            selected: true,              // (опц.) отметка выбранного
            checked: false,              // (опц.) для checkbox
            checkbox: false,             // (опц.) режим чекбокса
            separator: false,            // (опц.) разделитель
            ghost: false,                // (опц.) полупрозрачный
            hide: false,                 // (опц.) скрыть
            noenter: false,              // (опц.) не реагировать на Enter
            template: 'selectbox_item'   // (опц.) кастомный шаблон
        }
    ],
    fullsize: false,      // (опц.) на весь экран
    nomark: false,        // (опц.) не отмечать выбранное
    nohide: false,        // (опц.) не закрывать после выбора
    onSelect: function(item, elem) {},
    onCheck: function(item, elem) {},    // для checkbox
    onFocus: function(item, target) {},
    onLong: function(item, target) {},
    onBack: function() {},
    onDraw: function(item_elem, item_data) {},
    onFullDraw: function(scroll) {},
    onBeforeClose: function() {}         // return true чтобы закрыть
})

Lampa.Select.close()
Lampa.Select.hide()
```

---

## Modal — Модальные окна

```javascript
Lampa.Modal.open({
    title: 'Заголовок',
    html: $('<div>Содержимое</div>'),    // jQuery-элемент
    size: 'small',           // 'small' | 'medium' | 'large' | 'full'
    overlay: false,          // режим оверлея
    align: 'top',            // 'top' | 'center'
    mask: false,             // маска прокрутки
    zIndex: 1000,            // (опц.)
    select: element,         // (опц.) элемент для начального фокуса
    buttons: [               // (опц.) кнопки
        {
            name: 'Да',
            onSelect: function() {}
        }
    ],
    buttons_position: 'inside',  // 'inside' | 'outside'
    onBack: function() {},       // (опц.) при закрытии
    onSelect: function(elem) {}  // (опц.) при выборе элемента внутри
})

Lampa.Modal.update(new_html)    // Обновить содержимое
Lampa.Modal.title('Новый')      // Изменить заголовок
Lampa.Modal.close()
Lampa.Modal.opened()            // boolean
```

---

## Noty — Уведомления

```javascript
Lampa.Noty.show('Текст сообщения')
Lampa.Noty.show('Ошибка', {style: 'error'})
Lampa.Noty.show('Успех', {style: 'success', time: 5000})
```

Параметры:
- `style` — CSS-класс `noty--style--{style}`
- `time` — длительность показа в мс (по умолчанию 3000)

---

## Reguest — HTTP-запросы

```javascript
var network = new Lampa.Reguest()

network.timeout(5000)    // Таймаут

// Типы запросов:
network.get(url, success, error)      // Обычный запрос с полным циклом событий
network.silent(url, success, error)   // Прерываемый (abort при новом вызове)
network.quiet(url, success, error)    // Не прерываемый
network.last(url, success, error)     // Только последний из очереди выполнится
network.native(url, success, error, headers)  // Platform-specific (Android/web)

network.clear()  // Отменить все запросы

// Готовый экземпляр:
Lampa.Network.silent(url, success, error)
```

Поддержка: автоматический failover на зеркала, кэширование, отслеживание плохих зеркал.

---

## Head — Шапка приложения

```javascript
// Добавить иконку в шапку (возвращает jQuery-элемент)
var icon = Lampa.Head.addIcon('<svg>...</svg>', function() {
    // действие при нажатии
})
icon.addClass('my-icon')

// Добавить произвольный элемент
Lampa.Head.addElement($('<div class="selector">...'), function() {})

// Заголовок
Lampa.Head.title('Текст')
```

---

## Menu — Боковое меню

```javascript
Lampa.Menu.addButton({
    title: 'Название',
    icon: '<svg>...</svg>',
    action: 'my_action'          // data-action
})

Lampa.Menu.addElement(jquery_element)

Lampa.Menu.toggle()   // Открыть/закрыть
Lampa.Menu.open()
Lampa.Menu.close()
Lampa.Menu.opened()   // boolean
```

---

## Card — Карточка контента

Класс для создания карточек. Используется внутренне, но доступен для переопределения:

```javascript
var card = new Lampa.Card(data, params)
card.create()
card.render()    // jQuery-элемент
card.destroy()
```

Переопределение через prototype:
```javascript
Object.defineProperty(Lampa.Card.prototype, 'build', {
    set: function(v) { this._build = v },
    get: function() { return this._build }
})
```

---

## Scroll — Прокрутка

```javascript
var scroll = new Lampa.Scroll({
    mask: true,           // маска затемнения по краям
    over: true,           // разрешить overscroll
    step: 200,            // шаг прокрутки
    scroll_by_item: true  // прокрутка по элементам
})

scroll.append(jquery_element)     // Добавить элемент
scroll.update(elem, center)       // Прокрутить к элементу (с анимацией)
scroll.immediate(elem, center)    // Без анимации
scroll.render()                   // jQuery-элемент скролла
scroll.body()                     // jQuery-элемент контента
scroll.clear()                    // Очистить
scroll.reset()                    // Сбросить позицию
scroll.isEnd()                    // Достигнут ли конец
scroll.isFilled()                 // Заполнен ли
scroll.height(minus_elem)         // Установить высоту
scroll.destroy()

scroll.addSwipeDown(callback)     // Обработка свайпа вниз

scroll.onWheel = function(step) {}  // Колёсико мыши
```

---

## Explorer — Навигатор данных

Наследник `Emit`. Используется для экранов типа Explorer.

```javascript
var explorer = new Lampa.Explorer({
    movie: data,
    source: 'tmdb',
    params: {}
})

explorer.appendFiles(element)
explorer.appendLeft(element)
explorer.appendHead(element)
explorer.clearFiles()
explorer.render()
explorer.toggle()
explorer.destroy()

// Через Emit:
explorer.use(ModuleClass)  // Добавить компонент-обработчик
explorer.emit('event', ...args)
```

---

## Emit — Компонентная система событий

```javascript
var emit = new Lampa.Emit()

// Добавить компонент
emit.use(ComponentClass)         // ComponentClass — класс или объект
emit.use(component, position)    // на конкретную позицию

// Удалить
emit.unuse(component)

// Проверить
emit.has(ComponentClass)  // boolean

// Отправить событие — вызовет onEventName() у всех компонентов
emit.emit('eventName', arg1, arg2)
// Если у компонента есть onlyEventName — вызовется только он (приоритет)
```

---

## Platform — Определение платформы

```javascript
Lampa.Platform.is('android')      // boolean
Lampa.Platform.is('tizen')
Lampa.Platform.is('webos')
Lampa.Platform.is('orsay')
Lampa.Platform.is('browser')
Lampa.Platform.is('apple')
Lampa.Platform.is('apple_tv')

Lampa.Platform.screen('tv')       // ТВ-экран
Lampa.Platform.screen('mobile')   // Мобильный
Lampa.Platform.desktop()          // Десктоп
Lampa.Platform.macOS()            // macOS
Lampa.Platform.tv()               // Инициализировать ТВ-режим
Lampa.Platform.any()              // Есть ли платформа
Lampa.Platform.mouse()            // Есть ли мышь
```

---

## TMDB

```javascript
Lampa.TMDB.api(endpoint)    // URL API эндпоинта
Lampa.TMDB.image(path)      // URL изображения
Lampa.TMDB.key()            // API-ключ
```

---

## Lang — Переводы

```javascript
Lampa.Lang.translate(key)   // Перевести ключ
Lampa.Lang.codes()          // Все доступные языки {code: name}
```

---

## Utils — Утилиты

```javascript
Lampa.Utils.capitalizeFirstLetter(str)
Lampa.Utils.secondsToTime(seconds, flag)
Lampa.Utils.protocol()             // 'https://' или 'http://'
Lampa.Utils.addUrlComponent(url, param)
Lampa.Utils.trigger(element, eventName)  // Вызвать событие на элементе
Lampa.Utils.uid(length)            // Сгенерировать уникальный ID
Lampa.Utils.isTouchDevice()        // boolean
Lampa.Utils.toggleFullscreen()
Lampa.Utils.canFullScreen()        // boolean
Lampa.Utils.time(html_element)     // Запустить часы в элементе
Lampa.Utils.inputDisplay(value)    // Подготовить значение для отображения в input
```

---

## Arrays — Работа с массивами

```javascript
Lampa.Arrays.clone(obj)                    // Глубокое клонирование (через JSON)
Lampa.Arrays.decodeJson(str, defaultVal)   // Безопасный JSON.parse
Lampa.Arrays.extend(target, source)        // Рекурсивное слияние объектов
Lampa.Arrays.empty(target, source)         // Заполнить undefined свойства
Lampa.Arrays.getKeys(obj)                  // Object.keys
Lampa.Arrays.getValues(obj)                // Object.values
Lampa.Arrays.toObject(val)                 // Преобразование в объект
Lampa.Arrays.toArray(obj)                  // Преобразование в массив
Lampa.Arrays.isObject(val)                 // Проверка типа
Lampa.Arrays.isArray(val)                  // Проверка типа
Lampa.Arrays.remove(arr, item)             // Удалить элемент
Lampa.Arrays.insert(arr, index, item)      // Вставить элемент
Lampa.Arrays.shuffle(arr)                  // Перемешать
Lampa.Arrays.removeDuplicates(arr)         // Удалить дубликаты
Lampa.Arrays.unique(arr, key)              // Уникальные по ключу
Lampa.Arrays.groupBy(arr, key)             // Группировка
Lampa.Arrays.destroy(arr)                  // Вызвать destroy() у всех элементов
```

---

## Input — Экранный ввод

Используется внутри Settings, но доступен для плагинов:

```javascript
Lampa.Input.edit({
    title: 'Введите значение',
    value: 'текущее значение',
    free: true,           // свободный ввод (не привязан к настройкам)
    nosave: true,         // не показывать сохранённые значения
    password: false,      // маскировать ввод
    align: 'center',      // 'center' | ...
    keyboard: 'lampa'     // тип клавиатуры
}, function(newValue) {
    // результат
})
```

---

## Manifest — Метаданные

```javascript
Lampa.Manifest.origin          // 'lampa' | 'bylampa' | ...
Lampa.Manifest.app_digital     // Версия (число)
Lampa.Manifest.cub_domain      // Текущий домен CUB
Lampa.Manifest.cub_mirrors     // Массив зеркал CUB
```

---

## Plugins — Система плагинов

```javascript
Lampa.Plugins.add(plugin_object)     // Добавить плагин
Lampa.Plugins.remove(url)            // Удалить
Lampa.Plugins.save()                 // Сохранить в Storage
```

Плагины хранятся в `Lampa.Storage.get('plugins')` как массив `[{author, url, name, status}]`.

---

## DOM и jQuery

Lampa активно использует jQuery. Все `.selector` элементы автоматически получают обработчики через `Controller.observe()` (MutationObserver).

### Кастомные jQuery-события

| Событие | Когда |
|---------|-------|
| `hover:enter` | Enter/OK (пульт/клавиатура) или click |
| `hover:focus` | Элемент получил фокус (навигация) |
| `hover:hover` | mouseenter (только mouse-режим) |
| `hover:touch` | touchstart |
| `hover:long` | Долгое нажатие (~800мс) |
| `hover:click` | click (только через DeviceInput.canClick) |

### CSS-классы

| Класс | Назначение |
|-------|-----------|
| `.selector` | Элемент доступен для фокуса/навигации |
| `.focus` | Элемент в фокусе |
| `.selected` | Выбранный элемент (в Select) |
| `.hide` | Скрытый элемент |
| `.settings--open` | Настройки открыты (на body) |
| `.selectbox--open` | Selectbox открыт (на body) |

### Добавление стилей из плагина

```javascript
var style = document.createElement('style')
style.innerHTML = '.my-class { color: red; }'
document.head.appendChild(style)
```

---

## Паттерны разработки плагинов

### 1. Плагин с настройками

```javascript
(function () {
    'use strict';

    function start() {
        // Добавляем раздел в настройки
        Lampa.SettingsApi.addComponent({
            component: 'my_plugin',
            name: 'Мой плагин',
            icon: '<svg>...</svg>'
        });

        // Добавляем параметры
        Lampa.SettingsApi.addParam({
            component: 'my_plugin',
            param: {
                name: 'my_feature_enabled',
                type: 'trigger',
                default: true
            },
            field: {
                name: 'Включить фичу',
                description: 'Описание фичи'
            },
            onChange: function(value) {
                Lampa.Noty.show('Значение: ' + value);
            }
        });
    }

    if (window.appready) start();
    else Lampa.Listener.follow('app', function(e) {
        if (e.type === 'ready') start();
    });
})();
```

### 2. Плагин с пунктом в главном меню

```javascript
(function () {
    'use strict';

    function start() {
        var item = $('<li class="menu__item selector" data-action="my_page">' +
            '<div class="menu__ico"><svg>...</svg></div>' +
            '<div class="menu__text">Моя страница</div>' +
        '</li>');

        item.on('hover:enter', function() {
            Lampa.Activity.push({
                url: 'discover/movie',
                title: 'Моя страница',
                component: 'category_full',
                source: 'tmdb',
                page: 1
            });
        });

        $('.menu .menu__list').eq(0).append(item);
    }

    if (window.appready) start();
    else Lampa.Listener.follow('app', function(e) {
        if (e.type === 'ready') start();
    });
})();
```

### 3. Плагин с иконкой в шапке

```javascript
(function () {
    'use strict';

    function start() {
        Lampa.Head.addIcon('<svg>...</svg>', function() {
            Lampa.Modal.open({
                title: 'Информация',
                html: $('<div>Содержимое</div>'),
                size: 'medium',
                onBack: function() {
                    Lampa.Modal.close();
                    Lampa.Controller.toggle('content');
                }
            });
        });
    }

    if (window.appready) start();
    else Lampa.Listener.follow('app', function(e) {
        if (e.type === 'ready') start();
    });
})();
```

### 4. Плагин-менеджер (установка/удаление плагинов)

```javascript
// Проверка установки
function isInstalled(url) {
    var plugins = Lampa.Storage.get('plugins', '[]');
    return plugins.some(function(p) { return p.url === url && p.status !== 0; });
}

// Установка
function install(url, name, author) {
    var plugins = Lampa.Storage.get('plugins', '[]');
    plugins.push({ author: author, url: url, name: name, status: 1 });
    Lampa.Storage.set('plugins', plugins);

    var script = document.createElement('script');
    script.src = url;
    document.head.appendChild(script);
}

// Удаление
function uninstall(url) {
    var plugins = Lampa.Storage.get('plugins', '[]');
    plugins = plugins.filter(function(p) { return p.url !== url; });
    Lampa.Storage.set('plugins', plugins);
}
```

### 5. Подписка на события карточки

```javascript
Lampa.Listener.follow('full', function(e) {
    if (e.type === 'complite') {
        // e.data — данные фильма/сериала
        // e.object — объект компонента
        console.log('Загружена карточка:', e.data.title);
    }
});
```

---

## Встроенные компоненты настроек

Стандартные `data-component` в главном меню настроек:
`interface`, `player`, `parser`, `server`, `plugins`, `account`, `more`, `screensaver`, `appletv`

## Параметры приложения (window.lampa_settings)

```javascript
window.lampa_settings = {
    socket_use: true,        // WebSocket
    account_use: true,       // Аккаунт
    plugins_use: true,       // Система плагинов
    torrents_use: true,      // Торренты
    ai_use: true,            // AI-функции
    ad_use: true,            // Реклама
    lang_use: false,         // Множество языков
    // ... и другие
}
```
