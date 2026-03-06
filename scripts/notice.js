(function () {
    'use strict';

    var NOTICE_URL = 'https://bazzzilius.github.io/notice/notice.json';
    var STORAGE_KEY = 'notice_last_seen_id';
    var CACHE_KEY = 'notice_cache';
    var CACHE_TIME_KEY = 'notice_cache_time';
    var CACHE_TTL = 60 * 60 * 1000; // 1 час

    var ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 20 20"><path fill="currentColor" d="M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0m1 16H9v-2h2zm0-4H9V4h2z"/></svg>';

    var ARROW_LEFT = '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>';
    var ARROW_RIGHT = '<svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>';

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
        .notice-screen {\
            position: fixed;\
            top: 0;\
            left: 0;\
            width: 100%;\
            height: 100%;\
            z-index: 800;\
            background: rgba(0, 0, 0, 0.95);\
            display: flex;\
            flex-direction: column;\
            align-items: center;\
            justify-content: center;\
            padding: 2em;\
            opacity: 0;\
            transition: opacity 0.3s ease;\
        }\
        .notice-screen.open {\
            opacity: 1;\
        }\
        .notice-screen__title {\
            font-size: 2.8em;\
            font-weight: 700;\
            margin-bottom: 0.8em;\
            background: linear-gradient(180deg, #ffffff, #d99821);\
            -webkit-background-clip: text;\
            -webkit-text-fill-color: transparent;\
            text-align: center;\
        }\
        .notice-screen__card {\
            width: 45em;\
            max-width: 90vw;\
            min-height: 18em;\
            border-radius: 1em;\
            background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);\
            border: 1px solid rgba(255,255,255,0.1);\
            padding: 2.5em;\
            display: flex;\
            flex-direction: column;\
            justify-content: center;\
            position: relative;\
            transition: transform 0.3s ease, opacity 0.3s ease;\
        }\
        .notice-screen__card.slide-left {\
            transform: translateX(-3em);\
            opacity: 0;\
        }\
        .notice-screen__card.slide-right {\
            transform: translateX(3em);\
            opacity: 0;\
        }\
        .notice-screen__card-header {\
            display: flex;\
            justify-content: space-between;\
            align-items: flex-start;\
            margin-bottom: 1.5em;\
        }\
        .notice-screen__card-title {\
            font-size: 2em;\
            font-weight: 600;\
            color: #fff;\
            flex: 1;\
            margin-right: 1em;\
        }\
        .notice-screen__card-date {\
            background: linear-gradient(135deg, #d99821, #b8801a);\
            padding: 0.3em 0.8em;\
            border-radius: 0.5em;\
            color: #fff;\
            font-size: 1.2em;\
            font-weight: 500;\
            white-space: nowrap;\
        }\
        .notice-screen__card-message {\
            font-size: 1.4em;\
            line-height: 1.6;\
            color: rgba(255, 255, 255, 0.8);\
        }\
        .notice-screen__nav {\
            display: flex;\
            align-items: center;\
            gap: 1.5em;\
            margin-top: 2em;\
        }\
        .notice-screen__btn {\
            width: 3.5em;\
            height: 3.5em;\
            border-radius: 50%;\
            background: rgba(255, 255, 255, 0.08);\
            border: 1px solid rgba(255, 255, 255, 0.15);\
            display: flex;\
            align-items: center;\
            justify-content: center;\
            cursor: pointer;\
            transition: background 0.2s, transform 0.2s, border-color 0.2s;\
            color: rgba(255, 255, 255, 0.6);\
        }\
        .notice-screen__btn.focus {\
            background: rgba(217, 152, 33, 0.3);\
            border-color: #d99821;\
            color: #fff;\
            transform: scale(1.15);\
        }\
        .notice-screen__btn.disabled {\
            opacity: 0.2;\
            pointer-events: none;\
        }\
        .notice-screen__counter {\
            font-size: 1.3em;\
            color: rgba(255, 255, 255, 0.5);\
            min-width: 5em;\
            text-align: center;\
        }\
        .notice-screen__new-badge {\
            display: inline-block;\
            background: #e74c3c;\
            color: #fff;\
            font-size: 0.55em;\
            padding: 0.2em 0.6em;\
            border-radius: 0.4em;\
            margin-left: 0.8em;\
            vertical-align: middle;\
            font-weight: 700;\
            letter-spacing: 0.05em;\
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
            openScreen();
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
        if (getMaxId(notices) > getLastSeenId()) {
            button.append('<div class="red-dot"></div>');
        }
    }

    function getCachedNotices() {
        var time = parseInt(Lampa.Storage.get(CACHE_TIME_KEY, '0'), 10);
        if (Date.now() - time < CACHE_TTL) {
            var cached = Lampa.Storage.get(CACHE_KEY, '');
            if (cached) {
                try { return JSON.parse(cached); }
                catch (e) { /* невалидный кеш */ }
            }
        }
        return null;
    }

    function setCacheNotices(data) {
        Lampa.Storage.set(CACHE_KEY, JSON.stringify(data));
        Lampa.Storage.set(CACHE_TIME_KEY, String(Date.now()));
    }

    function loadNotices(callback) {
        var cached = getCachedNotices();
        if (cached) {
            notices = cached;
            updateDot();
            if (callback) callback();
            return;
        }

        $.getJSON(NOTICE_URL).done(function (data) {
            if (Array.isArray(data)) {
                notices = data;
                setCacheNotices(data);
                updateDot();
            }
            if (callback) callback();
        }).fail(function () {
            console.log('Notice: ошибка загрузки уведомлений');
            if (callback) callback();
        });
    }

    function openScreen() {
        loadNotices(function () {
            if (!notices.length) {
                Lampa.Noty.show('Нет уведомлений');
                return;
            }
            showNoticeScreen();
        });
    }

    function showNoticeScreen() {
        var current = notices.length - 1; // начинаем с новейшего
        var lastSeenId = getLastSeenId();
        var controllerName = 'notice_screen';

        var screen = $('<div class="notice-screen"></div>');
        var title = $('<div class="notice-screen__title">Уведомления</div>');
        var card = $('<div class="notice-screen__card"></div>');
        var nav = $('<div class="notice-screen__nav"></div>');

        var btnPrev = $('<div class="notice-screen__btn selector">' + ARROW_LEFT + '</div>');
        var btnNext = $('<div class="notice-screen__btn selector">' + ARROW_RIGHT + '</div>');
        var counter = $('<div class="notice-screen__counter"></div>');

        nav.append(btnPrev, counter, btnNext);
        screen.append(title, card, nav);
        $('body').append(screen);

        setTimeout(function () { screen.addClass('open'); }, 10);

        function renderCard(direction) {
            var item = notices[current];
            var isNew = item.id > lastSeenId;

            if (direction) {
                card.addClass(direction === 'left' ? 'slide-left' : 'slide-right');
                setTimeout(function () {
                    fillCard(item, isNew);
                    card.removeClass('slide-left slide-right');
                }, 200);
            } else {
                fillCard(item, isNew);
            }

            counter.text((notices.length - current) + ' / ' + notices.length);

            btnPrev.toggleClass('disabled', current >= notices.length - 1);
            btnNext.toggleClass('disabled', current <= 0);
        }

        function fillCard(item, isNew) {
            var badge = isNew ? '<span class="notice-screen__new-badge">NEW</span>' : '';
            card.html(
                '<div class="notice-screen__card-header">' +
                    '<div class="notice-screen__card-title">' + item.title + badge + '</div>' +
                    '<div class="notice-screen__card-date">' + item.date + '</div>' +
                '</div>' +
                '<div class="notice-screen__card-message">' + item.message + '</div>'
            );
        }

        function prev() {
            if (current < notices.length - 1) {
                current++;
                renderCard('right');
            }
        }

        function next() {
            if (current > 0) {
                current--;
                renderCard('left');
            }
        }

        function close() {
            screen.removeClass('open');
            setTimeout(function () {
                screen.remove();
                Lampa.Controller.toggle('head');
            }, 300);
        }

        btnPrev.on('hover:enter hover:click hover:touch', prev);
        btnNext.on('hover:enter hover:click hover:touch', next);

        renderCard();

        // Отмечаем все как прочитанные
        setLastSeenId(getMaxId(notices));
        button.find('.red-dot').remove();

        Lampa.Controller.add(controllerName, {
            toggle: function () {
                Lampa.Controller.collectionSet(screen);
                Lampa.Controller.collectionFocus(btnNext.hasClass('disabled') ? btnPrev : btnNext, screen);
            },
            up: function () {},
            down: function () {},
            left: function () {
                prev();
                if (!btnPrev.hasClass('disabled')) {
                    Lampa.Controller.collectionFocus(btnPrev, screen);
                }
            },
            right: function () {
                next();
                if (!btnNext.hasClass('disabled')) {
                    Lampa.Controller.collectionFocus(btnNext, screen);
                }
            },
            enter: function () {},
            back: close
        });

        Lampa.Controller.toggle(controllerName);
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
