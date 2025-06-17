;
(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    function c() {
      var a;
      var b;
      var c = new Lampa.Reguest();
      var d = {
        _0x2bd390: _0x3dbf00
      };
      this.create = function () {
        a = $(`<div class="new-interface-info">
            <div class="new-interface-info__body">
                <div class="new-interface-info__head"></div>
                <div class="new-interface-info__title"></div>
                <div class="new-interface-info__details"></div>
                <div class="new-interface-info__description"></div>
            </div>
        </div>`);
      };
      this.update = function (b) {
        a.find(".new-interface-info__head,.new-interface-info__details").text("---");
        if (Lampa.Storage.get("logo_card_style") !== false) {
          var c = b;
          var d = c.name ? "tv" : "movie";
          var e = "4ef0d7355d9ffb5151e987764708ce96";
          var f = "http://tmdbimg.bylampa.online/";
          var g = "http://tmdbapi.bylampa.online/3/" + d + "/" + c.id + "/images?api_key=" + e + "&language=" + Lampa.Storage.get("language");
          $.get(g, function (c) {
            if (c.logos && c.logos[0]) {
              var d = c.logos[0].file_path;
              if (d !== "") {
                if (Lampa.Storage.get("desc") !== false) {
                  a.find(".new-interface-info__title").html("<img style=\"margin-top: 0.3em; margin-bottom: 0.1em; max-height: 1.8em; max-width: 6.8em;\" src=\"" + f + "t/p/w500" + d.replace(".svg", ".png") + "\" />");
                } else {
                  a.find(".new-interface-info__title").html("<img style=\"margin-top: 0.3em; margin-bottom: 0.1em; max-height: 2.8em; max-width: 6.8em;\" src=\"" + f + "t/p/w500" + d.replace(".svg", ".png") + "\" />");
                }
              } else {
                a.find(".new-interface-info__title").text(b.title);
              }
            } else {
              a.find(".new-interface-info__title").text(b.title);
            }
          });
        } else {
          a.find(".new-interface-info__title").text(b.title);
        }
        if (Lampa.Storage.get("desc") !== false) {
          a.find(".new-interface-info__description").text(b.overview || Lampa.Lang.translate("full_notext"));
        }
        Lampa.Background.change(Lampa.Api.img(b.backdrop_path, "w200"));
        this.load(b);
      };
      this.draw = function (b) {
        var c = ((b.release_date || b.first_air_date || "0000") + "").slice(0, 4);
        var d = parseFloat((b.vote_average || 0) + "").toFixed(1);
        var e = [];
        var f = [];
        var g = Lampa.Api.sources.tmdb.parseCountries(b);
        var h = Lampa.Api.sources.tmdb.parsePG(b);
        if (c !== "0000") {
          e.push("<span>" + c + "</span>");
        }
        if (g.length > 0) {
          e.push(g.join(", "));
        }
        if (Lampa.Storage.get("rat") !== false) {
          if (d > 0) {
            f.push("<div class=\"full-start__rate\"><div>" + d + "</div><div>TMDB</div></div>");
          }
        }
        if (Lampa.Storage.get("ganr") !== false) {
          if (b.genres && b.genres.length > 0) {
            f.push(b.genres.map(function (a) {
              return Lampa.Utils.capitalizeFirstLetter(a.name);
            }).join(" | "));
          }
        }
        if (Lampa.Storage.get("vremya") !== false) {
          if (b.runtime) {
            f.push(Lampa.Utils.secondsToTime(b.runtime * 60, true));
          }
        }
        if (Lampa.Storage.get("seas") !== false && b.number_of_seasons) {
          f.push("<span class=\"full-start__pg\" style=\"font-size: 0.9em;\">Сезонов " + b.number_of_seasons + "</span>");
        }
        if (Lampa.Storage.get("eps") !== false && b.number_of_episodes) {
          f.push("<span class=\"full-start__pg\" style=\"font-size: 0.9em;\">Эпизодов " + b.number_of_episodes + "</span>");
        }
        if (Lampa.Storage.get("year_ogr") !== false) {
          if (h) {
            f.push("<span class=\"full-start__pg\" style=\"font-size: 0.9em;\">" + h + "</span>");
          }
        }
        if (Lampa.Storage.get("status") !== false) {
          var i = "";
          if (b.status) {
            switch (b.status.toLowerCase()) {
              case "released":
                i = "Выпущенный";
                break;
              case "ended":
                i = "Закончен";
                break;
              case "returning series":
                i = "Онгоинг";
                break;
              case "canceled":
                i = "Отменено";
                break;
              case "post production":
                i = "Скоро";
                break;
              case "planned":
                i = "Запланировано";
                break;
              case "in production":
                i = "В производстве";
                break;
              default:
                i = b.status;
                break;
            }
          }
          if (i) {
            f.push("<span class=\"full-start__status\" style=\"font-size: 0.9em;\">" + i + "</span>");
          }
        }
        a.find(".new-interface-info__head").empty().append(e.join(", "));
        a.find(".new-interface-info__details").html(f.join("<span class=\"new-interface-info__split\">&#9679;</span>"));
      };
      this.load = function (a) {
        var e = this;
        clearTimeout(b);
        var f = Lampa.TMDB.api((a.name ? "tv" : "movie") + "/" + a.id + "?api_key=" + Lampa.TMDB.key() + "&append_to_response=content_ratings,release_dates&language=" + Lampa.Storage.get("language"));
        if (d[f]) {
          return this.draw(d[f]);
        }
        b = // TOLOOK
        setTimeout(function () {
          c.clear();
          c.timeout(5000);
          c.silent(f, function (a) {
            e.draw(a);
          });
        }, 300);
      };
      this.render = function () {
        return a;
      };
      this.empty = function () {};
      this.destroy = function () {
        a.remove();
        d = {};
        a = null;
      };
    }
    function d(a) {
      var b = new Lampa.Reguest();
      var d = new Lampa.Scroll({
        mask: true,
        over: true,
        scroll_by_item: true
      });
      var e = [];
      var f = $("<div class=\"new-interface\"><img class=\"full-start__background\"></div>");
      var g = 0;
      var h = Lampa.Manifest.app_digital >= 166;
      var i;
      var j;
      var k = Lampa.Storage.field("card_views_type") == "view" || Lampa.Storage.field("navigation_type") == "mouse";
      var l = f.find(".full-start__background");
      var m = "";
      var n;
      this.create = function () {};
      this.empty = function () {
        var b;
        if (a.source == "tmdb") {
          b = $("<div class=\"empty__footer\"><div class=\"simple-button selector\">" + Lampa.Lang.translate("change_source_on_cub") + "</div></div>");
          b.find(".selector").on("hover:enter", function () {
            Lampa.Storage.set("source", "cub");
            Lampa.Activity.replace({
              source: "cub"
            });
          });
        }
        var c = new Lampa.Empty();
        f.append(c.render(b));
        this.start = c.start;
        this.activity.loader(false);
        this.activity.toggle();
      };
      this.loadNext = function () {
        var a = this;
        if (this.next && !this.next_wait && e.length) {
          this.next_wait = true;
          this.next(function (b) {
            a.next_wait = false;
            b.forEach(a.append.bind(a));
            Lampa.Layer.visible(e[g + 1].render(true));
          }, function () {
            a.next_wait = false;
          });
        }
      };
      this.push = function () {};
      this.build = function (b) {
        var e = this;
        j = b;
        i = new c(a);
        i.create();
        d.minus(i.render());
        b.slice(0, k ? b.length : 2).forEach(this.append.bind(this));
        f.append(i.render());
        f.append(d.render());
        if (h) {
          Lampa.Layer.update(f);
          Lampa.Layer.visible(d.render(true));
          d.onEnd = this.loadNext.bind(this);
          d.onWheel = function (a) {
            if (!Lampa.Controller.own(e)) {
              e.start();
            }
            if (a > 0) {
              e.down();
            } else if (g > 0) {
              e.up();
            }
          };
        }
        this.activity.loader(false);
        this.activity.toggle();
      };
      this.background = function (a) {
        var b = Lampa.Api.img(a.backdrop_path, "w1280");
        clearTimeout(n);
        if (b == m) {
          return;
        }
        n = // TOLOOK
        setTimeout(function () {
          l.removeClass("loaded");
          l[0].onload = function () {
            l.addClass("loaded");
          };
          l[0].onerror = function () {
            l.removeClass("loaded");
          };
          m = b;
          // TOLOOK
          setTimeout(function () {
            l[0].src = m;
          }, 50);
        }, 100);
      };
      this.append = function (b) {
        var c = this;
        if (b.ready) {
          return;
        }
        b.ready = true;
        var f = new Lampa.InteractionLine(b, {
          url: b.url,
          card_small: true,
          cardClass: b.cardClass,
          genres: a.genres,
          object: a,
          card_wide: Lampa.Storage.field("wide_post"),
          nomore: b.nomore
        });
        f.create();
        f.onDown = this.down.bind(this);
        f.onUp = this.up.bind(this);
        f.onBack = this.back.bind(this);
        f.onToggle = function () {
          g = e.indexOf(f);
        };
        if (this.onMore) {
          f.onMore = this.onMore.bind(this);
        }
        f.onFocus = function (a) {
          i.update(a);
          c.background(a);
        };
        f.onHover = function (a) {
          i.update(a);
          c.background(a);
        };
        f.onFocusMore = i.empty.bind(i);
        d.append(f.render());
        e.push(f);
      };
      this.back = function () {
        Lampa.Activity.backward();
      };
      this.down = function () {
        g++;
        g = Math.min(g, e.length - 1);
        if (!k) {
          j.slice(0, g + 2).forEach(this.append.bind(this));
        }
        e[g].toggle();
        d.update(e[g].render());
      };
      this.up = function () {
        g--;
        if (g < 0) {
          g = 0;
          Lampa.Controller.toggle("head");
        } else {
          e[g].toggle();
          d.update(e[g].render());
        }
      };
      this.start = function () {
        var a = this;
        Lampa.Controller.add("content", {
          link: this,
          toggle: function b() {
            if (a.activity.canRefresh()) {
              return false;
            }
            if (e.length) {
              e[g].toggle();
            }
          },
          update: function a() {},
          left: function a() {
            if (Navigator.canmove("left")) {
              Navigator.move("left");
            } else {
              Lampa.Controller.toggle("menu");
            }
          },
          right: function a() {
            Navigator.move("right");
          },
          up: function a() {
            if (Navigator.canmove("up")) {
              Navigator.move("up");
            } else {
              Lampa.Controller.toggle("head");
            }
          },
          down: function a() {
            if (Navigator.canmove("down")) {
              Navigator.move("down");
            }
          },
          back: this.back
        });
        Lampa.Controller.toggle("content");
      };
      this.refresh = function () {
        this.activity.loader(true);
        this.activity.need_refresh = true;
      };
      this.pause = function () {};
      this.stop = function () {};
      this.render = function () {
        return f;
      };
      this.destroy = function () {
        b.clear();
        Lampa.Arrays.destroy(e);
        d.destroy();
        if (i) {
          i.destroy();
        }
        f.remove();
        e = null;
        b = null;
        j = null;
      };
    }
    function e() {
      window.plugin_interface_ready = true;
      var f = Lampa.InteractionMain;
      var g = d;
      Lampa.InteractionMain = function (a) {
        var b = g;
        if (window.innerWidth < 767) {
          b = f;
        }
        if (Lampa.Manifest.app_digital < 153) {
          b = f;
        }
        if (Lampa.Platform.screen("mobile")) {
          b = f;
        }
        if (a.title === "Избранное") {
          b = f;
        }
        return new b(a);
      };
      if (Lampa.Storage.get("wide_post") == true) {
        Lampa.Template.add("new_interface_style", `
        <style>
        .new-interface .card--small.card--wide {
            width: 18.3em;
        }
        
        .new-interface-info {
            position: relative;
            padding: 1.5em;
            height: 26em;
        }
        
        .new-interface-info__body {
            width: 80%;
            padding-top: 1.1em;
        }
        
        .new-interface-info__head {
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 1em;
            font-size: 1.3em;
            min-height: 1em;
        }
        
        .new-interface-info__head span {
            color: #fff;
        }
        
        .new-interface-info__title {
            font-size: 4em;
            font-weight: 600;
            margin-bottom: 0.3em;
            overflow: hidden;
            -o-text-overflow: ".";
            text-overflow: ".";
            display: -webkit-box;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;
            margin-left: -0.03em;
            line-height: 1.3;
        }
        
        .new-interface-info__details {
            margin-bottom: 1.6em;
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -moz-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            min-height: 1.9em;
            font-size: 1.3em;
        }
        
        .new-interface-info__split {
            margin: 0 1em;
            font-size: 0.7em;
        }
        
        .new-interface-info__description {
            font-size: 1.4em;
            font-weight: 310;
            line-height: 1.3;
            overflow: hidden;
            -o-text-overflow: ".";
            text-overflow: ".";
            display: -webkit-box;
            -webkit-line-clamp: 3;
            line-clamp: 3;
            -webkit-box-orient: vertical;
            width: 65%;
        }
        
        .new-interface .card-more__box {
            padding-bottom: 95%;
        }
        
        .new-interface .full-start__background {
            height: 108%;
            top: -5em;
        }
        
        .new-interface .full-start__rate {
            font-size: 1.3em;
            margin-right: 0;
        }
        
        .new-interface .card__promo {
            display: none;
        }
        
        .new-interface .card.card--wide+.card-more .card-more__box {
            padding-bottom: 95%;
        }
        
        .new-interface .card.card--wide .card-watched {
            display: none !important;
        }
        
        body.light--version .new-interface-info__body {
            width: 69%;
            padding-top: 1.5em;
        }
        
        body.light--version .new-interface-info {
            height: 25.3em;
        }

        body.advanced--animation:not(.no--animation) .new-interface .card--small.card--wide.focus .card__view{
            animation: animation-card-focus 0.2s
        }
        body.advanced--animation:not(.no--animation) .new-interface .card--small.card--wide.animate-trigger-enter .card__view{
            animation: animation-trigger-enter 0.2s forwards
        }
        </style>
    `);
        $("body").append(Lampa.Template.get("new_interface_style", {}, true));
      } else {
        Lampa.Template.add("new_interface_style", `
        <style>
        .new-interface .card--small.card--wide {
            width: 18.3em;
        }
        
        .new-interface-info {
            position: relative;
            padding: 1.5em;
            height: 20.4em;
        }
        
        .new-interface-info__body {
            width: 80%;
            padding-top: 0.2em;
        }
        
        .new-interface-info__head {
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 0.3em;
            font-size: 1.3em;
            min-height: 1em;
        }
        
        .new-interface-info__head span {
            color: #fff;
        }
        
        .new-interface-info__title {
            font-size: 4em;
            font-weight: 600;
            margin-bottom: 0.2em;
            overflow: hidden;
            -o-text-overflow: ".";
            text-overflow: ".";
            display: -webkit-box;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;
            margin-left: -0.03em;
            line-height: 1.3;
        }
        
        .new-interface-info__details {
            margin-bottom: 1.6em;
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            -moz-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-flex-wrap: wrap;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            min-height: 1.9em;
            font-size: 1.3em;
        }
        
        .new-interface-info__split {
            margin: 0 1em;
            font-size: 0.7em;
        }
        
        .new-interface-info__description {
            font-size: 1.4em;
            font-weight: 310;
            line-height: 1.3;
            overflow: hidden;
            -o-text-overflow: ".";
            text-overflow: ".";
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            width: 70%;
        }
        
        .new-interface .card-more__box {
            padding-bottom: 150%;
        }
        
        .new-interface .full-start__background {
            height: 108%;
            top: -5em;
        }
        
        .new-interface .full-start__rate {
            font-size: 1.3em;
            margin-right: 0;
        }
        
        .new-interface .card__promo {
            display: none;
        }
        
        .new-interface .card.card--wide+.card-more .card-more__box {
            padding-bottom: 95%;
        }
        
        .new-interface .card.card--wide .card-watched {
            display: none !important;
        }
        
        body.light--version .new-interface-info__body {
            width: 69%;
            padding-top: 1.5em;
        }
        
        body.light--version .new-interface-info {
            height: 25.3em;
        }

        body.advanced--animation:not(.no--animation) .new-interface .card--small.card--wide.focus .card__view{
            animation: animation-card-focus 0.2s
        }
        body.advanced--animation:not(.no--animation) .new-interface .card--small.card--wide.animate-trigger-enter .card__view{
            animation: animation-trigger-enter 0.2s forwards
        }
        </style>
    `);
        $("body").append(Lampa.Template.get("new_interface_style", {}, true));
      }
      Lampa.Settings.listener.follow("open", function (a) {
        if (a.name == "main") {
          if (Lampa.Settings.main().render().find("[data-component=\"style_interface\"]").length == 0) {
            Lampa.SettingsApi.addComponent({
              component: "style_interface",
              name: "Стильный интерфейс"
            });
          }
          Lampa.Settings.main().update();
          Lampa.Settings.main().render().find("[data-component=\"style_interface\"]").addClass("hide");
        }
      });
      Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
          name: "style_interface",
          type: "static",
          default: true
        },
        field: {
          name: "Стильный интерфейс",
          description: "Настройки элементов"
        },
        onRender: function (a) {
          // TOLOOK
          setTimeout(function () {
            $(".settings-param > div:contains(\"Стильный интерфейс\")").parent().insertAfter($("div[data-name=\"interface_size\"]"));
          }, 20);
          a.on("hover:enter", function () {
            Lampa.Settings.create("style_interface");
            Lampa.Controller.enabled().controller.back = function () {
              Lampa.Settings.create("interface");
            };
          });
        }
      });
      Lampa.SettingsApi.addParam({
        component: "style_interface",
        param: {
          name: "wide_post",
          type: "trigger",
          default: true
        },
        field: {
          name: "Широкие постеры"
        }
      });
      Lampa.SettingsApi.addParam({
        component: "style_interface",
        param: {
          name: "logo_card_style",
          type: "trigger",
          default: true
        },
        field: {
          name: "Логотип вместо названия"
        }
      });
      Lampa.SettingsApi.addParam({
        component: "style_interface",
        param: {
          name: "desc",
          type: "trigger",
          default: true
        },
        field: {
          name: "Показывать описание"
        }
      });
      Lampa.SettingsApi.addParam({
        component: "style_interface",
        param: {
          name: "status",
          type: "trigger",
          default: true
        },
        field: {
          name: "Показывать статус фильма/сериала"
        }
      });
      Lampa.SettingsApi.addParam({
        component: "style_interface",
        param: {
          name: "seas",
          type: "trigger",
          default: false
        },
        field: {
          name: "Показывать количество сезонов"
        }
      });
      Lampa.SettingsApi.addParam({
        component: "style_interface",
        param: {
          name: "eps",
          type: "trigger",
          default: false
        },
        field: {
          name: "Показывать количество эпизодов"
        }
      });
      Lampa.SettingsApi.addParam({
        component: "style_interface",
        param: {
          name: "year_ogr",
          type: "trigger",
          default: true
        },
        field: {
          name: "Показывать возрастное ограничение"
        }
      });
      Lampa.SettingsApi.addParam({
        component: "style_interface",
        param: {
          name: "vremya",
          type: "trigger",
          default: true
        },
        field: {
          name: "Показывать время фильма"
        }
      });
      Lampa.SettingsApi.addParam({
        component: "style_interface",
        param: {
          name: "ganr",
          type: "trigger",
          default: true
        },
        field: {
          name: "Показывать жанр фильма"
        }
      });
      Lampa.SettingsApi.addParam({
        component: "style_interface",
        param: {
          name: "rat",
          type: "trigger",
          default: true
        },
        field: {
          name: "Показывать рейтинг фильма"
        }
      });
      var h = // TOLOOK
      setInterval(function () {
        if (typeof Lampa !== "undefined") {
          clearInterval(h);
          if (!Lampa.Storage.get("int_plug", "false")) {
            i();
          }
        }
      }, 200);
      function i() {
        Lampa.Storage.set("int_plug", "true");
        Lampa.Storage.set("wide_post", "true");
        Lampa.Storage.set("logo_card_style", "true");
        Lampa.Storage.set("desc", "true");
        Lampa.Storage.set("status", "true");
        Lampa.Storage.set("seas", "false");
        Lampa.Storage.set("eps", "false");
        Lampa.Storage.set("year_ogr", "true");
        Lampa.Storage.set("vremya", "true");
        Lampa.Storage.set("ganr", "true");
        Lampa.Storage.set("rat", "true");
      }
    }
    if (!window.plugin_interface_ready) {
      e();
    }
  })();
})();