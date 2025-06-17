(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    function c() {
      function c(a) {
        var b = a.card || a;
        var c = a.next_episode_to_air || a.episode || {};
        if (b.source == undefined) {
          b.source = "tmdb";
        }
        Lampa.Arrays.extend(b, {
          title: b.name,
          original_title: b.original_name,
          release_date: b.first_air_date
        });
        b.release_year = ((b.release_date || "0000") + "").slice(0, 4);
        function d(a) {
          if (a) {
            a.remove();
          }
        }
        this.build = function () {
          this.card = Lampa.Template.js("card_episode");
          this.img_poster = this.card.querySelector(".card__img") || {};
          this.img_episode = this.card.querySelector(".full-episode__img img") || {};
          this.card.querySelector(".card__title").innerText = b.title;
          this.card.querySelector(".full-episode__num").innerText = b.unwatched || "";
          if (c && c.air_date) {
            this.card.querySelector(".full-episode__name").innerText = c.name || Lang.translate("noname");
            this.card.querySelector(".full-episode__num").innerText = c.episode_number || "";
            this.card.querySelector(".full-episode__date").innerText = c.air_date ? Lampa.Utils.parseTime(c.air_date).full : "----";
          }
          if (b.release_year == "0000") {
            d(this.card.querySelector(".card__age"));
          } else {
            this.card.querySelector(".card__age").innerText = b.release_year;
          }
          this.card.addEventListener("visible", this.visible.bind(this));
        };
        this.image = function () {
          var a = this;
          this.img_poster.onload = function () {};
          this.img_poster.onerror = function () {
            a.img_poster.src = "./img/img_broken.svg";
          };
          this.img_episode.onload = function () {
            a.card.querySelector(".full-episode__img").classList.add("full-episode__img--loaded");
          };
          this.img_episode.onerror = function () {
            a.img_episode.src = "./img/img_broken.svg";
          };
        };
        this.create = function () {
          var a = this;
          this.build();
          this.card.addEventListener("hover:focus", function () {
            if (a.onFocus) {
              a.onFocus(a.card, b);
            }
          });
          this.card.addEventListener("hover:hover", function () {
            if (a.onHover) {
              a.onHover(a.card, b);
            }
          });
          this.card.addEventListener("hover:enter", function () {
            if (a.onEnter) {
              a.onEnter(a.card, b);
            }
          });
          this.image();
        };
        this.visible = function () {
          if (b.poster_path) {
            this.img_poster.src = Lampa.Api.img(b.poster_path);
          } else if (b.profile_path) {
            this.img_poster.src = Lampa.Api.img(b.profile_path);
          } else if (b.poster) {
            this.img_poster.src = b.poster;
          } else if (b.img) {
            this.img_poster.src = b.img;
          } else {
            this.img_poster.src = "./img/img_broken.svg";
          }
          if (b.still_path) {
            this.img_episode.src = Lampa.Api.img(c.still_path, "w300");
          } else if (b.backdrop_path) {
            this.img_episode.src = Lampa.Api.img(b.backdrop_path, "w300");
          } else if (c.img) {
            this.img_episode.src = c.img;
          } else if (b.img) {
            this.img_episode.src = b.img;
          } else {
            this.img_episode.src = "./img/img_broken.svg";
          }
          if (this.onVisible) {
            this.onVisible(this.card, b);
          }
        };
        this.destroy = function () {
          this.img_poster.onerror = function () {};
          this.img_poster.onload = function () {};
          this.img_episode.onerror = function () {};
          this.img_episode.onload = function () {};
          this.img_poster.src = "";
          this.img_episode.src = "";
          d(this.card);
          this.card = null;
          this.img_poster = null;
          this.img_episode = null;
        };
        this.render = function (a) {
          if (a) {
            return this.card;
          } else {
            return $(this.card);
          }
        };
      }
      function d(a) {
        this.network = new Lampa.Reguest();
        this.discovery = false;
        this.main = function () {
          var b = this;
          var d = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var e = arguments.length > 1 ? arguments[1] : undefined;
          var f = arguments.length > 2 ? arguments[2] : undefined;
          var g = [{
            id: "now_watch",
            order: parseInt(Lampa.Storage.get("number_now_watch"), 10) || 1,
            active: !Lampa.Storage.get("now_watch_remove")
          }, {
            id: "upcoming_episodes",
            order: 2,
            active: !Lampa.Storage.get("upcoming_episodes_remove")
          }, {
            id: "trend_day",
            order: parseInt(Lampa.Storage.get("number_trend_day"), 10) || 3,
            active: !Lampa.Storage.get("trend_day_remove")
          }, {
            id: "trend_day_tv",
            order: parseInt(Lampa.Storage.get("number_trend_day_tv"), 10) || 4,
            active: !Lampa.Storage.get("trend_day_tv_remove")
          }, {
            id: "trend_day_film",
            order: parseInt(Lampa.Storage.get("number_trend_day_film"), 10) || 5,
            active: !Lampa.Storage.get("trend_day_film_remove")
          }, {
            id: "trend_week",
            order: parseInt(Lampa.Storage.get("number_trend_week"), 10) || 6,
            active: !Lampa.Storage.get("trend_week_remove")
          }, {
            id: "trend_week_tv",
            order: parseInt(Lampa.Storage.get("number_trend_week_tv"), 10) || 7,
            active: !Lampa.Storage.get("trend_week_tv_remove")
          }, {
            id: "trend_week_film",
            order: parseInt(Lampa.Storage.get("number_trend_week_film"), 10) || 8,
            active: !Lampa.Storage.get("trend_week_film_remove")
          }, {
            id: "upcoming",
            order: parseInt(Lampa.Storage.get("number_upcoming"), 10) || 9,
            active: !Lampa.Storage.get("upcoming_remove")
          }, {
            id: "popular_movie",
            order: parseInt(Lampa.Storage.get("number_popular_movie"), 10) || 10,
            active: !Lampa.Storage.get("popular_movie_remove")
          }, {
            id: "popular_tv",
            order: parseInt(Lampa.Storage.get("number_popular_tv"), 10) || 11,
            active: !Lampa.Storage.get("popular_tv_remove")
          }, {
            id: "top_movie",
            order: parseInt(Lampa.Storage.get("number_top_movie"), 10) || 12,
            active: !Lampa.Storage.get("top_movie_remove")
          }, {
            id: "top_tv",
            order: parseInt(Lampa.Storage.get("number_top_tv"), 10) || 13,
            active: !Lampa.Storage.get("top_tv_remove")
          }, {
            id: "netflix",
            order: parseInt(Lampa.Storage.get("number_netflix"), 10) || 14,
            active: !Lampa.Storage.get("netflix_remove")
          }, {
            id: "apple_tv",
            order: parseInt(Lampa.Storage.get("number_apple_tv"), 10) || 15,
            active: !Lampa.Storage.get("apple_tv_remove")
          }, {
            id: "prime_video",
            order: parseInt(Lampa.Storage.get("number_prime_video"), 10) || 16,
            active: !Lampa.Storage.get("prime_video_remove")
          }, {
            id: "mgm",
            order: parseInt(Lampa.Storage.get("number_mgm"), 10) || 17,
            active: !Lampa.Storage.get("mgm_remove")
          }, {
            id: "hbo",
            order: parseInt(Lampa.Storage.get("number_hbo"), 10) || 18,
            active: !Lampa.Storage.get("hbo_remove")
          }, {
            id: "dorams",
            order: parseInt(Lampa.Storage.get("number_dorams"), 10) || 19,
            active: !Lampa.Storage.get("dorams_remove")
          }, {
            id: "tur_serials",
            order: parseInt(Lampa.Storage.get("number_tur_serials"), 10) || 20,
            active: !Lampa.Storage.get("tur_serials_remove")
          }, {
            id: "ind_films",
            order: parseInt(Lampa.Storage.get("number_ind_films"), 10) || 21,
            active: !Lampa.Storage.get("ind_films_remove")
          }, {
            id: "rus_movie",
            order: parseInt(Lampa.Storage.get("number_rus_movie"), 10) || 22,
            active: !Lampa.Storage.get("rus_movie_remove")
          }, {
            id: "rus_tv",
            order: parseInt(Lampa.Storage.get("number_rus_tv"), 10) || 23,
            active: !Lampa.Storage.get("rus_tv_remove")
          }, {
            id: "rus_mult",
            order: parseInt(Lampa.Storage.get("number_rus_mult"), 10) || 24,
            active: !Lampa.Storage.get("rus_mult_remove")
          }, {
            id: "start",
            order: parseInt(Lampa.Storage.get("number_start"), 10) || 25,
            active: !Lampa.Storage.get("start_remove")
          }, {
            id: "premier",
            order: parseInt(Lampa.Storage.get("number_premier"), 10) || 26,
            active: !Lampa.Storage.get("premier_remove")
          }, {
            id: "kion",
            order: parseInt(Lampa.Storage.get("number_kion"), 10) || 27,
            active: !Lampa.Storage.get("kion_remove")
          }, {
            id: "ivi",
            order: parseInt(Lampa.Storage.get("number_ivi"), 10) || 28,
            active: !Lampa.Storage.get("ivi_remove")
          }, {
            id: "okko",
            order: parseInt(Lampa.Storage.get("number_okko"), 10) || 29,
            active: !Lampa.Storage.get("okko_remove")
          }, {
            id: "kinopoisk",
            order: parseInt(Lampa.Storage.get("number_kinopoisk"), 10) || 30,
            active: !Lampa.Storage.get("kinopoisk_remove")
          }, {
            id: "wink",
            order: parseInt(Lampa.Storage.get("number_wink"), 10) || 31,
            active: !Lampa.Storage.get("wink_remove")
          }, {
            id: "sts",
            order: parseInt(Lampa.Storage.get("number_sts"), 10) || 32,
            active: !Lampa.Storage.get("sts_remove")
          }, {
            id: "tnt",
            order: parseInt(Lampa.Storage.get("number_tnt"), 10) || 33,
            active: !Lampa.Storage.get("tnt_remove")
          }, {
            id: "collections_inter_tv",
            order: parseInt(Lampa.Storage.get("number_collections_inter_tv"), 10) || 34,
            active: !Lampa.Storage.get("collections_inter_tv_remove")
          }, {
            id: "collections_rus_tv",
            order: parseInt(Lampa.Storage.get("number_collections_rus_tv"), 10) || 35,
            active: !Lampa.Storage.get("collections_rus_tv_remove")
          }, {
            id: "collections_inter_movie",
            order: parseInt(Lampa.Storage.get("number_collections_inter_movie"), 10) || 36,
            active: !Lampa.Storage.get("collections_inter_movie_remove")
          }, {
            id: "collections_rus_movie",
            order: parseInt(Lampa.Storage.get("number_collections_rus_movie"), 10) || 37,
            active: !Lampa.Storage.get("collections_rus_movie_remove")
          }];
          var h = [];
          function i(a) {
            for (var b = a.length - 1; b > 0; b--) {
              var c = Math.floor(Math.random() * (b + 1));
              var d = a[b];
              a[b] = a[c];
              a[c] = d;
            }
          }
          var j = [{
            start: 2023,
            end: 2025
          }, {
            start: 2020,
            end: 2022
          }, {
            start: 2017,
            end: 2019
          }, {
            start: 2014,
            end: 2016
          }, {
            start: 2011,
            end: 2013
          }];
          var k = j[Math.floor(Math.random() * j.length)];
          var l = k.start + "-01-01";
          var m = k.end + "-12-31";
          var n = j[Math.floor(Math.random() * j.length)];
          var o = n.start + "-01-01";
          var p = n.end + "-12-31";
          var q = ["vote_count.desc", "popularity.desc", "revenue.desc"];
          var r = Math.floor(Math.random() * q.length);
          var s = q[r];
          var t = ["vote_count.desc", "popularity.desc", "revenue.desc"];
          var u = Math.floor(Math.random() * t.length);
          var v = t[u];
          var w = new Date().toISOString().substr(0, 10);
          var x = new Date(w);
          x.setMonth(x.getMonth() - 1);
          var y = x.toISOString().substr(0, 10);
          function z(e, f) {
            var j = {
              now_watch: function (a) {
                b.get("movie/now_playing", d, function (b) {
                  b.title = Lampa.Lang.translate("title_now_watch");
                  if (Lampa.Storage.get("now_watch_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("now_watch_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("now_watch_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("now_watch_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              upcoming_episodes: function (a) {
                a({
                  source: "tmdb",
                  results: Lampa.TimeTable.lately().slice(0, 20),
                  title: Lampa.Lang.translate("title_upcoming_episodes"),
                  nomore: true,
                  cardClass: function d(a, b) {
                    return new c(a, b);
                  }
                });
              },
              trend_day: function (a) {
                b.get("trending/all/day", d, function (b) {
                  b.title = Lampa.Lang.translate("title_trend_day");
                  if (Lampa.Storage.get("trend_day_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("trend_day_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("trend_day_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("trend_day_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              trend_day_tv: function (a) {
                b.get("trending/tv/day", d, function (b) {
                  b.title = Lampa.Lang.translate("Сегодня в тренде (сериалы)");
                  if (Lampa.Storage.get("trend_day_tv_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("trend_day_tv_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("trend_day_tv_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("trend_day_tv_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              trend_day_film: function (a) {
                b.get("trending/movie/day", d, function (b) {
                  b.title = Lampa.Lang.translate("Сегодня в тренде (фильмы)");
                  if (Lampa.Storage.get("trend_day_film_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("trend_day_film_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("trend_day_film_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("trend_day_film_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              trend_week: function (a) {
                b.get("trending/all/week", d, function (b) {
                  b.title = Lampa.Lang.translate("title_trend_week");
                  if (Lampa.Storage.get("trend_week_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("trend_week_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("trend_week_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("trend_week_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              trend_week_tv: function (a) {
                b.get("trending/tv/week", d, function (b) {
                  b.title = Lampa.Lang.translate("В тренде за неделю (сериалы)");
                  if (Lampa.Storage.get("trend_week_tv_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("trend_week_tv_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("trend_week_tv_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("trend_week_tv_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              trend_week_film: function (a) {
                b.get("trending/movie/week", d, function (b) {
                  b.title = Lampa.Lang.translate("В тренде за неделю (фильмы)");
                  if (Lampa.Storage.get("trend_week_film_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("trend_week_film_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("trend_week_film_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("trend_week_film_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              upcoming: function (a) {
                b.get("movie/upcoming", d, function (b) {
                  b.title = Lampa.Lang.translate("title_upcoming");
                  if (Lampa.Storage.get("upcoming_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("upcoming_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("upcoming_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("upcoming_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              popular_movie: function (a) {
                b.get("movie/popular", d, function (b) {
                  b.title = Lampa.Lang.translate("title_popular_movie");
                  if (Lampa.Storage.get("popular_movie_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("popular_movie_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("popular_movie_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("popular_movie_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              popular_tv: function (a) {
                b.get("trending/tv/week", d, function (b) {
                  b.title = Lampa.Lang.translate("title_popular_tv");
                  if (Lampa.Storage.get("popular_tv_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("popular_tv_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("popular_tv_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("popular_tv_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              top_movie: function (a) {
                b.get("movie/top_rated", d, function (b) {
                  b.title = Lampa.Lang.translate("title_top_movie");
                  if (Lampa.Storage.get("top_movie_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("top_movie_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("top_movie_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("top_movie_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              top_tv: function (a) {
                b.get("tv/top_rated", d, function (b) {
                  b.title = Lampa.Lang.translate("title_top_tv");
                  if (Lampa.Storage.get("top_tv_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("top_tv_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("top_tv_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("top_tv_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              netflix: function (a) {
                b.get("discover/tv?with_networks=213&first_air_date.gte=2020-01-01&vote_average.gte=6&vote_average.lte=10&first_air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("Netflix");
                  if (Lampa.Storage.get("netflix_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("netflix_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("netflix_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("netflix_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              apple_tv: function (a) {
                b.get("discover/tv?with_networks=2552&first_air_date.gte=2020-01-01&vote_average.gte=6&vote_average.lte=10&first_air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("Apple TV+");
                  if (Lampa.Storage.get("apple_tv_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("apple_tv_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("apple_tv_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("apple_tv_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              prime_video: function (a) {
                b.get("discover/tv?with_networks=1024&first_air_date.gte=2020-01-01&vote_average.gte=6&vote_average.lte=10&first_air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("Prime Video");
                  if (Lampa.Storage.get("prime_video_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("prime_video_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("prime_video_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("prime_video_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              mgm: function (a) {
                b.get("discover/tv?with_networks=6219&first_air_date.gte=2020-01-01&vote_average.gte=6&vote_average.lte=10&first_air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("MGM+");
                  if (Lampa.Storage.get("mgm_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("mgm_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("mgm_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("mgm_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              hbo: function (a) {
                b.get("discover/tv?with_networks=49&first_air_date.gte=2020-01-01&vote_average.gte=6&vote_average.lte=10&first_air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("HBO");
                  if (Lampa.Storage.get("hbo_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("hbo_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("hbo_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("hbo_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              dorams: function (a) {
                b.get("discover/tv?first_air_date.gte=2020-01-01&without_genres=16&with_original_language=ko&vote_average.gte=6&vote_average.lte=10&first_air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("Дорамы");
                  if (Lampa.Storage.get("dorams_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("dorams_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("dorams_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("dorams_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              tur_serials: function (a) {
                b.get("discover/tv?first_air_date.gte=2020-01-01&without_genres=16&with_original_language=tr&vote_average.gte=6&vote_average.lte=10&first_air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("Турецкие сериалы");
                  if (Lampa.Storage.get("tur_serials_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("tur_serials_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("tur_serials_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("tur_serials_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              ind_films: function (a) {
                b.get("discover/movie?primary_release_date.gte=2020-01-01&without_genres=16&with_original_language=hi&vote_average.gte=6&vote_average.lte=10&first_air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("Индийские фильмы");
                  if (Lampa.Storage.get("ind_films_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("ind_films_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("ind_films_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("ind_films_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              rus_movie: function (a) {
                b.get("discover/movie?vote_average.gte=5&vote_average.lte=9.5&with_original_language=ru&sort_by=primary_release_date.desc&primary_release_date.lte=" + new Date().toISOString().substr(0, 10), d, function (b) {
                  b.title = Lampa.Lang.translate("Русские фильмы");
                  if (Lampa.Storage.get("rus_movie_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("rus_movie_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("rus_movie_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("rus_movi_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              rus_tv: function (a) {
                b.get("discover/tv?with_original_language=ru&sort_by=first_air_date.desc&air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("Русские сериалы");
                  if (Lampa.Storage.get("rus_tv_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("rus_tv_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("rus_tv_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("rus_tv_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              rus_mult: function (a) {
                b.get("discover/movie?vote_average.gte=5&vote_average.lte=9.5&with_genres=16&with_original_language=ru&sort_by=primary_release_date.desc&primary_release_date.lte=" + new Date().toISOString().substr(0, 10), d, function (b) {
                  b.title = Lampa.Lang.translate("Русские мультфильмы");
                  if (Lampa.Storage.get("rus_mult_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("rus_mult_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("rus_mult_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("rus_mult_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              start: function (a) {
                b.get("discover/tv?with_networks=2493&sort_by=first_air_date.desc&air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("Start");
                  if (Lampa.Storage.get("start_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("start_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("start_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("start_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              premier: function (a) {
                b.get("discover/tv?with_networks=2859&sort_by=first_air_date.desc&air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("Premier");
                  if (Lampa.Storage.get("premier_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("premier_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("premier_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("premier_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              kion: function (a) {
                b.get("discover/tv?with_networks=4085&sort_by=first_air_date.desc&air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("KION");
                  if (Lampa.Storage.get("kion_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("kion_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("kion_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("kion_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              ivi: function (a) {
                b.get("discover/tv?with_networks=3923&sort_by=first_air_date.desc&air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("IVI");
                  if (Lampa.Storage.get("ivi_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("ivi_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("ivi_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("ivi_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              okko: function (a) {
                b.get("discover/tv?with_networks=3871&sort_by=first_air_date.desc&air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("OKKO");
                  if (Lampa.Storage.get("okko_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("okko_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("okko_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("okko_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              kinopoisk: function (a) {
                b.get("discover/tv?with_networks=3827&sort_by=first_air_date.desc&air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("КиноПоиск");
                  if (Lampa.Storage.get("kinopoisk_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("kinopoisk_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("kinopoisk_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("kinopois_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              wink: function (a) {
                b.get("discover/tv?with_networks=5806&sort_by=first_air_date.desc&air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("Wink");
                  if (Lampa.Storage.get("wink_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("wink_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("wink_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("wink_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              sts: function (a) {
                b.get("discover/tv?with_networks=806&sort_by=first_air_date.desc&air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("СТС");
                  if (Lampa.Storage.get("sts_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("sts_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("sts_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("sts_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              tnt: function (a) {
                b.get("discover/tv?with_networks=1191&sort_by=first_air_date.desc&air_date.lte=" + w, d, function (b) {
                  b.title = Lampa.Lang.translate("ТНТ");
                  if (Lampa.Storage.get("tnt_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("tnt_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("tnt_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("tnt_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              collections_inter_tv: function (a) {
                b.get("discover/tv?with_networks=213|2552|1024|6219|49&sort_by=" + s + "&first_air_date.gte=" + l + "&first_air_date.lte=" + m, d, function (b) {
                  b.title = Lampa.Lang.translate("Подборки зарубежных сериалов");
                  if (Lampa.Storage.get("collections_inter_tv_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("collections_inter_tv_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("collections_inter_tv_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("collections_inter_tv_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              collections_rus_tv: function (a) {
                b.get("discover/tv?with_networks=2493|2859|4085|3923|3871|3827|5806|806|1191&sort_by=" + s + "&air_date.lte=" + m + "&first_air_date.gte=" + l, d, function (b) {
                  b.title = Lampa.Lang.translate("Подборки русских сериалов");
                  if (Lampa.Storage.get("collections_rus_tv_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("collections_rus_tv_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("collections_rus_tv_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("collections_rus_tv_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              collections_inter_movie: function (a) {
                b.get("discover/movie?vote_average.gte=5&vote_average.lte=9.5&sort_by=" + v + "&primary_release_date.gte=" + o + "&primary_release_date.lte=" + p, d, function (b) {
                  b.title = Lampa.Lang.translate("Подборки зарубежных фильмов");
                  if (Lampa.Storage.get("collections_inter_movie_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("collections_inter_movie_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("collections_inter_movie_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("collections_inter_movie_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              },
              collections_rus_movie: function (a) {
                b.get("discover/movie?primary_release_date.gte=" + o + "&vote_average.gte=5&vote_average.lte=9.5&with_original_language=ru&sort_by=" + v + "&primary_release_date.lte=" + p, d, function (b) {
                  b.title = Lampa.Lang.translate("Подборки русских фильмов");
                  if (Lampa.Storage.get("collections_rus_movie_display") == "2") {
                    b.collection = true;
                    b.line_type = "collection";
                  }
                  if (Lampa.Storage.get("collections_rus_movie_display") == "3") {
                    b.small = true;
                    b.wide = true;
                    b.results.forEach(function (a) {
                      a.promo = a.overview;
                      a.promo_title = a.title || a.name;
                    });
                  }
                  if (Lampa.Storage.get("collections_rus_movie_display") == "4") {
                    b.line_type = "top";
                  }
                  if (Lampa.Storage.get("collections_rus_movie_shuffle") == true) {
                    i(b.results);
                  }
                  a(b);
                }, a);
              }
            };
            var k = g.filter(function (a) {
              return a.active;
            }).sort(function (a, b) {
              return a.order - b.order;
            });
            if (k.length === 0) {
              return e();
            }
            var n = [];
            k.forEach(function (a) {
              if (!h.includes(a.id) && j[a.id]) {
                n.push(j[a.id]);
                h.push(a.id);
              }
            });
            if (Lampa.Storage.get("genres_cat") == false) {
              a.genres.movie.forEach(function (a) {
                if (!h.includes(a.id)) {
                  function c(c) {
                    b.get("discover/movie?with_genres=" + a.id, d, function (b) {
                      b.title = Lampa.Lang.translate(a.title.replace(/[^a-z_]/g, ""));
                      i(b.results);
                      c(b);
                    }, c);
                  }
                  n.push(c);
                  h.push(a.id);
                }
              });
            }
            if (n.length > 0) {
              Lampa.Api.partNext(n, 56, e, f);
            } else {
              console.log("Нет доступных категорий для загрузки.");
            }
          }
          function A(a, b) {
            z(a, b);
          }
          A(e, f);
          return A;
        };
      }
      var e = Object.assign({}, Lampa.Api.sources.tmdb, new d(Lampa.Api.sources.tmdb));
      Lampa.Api.sources.lampa = e;
      Object.defineProperty(Lampa.Api.sources, "lampa", {
        get: function a() {
          return e;
        }
      });
      Lampa.Params.select("source", Object.assign({}, Lampa.Params.values.source, {
        lampa: "lampa"
      }), "tmdb");
      if (Lampa.Storage.get("source") == "lampa") {
        var f = Lampa.Storage.get("source");
        var g = // TOLOOK
        setInterval(function () {
          var a = Lampa.Activity.active();
          if (a) {
            clearInterval(g);
            Lampa.Activity.replace({
              source: f,
              title: Lampa.Lang.translate("title_main") + " - " + Lampa.Storage.field("source").toUpperCase()
            });
          }
        }, 300);
      }
      Lampa.Settings.listener.follow("open", function (a) {
        if (a.name == "main") {
          if (Lampa.Settings.main().render().find("[data-component=\"lampa_source\"]").length == 0) {
            Lampa.SettingsApi.addComponent({
              component: "lampa_source",
              name: "Источник lampa"
            });
          }
          Lampa.Settings.main().update();
          Lampa.Settings.main().render().find("[data-component=\"lampa_source\"]").addClass("hide");
        }
      });
      Lampa.SettingsApi.addParam({
        component: "more",
        param: {
          name: "lampa_source",
          type: "static",
          default: true
        },
        field: {
          name: "Источник lampa",
          description: "Настройки главного экрана"
        },
        onRender: function (a) {
          // TOLOOK
          setTimeout(function () {
            $(".settings-param > div:contains(\"Источник lampa\")").parent().insertAfter($("div[data-name=\"source\"]"));
            if (Lampa.Storage.field("source") !== "lampa") {
              a.hide();
            } else {
              a.show();
            }
          }, 20);
          a.on("hover:enter", function () {
            Lampa.Settings.create("lampa_source");
            Lampa.Controller.enabled().controller.back = function () {
              Lampa.Settings.create("more");
            };
          });
        }
      });
      Lampa.Storage.listener.follow("change", function (a) {
        if (a.name == "source") {
          // TOLOOK
          setTimeout(function () {
            if (Lampa.Storage.get("source") !== "lampa") {
              $(".settings-param > div:contains(\"Источник lampa\")").parent().hide();
            } else {
              $(".settings-param > div:contains(\"Источник lampa\")").parent().show();
            }
          }, 50);
        }
      });
      function h(c, d, e, f, g, h, i) {
        Lampa.Settings.listener.follow("open", function (a) {
          if (a.name === "main") {
            if (Lampa.Settings.main().render().find("[data-component=\"" + c + "\"]").length === 0) {
              Lampa.SettingsApi.addComponent({
                component: c,
                name: d
              });
            }
            Lampa.Settings.main().update();
            Lampa.Settings.main().render().find("[data-component=\"" + c + "\"]").addClass("hide");
          }
        });
        Lampa.SettingsApi.addParam({
          component: "lampa_source",
          param: {
            name: c,
            type: "static",
            default: true
          },
          field: {
            name: d,
            description: e
          },
          onRender: function (a) {
            a.on("hover:enter", function (a) {
              var b = a.target;
              var d = b.parentElement;
              var e = Array.from(d.children);
              var f = e.indexOf(b);
              var g = f + 1;
              Lampa.Settings.create(c);
              Lampa.Controller.enabled().controller.back = function () {
                Lampa.Settings.create("lampa_source");
                // TOLOOK
                setTimeout(function () {
                  var a = document.querySelector("#app > div.settings.animate > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(" + g + ")");
                  Lampa.Controller.focus(a);
                  Lampa.Controller.toggle("settings_component");
                }, 5);
              };
            });
          }
        });
        Lampa.SettingsApi.addParam({
          component: c,
          param: {
            name: c + "_remove",
            type: "trigger",
            default: f
          },
          field: {
            name: "Убрать с главной страницы"
          }
        });
        Lampa.SettingsApi.addParam({
          component: c,
          param: {
            name: c + "_display",
            type: "select",
            values: {
              1: "Стандарт",
              2: "Широкие маленькие",
              3: "Широкие большие",
              4: "Top Line"
            },
            default: g
          },
          field: {
            name: "Вид отображения"
          }
        });
        Lampa.SettingsApi.addParam({
          component: c,
          param: {
            name: "number_" + c,
            type: "select",
            values: {
              1: "1",
              2: "2",
              3: "3",
              4: "4",
              5: "5",
              6: "6",
              7: "7",
              8: "8",
              9: "9",
              10: "10",
              11: "11",
              12: "12",
              13: "13",
              14: "14",
              15: "15",
              16: "16",
              17: "17",
              18: "18",
              19: "19",
              20: "20",
              21: "21",
              22: "22",
              23: "23",
              24: "24",
              25: "25",
              26: "26",
              27: "27",
              28: "28",
              29: "29",
              30: "30",
              31: "31",
              32: "32",
              33: "33",
              34: "34",
              35: "35",
              36: "36",
              37: "37"
            },
            default: h
          },
          field: {
            name: "Порядок отображения"
          },
          onChange: function (a) {}
        });
        Lampa.SettingsApi.addParam({
          component: c,
          param: {
            name: c + "_shuffle",
            type: "trigger",
            default: i
          },
          field: {
            name: "Изменять порядок карточек на главной"
          }
        });
      }
      h("now_watch", "Сейчас смотрят", "Нажми для настройки", false, "1", "1", false);
      h("trend_day", "Сегодня в тренде", "Нажми для настройки", false, "1", "3", false);
      h("trend_day_tv", "Сегодня в тренде (сериалы)", "Нажми для настройки", true, "1", "4", false);
      h("trend_day_film", "Сегодня в тренде (фильмы)", "Нажми для настройки", true, "1", "5", false);
      h("trend_week", "В тренде за неделю", "Нажми для настройки", false, "1", "6", false);
      h("trend_week_tv", "В тренде за неделю (сериалы)", "Нажми для настройки", true, "1", "7", false);
      h("trend_week_film", "В тренде за неделю (фильмы)", "Нажми для настройки", true, "1", "8", false);
      h("upcoming", "Смотрите в кинозалах", "Нажми для настройки", false, "1", "9", false);
      h("popular_movie", "Популярные фильмы", "Нажми для настройки", false, "1", "10", false);
      h("popular_tv", "Популярные сериалы", "Нажми для настройки", false, "1", "11", false);
      h("top_movie", "Топ фильмы", "Нажми для настройки", false, "4", "12", false);
      h("top_tv", "Топ сериалы", "Нажми для настройки", false, "4", "13", false);
      h("netflix", "Netflix", "Нажми для настройки", true, "1", "14", false);
      h("apple_tv", "Apple TV+", "Нажми для настройки", true, "1", "15", false);
      h("prime_video", "Prime Video", "Нажми для настройки", true, "1", "16", false);
      h("mgm", "MGM+", "Нажми для настройки", true, "1", "17", false);
      h("hbo", "HBO", "Нажми для настройки", true, "1", "18", false);
      h("dorams", "Дорамы", "Нажми для настройки", true, "1", "19", false);
      h("tur_serials", "Турецкие сериалы", "Нажми для настройки", true, "1", "20", false);
      h("ind_films", "Индийские фильмы", "Нажми для настройки", true, "1", "21", false);
      h("rus_movie", "Русские фильмы", "Нажми для настройки", true, "1", "22", false);
      h("rus_tv", "Русские сериалы", "Нажми для настройки", true, "1", "23", false);
      h("rus_mult", "Русские мультфильмы", "Нажми для настройки", true, "1", "24", false);
      h("start", "Start", "Нажми для настройки", true, "1", "25", false);
      h("premier", "Premier", "Нажми для настройки", true, "1", "26", false);
      h("kion", "KION", "Нажми для настройки", true, "1", "27", false);
      h("ivi", "ИВИ", "Нажми для настройки", true, "1", "28", false);
      h("okko", "Okko", "Нажми для настройки", true, "1", "29", false);
      h("kinopoisk", "КиноПоиск", "Нажми для настройки", true, "1", "30", false);
      h("wink", "Wink", "Нажми для настройки", true, "1", "31", false);
      h("sts", "СТС", "Нажми для настройки", true, "1", "32", false);
      h("tnt", "ТНТ", "Нажми для настройки", true, "1", "33", false);
      h("collections_inter_tv", "Подборки зарубежных сериалов", "Нажми для настройки", true, "1", "34", false);
      h("collections_rus_tv", "Подборки русских сериалов", "Нажми для настройки", true, "1", "35", false);
      h("collections_inter_movie", "Подборки зарубежных фильмов", "Нажми для настройки", true, "1", "36", false);
      h("collections_rus_movie", "Подборки русских фильмов", "Нажми для настройки", true, "1", "37", false);
      Lampa.SettingsApi.addParam({
        component: "lampa_source",
        param: {
          name: "upcoming_episodes_remove",
          type: "trigger",
          default: false
        },
        field: {
          name: "Выход ближайших эпизодов",
          description: "Убрать с главной страницы"
        }
      });
      Lampa.SettingsApi.addParam({
        component: "lampa_source",
        param: {
          name: "genres_cat",
          type: "trigger",
          default: true
        },
        field: {
          name: "Подборки по жанрам",
          description: "Убрать с главной страницы"
        }
      });
      var i = // TOLOOK
      setInterval(function () {
        if (typeof Lampa !== "undefined") {
          clearInterval(i);
          if (!Lampa.Storage.get("lampa_source_params", "false")) {
            j();
          }
        }
      }, 200);
      function j() {
        Lampa.Storage.set("lampa_source_params", "true");
        Lampa.Storage.set("trend_day_tv_remove", "true");
        Lampa.Storage.set("trend_day_film_remove", "true");
        Lampa.Storage.set("trend_week_tv_remove", "true");
        Lampa.Storage.set("trend_week_film_remove", "true");
        Lampa.Storage.set("top_movie_display", "4");
        Lampa.Storage.set("top_tv_display", "4");
        Lampa.Storage.set("netflix_remove", "true");
        Lampa.Storage.set("apple_tv_remove", "true");
        Lampa.Storage.set("prime_video_remove", "true");
        Lampa.Storage.set("mgm_remove", "true");
        Lampa.Storage.set("hbo_remove", "true");
        Lampa.Storage.set("dorams_remove", "true");
        Lampa.Storage.set("tur_serials_remove", "true");
        Lampa.Storage.set("ind_films_remove", "true");
        Lampa.Storage.set("rus_movie_remove", "true");
        Lampa.Storage.set("rus_tv_remove", "true");
        Lampa.Storage.set("rus_mult_remove", "true");
        Lampa.Storage.set("start_remove", "true");
        Lampa.Storage.set("premier_remove", "true");
        Lampa.Storage.set("kion_remove", "true");
        Lampa.Storage.set("ivi_remove", "true");
        Lampa.Storage.set("okko_remove", "true");
        Lampa.Storage.set("kinopoisk_remove", "true");
        Lampa.Storage.set("wink_remove", "true");
        Lampa.Storage.set("sts_remove", "true");
        Lampa.Storage.set("tnt_remove", "true");
        Lampa.Storage.set("collections_inter_tv_remove", "true");
        Lampa.Storage.set("collections_rus_tv_remove", "true");
        Lampa.Storage.set("collections_inter_movie_remove", "true");
        Lampa.Storage.set("collections_rus_movie_remove", "true");
        Lampa.Storage.set("genres_cat", "true");
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