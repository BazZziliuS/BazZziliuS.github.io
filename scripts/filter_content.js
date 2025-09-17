(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    var c = {
      asian_filter_enabled: false,
      language_filter_enabled: false,
      rating_filter_enabled: false,
      history_filter_enabled: false
    };
    var d = {
      filters: [function (a) {
        if (!c.asian_filter_enabled) {
          return a;
        }
        return a.filter(function (a) {
          if (!a || !a.original_language) {
            return true;
          }
          var b = a.original_language.toLowerCase();
          var c = ["ja", "ko", "zh", "th", "vi", "hi", "ta", "te", "ml", "kn", "bn", "ur", "pa", "gu", "mr", "ne", "si", "my", "km", "lo", "mn", "ka", "hy", "az", "kk", "ky", "tg", "tk", "uz"];
          return c.indexOf(b) === -1;
        });
      }, function (a) {
        if (!c.language_filter_enabled) {
          return a;
        }
        return a.filter(function (a) {
          if (!a) {
            return true;
          }
          var b = Lampa.Storage.get("language");
          var c = a.original_title || a.original_name;
          var d = a.title || a.name;
          if (a.original_language === b) {
            return true;
          }
          if (a.original_language !== b && d !== c) {
            return true;
          }
          return false;
        });
      }, function (a) {
        if (!c.rating_filter_enabled) {
          return a;
        }
        return a.filter(function (a) {
          if (!a) {
            return true;
          }
          var b = a.media_type === "video" || a.type === "Trailer" || a.site === "YouTube" || a.key && a.name && a.name.toLowerCase().indexOf("trailer") !== -1;
          if (b) {
            return true;
          }
          if (!a.vote_average || a.vote_average === 0) {
            return false;
          }
          return a.vote_average >= 6;
        });
      }, function (a) {
        if (!c.history_filter_enabled) {
          return a;
        }
        var b = Lampa.Storage.get("favorite", "{}");
        var d = Lampa.Storage.cache("timetable", 300, []);
        return a.filter(function (a) {
          if (!a || !a.original_language) {
            return true;
          }
          var c = a.media_type;
          if (!c) {
            c = !!a.first_air_date ? "tv" : "movie";
          }
          var e = Lampa.Favorite.check(a);
          var j = !!e && !!e.history;
          var k = !!e && e.thrown;
          if (k) {
            return false;
          }
          if (!j) {
            return true;
          }
          if (j && c === "movie") {
            return false;
          }
          var l = f(a.id, b);
          var m = g(a.id, d);
          var n = h(l, m);
          var o = i(a.original_title || a.original_name, n);
          return !o;
        });
      }],
      apply: function (a) {
        var b = Lampa.Arrays.clone(a);
        for (var c = 0; c < this.filters.length; c++) {
          b = this.filters[c](b);
        }
        return b;
      }
    };
    function e() {
      if (window.lampa_listener_extensions) {
        return;
      }
      window.lampa_listener_extensions = true;
      Object.defineProperty(window.Lampa.Card.prototype, "build", {
        get: function () {
          return this._build;
        },
        set: function (a) {
          this._build = function () {
            a.apply(this);
            Lampa.Listener.send("card", {
              type: "build",
              object: this
            });
          }.bind(this);
        }
      });
    }
    function f(a, b) {
      var c = b.card.filter(function (b) {
        return b.id === a && Array.isArray(b.seasons) && b.seasons.length > 0;
      })[0];
      if (!c) {
        return [];
      }
      var d = c.seasons.filter(function (a) {
        return a.season_number > 0 && a.episode_count > 0 && a.air_date && new Date(a.air_date) < new Date();
      });
      if (d.length === 0) {
        return [];
      }
      var e = [];
      for (var f = 0; f < d.length; f++) {
        var g = d[f];
        for (var h = 1; h <= g.episode_count; h++) {
          e.push({
            season_number: g.season_number,
            episode_number: h
          });
        }
      }
      return e;
    }
    function g(a, b) {
      var c = b.filter(function (b) {
        return b.id === a;
      })[0] || {};
      if (!Array.isArray(c.episodes) || c.episodes.length === 0) {
        return [];
      }
      return c.episodes.filter(function (a) {
        return a.season_number > 0 && a.air_date && new Date(a.air_date) < new Date();
      });
    }
    function h(a, b) {
      var c = a.concat(b);
      var d = [];
      for (var e = 0; e < c.length; e++) {
        var f = c[e];
        var g = false;
        for (var h = 0; h < d.length; h++) {
          if (d[h].season_number === f.season_number && d[h].episode_number === f.episode_number) {
            g = true;
            break;
          }
        }
        if (!g) {
          d.push(f);
        }
      }
      return d;
    }
    function i(a, b) {
      if (!b || b.length === 0) {
        return false;
      }
      for (var c = 0; c < b.length; c++) {
        var d = b[c];
        var e = Lampa.Utils.hash([d.season_number, d.season_number > 10 ? ":" : "", d.episode_number, a].join(""));
        var f = Lampa.Timeline.view(e);
        if (f.percent === 0) {
          return false;
        }
      }
      return true;
    }
    function j() {
      Lampa.Lang.add({
        content_filters: {
          ru: "Фильтр контента",
          en: "Content Filter",
          uk: "Фільтр контенту"
        },
        asian_filter: {
          ru: "Убрать азиатский контент",
          en: "Remove Asian Content",
          uk: "Прибрати азіатський контент"
        },
        asian_filter_desc: {
          ru: "Скрываем карточки азиатского происхождения",
          en: "Hide cards of Asian origin",
          uk: "Сховати картки азіатського походження"
        },
        language_filter: {
          ru: "Убрать контент на другом языке",
          en: "Remove Other Language Content",
          uk: "Прибрати контент іншою мовою"
        },
        language_filter_desc: {
          ru: "Скрываем карточки, названия которых не переведены на язык, выбранный по умолчанию",
          en: "Hide cards not translated to the default language",
          uk: "Сховати картки, які не перекладені на мову за замовчуванням"
        },
        rating_filter: {
          ru: "Убрать низкорейтинговый контент",
          en: "Remove Low-Rated Content",
          uk: "Прибрати низько рейтинговий контент"
        },
        rating_filter_desc: {
          ru: "Скрываем карточки с рейтингом ниже 6.0",
          en: "Hide cards with a rating below 6.0",
          uk: "Сховати картки з рейтингом нижче 6.0"
        },
        history_filter: {
          ru: "Убрать просмотренный контент",
          en: "Hide Watched Content",
          uk: "Приховувати переглянуте"
        },
        history_filter_desc: {
          ru: "Скрываем карточки фильмов и сериалов из истории, которые вы закончили смотреть",
          en: "Hide cards from your viewing history",
          uk: "Сховати картки з вашої історії перегляду"
        }
      });
    }
    function k() {
      Lampa.Settings.listener.follow("open", function (a) {
        if (a.name == "main") {
          if (Lampa.Settings.main().render().find("[data-component=\"content_filters\"]").length == 0) {
            Lampa.SettingsApi.addComponent({
              component: "content_filters",
              name: Lampa.Lang.translate("content_filters")
            });
          }
          Lampa.Settings.main().update();
          Lampa.Settings.main().render().find("[data-component=\"content_filters\"]").addClass("hide");
        }
      });
      Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
          name: "content_filters",
          type: "static",
          default: true
        },
        field: {
          name: Lampa.Lang.translate("content_filters"),
          description: "Настройка отображения карточек по фильтрам"
        },
        onRender: function (a) {
          // TOLOOK
          setTimeout(function () {
            var a = Lampa.Lang.translate("content_filters");
            $(".settings-param > div:contains(\"" + a + "\")").parent().insertAfter($("div[data-name=\"interface_size\"]"));
          }, 0);
          a.on("hover:enter", function () {
            Lampa.Settings.create("content_filters");
            Lampa.Controller.enabled().controller.back = function () {
              Lampa.Settings.create("interface");
            };
          });
        }
      });
      Lampa.SettingsApi.addParam({
        component: "content_filters",
        param: {
          name: "asian_filter_enabled",
          type: "trigger",
          default: false
        },
        field: {
          name: Lampa.Lang.translate("asian_filter"),
          description: Lampa.Lang.translate("asian_filter_desc")
        },
        onChange: function (a) {
          c.asian_filter_enabled = a;
          Lampa.Storage.set("asian_filter_enabled", a);
        }
      });
      Lampa.SettingsApi.addParam({
        component: "content_filters",
        param: {
          name: "language_filter_enabled",
          type: "trigger",
          default: false
        },
        field: {
          name: Lampa.Lang.translate("language_filter"),
          description: Lampa.Lang.translate("language_filter_desc")
        },
        onChange: function (a) {
          c.language_filter_enabled = a;
          Lampa.Storage.set("language_filter_enabled", a);
        }
      });
      Lampa.SettingsApi.addParam({
        component: "content_filters",
        param: {
          name: "rating_filter_enabled",
          type: "trigger",
          default: false
        },
        field: {
          name: Lampa.Lang.translate("rating_filter"),
          description: Lampa.Lang.translate("rating_filter_desc")
        },
        onChange: function (a) {
          c.rating_filter_enabled = a;
          Lampa.Storage.set("rating_filter_enabled", a);
        }
      });
      Lampa.SettingsApi.addParam({
        component: "content_filters",
        param: {
          name: "history_filter_enabled",
          type: "trigger",
          default: false
        },
        field: {
          name: Lampa.Lang.translate("history_filter"),
          description: Lampa.Lang.translate("history_filter_desc")
        },
        onChange: function (a) {
          c.history_filter_enabled = a;
          Lampa.Storage.set("history_filter_enabled", a);
        }
      });
    }
    function l() {
      c.asian_filter_enabled = Lampa.Storage.get("asian_filter_enabled", false);
      c.language_filter_enabled = Lampa.Storage.get("language_filter_enabled", false);
      c.rating_filter_enabled = Lampa.Storage.get("rating_filter_enabled", false);
      c.history_filter_enabled = Lampa.Storage.get("history_filter_enabled", false);
    }
    function m(a) {
      return a.indexOf(Lampa.TMDB.api("")) > -1 && a.indexOf("/search") === -1 && a.indexOf("/person/") === -1;
    }
    function n(a) {
      return !!a && Array.isArray(a.results) && a.original_length !== a.results.length && a.page === 1 && !!a.total_pages && a.total_pages > 1;
    }
    function o(a, b) {
      if (a && a.closest) {
        return a.closest(b);
      }
      var c = a;
      while (c && c !== document) {
        if (c.matches) {
          if (c.matches(b)) {
            return c;
          }
        } else if (c.msMatchesSelector) {
          if (c.msMatchesSelector(b)) {
            return c;
          }
        } else if (c.webkitMatchesSelector) {
          if (c.webkitMatchesSelector(b)) {
            return c;
          }
        } else if (c.mozMatchesSelector) {
          if (c.mozMatchesSelector(b)) {
            return c;
          }
        } else if (c.oMatchesSelector) {
          if (c.oMatchesSelector(b)) {
            return c;
          }
        } else if (c.className && c.className.indexOf(b.replace(".", "")) !== -1) {
          return c;
        }
        c = c.parentElement || c.parentNode;
      }
      return null;
    }
    function p() {
      if (window.content_filter_plugin) {
        return;
      }
      window.content_filter_plugin = true;
      e();
      l();
      j();
      k();
      Lampa.Listener.follow("line", function (a) {
        if (a.type !== "visible" || !n(a.data)) {
          return;
        }
        var b = $(o(a.body, ".items-line")).find(".items-line__head");
        var c = b.find(".items-line__more").length !== 0;
        if (c) {
          return;
        }
        var d = document.createElement("div");
        d.classList.add("items-line__more");
        d.classList.add("selector");
        d.innerText = Lampa.Lang.translate("more");
        d.addEventListener("hover:enter", function () {
          Lampa.Activity.push({
            url: a.data.url,
            title: a.data.title || Lampa.Lang.translate("title_category"),
            component: "category_full",
            page: 1,
            genres: a.params.genres,
            filter: a.data.filter,
            source: a.data.source || a.params.object.source
          });
        });
        b.append(d);
      });
      Lampa.Listener.follow("line", function (a) {
        if (a.type !== "append" || !n(a.data)) {
          return;
        }
        if (a.items.length === a.data.results.length && Lampa.Controller.own(a.line)) {
          Lampa.Controller.collectionAppend(a.line.more());
        }
      });
      Lampa.Listener.follow("request_secuses", function (a) {
        if (m(a.params.url) && a.data && Array.isArray(a.data.results)) {
          a.data.original_length = a.data.results.length;
          a.data.results = d.apply(a.data.results);
        }
      });
    }
    if (window.appready) {
      p();
    } else {
      Lampa.Listener.follow("app", function (a) {
        if (a.type === "ready") {
          p();
        }
      });
    }
  })();
})();