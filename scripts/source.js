(function () {
    'use strict';
  
    Lampa.Platform.tv();
    var f = new Lampa.Reguest();
    var g = {};
    var h = 0;
    var i = 0;
    var j = 0;
    var k = [];
    var l = {};
    var m = {};
    var n = 100;
    var o = 3600000;
    var p = "KP";
    var q = "KP";
    function r(a, b, c) {
      var d = h >= 10 && j > h / 2;
      if (!d) {
        h++;
      }
      var e = "https://cors.kp556.workers.dev:8443/";
      var g = "https://kinopoiskapiunofficial.tech/";
      g += a;
      f.timeout(15000);
      f.silent((d ? e : "") + g, function (a) {
        b(a);
      }, function (a, h) {
        d = !d && (i < 10 || j > i / 2);
        if (d && (a.status == 429 || a.status == 0 && a.statusText !== "timeout")) {
          i++;
          f.timeout(15000);
          f.silent(e + g, function (a) {
            j++;
            b(a);
          }, c, false, {
            headers: {
              "X-API-KEY": "2a4a0808-81a3-40ae-b0d3-e11335ede616"
            }
          });
        } else {
          c(a, h);
        }
      }, false, {
        headers: {
          "X-API-KEY": "2a4a0808-81a3-40ae-b0d3-e11335ede616"
        }
      });
    }
    function s(a, b) {
      r(a, b, function () {
        b(null);
      });
    }
    function t(a, b, c) {
      if (a) {
        s(b, c);
      } else {
        // TOLOOK
        setTimeout(function () {
          c(null);
        }, 10);
      }
    }
    function u(a) {
      var b = g[a];
      if (b) {
        var c = new Date().getTime() - o;
        if (b.timestamp > c) {
          return b.value;
        }
        for (var d in g) {
          var e = g[d];
          if (!(e && e.timestamp > c)) {
            delete g[d];
          }
        }
      }
      return null;
    }
    function v(a, b) {
      var c = new Date().getTime();
      var d = Object.keys(g).length;
      if (d >= n) {
        var e = c - o;
        for (var f in g) {
          var h = g[f];
          if (!(h && h.timestamp > e)) {
            delete g[f];
          }
        }
        d = Object.keys(g).length;
        if (d >= n) {
          var i = [];
          for (var j in g) {
            var k = g[j];
            i.push(k && k.timestamp || 0);
          }
          i.sort(function (a, b) {
            return a - b;
          });
          e = i[Math.floor(i.length / 2)];
          for (var l in g) {
            var m = g[l];
            if (!(m && m.timestamp > e)) {
              delete g[l];
            }
          }
        }
      }
      var p = {
        timestamp: c,
        value: b
      };
      g[a] = p;
    }
    function w(a, b, c) {
      var d = u(a);
      if (d) {
        // TOLOOK
        setTimeout(function () {
          b(d, true);
        }, 10);
      } else {
        r(a, b, c);
      }
    }
    function x() {
      f.clear();
    }
    function y(a) {
      var b = !a.type || a.type === "FILM" || a.type === "VIDEO" ? "movie" : "tv";
      var c = a.kinopoiskId || a.filmId || 0;
      var d = +a.rating || +a.ratingKinopoisk || 0;
      var e = a.nameRu || a.nameEn || a.nameOriginal || "";
      var f = a.nameOriginal || a.nameEn || a.nameRu || "";
      var g = false;
      var h = {
        source: p,
        type: b,
        adult: false,
        id: p + "_" + c,
        title: e,
        original_title: f,
        overview: a.description || a.shortDescription || "",
        img: a.posterUrlPreview || a.posterUrl || "",
        background_image: a.coverUrl || a.posterUrl || a.posterUrlPreview || "",
        genres: a.genres && a.genres.map(function (a) {
          if (a.genre === "для взрослых") {
            g = true;
          }
          var b = {
            id: a.genre && l[a.genre] || 0,
            name: a.genre,
            url: ""
          };
          return b;
        }) || [],
        production_companies: [],
        production_countries: a.countries && a.countries.map(function (a) {
          var b = {
            name: a.country
          };
          return b;
        }) || [],
        vote_average: d,
        vote_count: a.ratingVoteCount || a.ratingKinopoiskVoteCount || 0,
        kinopoisk_id: c,
        kp_rating: d,
        imdb_id: a.imdbId || "",
        imdb_rating: a.ratingImdb || 0
      };
      h.adult = g;
      var i = a.year && a.year !== "null" ? a.year : "";
      var j = "";
      if (b === "tv") {
        if (a.startYear && a.startYear !== "null") {
          i = a.startYear;
        }
        if (a.endYear && a.endYear !== "null") {
          j = a.endYear;
        }
      }
      if (a.distributions_obj) {
        var k = a.distributions_obj.items || [];
        var m = Date.parse(i);
        var n = null;
        k.forEach(function (a) {
          if (a.date && (a.type === "WORLD_PREMIER" || a.type === "ALL")) {
            var b = Date.parse(a.date);
            if (!isNaN(b) && (n == null || b < n) && (isNaN(m) || b >= m)) {
              n = b;
              i = a.date;
            }
          }
        });
      }
      if (b === "tv") {
        h.name = e;
        h.original_name = f;
        h.first_air_date = i;
        if (j) {
          h.last_air_date = j;
        }
      } else {
        h.release_date = i;
      }
      if (a.seasons_obj) {
        var o = a.seasons_obj.items || [];
        h.number_of_seasons = a.seasons_obj.total || o.length || 1;
        h.seasons = o.map(function (a) {
          return z(a);
        });
        var q = 0;
        h.seasons.forEach(function (a) {
          q += a.episode_count;
        });
        h.number_of_episodes = q;
      }
      if (a.staff_obj) {
        var r = a.staff_obj || [];
        var s = [];
        var t = [];
        r.forEach(function (a) {
          var b = A(a);
          if (a.professionKey === "ACTOR") {
            s.push(b);
          } else {
            t.push(b);
          }
        });
        var u = {
          cast: s,
          crew: t
        };
        h.persons = u;
      }
      if (a.sequels_obj) {
        var v = a.sequels_obj || [];
        h.collection = {
          results: v.map(function (a) {
            return y(a);
          })
        };
      }
      if (a.similars_obj) {
        var w = a.similars_obj.items || [];
        h.simular = {
          results: w.map(function (a) {
            return y(a);
          })
        };
      }
      return h;
    }
    function z(a) {
      var b = a.episodes || [];
      b = b.map(function (a) {
        return {
          season_number: a.seasonNumber,
          episode_number: a.episodeNumber,
          name: a.nameRu || a.nameEn || "S" + a.seasonNumber + " / " + Lampa.Lang.translate("torrent_serial_episode") + " " + a.episodeNumber,
          overview: a.synopsis || "",
          air_date: a.releaseDate
        };
      });
      return {
        season_number: a.number,
        episode_count: b.length,
        episodes: b,
        name: Lampa.Lang.translate("torrent_serial_season") + " " + a.number,
        overview: ""
      };
    }
    function A(a) {
      return {
        id: a.staffId,
        name: a.nameRu || a.nameEn || "",
        url: "",
        img: a.posterUrl || "",
        character: a.description || "",
        job: Lampa.Utils.capitalizeFirstLetter((a.professionKey || "").toLowerCase())
      };
    }
    function B(a) {
      return a.replace(/[\s.,:;’'`!?]+/g, " ").trim();
    }
    function C(a) {
      return B(a.toLowerCase().replace(/[\-\u2010-\u2015\u2E3A\u2E3B\uFE58\uFE63\uFF0D]+/g, "-").replace(/ё/g, "е"));
    }
    function D(a, b) {
      return typeof a === "string" && typeof b === "string" && C(a).indexOf(C(b)) !== -1;
    }
    function E(a) {
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var c = arguments.length > 2 ? arguments[2] : undefined;
      var d = arguments.length > 3 ? arguments[3] : undefined;
      var e = a;
      if (b.query) {
        var f = b.query && B(decodeURIComponent(b.query));
        if (!f) {
          d();
          return;
        }
        e = Lampa.Utils.addUrlComponent(e, "keyword=" + encodeURIComponent(f));
      }
      var g = b.page || 1;
      e = Lampa.Utils.addUrlComponent(e, "page=" + g);
      w(e, function (b, d) {
        var f = [];
        if (b.items && b.items.length) {
          f = b.items;
        } else if (b.films && b.films.length) {
          f = b.films;
        } else if (b.releases && b.releases.length) {
          f = b.releases;
        }
        if (!d && f.length) {
          v(e, b);
        }
        var h = f.map(function (a) {
          return y(a);
        });
        h = h.filter(function (a) {
          return !a.adult;
        });
        var i = b.pagesCount || b.totalPages || 1;
        var j = {
          results: h,
          url: a,
          page: g,
          total_pages: i,
          total_results: 0,
          more: i > g
        };
        c(j);
      }, d);
    }
    function F(a) {
      var b = arguments.length > 2 ? arguments[2] : undefined;
      var c = arguments.length > 3 ? arguments[3] : undefined;
      var d = "api/v2.2/films/" + a;
      var e = u(d);
      if (e) {
        // TOLOOK
        setTimeout(function () {
          b(y(e));
        }, 10);
      } else {
        r(d, function (e) {
          if (e.kinopoiskId) {
            var f = !e.type || e.type === "FILM" || e.type === "VIDEO" ? "movie" : "tv";
            t(f == "tv", "api/v2.2/films/" + a + "/seasons", function (c) {
              e.seasons_obj = c;
              s("api/v2.2/films/" + a + "/distributions", function (c) {
                e.distributions_obj = c;
                s("/api/v1/staff?filmId=" + a, function (c) {
                  e.staff_obj = c;
                  s("api/v2.1/films/" + a + "/sequels_and_prequels", function (c) {
                    e.sequels_obj = c;
                    s("api/v2.2/films/" + a + "/similars", function (a) {
                      e.similars_obj = a;
                      v(d, e);
                      b(y(e));
                    });
                  });
                });
              });
            });
          } else {
            c();
          }
        }, c);
      }
    }
    function G(a) {
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var c = arguments.length > 2 ? arguments[2] : undefined;
      var d = arguments.length > 3 ? arguments[3] : undefined;
      O({}, function () {
        return F(a, b, c, d);
      });
    }
    function H() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var b = arguments.length > 1 ? arguments[1] : undefined;
      var c = arguments.length > 2 ? arguments[2] : undefined;
      var d = 5;
      var e = [function (b) {
        E("api/v2.2/films/top?type=TOP_100_POPULAR_FILMS", a, function (a) {
          a.title = Lampa.Lang.translate("title_now_watch");
          b(a);
        }, b);
      }, function (b) {
        E("api/v2.2/films/top?type=TOP_250_BEST_FILMS", a, function (a) {
          a.title = Lampa.Lang.translate("title_top_movie");
          b(a);
        }, b);
      }, function (b) {
        E("api/v2.2/films?order=NUM_VOTE&type=FILM", a, function (a) {
          a.title = "Популярные фильмы";
          b(a);
        }, b);
      }, function (b) {
        E("api/v2.2/films?order=NUM_VOTE&type=TV_SERIES", a, function (a) {
          a.title = "Популярные сериалы";
          b(a);
        }, b);
      }, function (b) {
        E("api/v2.2/films?order=NUM_VOTE&type=MINI_SERIES", a, function (a) {
          a.title = "Популярные мини-сериалы";
          b(a);
        }, b);
      }, function (b) {
        E("api/v2.2/films?order=NUM_VOTE&type=TV_SHOW", a, function (a) {
          a.title = "Популярные телешоу";
          b(a);
        }, b);
      }];
      function f(a, b) {
        Lampa.Api.partNext(e, d, a, b);
      }
      O({}, function () {
        var d = m.Россия;
        if (d) {
          e.splice(3, 0, function (b) {
            E("api/v2.2/films?order=NUM_VOTE&countries=" + d + "&type=FILM", a, function (a) {
              a.title = "Популярные российские фильмы";
              b(a);
            }, b);
          });
          e.splice(5, 0, function (b) {
            E("api/v2.2/films?order=NUM_VOTE&countries=" + d + "&type=TV_SERIES", a, function (a) {
              a.title = "Популярные российские сериалы";
              b(a);
            }, b);
          });
          e.splice(7, 0, function (b) {
            E("api/v2.2/films?order=NUM_VOTE&countries=" + d + "&type=MINI_SERIES", a, function (a) {
              a.title = "Популярные российские мини-сериалы";
              b(a);
            }, b);
          });
        }
        f(b, c);
      });
      return f;
    }
    function I() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var b = arguments.length > 1 ? arguments[1] : undefined;
      var c = arguments.length > 2 ? arguments[2] : undefined;
      var d = ["movie", "tv"].indexOf(a.url) > -1 && !a.genres;
      var e = d ? Lampa.Favorite.continues(a.url) : [];
      e.forEach(function (a) {
        if (!a.source) {
          a.source = "tmdb";
        }
      });
      e = e.filter(function (a) {
        return [p, "tmdb", "cub"].indexOf(a.source) !== -1;
      });
      var f = d ? Lampa.Arrays.shuffle(Lampa.Recomends.get(a.url)).slice(0, 19) : [];
      f.forEach(function (a) {
        if (!a.source) {
          a.source = "tmdb";
        }
      });
      f = f.filter(function (a) {
        return [p, "tmdb", "cub"].indexOf(a.source) !== -1;
      });
      var g = 5;
      var h = [function (b) {
        b({
          results: e,
          title: a.url == "tv" ? Lampa.Lang.translate("title_continue") : Lampa.Lang.translate("title_watched")
        });
      }, function (a) {
        a({
          results: f,
          title: Lampa.Lang.translate("title_recomend_watch")
        });
      }];
      function i(a, b) {
        Lampa.Api.partNext(h, g, a, b);
      }
      O({}, function () {
        var d = ["семейный", "детский", "короткометражка", "мультфильм", "аниме"];
        d.forEach(function (b) {
          var c = l[b];
          if (c) {
            h.push(function (d) {
              E("api/v2.2/films?order=NUM_VOTE&genres=" + c + "&type=" + (a.url == "tv" ? "TV_SERIES" : "FILM"), a, function (a) {
                a.title = Lampa.Utils.capitalizeFirstLetter(b);
                d(a);
              }, d);
            });
          }
        });
        k.forEach(function (b) {
          if (!b.hide && !b.separator && d.indexOf(b.title) == -1) {
            h.push(function (c) {
              E("api/v2.2/films?order=NUM_VOTE&genres=" + b.id + "&type=" + (a.url == "tv" ? "TV_SERIES" : "FILM"), a, function (a) {
                a.title = Lampa.Utils.capitalizeFirstLetter(b.title);
                c(a);
              }, c);
            });
          }
        });
        i(b, c);
      });
      return i;
    }
    function J() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var b = arguments.length > 1 ? arguments[1] : undefined;
      var c = arguments.length > 2 ? arguments[2] : undefined;
      if (a.card && a.card.source === p && a.card.kinopoisk_id) {
        G(a.card.kinopoisk_id, a, function (a) {
          var c = new Lampa.Status(4);
          c.onComplite = b;
          c.append("movie", a);
          c.append("persons", a && a.persons);
          c.append("collection", a && a.collection);
          c.append("simular", a && a.simular);
        }, c);
      } else {
        c();
      }
    }
    function K() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var b = arguments.length > 1 ? arguments[1] : undefined;
      var c = arguments.length > 2 ? arguments[2] : undefined;
      var d = a.url;
      if (d === "" && a.genres) {
        d = "api/v2.2/films?order=NUM_VOTE&genres=" + a.genres;
      }
      E(d, a, b, c);
    }
    function L() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var b = arguments.length > 1 ? arguments[1] : undefined;
      var c = decodeURIComponent(a.query || "");
      var d = new Lampa.Status(1);
      d.onComplite = function (a) {
        var d = [];
        if (a.query && a.query.results) {
          var e = a.query.results.filter(function (a) {
            return D(a.title, c) || D(a.original_title, c);
          });
          if (e.length && e.length !== a.query.results.length) {
            a.query.results = e;
            a.query.more = true;
          }
          var f = Object.assign({}, a.query);
          f.results = a.query.results.filter(function (a) {
            return a.type === "movie";
          });
          f.title = Lampa.Lang.translate("menu_movies");
          f.type = "movie";
          if (f.results.length) {
            d.push(f);
          }
          var g = Object.assign({}, a.query);
          g.results = a.query.results.filter(function (a) {
            return a.type === "tv";
          });
          g.title = Lampa.Lang.translate("menu_tv");
          g.type = "tv";
          if (g.results.length) {
            d.push(g);
          }
        }
        b(d);
      };
      E("api/v2.1/films/search-by-keyword", a, function (a) {
        d.append("query", a);
      }, d.error.bind(d));
    }
    function M() {
      var a = {
        source: p
      };
      var b = {
        align_left: true,
        object: a
      };
      return {
        title: q,
        search: L,
        params: b,
        onMore: function b(a) {
          Lampa.Activity.push({
            url: "api/v2.1/films/search-by-keyword",
            title: Lampa.Lang.translate("search") + " - " + a.query,
            component: "category_full",
            page: 1,
            query: encodeURIComponent(a.query),
            source: p
          });
        },
        onCancel: f.clear.bind(f)
      };
    }
    function N() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var b = arguments.length > 1 ? arguments[1] : undefined;
      var c = new Lampa.Status(1);
      c.onComplite = function (a) {
        var c = {};
        if (a.query) {
          var d = a.query;
          c.person = {
            id: d.personId,
            name: d.nameRu || d.nameEn || "",
            url: "",
            img: d.posterUrl || "",
            gender: d.sex === "MALE" ? 2 : d.sex === "FEMALE" ? 1 : 0,
            birthday: d.birthday,
            place_of_birth: d.birthplace,
            deathday: d.death,
            place_of_death: d.deathplace,
            known_for_department: d.profession || "",
            biography: (d.facts || []).join(" ")
          };
          var e = [];
          var f = {};
          var g = [];
          var h = {};
          if (d.films) {
            d.films.forEach(function (a) {
              if (a.professionKey === "DIRECTOR" && !f[a.filmId]) {
                f[a.filmId] = true;
                e.push(y(a));
              } else if (a.professionKey === "ACTOR" && !h[a.filmId]) {
                h[a.filmId] = true;
                g.push(y(a));
              }
            });
          }
          var i = [];
          if (e.length) {
            e.sort(function (a, b) {
              var c = b.vote_average - a.vote_average;
              if (c) {
                return c;
              }
              return a.id - b.id;
            });
            i.push({
              name: Lampa.Lang.translate("title_producer"),
              credits: e
            });
          }
          if (g.length) {
            g.sort(function (a, b) {
              var c = b.vote_average - a.vote_average;
              if (c) {
                return c;
              }
              return a.id - b.id;
            });
            i.push({
              name: Lampa.Lang.translate(d.sex === "FEMALE" ? "title_actress" : "title_actor"),
              credits: g
            });
          }
          var j = {
            knownFor: i
          };
          c.credits = j;
        }
        b(c);
      };
      var d = "api/v1/staff/" + a.id;
      w(d, function (a, b) {
        if (!b && a.personId) {
          v(d, a);
        }
        c.append("query", a);
      }, c.error.bind(c));
    }
    function O() {
      var a = arguments.length > 1 ? arguments[1] : undefined;
      if (k.length) {
        a(k);
      } else {
        r("api/v2.2/films/filters", function (b) {
          if (b.genres) {
            b.genres.forEach(function (a) {
              k.push({
                id: a.id,
                title: a.genre,
                url: "",
                hide: a.genre === "для взрослых",
                separator: !a.genre
              });
              l[a.genre] = a.id;
            });
          }
          if (b.countries) {
            b.countries.forEach(function (a) {
              m[a.country] = a.id;
            });
          }
          a(k);
        }, function () {
          a([]);
        });
      }
    }
    function P(a, b) {
      b([]);
    }
    function Q(a, b, c) {
      var d = new Lampa.Status(b.length);
      d.onComplite = c;
      b.forEach(function (b) {
        var c = a.seasons || [];
        c = c.filter(function (a) {
          return a.season_number === b;
        });
        if (c.length) {
          d.append("" + b, c[0]);
        } else {
          d.error();
        }
      });
    }
    var R = {
      SOURCE_NAME: p,
      SOURCE_TITLE: q,
      main: H,
      menu: O,
      full: J,
      list: K,
      category: I,
      clear: x,
      person: N,
      seasons: Q,
      menuCategory: P,
      discovery: M
    };
    var S = R;
    var T = {
      name: S.SOURCE_NAME,
      title: S.SOURCE_TITLE
    };
    var U = [{
      name: "tmdb",
      title: "TMDB"
    }, {
      name: "cub",
      title: "CUB"
    }, {
      name: "pub",
      title: "PUB"
    }, {
      name: "filmix",
      title: "FILMIX"
    }, T];
    function V() {
      window.kp_source_plugin = true;
      function a() {
        if (Lampa.Api.sources[S.SOURCE_NAME]) {
          Lampa.Noty.show("Установлен плагин несовместимый с kp_source");
          return;
        }
        Lampa.Api.sources[S.SOURCE_NAME] = S;
        Object.defineProperty(Lampa.Api.sources, S.SOURCE_NAME, {
          get: function a() {
            return S;
          }
        });
        var a;
        if (Lampa.Params.values && Lampa.Params.values.source) {
          a = Object.assign({}, Lampa.Params.values.source);
          a[S.SOURCE_NAME] = S.SOURCE_TITLE;
        } else {
          a = {};
          U.forEach(function (b) {
            if (Lampa.Api.sources[b.name]) {
              a[b.name] = b.title;
            }
          });
        }
        Lampa.Params.select("source", a, "tmdb");
      }
      if (window.appready) {
        a();
      } else {
        Lampa.Listener.follow("app", function (b) {
          if (b.type == "ready") {
            a();
          }
        });
      }
    }
    if (!window.kp_source_plugin) {
      V();
    }
    var W = function a() {
      if (window.location.protocol == "https:") {
        return "https://";
      } else {
        return "http://";
      }
    };
    var X = "";
    var Y;
    var Z;
    var k = [];
    var _ = "";
    console.log("App", "protocol:", W());
    var aa = {
      init: function () {
        this.sources();
        if (!window.FX) {
          var a = {
            max_qualitie: 720,
            is_max_qualitie: true,
            auth: false
          };
          window.FX = a;
        }
      },
      sources: function () {
        var a;
        if (Lampa.Params.values && Lampa.Params.values.source) {
          a = Object.assign({}, Lampa.Params.values.source);
          a.filmix = "FILMIX";
        } else {
          a = {
            tmdb: "TMDB",
            cub: "CUB",
            filmix: "FILMIX"
          };
        }
        Lampa.Params.select("source", a, "tmdb");
      },
      setCache: function (a, b) {
        var c = new Date().getTime();
        var d = Lampa.Storage.cache(a, 1, {});
        if (!d[a]) {
          d[a] = b;
          Lampa.Storage.set(a, d);
        } else if (c - d[a].timestamp > this.CACHE_TIME) {
          b.timestamp = c;
          d[a] = b;
          Lampa.Storage.set(a, d);
        } else {
          b = d[a];
        }
        return b;
      }
    };
    var ba = {
      network: new Lampa.Reguest(),
      api_url: "http://filmixapp.cyou/api/v2/",
      token: Lampa.Storage.get("filmix_token", ""),
      user_dev: "app_lang=ru_RU&user_dev_apk=2.1.2&user_dev_id=" + Lampa.Utils.uid(16) + "&user_dev_name=Xiaomi&user_dev_os=11&user_dev_vendor=Xiaomi&user_dev_token=",
      add_new: function () {
        var a = "";
        var b = "";
        var c = $("<div><div class=\"broadcast__text\">" + Lampa.Lang.translate("filmix_modal_text") + "</div><div class=\"broadcast__device selector\" style=\"text-align: center\">Ожидаем код...</div><br><div class=\"broadcast__scan\"><div></div></div></div></div>");
        Lampa.Modal.open({
          title: "",
          html: c,
          onBack: function a() {
            Lampa.Modal.close();
            Lampa.Controller.toggle("settings_component");
            clearInterval(ping_auth);
          },
          onSelect: function b() {
            Lampa.Utils.copyTextToClipboard(a, function () {
              Lampa.Noty.show(Lampa.Lang.translate("filmix_copy_secuses"));
            }, function () {
              Lampa.Noty.show(Lampa.Lang.translate("filmix_copy_fail"));
            });
          }
        });
        ping_auth = // TOLOOK
        setInterval(function () {
          ba.checkPro(b, function (a) {
            if (a && a.user_data) {
              Lampa.Modal.close();
              clearInterval(ping_auth);
              Lampa.Storage.set("filmix_token", b);
              ba.token = b;
              $("[data-name=\"filmix_token\"] .settings-param__value").text(b);
              Lampa.Controller.toggle("settings_component");
            }
          });
        }, 2000);
        this.network.clear();
        this.network.timeout(10000);
        this.network.quiet(this.api_url + "token_request?" + this.user_dev, function (d) {
          if (d.status == "ok") {
            b = d.code;
            a = d.user_code;
            c.find(".selector").text(a);
          } else {
            Lampa.Noty.show(d);
          }
        }, function (a, b) {
          Lampa.Noty.show(ba.network.errorDecode(a, b));
        });
      }
    };
    var ca = {
      network: new Lampa.Reguest()
    };
    var da = false;
    var ea;
    var fa = {};
    function ga(a) {
      var b = new Lampa.Reguest();
      var c = {
        mask: true,
        over: true,
        step: 250
      };
      var d = new Lampa.Scroll(c);
      var e = [];
      var f = $("<div></div>");
      var g = $("<div class=\"category-full\"></div>");
      var h = a.sour == "rezka" || a.sourc == "rezka" ? Lampa.Utils.protocol() + "prox.lampa.stream/" : a.sour == "filmix" || a.sourc == "filmix" ? "http://corsanywhere.herokuapp.com/" : "";
      var i = Lampa.Storage.cache("my_col", 5000, {});
      var j;
      var k;
      var l = false;
      var m = [];
      var n;
      var o = this;
      this.create = function () {
        var c = this;
        var d;
        a.sourc = a.sourc || "pub";
        if (a.sourc == "my_coll") {
          var e = {
            card: i
          };
          c.build(e);
        } else {
          if (a.card && isNaN(a.id)) {
            d = a.id;
          } else {
            d = a.url + (a.sourc == "pub" ? "?sort=" + (a.sort ? a.sort : "views-") + "&access_token=" + ca.token : "?filter=last");
          }
          this.activity.loader(true);
          b.silent(h + d, function (b) {
            var d = c.card(b);
            c.build(d);
            if (a.card) {
              $(".head__title").append(" - " + d.card.length);
            }
          }, function (a, d) {
            c.empty(b.errorDecode(a, d));
          }, false, {
            dataType: "text"
          });
        }
        return this.render();
      };
      this.append = function (b, c) {
        var f = this;
        var h = Lampa.Arrays.isArray(b.card) ? b.card : Lampa.Arrays.getValues(b.card).reverse();
        h.forEach(function (h) {
          var j = new Lampa.Card(h, {
            card_category: a.sourc == "pub" || a.sourc == "filmix" || !a.card_cat || a.cards ? true : false,
            card_collection: a.sourc == "pub" || a.sourc == "filmix" || !a.card_cat || a.cards ? false : true,
            object: a
          });
          j.create();
          if (a.category && (h.watch || h.quantity)) {
            j.render().find(".card__view").append("<div style=\"background-color: rgba(0,0,0, 0.7);padding:.5em;position:absolute;border-radius:.3em;right:3;bottom:3\">" + (h.watch || h.quantity) + "</div>");
          }
          j.onFocus = function (a, c) {
            k = a;
            d.update(j.render(), true);
            Lampa.Background.change(c.img);
            if (d.isEnd()) {
              f.next(b.page);
            }
            if (!Lampa.Platform.tv() || !Lampa.Storage.field("light_version")) {
              var g = Math.ceil(e.length / 7) - 1;
            }
          };
          j.onEnter = function (b, c) {
            k = b;
            if (a.sour == "rezka" || a.sour == "filmix" || Lampa.Storage.field("light_version") && !a.cards && !a.card_cat || a.cards) {
              Lampa.Api.search({
                query: encodeURIComponent(h.title_org)
              }, function (a) {
                var b = f.finds(h, a);
                if (b) {
                  var c = {
                    url: "",
                    component: "full",
                    id: b.id,
                    method: b.name ? "tv" : "movie",
                    card: b
                  };
                  Lampa.Activity.push(c);
                } else {
                  Lampa.Noty.show(Lampa.Lang.translate("nofind_movie"));
                  Lampa.Controller.toggle("content");
                }
              }, function () {
                Lampa.Noty.show(Lampa.Lang.translate("nofind_movie"));
                Lampa.Controller.toggle("content");
              });
            } else if (a.sourc == "pub" || a.sourc == "my_coll") {
              Lampa.Activity.push({
                title: h.title,
                url: a.url + "/view?id=" + (a.sourc == "my_coll" ? h.id : h.url) + "&access_token=" + ca.token,
                sourc: "pub",
                sour: h.source,
                source: "pub",
                id: h.url,
                card: h,
                card_cat: true,
                component: !a.category ? "full" : "collection",
                page: 1
              });
            } else {
              var d = {
                title: h.title,
                url: h.url,
                component: "collection",
                cards: true,
                sourc: a.sourc,
                source: a.source,
                page: 1
              };
              Lampa.Activity.push(d);
            }
          };
          j.onMenu = function (b, c) {
            var d = this;
            var e = Lampa.Controller.enabled().name;
            var g = Lampa.Favorite.check(c);
            var h = [];
            if (a.category) {
              h.push({
                title: i["id_" + c.id] ? Lampa.Lang.translate("card_my_clear") : Lampa.Lang.translate("card_my_add"),
                subtitle: Lampa.Lang.translate("card_my_descr"),
                where: "book"
              });
            } else {
              h.push({
                title: g.book ? Lampa.Lang.translate("card_book_remove") : Lampa.Lang.translate("card_book_add"),
                subtitle: Lampa.Lang.translate("card_book_descr"),
                where: "book"
              }, {
                title: g.like ? Lampa.Lang.translate("card_like_remove") : Lampa.Lang.translate("card_like_add"),
                subtitle: Lampa.Lang.translate("card_like_descr"),
                where: "like"
              }, {
                title: g.wath ? Lampa.Lang.translate("card_wath_remove") : Lampa.Lang.translate("card_wath_add"),
                subtitle: Lampa.Lang.translate("card_wath_descr"),
                where: "wath"
              }, {
                title: g.history ? Lampa.Lang.translate("card_history_remove") : Lampa.Lang.translate("card_history_add"),
                subtitle: Lampa.Lang.translate("card_history_descr"),
                where: "history"
              });
            }
            Lampa.Select.show({
              title: Lampa.Lang.translate("title_action"),
              items: h,
              onBack: function a() {
                Lampa.Controller.toggle(e);
              },
              onSelect: function g(b) {
                if (b.where == "clear") {
                  Lampa.Storage.set("my_col", "");
                  var h = {
                    url: a.url,
                    sourc: a.sourc,
                    source: a.source,
                    title: a.title,
                    card_cat: true,
                    category: true,
                    component: "collection",
                    page: 1
                  };
                  Lampa.Activity.push(h);
                  Lampa.Noty.show(Lampa.Lang.translate("saved_collections_clears"));
                } else if (a.category) {
                  c.source = a.sourc;
                  f.favorite(c, j.render());
                } else {
                  if (a.sour == "filmix" || a.sour == "rezka" || a.sourc == "rezka" || a.sourc == "filmix") {
                    Lampa.Api.search({
                      query: encodeURIComponent(c.title_org)
                    }, function (a) {
                      var d = f.finds(c, a);
                      if (d) {
                        d.url = (d.name ? "tv" : "movie") + "/" + d.id;
                        Lampa.Favorite.toggle(b.where, d);
                      } else {
                        Lampa.Noty.show(Lampa.Lang.translate("nofind_movie"));
                        Lampa.Controller.toggle("content");
                      }
                    }, function () {
                      Lampa.Noty.show(Lampa.Lang.translate("nofind_movie"));
                      Lampa.Controller.toggle("content");
                    });
                  } else {
                    c.source = a.source;
                    Lampa.Favorite.toggle(b.where, c);
                  }
                  d.favorite();
                }
                Lampa.Controller.toggle(e);
              }
            });
          };
          j.visible();
          g.append(j.render());
          if (i["id_" + h.id]) {
            f.addicon("book", j.render());
          }
          if (c) {
            Lampa.Controller.collectionAppend(j.render());
          }
          e.push(j);
        });
      };
      this.addicon = function (a, b) {
        b.find(".card__icons-inner").append("<div class=\"card__icon icon--" + a + "\"></div>");
      };
      this.favorite = function (b, c) {
        var d = this;
        if (!i["id_" + b.id]) {
          i["id_" + b.id] = b;
          Lampa.Storage.set("my_col", i);
        } else {
          delete i["id_" + b.id];
          Lampa.Storage.set("my_col", i);
          var e = {
            url: a.url,
            sourc: a.sourc,
            source: a.source,
            title: a.title,
            card_cat: true,
            category: true,
            component: "collection",
            page: 1
          };
          Lampa.Activity.push(e);
        }
        c.find(".card__icon").remove();
        if (i["id_" + b.id]) {
          d.addicon("book", c);
        }
      };
      this.build = function (b) {
        var c = this;
        if (b.card.length || Lampa.Arrays.getKeys(b.card).length) {
          d.render().addClass("layer--wheight").data("mheight", j);
          if (a.sourc == "pub" && a.category) {
            f.append(j);
          }
          f.append(d.render());
          d.onEnd = function () {
            c.next(b.page);
          };
          this.append(b);
          d.append(g);
          this.activity.loader(false);
          this.activity.toggle();
        } else {
          f.append(d.render());
          this.empty(a.search ? Lampa.Lang.translate("online_query_start") + " (" + a.search + ") " + Lampa.Lang.translate("online_query_end") : "");
        }
      };
      this.empty = function (a) {
        var b = a == undefined ? new Lampa.Empty() : new Lampa.Empty({
          title: "",
          descr: a
        });
        f.append(b.render());
        o.start = b.start;
        o.activity.loader(false);
        o.activity.toggle();
      };
      this.more = function (c) {
        var e = this;
        Lampa.Controller.collectionFocus(k || false, d.render());
        var f = Lampa.Arrays.clone(a);
        if (c.total_pages == 0 || c.total_pages == undefined) {
          more.remove();
          return;
        }
        b.clear();
        b.timeout(20000);
        var i;
        if (a.sourc == "pub") {
          i = a.url + "?page=" + c.page + "&sort=" + (a.sort ? a.sort : "views-") + "&access_token=" + ca.token;
        } else {
          i = c.page;
        }
        b.silent(h + i, function (b) {
          var c = e.card(b);
          f.data = c;
          if (a.cards) {
            f.cards = false;
          }
          delete f.activity;
          f.page++;
          if (c.card.length == 0) {
            more.remove();
          } else {
            Lampa.Activity.push(f);
          }
        }, function (a, c) {
          Lampa.Noty.show(b.errorDecode(a, c));
        }, false, {
          dataType: "text"
        });
        g.append(more);
      };
      this.back = function () {
        k = e[0].render()[0];
        var b = $("<div class=\"selector\" style=\"width: 100%; height: 5px\"></div>");
        b.on("hover:focus", function (b) {
          if (a.page > 1) {
            Lampa.Activity.backward();
          } else {
            Lampa.Controller.toggle("head");
          }
        });
        g.prepend(b);
      };
      this.card = function (b) {
        var c = [];
        var d;
        if (a.sourc != "pub") {
          b = b.replace(/\n/g, "");
        } else if (a.card && a.card.source == "filmix" || a.sourc == "filmix") {
          var e = $(".playlist-articles", b);
          var b = e.length ? e.html() : $(".m-list-movie", b).html();
          $(b).each(function (a, b) {
            if (b.tagName == "DIV") {
              d = $(b).find(".next").attr("href");
              n = $(b).find("a:last-child").length;
            }
            if (b.tagName == "ARTICLE") {
              c.push({
                id: $("a", b).attr("href").split("-")[0].split("/").pop(),
                title: $(".m-movie-title", b).text() || $(".poster", b).attr("alt") && $(".poster", b).attr("alt").split(",").shift(),
                title_org: $(".m-movie-original", b).text() || $(".origin-name", b).text(),
                url: $("a", b).attr("href"),
                img: $("img", b).attr("src"),
                quantity: $(".m-movie-quantity", b).text() || $(".count", b).text(),
                year: $(".grid-item", b).text() || $(".poster", b).attr("alt") && $(".poster", b).attr("alt").split(",").pop()
              });
            }
          });
        } else if (a.card && a.card.source == "pub" || a.sourc == "pub") {
          b = JSON.parse(b);
          if (b.pagination) {
            n = b.pagination.total + 1;
            d = b.pagination.current + 1;
          }
          if (b.items) {
            b.items.forEach(function (a) {
              c.push({
                url: a.id,
                id: a.id,
                title: a.title.split("/")[0],
                original_title: a.title.split("/")[1] || a.title,
                release_date: a.year ? a.year + "" : a.years ? a.years[0] + "" : "0000",
                first_air_date: a.type && (a.type.match("serial|docuserial|tvshow") ? "tv" : "") || "",
                vote_average: a.imdb_rating || 0,
                img: a.posters.big,
                year: a.year,
                years: a.years
              });
            });
          }
        }
        var f = {
          card: c,
          page: d,
          total_pages: n
        };
        return f;
      };
      this.finds = function (a, b) {
        var c;
        var d = function d(b) {
          for (var e = 0; e < b.length; e++) {
            var f = b[e];
            if ((a.title_org == (f.original_title || f.original_name) || a.title == (f.title || f.name)) && (f.first_air_date || f.release_date) && parseInt(a.year) == (f.first_air_date || f.release_date).split("-").shift()) {
              c = f;
              break;
            }
          }
        };
        if (b.movie && b.movie.results.length) {
          d(b.movie.results);
        }
        if (b.tv && b.tv.results.length && !c) {
          d(b.tv.results);
        }
        return c;
      };
      this.start = function () {
        Lampa.Controller.add("content", {
          toggle: function a() {
            Lampa.Controller.collectionSet(d.render(), j);
            Lampa.Controller.collectionFocus(k || false, d.render());
          },
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
          back: function a() {
            Lampa.Activity.backward();
          }
        });
        Lampa.Controller.toggle("content");
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
        f.remove();
        g.remove();
        b = null;
        e = null;
        f = null;
        g = null;
        j = null;
      };
    }
    function ha() {
      window.plugin_lmp = true;
      Z = {};
      Lampa.Manifest.plugins = Z;
      if (!Lampa.Lang) {
        var a = {};
        Lampa.Lang = {
          add: function (b) {
            a = b;
          },
          translate: function (b) {
            if (a[b]) {
              return a[b].ru;
            } else {
              return b;
            }
          }
        };
      }
      Lampa.Lang.add({
        pub_sort_views: {
          ru: "По просмотрам"
        },
        pub_sort_watchers: {
          ru: "По подпискам"
        },
        pub_sort_updated: {
          ru: "По обновлению"
        },
        pub_sort_created: {
          ru: "По дате добавления"
        },
        pub_search_coll: {
          ru: "Поиск по подборкам"
        },
        pub_title_all: {
          ru: "Все"
        },
        pub_title_popular: {
          ru: "Популярные"
        },
        pub_title_new: {
          ru: "Новые"
        },
        pub_title_hot: {
          ru: "Горячие"
        },
        pub_title_fresh: {
          ru: "Свежие"
        },
        pub_title_rating: {
          ru: "Рейтинговые"
        },
        pub_title_allingenre: {
          ru: "Всё в жанре"
        },
        pub_title_popularfilm: {
          ru: "Популярные фильмы"
        },
        pub_title_popularserial: {
          ru: "Популярные сериалы"
        },
        pub_title_newfilm: {
          ru: "Новые фильмы"
        },
        pub_title_newserial: {
          ru: "Новые сериалы"
        },
        pub_title_newconcert: {
          ru: "Новые концерты"
        },
        pub_title_newdocfilm: {
          ru: "Новые док. фильмы"
        },
        pub_title_newdocserial: {
          ru: "Новые док. сериалы"
        },
        pub_title_newtvshow: {
          ru: "Новое ТВ шоу"
        }
      });
      function b() {
        aa.init();
      }
      if (window.appready) {
        b();
      } else {
        Lampa.Listener.follow("app", function (a) {
          if (a.type == "ready") {
            b();
          }
        });
      }
      function c(a) {
        var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        a = a == "undefined" ? "" : a;
        if (b.genres) {
          a = "catalog" + d(a, "orderby=date&orderdir=desc&filter=s996-" + b.genres.replace("f", "g"));
        }
        if (b.page) {
          a = d(a, "page=" + b.page);
        }
        if (b.query) {
          a = d(a, "story=" + b.query);
        }
        if (b.type) {
          a = d(a, "type=" + b.type);
        }
        if (b.field) {
          a = d(a, "field=" + b.field);
        }
        if (b.perpage) {
          a = d(a, "perpage=" + b.perpage);
        }
        a = d(a, ba.user_dev + Lampa.Storage.get("filmix_token", "aaaabbbbccccddddeeeeffffaaaabbbb"));
        if (b.filter) {
          for (var c in b.filter) {
            a = d(a, c + "=" + b.filter[c]);
          }
        }
        return ba.api_url + a;
      }
      function d(a, b) {
        return a + (/\?/.test(a) ? "&" : "?") + b;
      }
      function e(a, b) {
        var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var e = arguments.length > 2 ? arguments[2] : undefined;
        var f = arguments.length > 3 ? arguments[3] : undefined;
        var g = c(a, d);
        ba.network.native(g, function (b) {
          b.url = a;
          e(b);
        }, f);
      }
      function f(a, b) {
        return {
          url: "",
          id: a.id,
          type: b || (a.serial_stats && a.serial_stats.post_id || a.last_episode && a.last_episode.post_id ? "tv" : "movie"),
          source: "filmix",
          quality: a.quality && a.quality.split(" ").shift() || "",
          title: a.title,
          original_title: a.original_title || a.title,
          release_date: a.year || a.date && a.date.split(" ")[2] || "0000",
          first_air_date: b == "tv" || a.serial_stats && a.serial_stats.post_id || a.last_episode && a.last_episode.post_id ? a.year : "",
          img: a.poster,
          cover: a.poster,
          background_image: a.poster,
          vote_average: parseFloat(a.kp_rating || "0.0").toFixed(1),
          imdb_rating: parseFloat(a.imdb_rating || "0.0").toFixed(1),
          kp_rating: parseFloat(a.kp_rating || "0.0").toFixed(1),
          year: a.year
        };
      }
      function g(a, b, d) {
        var e = 2;
        var g = c(a.url, a);
        ba.network.native(g, function (a) {
          var c = [];
          if (a) {
            a.forEach(function (a) {
              c.push(f(a));
            });
          }
          var d = {
            results: c,
            page: e,
            total_pages: 50
          };
          b(d);
          e++;
        }, d);
      }
      function h(a, b, c) {
        var d = [{
          title: "title_now_watch",
          url: "top_views"
        }, {
          title: "title_new",
          url: "catalog?orderby=date&orderdir=desc"
        }, {
          title: "title_new_this_year",
          url: "catalog?orderby=year&orderdir=desc"
        }, {
          title: "pub_title_newfilm",
          url: "catalog?orderby=date&orderdir=desc&filter=s0"
        }, {
          title: "4K",
          url: "catalog?orderby=date&orderdir=desc&filter=s0-q4"
        }, {
          title: "pub_title_popularfilm",
          url: "popular"
        }, {
          title: "pub_title_popularserial",
          url: "popular?section=7"
        }, {
          title: "title_in_top",
          url: "catalog?orderby=rating&orderdir=desc"
        }];
        var g = new Lampa.Status(Lampa.Arrays.getKeys(d).length);
        g.onComplite = function () {
          var a = [];
          var e = g.data;
          d.forEach(function (b) {
            if (g.data[b.title] && g.data[b.title].results.length) {
              a.push(g.data[b.title]);
            }
          });
          if (a.length) {
            b(a);
          } else {
            c();
          }
        };
        var h = function d(a, b, c) {
          c.title = a;
          var e = [];
          c.forEach(function (a) {
            e.push(f(a));
          });
          c.results = e;
          g.append(b, c);
        };
        d.forEach(function (b) {
          e(b.url, a, function (a) {
            h(Lampa.Lang.translate(b.title), b.title, a);
          }, g.error.bind(g));
        });
      }
      function i(a, b, c) {
        var d = Lampa.Favorite.continues(a.url);
        var g = a.url == "tv" ? 7 : 0;
        var h = [{
          title: "title_new_this_year",
          url: "catalog?orderby=year&orderdir=desc&filter=s" + g
        }, {
          title: "title_new",
          url: "catalog?orderby=date&orderdir=desc&filter=s" + g
        }, {
          title: "title_popular",
          url: "popular?section=" + g
        }, {
          title: "title_in_top",
          url: "catalog?orderby=rating&orderdir=desc&filter=s" + g
        }];
        var i = new Lampa.Status(Lampa.Arrays.getKeys(h).length);
        i.onComplite = function () {
          var e = [];
          var f = i.data;
          if (d.length) {
            e.push({
              results: d,
              title: a.url == "tv" ? Lampa.Lang.translate("title_continue") : Lampa.Lang.translate("title_watched")
            });
          }
          h.forEach(function (a) {
            if (f[a.title] && f[a.title].results.length) {
              e.push(f[a.title]);
            }
          });
          if (e.length) {
            b(e);
          } else {
            c();
          }
        };
        var j = function e(b, c, d) {
          d.title = b;
          var g = [];
          d.forEach(function (b) {
            g.push(f(b, a.url));
          });
          d.results = g;
          i.append(c, d);
        };
        h.forEach(function (b) {
          e(b.url, a, function (a) {
            j(Lampa.Lang.translate(b.title), b.title, a);
          }, i.error.bind(i));
        });
      }
      function j(a, b, c) {
        var d = new Lampa.Status(5);
        d.onComplite = b;
        var g = "post/" + a.id;
        e(g, a, function (b) {
          b.source = "filmix";
          var h = {};
          var i = b;
          var j = [];
          if (b.relates) {
            for (var k in b.relates) {
              var l = b.relates[k];
              j.push(f(l));
            }
            var m = {
              results: j
            };
            d.append("simular", m);
          }
          h.movie = {
            id: i.id,
            url: g,
            type: Lampa.Arrays.getValues(i.player_links.playlist).length ? "tv" : "movie",
            source: "filmix",
            title: i.title,
            original_title: i.original_title,
            name: Lampa.Arrays.getValues(i.player_links.playlist).length ? i.title : "",
            original_name: Lampa.Arrays.getValues(i.player_links.playlist).length ? i.original_title : "",
            overview: i.short_story.replace(/\[n|r|t]/g, ""),
            img: i.poster,
            runtime: i.duration || 0,
            genres: s(i),
            vote_average: parseFloat(i.imdb_rating || i.kp_rating || "0"),
            production_companies: [],
            production_countries: t(i.countries),
            budget: i.budget || 0,
            release_date: i.year || i.date.split(" ")[2] || "0000",
            seasons: Lampa.Arrays.getValues(i.player_links.playlist).filter(function (a) {
              a.episode_count = 1;
              return a;
            }),
            quality: i.rip && i.rip.split(" ").shift() || "",
            number_of_seasons: Lampa.Arrays.getValues(i.player_links.playlist).length || "",
            number_of_episodes: i.last_episode && i.last_episode.episode || "",
            first_air_date: Lampa.Arrays.getValues(i.player_links.playlist).length ? i.year || i.date_atom || "0000" : "",
            background_image: i.poster,
            imdb_rating: parseFloat(i.imdb_rating || "0.0").toFixed(1),
            kp_rating: parseFloat(i.kp_rating || "0.0").toFixed(1)
          };
          e("comments/" + i.id, a, function (a) {
            var b = [];
            if (a) {
              a.forEach(function (a) {
                a.text = a.text.replace(/\[n|r|t]/g, "");
                a.like_count = "";
                b.push(a);
              });
              d.append("comments", b);
              $(".full-review__footer", Lampa.Activity.active().activity.render()).hide();
            }
          }, c);
          d.append("persons", r(b));
          d.append("movie", h.movie);
          d.append("videos", q(i.player_links));
        }, c);
      }
      function l(a, b) {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var b = arguments.length > 1 ? arguments[1] : undefined;
        if (k.length) {
          b(k);
        } else {
          var d = c("filter_list", a);
          var e = c("category_list", a);
          ba.network.native(e, function (a) {
            Lampa.Arrays.getKeys(a).forEach(function (b) {
              var c = {
                title: a[b],
                id: b
              };
              k.push(c);
            });
            console.log(k);
            b(k);
          });
        }
      }
      function m(a, b, c) {
        Lampa.Api.sources.tmdb.seasons(a, b, c);
      }
      function n(a) {
        var b = [{
          name: "января",
          number: "01"
        }, {
          name: "февраля",
          number: "02"
        }, {
          name: "марта",
          number: "03"
        }, {
          name: "апреля",
          number: "04"
        }, {
          name: "мая",
          number: "05"
        }, {
          name: "июня",
          number: "06"
        }, {
          name: "июля",
          number: "07"
        }, {
          name: "августа",
          number: "08"
        }, {
          name: "сентября",
          number: "09"
        }, {
          name: "октября",
          number: "10"
        }, {
          name: "ноября",
          number: "11"
        }, {
          name: "декабря",
          number: "12"
        }];
        var c = a.split(" ");
        var d = c[0];
        var e = c[1];
        var f = c[2];
        var g;
        for (var h = 0; h < b.length; h++) {
          if (b[h].name === e) {
            g = b[h].number;
            break;
          }
        }
        var i = f + "-" + g + "-" + d;
        return i;
      }
      function o(a, b, d) {
        var e = c("person/" + a.id, a);
        ba.network.native(e, function (c, d) {
          var e = {};
          if (c) {
            e.person = {
              id: a.id,
              name: c.name,
              biography: c.about,
              img: c.poster,
              place_of_birth: c.birth_place,
              birthday: n(c.birth)
            };
            var g = [];
            for (var h in c.movies) {
              var i = c.movies[h];
              g.push(f(i));
            }
            var j = {
              movie: g,
              knownFor: [{
                name: c.career,
                credits: g
              }]
            };
            e.credits = j;
          }
          b(e);
        }, d);
      }
      function p() {
        ba.network.clear();
      }
      function q(a) {
        var b = [];
        if (a.trailer.length) {
          a.trailer.forEach(function (a) {
            var c = a.link.match(/\[(.*?)\]/);
            c = c[1].split(",").filter(function (a) {
              if (a === "") {
                return false;
              }
              return true;
            }).sort(function (a, b) {
              return b - a;
            }).map(function (c) {
              b.push({
                name: a.translation + " " + c + "p",
                url: a.link.replace(/\[(.*?)\]/, c),
                player: true
              });
            });
          });
        }
        if (b.length) {
          return {
            results: b
          };
        } else {
          return false;
        }
      }
      function r(a) {
        var b = [];
        if (a.actors) {
          a.found_actors.filter(function (a) {
            b.push({
              name: a.name,
              id: a.id,
              character: Lampa.Lang.translate("title_actor")
            });
          });
        }
        if (b.length) {
          return {
            cast: b
          };
        } else {
          return false;
        }
      }
      function s(a) {
        var b = [];
        var d = c("category_list");
        ba.network.native(d, function (c) {
          a.categories.forEach(function (a, d) {
            if (a) {
              var e = Object.entries(c).find(function (b) {
                return b[1] == a;
              });
              var f = {
                id: e && e[0] || "",
                name: a
              };
              b.push(f);
            }
          });
        });
        return b;
      }
      function t(a) {
        var b = [];
        if (a) {
          a.forEach(function (a) {
            var c = {
              name: a
            };
            b.push(c);
          });
        }
        return b;
      }
      function u() {
        var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var b = arguments.length > 1 ? arguments[1] : undefined;
        var c = new Lampa.Status(2);
        c.onComplite = function (a) {
          var c = [];
          if (a.movie && a.movie.results.length) {
            c.push(a.movie);
          }
          if (a.tv && a.tv.results.length) {
            c.push(a.tv);
          }
          b(c);
        };
        e("search", a, function (a) {
          var b = [];
          var d = [];
          if (a) {
            a.forEach(function (a) {
              a;
              if (a.last_episode && a.last_episode.season || a.serial_stats && a.serial_stats.status) {
                d.push(f(a, a.last_episode && a.last_episode.season || a.serial_stats && a.serial_stats.status ? "tv" : "movie"));
              } else {
                b.push(f(a, a.last_episode && a.last_episode.season || a.serial_stats && a.serial_stats.status ? "tv" : "movie"));
              }
            });
            var e = {
              results: b,
              page: 1,
              total_pages: 1,
              total_results: a.length,
              title: Lampa.Lang.translate("menu_movies") + " (" + b.length + ")",
              type: "movie"
            };
            c.append("movie", e);
            var g = {
              results: d,
              page: 1,
              total_pages: 1,
              total_results: a.length,
              title: Lampa.Lang.translate("menu_tv") + " (" + d.length + ")",
              type: "tv"
            };
            c.append("tv", g);
          }
        }, c.error.bind(c));
      }
      function v() {
        return {
          title: "FILMIX",
          search: u,
          params: {
            align_left: true,
            object: {
              source: "filmix"
            }
          },
          onMore: function b(a) {
            Lampa.Activity.push({
              url: "search",
              title: Lampa.Lang.translate("search") + " - " + a.query,
              component: "category_full",
              query: encodeURIComponent(a.query),
              source: "filmix"
            });
          },
          onCancel: ca.network.clear.bind(ca.network)
        };
      }
      var w = {
        main: h,
        menu: l,
        full: j,
        search: u,
        person: o,
        list: g,
        seasons: m,
        category: i,
        clear: p,
        discovery: v
      };
      var x = w;
      Lampa.Api.sources.filmix = x;
    }
    if (!window.plugin_lmp) {
      ha();
    }
  })();