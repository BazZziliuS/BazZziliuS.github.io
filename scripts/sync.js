(function () {
    'use strict';

    // =========================================================================
    //  Конфигурация Supabase
    // =========================================================================

    var SUPABASE_URL = 'https://dpfpfsyoboxmdiexzuyw.supabase.co';
    var SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwZnBmc3lvYm94bWRpZXh6dXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MjM4MzAsImV4cCI6MjA4ODI5OTgzMH0.I3Z11gTn3u_ii3gfwASHgPdzILgfmOWIkyottx87AKw';
    var TABLE        = 'sync_data';

    // Ключи Lampa Storage для синхронизации
    var SYNC_KEYS = [
        'favorite',             // Закладки
        'file_view',            // Отметки просмотра (что смотрел)
        'search_history',       // История поиска
        'timeline',             // Тайм-коды
        'filter',               // Фильтры
        'plugins',              // Установленные плагины
        'my_bookmarks',         // Пользовательские папки закладок
        'online_choice',        // Выбор источника для фильмов
        'torrserver_url',       // Адрес TorrServer
        'torrserver_url_two',   // Второй TorrServer
        'parser_torrent_type',  // Тип парсера
        'jackett_url',          // Адрес Jackett
        'jackett_key'           // API-ключ Jackett
    ];

    var PLUGIN_ID    = 'lampa_sync';
    var TOKEN_STORE  = 'sync_token';
    var SYNC_ENABLED = 'sync_auto_enabled';

    var syncInProgress = false;

    var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"/><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>';

    // =========================================================================
    //  Стили
    // =========================================================================

    var css = document.createElement('style');
    css.textContent = [
        '.sync-token-display { font-size: 1.4em; font-weight: bold; color: #4caf50; text-align: center; padding: 0.5em; letter-spacing: 0.15em; }',
        '.sync-status { font-size: 0.85em; color: #999; margin-top: 0.3em; }',
        '.sync-status--ok { color: #4caf50; }',
        '.sync-status--error { color: #f44336; }',
        '.sync-status--progress { color: #ff9800; }'
    ].join('\n');
    document.head.appendChild(css);

    // =========================================================================
    //  Работа с токеном
    // =========================================================================

    function getToken() {
        return Lampa.Storage.get(TOKEN_STORE, '');
    }

    function setToken(token) {
        Lampa.Storage.set(TOKEN_STORE, token);
    }

    function generateToken() {
        var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        var token = '';
        for (var i = 0; i < 16; i++) {
            token += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return token;
    }

    // =========================================================================
    //  Supabase API
    // =========================================================================

    function supabaseRequest(method, path, body, callback, onError) {
        $.ajax({
            url: SUPABASE_URL + '/rest/v1/' + path,
            method: method,
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': 'Bearer ' + SUPABASE_KEY,
                'Content-Type': 'application/json',
                'Prefer': method === 'POST' ? 'resolution=merge-duplicates,return=minimal' : 'return=minimal'
            },
            data: body ? JSON.stringify(body) : undefined,
            success: function (data) {
                if (callback) callback(data);
            },
            error: function (xhr) {
                console.error('Sync', method, path, xhr.status, xhr.responseText);
                if (onError) onError(xhr);
            }
        });
    }

    // =========================================================================
    //  Загрузка данных НА сервер
    // =========================================================================

    function uploadData(callback) {
        var token = getToken();
        if (!token) {
            Lampa.Noty.show('Сначала создайте или введите код синхронизации');
            return;
        }

        if (syncInProgress) return;
        syncInProgress = true;

        var rows = [];
        SYNC_KEYS.forEach(function (key) {
            var value = Lampa.Storage.get(key, '[]');
            var str = typeof value === 'string' ? value : JSON.stringify(value);
            if (str === '[]' || str === '' || str === '""') return;
            rows.push({
                token: token,
                data_key: key,
                data_value: str,
                updated_at: new Date().toISOString()
            });
        });

        if (!rows.length) {
            syncInProgress = false;
            Lampa.Noty.show('Нет данных для загрузки');
            return;
        }

        supabaseRequest('POST', TABLE + '?on_conflict=token,data_key', rows, function () {
            syncInProgress = false;
            Lampa.Noty.show('Данные загружены на сервер');
            if (callback) callback();
        }, function () {
            syncInProgress = false;
            Lampa.Noty.show('Ошибка загрузки данных');
        });
    }

    // =========================================================================
    //  Скачивание данных С сервера
    // =========================================================================

    function downloadData(callback) {
        var token = getToken();
        if (!token) {
            Lampa.Noty.show('Сначала введите код синхронизации');
            return;
        }

        if (syncInProgress) return;
        syncInProgress = true;

        supabaseRequest('GET', TABLE + '?token=eq.' + encodeURIComponent(token) + '&select=data_key,data_value', null, function (data) {
            syncInProgress = false;

            if (!data || !data.length) {
                Lampa.Noty.show('Данные не найдены для этого кода');
                return;
            }

            var count = 0;
            data.forEach(function (row) {
                if (SYNC_KEYS.indexOf(row.data_key) >= 0) {
                    Lampa.Storage.set(row.data_key, row.data_value);
                    count++;
                }
            });

            Lampa.Noty.show('Загружено: ' + count + ' разделов');

            if (callback) callback();
        }, function () {
            syncInProgress = false;
            Lampa.Noty.show('Ошибка получения данных');
        });
    }

    // =========================================================================
    //  Автосинхронизация
    // =========================================================================

    var autoSyncTimer = null;

    function startAutoSync() {
        stopAutoSync();

        if (Lampa.Storage.get(SYNC_ENABLED, false) && getToken()) {
            // Синхронизация каждые 5 минут
            autoSyncTimer = setInterval(function () {
                uploadData();
            }, 5 * 60 * 1000);
        }
    }

    function stopAutoSync() {
        if (autoSyncTimer) {
            clearInterval(autoSyncTimer);
            autoSyncTimer = null;
        }
    }

    // =========================================================================
    //  Настройки плагина
    // =========================================================================

    function register() {
        Lampa.SettingsApi.addComponent({
            component: PLUGIN_ID,
            name: 'Синхронизация',
            icon: icon
        });

        // Заголовок: текущий код
        Lampa.SettingsApi.addParam({
            component: PLUGIN_ID,
            param: { name: 'sync_token_title', type: 'title' },
            field: { name: 'Код синхронизации' },
            onRender: function (item) {
                var token = getToken();
                if (token) {
                    item.append('<div class="sync-token-display">' + token + '</div>');
                } else {
                    item.append('<div class="sync-token-display" style="color:#999">Не задан</div>');
                }
            }
        });

        // Создать новый код
        Lampa.SettingsApi.addParam({
            component: PLUGIN_ID,
            param: { name: 'sync_create_token', type: 'button' },
            field: { name: 'Создать новый код' },
            onChange: function () {
                var token = generateToken();
                Lampa.Modal.open({
                    title: 'Новый код синхронизации',
                    html: $(
                        '<div style="text-align:center;padding:1em">' +
                            '<div class="sync-token-display">' + token + '</div>' +
                            '<div class="sync-status">Запомните или запишите этот код для других устройств</div>' +
                        '</div>'
                    ),
                    buttons: [
                        {
                            name: 'Сохранить',
                            onSelect: function () {
                                setToken(token);
                                Lampa.Modal.close();
                                Lampa.Noty.show('Код сохранён: ' + token);
                                Lampa.Settings.update();
                                startAutoSync();
                            }
                        },
                        {
                            name: 'Отмена',
                            onSelect: function () {
                                Lampa.Modal.close();
                                Lampa.Controller.toggle('settings_component');
                            }
                        }
                    ],
                    onBack: function () {
                        Lampa.Modal.close();
                        Lampa.Controller.toggle('settings_component');
                    }
                });
            }
        });

        // Ввести существующий код
        Lampa.SettingsApi.addParam({
            component: PLUGIN_ID,
            param: { name: 'sync_enter_token', type: 'button' },
            field: { name: 'Ввести код с другого устройства' },
            onChange: function () {
                Lampa.Input.edit({
                    title: 'Введите код синхронизации',
                    value: getToken(),
                    free: true,
                    nosave: true
                }, function (value) {
                    value = value.trim().toUpperCase();
                    if (value.length >= 16) {
                        setToken(value);
                        Lampa.Noty.show('Код установлен: ' + value);
                        Lampa.Settings.update();
                        startAutoSync();
                    } else {
                        Lampa.Noty.show('Код должен быть не менее 16 символов');
                    }
                    Lampa.Controller.toggle('settings_component');
                });
            }
        });

        // Разделитель
        Lampa.SettingsApi.addParam({
            component: PLUGIN_ID,
            param: { name: 'sync_actions_title', type: 'title' },
            field: { name: 'Действия' }
        });

        // Загрузить на сервер
        Lampa.SettingsApi.addParam({
            component: PLUGIN_ID,
            param: { name: 'sync_upload', type: 'button' },
            field: { name: 'Загрузить на сервер', description: 'Отправить текущие данные в облако' },
            onChange: function () {
                uploadData(function () {
                    Lampa.Settings.update();
                });
            }
        });

        // Скачать с сервера
        Lampa.SettingsApi.addParam({
            component: PLUGIN_ID,
            param: { name: 'sync_download', type: 'button' },
            field: { name: 'Скачать с сервера', description: 'Загрузить данные из облака на это устройство' },
            onChange: function () {
                Lampa.Modal.open({
                    title: 'Подтверждение',
                    html: $('<div class="about">Текущие данные на этом устройстве будут заменены данными с сервера. Продолжить?</div>'),
                    buttons: [
                        {
                            name: 'Да',
                            onSelect: function () {
                                Lampa.Modal.close();
                                downloadData(function () {
                                    Lampa.Settings.update();
                                });
                            }
                        },
                        {
                            name: 'Нет',
                            onSelect: function () {
                                Lampa.Modal.close();
                                Lampa.Controller.toggle('settings_component');
                            }
                        }
                    ],
                    onBack: function () {
                        Lampa.Modal.close();
                        Lampa.Controller.toggle('settings_component');
                    }
                });
            }
        });

        // Разделитель
        Lampa.SettingsApi.addParam({
            component: PLUGIN_ID,
            param: { name: 'sync_auto_title', type: 'title' },
            field: { name: 'Автоматическая синхронизация' }
        });

        // Авто-синхронизация
        Lampa.SettingsApi.addParam({
            component: PLUGIN_ID,
            param: {
                name: SYNC_ENABLED,
                type: 'trigger',
                default: false
            },
            field: {
                name: 'Авто-загрузка на сервер',
                description: 'Автоматически отправлять данные каждые 5 минут'
            },
            onChange: function (value) {
                if (value === 'true') {
                    if (!getToken()) {
                        Lampa.Noty.show('Сначала создайте или введите код');
                        Lampa.Storage.set(SYNC_ENABLED, false);
                        Lampa.Settings.update();
                        return;
                    }
                    startAutoSync();
                    Lampa.Noty.show('Авто-синхронизация включена');
                } else {
                    stopAutoSync();
                    Lampa.Noty.show('Авто-синхронизация выключена');
                }
            }
        });

        // Информация
        Lampa.SettingsApi.addParam({
            component: PLUGIN_ID,
            param: { name: 'sync_info', type: 'title' },
            field: { name: 'Синхронизируются: закладки, история просмотра, история поиска, тайм-коды, фильтры, плагины, папки закладок, выбор источника, TorrServer, Jackett' }
        });
    }

    // =========================================================================
    //  Инициализация
    // =========================================================================

    function init() {
        register();
        startAutoSync();
    }

    if (window.appready) init();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') init();
    });

})();
