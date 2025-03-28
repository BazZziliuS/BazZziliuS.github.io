(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    function c() {
      Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
          name: "season_and_seria",
          type: "trigger",
          default: true
        },
        field: {
          name: "Отображение состояния сериала (сезон/серия)"
        },
        onRender: function (a) {
          // TOLOOK
          setTimeout(function () {
            $("div[data-name=\"season_and_seria\"]").insertAfter("div[data-name=\"card_interfice_cover\"]");
          }, 0);
        }
      });
      if (Lampa.Storage.get("season_and_seria") !== false) {
        Lampa.Listener.follow("full", function (a) {
          if (Lampa.Activity.active().component == "full") {
            if (a.type == "complite") {
              var b = Lampa.Activity.active().card;
              if (b.source && b.source == "tmdb" && b.seasons && b.last_episode_to_air && b.last_episode_to_air.season_number) {
                var c = b.last_episode_to_air.season_number;
                var d = b.last_episode_to_air.episode_number;
                var e = b.next_episode_to_air;
                var f = e && new Date(e.air_date) <= Date.now() ? e.episode_number : b.last_episode_to_air.episode_number;
                var g;
                var h = b.seasons.find(function (a) {
                  return a.season_number == c;
                }).episode_count;
                if (b.next_episode_to_air) {
                  var i = "Серия " + f;
                  g = "Сезон: " + c + ". " + i + " из " + h;
                } else {
                  g = c + " сезон завершен";
                }
                if (!$(".card--new_seria", Lampa.Activity.active().activity.render()).length) {
                  if (window.innerWidth > 585 && !$(".full-start-new.cardify").length) {
                    $(".full-start__poster,.full-start-new__poster", Lampa.Activity.active().activity.render()).append("<div class='card--new_seria' style='right: -0.6em!important;position: absolute;background: #df1616;color: #fff;bottom:.6em!important;padding: 0.4em 0.4em;font-size: 1.2em;-webkit-border-radius: 0.3em;-moz-border-radius: 0.3em;border-radius: 0.3em;'>" + Lampa.Lang.translate(g) + "</div>");
                  } else if ($(".card--new_seria", Lampa.Activity.active().activity.render()).length) {
                    $(".full-start__tags", Lampa.Activity.active().activity.render()).append("<div class=\"full-start__tag card--new_seria\"><img src=\"./img/icons/menu/movie.svg\" /> <div>" + Lampa.Lang.translate(g) + "</div></div>");
                  } else {
                    $(".full-start-new__details", Lampa.Activity.active().activity.render()).append("<span class=\"full-start-new__split\">●</span><div class=\"card--new_seria\"><div> " + Lampa.Lang.translate(g) + "</div></div>");
                  }
                }
              }
            }
          }
        });
      }
    }
    if (window.appready) {
      c();
    } else {
      Lampa.Listener.follow("app", function (a) {
        if (a.type == "ready") {
          c();
        }
      });
    }
  })();
})();
