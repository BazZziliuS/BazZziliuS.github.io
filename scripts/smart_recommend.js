(function () {
    'use strict';

    var PLUGIN_NAME = 'smart_recommend';
    var CACHE_KEY   = 'smart_recommend_cache';
    var CACHE_TTL   = 60 * 60 * 1000; // 1 час

    var icon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>';

    // =========================================================================
    //  Утилиты
    // =========================================================================

    function getWatchedCards() {
        var cards = [];
        var types = ['history', 'like', 'wath', 'book', 'viewed', 'continued'];

        types.forEach(function (type) {
            try {
                var items = Lampa.Favorite.get({ type: type });
                if (items && items.length) {
                    items.forEach(function (card) {
                        if (card && card.id && !cardInList(cards, card.id)) {
                            cards.push(card);
                        }
                    });
                }
            } catch (e) {}
        });

        return cards;
    }

    function cardInList(list, id) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].id == id) return true;
        }
        return false;
    }

    function getTopGenres(cards, limit) {
        var genreCount = {};

        cards.forEach(function (card) {
            var ids = card.genre_ids || [];
            if (card.genres) {
                card.genres.forEach(function (g) { ids.push(g.id); });
            }
            ids.forEach(function (id) {
                genreCount[id] = (genreCount[id] || 0) + 1;
            });
        });

        var sorted = Object.keys(genreCount).sort(function (a, b) {
            return genreCount[b] - genreCount[a];
        });

        return sorted.slice(0, limit || 5).map(Number);
    }

    function shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
        return arr;
    }

    // =========================================================================
    //  Кэш
    // =========================================================================

    function getCached() {
        try {
            var cached = Lampa.Storage.get(CACHE_KEY, '');
            if (cached && cached.time && Date.now() - cached.time < CACHE_TTL) {
                return cached.data;
            }
        } catch (e) {}
        return null;
    }

    function setCache(data) {
        try {
            Lampa.Storage.set(CACHE_KEY, { time: Date.now(), data: data });
        } catch (e) {}
    }

    // =========================================================================
    //  Загрузка рекомендаций через TMDB
    // =========================================================================

    function loadRecommendations(callback) {
        var cached = getCached();
        if (cached) {
            callback(cached);
            return;
        }

        var cards = getWatchedCards();
        if (!cards.length) {
            callback([]);
            return;
        }

        // Берём до 10 случайных карточек для анализа
        var sample = shuffleArray(cards.slice()).slice(0, 10);
        var watchedIds = {};
        cards.forEach(function (c) { watchedIds[c.id] = true; });

        var results = [];
        var pending = sample.length;

        if (!pending) {
            callback([]);
            return;
        }

        sample.forEach(function (card) {
            var mediaType = card.number_of_seasons !== undefined ? 'tv' : 'movie';
            var network = new Lampa.Reguest();
            network.timeout(10000);

            var api = Lampa.TMDB.api;
            var url = api + '/' + mediaType + '/' + card.id + '/recommendations?api_key=' + Lampa.TMDB.key + '&language=' + Lampa.Storage.get('language', 'ru') + '&page=1';

            network.silent(url, function (data) {
                if (data && data.results) {
                    data.results.forEach(function (item) {
                        item.media_type = item.media_type || mediaType;
                        if (!watchedIds[item.id] && !cardInList(results, item.id)) {
                            results.push(item);
                        }
                    });
                }
                pending--;
                if (pending <= 0) finish();
            }, function () {
                pending--;
                if (pending <= 0) finish();
            });
        });

        function finish() {
            // Сортируем по рейтингу
            results.sort(function (a, b) {
                return (b.vote_average || 0) - (a.vote_average || 0);
            });

            setCache(results);
            callback(results);
        }
    }

    // =========================================================================
    //  Загрузка по жанрам
    // =========================================================================

    function loadByGenres(callback) {
        var cards = getWatchedCards();
        var topGenres = getTopGenres(cards, 3);

        if (!topGenres.length) {
            callback([]);
            return;
        }

        var watchedIds = {};
        cards.forEach(function (c) { watchedIds[c.id] = true; });

        var network = new Lampa.Reguest();
        network.timeout(10000);

        var api = Lampa.TMDB.api;
        var lang = Lampa.Storage.get('language', 'ru');
        var url = api + '/discover/movie?api_key=' + Lampa.TMDB.key + '&language=' + lang + '&sort_by=vote_average.desc&vote_count.gte=100&with_genres=' + topGenres.join(',') + '&page=' + (Math.floor(Math.random() * 5) + 1);

        network.silent(url, function (data) {
            var results = [];
            if (data && data.results) {
                data.results.forEach(function (item) {
                    item.media_type = item.media_type || 'movie';
                    if (!watchedIds[item.id]) {
                        results.push(item);
                    }
                });
            }
            callback(results);
        }, function () {
            callback([]);
        });
    }

    // =========================================================================
    //  Компонент — страница рекомендаций
    // =========================================================================

    function component(object) {
        var scroll = new Lampa.Scroll({ mask: true, over: true });
        var items = [];
        var html = $('<div></div>');
        var active = 0;

        this.create = function () {
            this.activity = object.activity;
        };

        this.start = function () {
            Lampa.Controller.add('content', {
                toggle: function () {
                    Lampa.Controller.collectionSet(scroll.render());
                    Lampa.Controller.collectionFocus(items.length ? items[active] : false, scroll.render());
                },
                back: this.back
            });

            Lampa.Controller.toggle('content');
        };

        this.back = function () {
            Lampa.Activity.backward();
        };

        this.render = function (add) {
            if (add) return scroll.render();
            return html;
        };

        this.build = function (results) {
            scroll.clear();
            items = [];
            active = 0;

            if (!results.length) {
                var empty = new Lampa.Empty();
                html.append(empty.render());
                return;
            }

            results.forEach(function (card) {
                var elem = new Lampa.Card(card, { object: object });

                elem.onFocus = function (target) {
                    active = items.indexOf(target);
                    scroll.update(target.render());
                };

                elem.onEnter = function (target) {
                    var cardData = target.card;
                    Lampa.Activity.push({
                        url: '',
                        component: 'full',
                        id: cardData.id,
                        method: cardData.media_type === 'tv' ? 'tv' : 'movie',
                        card: cardData,
                        source: 'tmdb'
                    });
                };

                elem.render().on('hover:focus', function () {
                    if (elem.onFocus) elem.onFocus(elem);
                });

                elem.render().on('hover:enter', function () {
                    if (elem.onEnter) elem.onEnter(elem);
                });

                elem.card = card;
                scroll.append(elem.render());
                items.push(elem);
            });
        };

        this.pause = function () {};
        this.stop = function () {};
        this.destroy = function () {
            scroll.destroy();
        };
    }

    // =========================================================================
    //  Активности
    // =========================================================================

    function openRecommendations() {
        Lampa.Activity.push({
            title: 'Рекомендации',
            component: PLUGIN_NAME,
            page: 1
        });
    }

    // =========================================================================
    //  Регистрация компонента
    // =========================================================================

    function initComponent() {
        Lampa.Component.add(PLUGIN_NAME, function (object) {
            var comp = new component(object);

            comp.create();

            Lampa.Loading.start(function () {
                Lampa.Activity.backward();
            });

            loadRecommendations(function (recResults) {
                loadByGenres(function (genreResults) {
                    Lampa.Loading.stop();

                    // Объединяем и убираем дубли
                    var all = recResults.slice();
                    genreResults.forEach(function (item) {
                        if (!cardInList(all, item.id)) all.push(item);
                    });

                    comp.build(all);
                    comp.start();

                    comp.activity.loader(false);
                    comp.activity.toggle();
                });
            });

            return comp;
        });
    }

    // =========================================================================
    //  Меню
    // =========================================================================

    function addMenuItem() {
        // Добавляем пункт в левое меню
        var item = $('<li class="menu__item selector" data-action="' + PLUGIN_NAME + '">' +
            '<div class="menu__ico">' + icon + '</div>' +
            '<div class="menu__text">Рекомендации</div>' +
        '</li>');

        item.on('hover:enter', function () {
            openRecommendations();
        });

        // Вставляем после "Избранное"
        var menu = $('.menu .menu__list');
        if (menu.length) {
            var inserted = false;
            menu.find('.menu__item').each(function () {
                var text = $(this).find('.menu__text').text().trim().toLowerCase();
                if (text === 'избранное' || text === 'favorite' || text === 'bookmarks') {
                    $(this).after(item);
                    inserted = true;
                    return false;
                }
            });
            if (!inserted) menu.append(item);
        }
    }

    // =========================================================================
    //  Настройки
    // =========================================================================

    function addSettings() {
        Lampa.SettingsApi.addComponent({
            component: PLUGIN_NAME,
            name: 'Рекомендации',
            icon: icon
        });

        Lampa.SettingsApi.addParam({
            component: PLUGIN_NAME,
            param: { name: 'recommend_clear_cache', type: 'button' },
            field: { name: 'Обновить рекомендации', description: 'Очистить кэш и загрузить новые рекомендации' },
            onChange: function () {
                Lampa.Storage.set(CACHE_KEY, '');
                Lampa.Noty.show('Кэш рекомендаций очищен');
            }
        });

        Lampa.SettingsApi.addParam({
            component: PLUGIN_NAME,
            param: { name: 'recommend_info', type: 'title' },
            field: { name: 'Рекомендации формируются на основе ваших закладок и истории просмотра. Анализируются жанры и похожие фильмы через TMDB.' }
        });
    }

    // =========================================================================
    //  Инициализация
    // =========================================================================

    function init() {
        initComponent();
        addSettings();
        addMenuItem();
    }

    if (window.appready) init();
    else Lampa.Listener.follow('app', function (e) {
        if (e.type === 'ready') init();
    });

})();
