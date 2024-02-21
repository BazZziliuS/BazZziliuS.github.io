(function () {
    'use strict';

    function startMe() {
        var styles = `
            body{
                background-color: #564335;
            }

            body,
            .card__vote{
                color: #dfd9ce;
            }
            body.black--style {
                background: #201911;
            }

            .menu__item.focus, 
            .menu__item.traverse, 
            .menu__item.hover,
            .settings-folder.focus,
            .settings-param.focus,
            .selectbox-item.focus,
            .selectbox-item.hover,
            .full-person.focus,
            .full-start__button.focus,
            .full-descr__tag.focus,
            .simple-button.focus,
            .iptv-list__item.focus,
            .iptv-menu__list-item.focus,
            .head__action.focus, 
            .head__action.hover,
            .player-panel .button.focus,
            .search-source.active{
                background: -webkit-gradient(linear, left top, right top, color-stop(1%, rgba(254,244,222,1)),to(rgba(237,207,171,1)));
                background: -webkit-linear-gradient(left, rgba(254,244,222,1) 1%,rgba(237,207,171,1) 100%);
                background: -moz-linear-gradient(left, rgba(254,244,222,1) 1%,rgba(237,207,171,1) 100%);
                background: -o-linear-gradient(left, rgba(254,244,222,1) 1%,rgba(237,207,171,1) 100%);
                background: linear-gradient(to right, rgba(254,244,222,1) 1%,rgba(237,207,171,1) 100%);
                color: #000;
            }

            .settings-folder.focus .settings-folder__icon{
                -webkit-filter: invert(1);
                        filter: invert(1);
            }

            .settings-param-title > span{
                color: #fff;
            }

            .settings__content,
            .settings-input__content,
            .selectbox__content,
            .modal__content{
                background: -webkit-linear-gradient(315deg, rgb(50,46,37) 1%,rgb(10,8,6) 100%);
                background: -moz-linear-gradient(315deg, rgb(50,46,37) 1%,rgb(10,8,6) 100%);
                background: -o-linear-gradient(315deg, rgb(50,46,37) 1%,rgb(10,8,6) 100%);
                background: linear-gradient(135deg, rgb(50,46,37) 1%,rgb(10,8,6) 100%);
            }

            .settings-input__links{
                background-color: rgba(255,255,255,0.2);
            }

            .card.focus .card__view::after, 
            .card.hover .card__view::after,
            .extensions__item.focus:after,
            .torrent-item.focus::after,
            .extensions__block-add.focus:after{
                border-color: rgb(254,244,222);
            }
            .online-prestige.focus::after,
            .iptv-channel.focus::before, 
            .iptv-channel.last--focus::before{
                border-color: rgb(254,244,222) !important;
            }
            .time-line > div,
            .player-panel__position,
            .player-panel__position > div:after{
                background-color: rgb(254,244,222);
            }

            .extensions{
                background: #201911;
            }
            .extensions__item,
            .extensions__block-add{
                background-color: #423a32;
            }
            .torrent-item__size,
            .torrent-item__exe,
            .torrent-item__viewed,
            .torrent-serial__size{
                background-color: #dfd9ce;
                color: #000;
            }

            .torrent-serial{
                background-color: rgba(223,217,206,0.1);
            }
            .torrent-file.focus,
            .torrent-serial.focus{
                background-color: rgba(223,217,206,0.36);
            }

            .iptv-channel{
                background-color: #624e3f !important;
            }
            `;

            var styleSheet = document.createElement("style");
            styleSheet.type = "text/css";
            styleSheet.innerText = styles;
            document.head.appendChild(styleSheet);

    };
        

        if(window.appready) startMe();
        else {
            Lampa.Listener.follow('app', function(e) {
                if(e.type == 'ready') {
                    startMe();
                }
            });
        }
})();
