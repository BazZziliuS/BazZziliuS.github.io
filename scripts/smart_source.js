(function() {
    'use strict';

    // Конфигурация
    var Defined = {
        api: 'lampac'
    };

    // Список поддерживаемых балансеров
    var balancers = ['rezka2', 'kinobase', 'cdnmovies', 'collaps', 'filmix', 'zetflix', 'redheadsound', 'anilibria'];
    var network = new Lampa.Reguest();

    function proxy(url) {
        var proxies = {
            'cors1': 'https://cors.nb557.workers.dev/',
            'cors2': 'https://cors557.deno.dev/',
            'api1': 'https://api.delivembd.ws/api/v1/',
            'api2': 'https://api.strvid.ws/api/v1/',
            'api3': 'https://api.strvid.plus/api/v1/'
        };
        
        // Выбираем прокси в зависимости от домена
        if (url.includes('delivembd.ws')) return proxies.api1;
        if (url.includes('strvid.ws')) return proxies.api2;
        if (url.includes('strvid.plus')) return proxies.api3;
        
        return proxies.cors1;
    }

    function getStreamingUrl(movie, balancer) {
        var urls = {
            'rezka2': 'https://api.delivembd.ws/api/v1/rezka/search',
            'kinobase': 'https://api.delivembd.ws/api/v1/kinobase/search',
            'cdnmovies': 'https://api.strvid.ws/api/v1/cdnmovies/search',
            'collaps': 'https://api.strvid.ws/api/v1/collaps/search',
            'filmix': 'https://api.strvid.plus/api/v1/filmix/search',
            'zetflix': 'https://api.strvid.plus/api/v1/zetflix/search',
            'redheadsound': 'https://api.delivembd.ws/api/v1/redheadsound/search',
            'anilibria': 'https://api.delivembd.ws/api/v1/anilibria/search'
        };

        return urls[balancer] || '';
    }

    // Функция для проверки качества видео
    function getQualityScore(quality) {
        var resolutions = {
            '2160p': 4,
            '1440p': 3,
            '1080p': 2,
            '720p': 1,
            '480p': 0
        };
        return resolutions[quality] || -1;
    }

    // Функция для сравнения источников
    function compareStreams(a, b) {
        var score_a = getQualityScore(a.quality);
        var score_b = getQualityScore(b.quality);
        return score_b - score_a;
    }

    // Функция для получения потоков от каждого балансера
    function getStreams(movie, balancer) {
        return new Promise((resolve, reject) => {
            var url = getStreamingUrl(movie, balancer);
            if (!url) {
                resolve({
                    balancer: balancer,
                    streams: []
                });
                return;
            }

            var params = {
                title: movie.title,
                original_title: movie.original_title,
                year: movie.year,
                type: movie.type,
                imdb_id: movie.imdb_id,
                tmdb_id: movie.id
            };

            network.timeout(15000);
            network.native(proxy(url) + url, function(found) {
                if (found && found.streams) {
                    resolve({
                        balancer: balancer,
                        streams: found.streams.sort(compareStreams)
                    });
                } else {
                    resolve({
                        balancer: balancer,
                        streams: []
                    });
                }
            }, function(err) {
                console.log('Error with balancer ' + balancer + ':', err);
                resolve({
                    balancer: balancer,
                    streams: []
                });
            }, params);
        });
    }

    // Основная функция для поиска лучшего источника
    function findBestSource(movie) {
        if (!movie) {
            Lampa.Noty.show('Не удалось получить информацию о контенте');
            console.log('Movie object is empty');
            return;
        }

        console.log('Starting search for:', movie);
        Lampa.Noty.show('Поиск лучшего качества...');
        
        Promise.all(balancers.map(balancer => {
            console.log('Checking balancer:', balancer);
            return getStreams(movie, balancer);
        }))
        .then(results => {
            console.log('Search results:', results);
            var best_source = null;
            var best_quality = -1;

            results.forEach(result => {
                console.log('Checking result from:', result.balancer);
                if (result.streams && result.streams.length > 0) {
                    var stream = result.streams[0];
                    var quality_score = getQualityScore(stream.quality);
                    console.log('Stream quality:', stream.quality, 'Score:', quality_score);
                    
                    if (quality_score > best_quality) {
                        best_quality = quality_score;
                        best_source = {
                            balancer: result.balancer,
                            stream: stream
                        };
                    }
                }
            });

            if (best_source) {
                console.log('Best source found:', best_source);
                Lampa.Noty.show('Найден источник: ' + best_source.balancer + ' - ' + best_source.stream.quality);
                playSource(best_source);
            } else {
                console.log('No suitable sources found');
                Lampa.Noty.show('Не найдено подходящих источников');
            }
        })
        .catch(error => {
            console.error('Error during search:', error);
            Lampa.Noty.show('Произошла ошибка при поиске источников');
        });
    }

    // Функция воспроизведения
    function playSource(source) {
        var video = {
            url: source.stream.url,
            quality: source.stream.quality,
            timeline: source.stream.timeline,
            title: source.stream.title,
            subtitles: source.stream.subtitles
        };

        Lampa.Player.play(video);
        Lampa.Player.playlist([video]);
    }

    function component(object) {
        var scroll = new Lampa.Scroll({
            mask: true,
            over: true
        });
        var files = new Lampa.Explorer(object);
        var filter = new Lampa.Filter(object);
        
        this.create = function() {
            this.activity.loader(false);
            this.activity.toggle();
        };

        this.start = function() {
            if (!initialized) {
                initialized = true;
                this.create();
            }
        };

        this.pause = function() {};
        this.stop = function() {};
        this.destroy = function() {};
    }

    function startPlugin() {
        window.plugin_smart_source_ready = true;
        Lampa.Component.add('smart_source', component);

        // Добавляем пункт в меню
        var button = $('<li class="menu__item selector">\
            <div class="menu__ico">\
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">\
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />\
                </svg>\
            </div>\
            <div class="menu__text">Умный поиск</div>\
        </li>');

        // Добавляем кнопку при загрузке карточки
        Lampa.Listener.follow('full', function(e) {
            if (e.type == 'complite') {
                setTimeout(function() {
                    var btn = $('<div class="full-start-new__button selector view--smart_source">\
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">\
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />\
                        </svg>\
                        <span>Умный поиск</span>\
                    </div>');
                    
                    btn.on('hover:enter', function() {
                        var card = Lampa.Activity.active().card;
                        if (card) {
                            findBestSource(card);
                        }
                    });

                    // Добавляем кнопку в интерфейс
                    var container = $('.full-start-new__buttons', Lampa.Activity.active().activity.render());
                    if (container.length) {
                        container.append(btn);
                    } else {
                        console.log('Контейнер для кнопки не найден');
                    }
                }, 500);
            }
        });

        // Добавляем кнопку в меню
        $('.menu .menu__list').eq(0).append(button);

        // Обработчик клика по кнопке в меню
        button.on('hover:enter', function() {
            Lampa.Activity.push({
                url: '',
                title: 'Умный поиск',
                component: 'smart_source',
                page: 1
            });
        });
    }

    if (!window.plugin_smart_source_ready) startPlugin();

})();
