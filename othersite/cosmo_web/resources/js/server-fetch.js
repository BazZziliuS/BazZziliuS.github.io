(function updateServerStatus() {
    $('[data-server-id]').each(function () {
        let el = $(this);
        let serverId = el.data('serverId');

        let hasFailed = false;
        let fail = function ({response}, interval) {
            let data = {message: 'An internal error occurred'};
            if (response?.status === 404) {
                data = typeof response?.data?.message !== 'undefined' ? response?.data : data;
            }

            el.find('[server-name]').text('Connection Error');

            el.find('[server-icon]')
                .attr('class', 'fad fa-exclamation-triangle');

            el.find('[server-description]').html(data.message);
            el.find('[server-image]')
                .attr('src', 'https://media.istockphoto.com/vectors/tv-no-signal-footage-background-color-bar-rgb-static-screen-for-video-vector-id998374186?b=1&k=6&m=998374186&s=612x612&w=0&h=XH1vtrNSez73X2zo5JdFm9heqFzZNhBCsT_hNISEHMM=');
            el.find('[join_server]')
                .attr('href', '#')
                .text('ERROR');
            el.find('[server-chart]').hide();
            el.find('[server-player-text]').hide();
            el.find('[server-map-name]').text('ERROR');

            el.find('[server-map-container]').attr('class', 'map error-map-notice')
            el.find('[server-loading]').hide();
            el.find('[server]').fadeIn();

            if (response?.status === 404) {
                return clearInterval(interval);
            }

            hasFailed = true;
        };

        /**
         * @param {object} data
         * @param {string} data.addr
         * @param {number} data.gameport
         * @param {string} data.steamid
         * @param {string} data.name
         * @param {number} data.appid
         * @param {string} data.gamedir
         * @param {string} data.version
         * @param {string} data.product
         * @param {number} data.region
         * @param {number} data.players
         * @param {number} data.max_players
         * @param {number} data.bots
         * @param {string} data.map
         * @param {boolean} data.secure
         * @param {boolean} data.dedicated
         * @param {string} data.os
         * @param {string} data.gametype
         */
        let success = function (data) {
            el.find('[server]').fadeIn();
            el.find('[server-loading]').hide();

            el.find('[server-icon_loading]').hide();
            el.find('[server-icon_loaded]').fadeIn();

            el.find('[server-loader]').fadeIn();
            el.find('[server-icon]').fadeIn();

            el.find('[server-map-name]').text(data.map);
            el.find('[server-player-count]').text(data.players)
                .attr('aria-valuenow', (data.players / data.max_players) * 100)
                .attr('aria-valuemax', data.max_players)
                .css('width', (data.players / data.max_players) * 100 + '%');
            el.find('[server-max-players]').text(data.max_players);
            el.find('[server-chart]').fadeIn();
            el.find('[server-player-text]').fadeIn();

            el.data('player-count', data.players);
            el.data('max-player-count', data.max_players);

            el.trigger('received-data');
        };

        let intervalFunc = function (interval) {
            Axios.get('/server/' + serverId)
                .then(function ({data}) {
                    if (typeof data === 'undefined') return fail({}, interval);

                    success(data);
                    clearInterval(interval);
                })
                .catch((err) => fail(err, interval));
        }

        let interval = setInterval(function () {
            intervalFunc(interval);
        }, 15000);

        intervalFunc(interval);
    });
})();