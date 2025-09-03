(function () {
    'use strict';
    Lampa.Platform.tv();


    (function () {
        'use strict';

        localStorage.removeItem('qualityCache');
        function _0x316ffe() {

            if (Lampa.Manifest.origin !== 'bylampa') {
                Lampa.Noty.show('Ошибка доступа');
                return;
            }
            var _0x5d39bf = 'http://212.113.103.137:835/quality', _0x37bb9c = { _0x4fbef5: true }, _0x4a6d46 = 0, _0x183e8a = false, _0x847992 = [];
            function _0x5df791() {

                if (window.lampa_listener_extensions) {
                    return;
                }
                window.lampa_listener_extensions = true;
                Object.defineProperty(window.Lampa.Card.prototype, 'build', {
                    get: function () {
                        return this._build;
                    },
                    set: function (_0x1466e8) {

                        this['_build'] = function () {

                            _0x1466e8.apply(this);
                            Lampa.Listener.send('card', {
                                type: 'build',
                                object: this
                            });
                        }.bind(this);
                    }
                });
            }
            function _0x173a7c(_0x4db4aa) {
                var _0x469e4a = new XMLHttpRequest();
                _0x469e4a.open('GET', _0x5d39bf, true);
                _0x469e4a.timeout = 10000;
                _0x469e4a.onload = function () {

                    if (_0x469e4a.status >= 200 && _0x469e4a.status < 300) {
                        try {
                            var _0x48d2a3 = JSON.parse(_0x469e4a.responseText);
                            _0x4db4aa(null, _0x48d2a3.results);
                        } catch (_0x35f7bd) {
                            _0x4db4aa(new Error('Ошибка парсинга JSON'));
                        }
                    } else {
                        _0x4db4aa(new Error('Ошибка HTTP: ' + _0x469e4a.status));
                    }
                };
                _0x469e4a.onerror = _0x469e4a.ontimeout = function () {

                    _0x4db4aa(new Error('Ошибка сети или таймаут'));
                };
                _0x469e4a.send();
            }
            function _0x15494d(_0x623d2) {
                if (!_0x623d2) {
                    return {};
                }
                var _0xb03eff = {};
                for (var _0x267af8 = 0, _0x1d9ce8 = _0x623d2.length; _0x267af8 < _0x1d9ce8; _0x267af8++) {
                    var _0x1e7ce9 = _0x623d2[_0x267af8];
                    _0x1e7ce9 && _0x1e7ce9.id && (_0xb03eff[_0x1e7ce9.id] = _0x1e7ce9);
                }
                return _0xb03eff;
            }
            function _0x1291fe(_0x3e9a09, _0x88e31b) {
                var _0x4fbef5 = _0x3e9a09.getAttribute('data-quality-id');
                !_0x4fbef5 && (_0x4fbef5 = 'card_' + ++_0x4a6d46, _0x3e9a09.setAttribute('data-quality-id', _0x4fbef5));
                if (_0x37bb9c[_0x4fbef5]) {
                    return;
                }
                var _0x27be3c = _0x3e9a09.querySelector('.card__view');
                if (!_0x27be3c || _0x27be3c.querySelector('.card__quality')) {
                    return;
                }
                var _0x41699f = document.createElement('div');
                _0x41699f.className = 'card__quality';
                _0x41699f.innerHTML = '<div>' + _0x88e31b + '</div>';
                _0x27be3c.appendChild(_0x41699f);

            }
            function _0x4597a0(_0x36d4e0) {

                if (!_0x36d4e0.data || !_0x36d4e0.card) {
                    return;
                }
                if (Lampa.Storage.get('source') == 'cub') {
                    return;
                }
                var _0x4f825b = _0x36d4e0.data;
                if (!_0x4f825b.id || _0x4f825b.first_air_date) {
                    return;
                }
                if (!_0x36775f.map) {
                    _0x847992.push(_0x36d4e0);
                    return;
                }
                var _0x4f5db0 = _0x36775f.map[_0x4f825b.id];
                _0x4f5db0 && _0x4f5db0.qu && _0x1291fe(_0x36d4e0.card, _0x4f5db0.qu);
            }
            function _0x496379() {

                if (!_0x36775f.map || _0x847992.length === 0) {
                    return;
                }
                console.log('Обрабатываем отложенные карточки:', _0x847992.length);
                for (var _0x187160 = 0; _0x187160 < _0x847992.length; _0x187160++) {
                    var _0x6c4fbe = _0x847992[_0x187160];
                    if (_0x6c4fbe.data && _0x6c4fbe.card) {
                        var _0x274cbb = _0x6c4fbe.data;
                        if (_0x274cbb.id && !_0x274cbb.first_air_date) {
                            var _0x5e1a5a = _0x36775f.map[_0x274cbb.id];
                            _0x5e1a5a && _0x5e1a5a.qu && _0x1291fe(_0x6c4fbe.card, _0x5e1a5a.qu);
                        }
                    }
                }
                _0x847992 = [];
            }
            function _0x30b3a7() {
                if (_0x183e8a) {
                    return;
                }
                _0x183e8a = true;
                _0x30dcdf();
            }
            function _0x30dcdf() {
                _0x173a7c(function (_0x55135a, _0xa00a20) {

                    !_0x55135a && _0xa00a20 && (_0x36775f.data = _0xa00a20, null = _0x15494d(_0xa00a20), console.log('Кэш качества обновлен в памяти'), _0x496379());
                });
            }
            function _0x754888() {

                if (window.quality_plugin) {
                    return;
                }
                window.quality_plugin = true;
                _0x5df791();
                Lampa.Listener.follow('card', function (_0xd8baf5) {

                    _0xd8baf5.type === 'build' && _0x4597a0(_0xd8baf5.object);
                });
                Lampa.Listener.follow('full', function (_0x7f269a) {

                    if (_0x7f269a.type === 'complite') {
                        var _0x4fb0b9 = _0x7f269a.object.activity.render();
                        if (_0x7f269a.object.method == 'tv') {
                            return;
                        }
                        if (Lampa.Storage.get('source') == 'cub') {
                            return;
                        }
                        var _0x352011 = _0x7f269a.object.card.id, _0x21e0f0 = null && null[_0x352011], _0x29ad8e = _0x21e0f0 && _0x21e0f0.qu;
                        _0x29ad8e && (window.innerWidth > 585 && !$('.full-start-new.cardify').length ? $('.full-start__poster,.full-start-new__poster', _0x4fb0b9).append('<div class=\'card--quality\' style=\'right: -0.6em!important;position: absolute;background: #ffe216;color: #000;bottom:20.6em!important;padding: 0.4em 0.6em;font-size: 1em;border-radius: 0.3em;\'>' + _0x29ad8e + '</div>') : $('.card--quality', _0x4fb0b9).length ? $('.full-start__tags', _0x4fb0b9).append('<div class="full-start__tag card--quality"><img src="./img/icons/menu/quality.svg" style="width:16px;height:16px;margin-right:4px;vertical-align:middle;"/> <div>' + _0x29ad8e + '</div></div>') : $('.full-start-new__details', _0x4fb0b9).append('<span class="full-start-new__split">\u25CF</span><div class="card--quality"><div>Качество: ' + _0x29ad8e + '</div></div>'));
                    }
                });
                _0x30b3a7();
            }
            _0x754888();
        }
        window.appready ? _0x316ffe() : Lampa.Listener.follow('app', function (_0x3d29cd) {

            _0x3d29cd.type === 'ready' && _0x316ffe();
        });
    }());
}());