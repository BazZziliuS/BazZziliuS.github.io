(function () {
    'use strict';

    var NOTICE_URL = 'https://bazzzilius.github.io/notice/notice.json';
    var STORAGE_KEY = 'notice_last_seen_id';

    var ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0m1 16H9v-2h2zm0-4H9V4h2z"/></svg>';

    var CSS = '\
        .notice-btn .red-dot {\
            position: absolute;\
            top: 0;\
            right: 0;\
            width: 8px;\
            height: 8px;\
            border-radius: 50%;\
            background-color: red;\
        }\
        .notice-item {\
            margin-bottom: 4em;\
            border: 2px solid #d99821;\
            border-radius: 0.8em;\
            padding: 1.5em;\
        }\
        .notice-item__header {\
            display: flex;\
            justify-content: space-between;\
            align-items: center;\
        }\
        .notice-item__title {\
            flex-grow: 1;\
            margin: 0;\
            font-size: 1.5em;\
            font-style: italic;\
        }\
        .notice-item__date {\
            background: #d99821;\
            padding: 0.2em;\
            border-radius: 0.4em;\
            color: white;\
            display: inline-block;\
            margin-left: 10px;\
            font-size: 1.3em;\
            text-align: center;\
        }\
        .notice-item__message {\
            line-height: 1.3em;\
            margin-top: 1.2em;\
            margin-bottom: 0;\
            font-size: 1.3em;\
            padding-left: 1em;\
        }\
        .notice-modal .modal__title {\
            text-align: center;\
            background: linear-gradient(180deg, #ffffff, #d99821);\
            -webkit-background-clip: text;\
            -webkit-text-fill-color: transparent;\
            font-weight: bold;\
        }\
    ';

    var notices = [];
    var button;

    function injectStyles() {
        var style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);
    }

    function createButton() {
        button = $('<div class="head__action selector notice-btn" style="position:relative">' + ICON_SVG + '</div>');
        button.insertAfter('.head__action.open--settings');

        button.on('hover:enter hover:click hover:touch', function () {
            openModal();
        });
    }

    function getLastSeenId() {
        return parseInt(Lampa.Storage.get(STORAGE_KEY, '0'), 10);
    }

    function setLastSeenId(id) {
        Lampa.Storage.set(STORAGE_KEY, String(id));
    }

    function getMaxId(items) {
        var max = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i].id > max) max = items[i].id;
        }
        return max;
    }

    function updateDot() {
        button.find('.red-dot').remove();

        var maxId = getMaxId(notices);
        if (maxId > getLastSeenId()) {
            button.append('<div class="red-dot"></div>');
        }
    }

    function loadNotices() {
        $.getJSON(NOTICE_URL).done(function (data) {
            if (Array.isArray(data)) {
                notices = data;
                updateDot();
            }
        }).fail(function () {
            console.log('Notice: ошибка загрузки уведомлений');
        });
    }

    function renderNotices() {
        var container = $('<div style="padding: 0.1em"></div>');

        for (var i = notices.length - 1; i >= 0; i--) {
            var item = notices[i];
            container.append(
                '<div class="notice-item">' +
                    '<div class="notice-item__header">' +
                        '<h3 class="notice-item__title">' + item.title + '</h3>' +
                        '<span class="notice-item__date">' + item.date + '</span>' +
                    '</div>' +
                    '<p class="notice-item__message">' + item.message + '</p>' +
                '</div>'
            );
        }

        return container;
    }

    function openModal() {
        Lampa.Modal.open({
            title: 'Уведомления',
            html: renderNotices(),
            size: 'medium',
            mask: true,
            onBack: function () {
                Lampa.Modal.close();
                Lampa.Controller.toggle('head');
            }
        });

        $('.modal').addClass('notice-modal');

        setLastSeenId(getMaxId(notices));
        button.find('.red-dot').remove();
    }

    function start() {
        injectStyles();
        createButton();
        loadNotices();
    }

    if (window.appready) {
        start();
    } else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type === 'ready') start();
        });
    }
})();
