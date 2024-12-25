(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    if (window.location.protocol === "https:") {
      var e = {
        api: "lampac",
        localhost: "https://showy.online/",
        apn: "https://apn.watch/"
      };
    } else {
      var e = {
        api: "lampac",
        localhost: "http://showy.online/",
        apn: "https://apn.watch/"
      };
    }
    function f() {
      this.net = new Lampa.Reguest();
      this.timeout = function (a) {
        this.net.timeout(a);
      };
      this.req = function (a, b, c, d, f) {
        var g = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        var h = b.split(e.localhost).pop().split("?");
        if (h[0].indexOf("http") >= 0) {
          return this.net[a](b, c, d, f, g);
        }
        DotNet.invokeMethodAsync("JinEnergy", h[0], h[1]).then(function (a) {
          if (g.dataType == "text") {
            c(a);
          } else {
            c(Lampa.Arrays.decodeJson(a, {}));
          }
        }).catch(function (a) {
          console.log("Blazor", "error:", a);
          d(a);
        });
      };
      this.silent = function (a, b, c, d) {
        var e = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
        this.req("silent", a, b, c, d, e);
      };
      this.native = function (a, b, c, d) {
        var e = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
        this.req("native", a, b, c, d, e);
      };
      this.clear = function () {
        this.net.clear();
      };
    }
    var g = Lampa.Reguest;
    function h(a) {
      var b = new g();
      var c = {
        mask: true,
        over: true
      };
      var d = new Lampa.Scroll(c);
      var f = new Lampa.Explorer(a);
      var h = new Lampa.Filter(a);
      var i = {};
      var j;
      var k;
      var l;
      var m;
      var n;
      var o = [];
      var p = 0;
      var q;
      var r = 0;
      var s;
      var t;
      var u;
      var v = {};
      var w = {
        season: Lampa.Lang.translate("torrent_serial_season"),
        voice: Lampa.Lang.translate("torrent_parser_voice"),
        source: Lampa.Lang.translate("settings_rest_source")
      };
      var x = {
        season: [],
        voice: []
      };
      var y = ["eneyida", "seasonvar", "lostfilmhd", "kinotochka", "kinopub", "kinoprofi", "kinokrad", "kinobase", "filmix", "redheadsound", "animevost", "animego", "animedia", "animebesst", "anilibria", "rezka", "kodik", "remux"];
      function z(a) {
        a = a + "";
        if (a.indexOf("account_email") == -1) {
          var b = Lampa.Storage.get("account_email");
          if (b) {
            a = Lampa.Utils.addUrlComponent(a, "account_email=" + encodeURIComponent(b));
          }
        }
        return a;
      }
      function A(a) {
        var b = a.balanser;
        var c = a.name.split(" ")[0];
        return (b || c).toLowerCase();
      }
      this.initialize = function () {
        var b = this;
        this.loading(true);
        h.onSearch = function (a) {
          var b = {
            search: a,
            clarification: true
          };
          Lampa.Activity.replace(b);
        };
        h.onBack = function () {
          b.start();
        };
        h.render().find(".selector").on("hover:enter", function () {
          clearInterval(n);
        });
        h.render().find(".filter--search").appendTo(h.render().find(".torrent-filter"));
        h.onSelect = function (c, d, e) {
          if (c == "filter") {
            if (d.reset) {
              b.replaceChoice({
                season: 0,
                voice: 0,
                voice_url: "",
                voice_name: ""
              });
              // TOLOOK
              setTimeout(function () {
                Lampa.Select.close();
                Lampa.Activity.replace();
              }, 10);
            } else {
              var f = x[d.stype][e.index].url;
              var g = b.getChoice();
              if (d.stype == "voice") {
                g.voice_name = x.voice[e.index].title;
                g.voice_url = f;
              }
              g[d.stype] = e.index;
              b.saveChoice(g);
              b.reset();
              b.request(f);
              // TOLOOK
              setTimeout(Lampa.Select.close, 10);
            }
          } else if (c == "sort") {
            Lampa.Select.close();
            a.lampac_custom_select = d.source;
            b.changeBalanser(d.source);
          }
        };
        if (h.addButtonBack) {
          h.addButtonBack();
        }
        h.render().find(".filter--sort span").text(Lampa.Lang.translate("lampac_balanser"));
        d.body().addClass("torrent-list");
        f.appendFiles(d.render());
        f.appendHead(h.render());
        d.minus(f.render().find(".explorer__files-head"));
        d.body().append(Lampa.Template.get("lampac_content_loading"));
        Lampa.Controller.enable("content");
        this.loading(false);
        this.externalids().then(function () {
          return b.createSource();
        }).then(function (a) {
          if (!y.find(function (a) {
            return l.slice(0, a.length) == a;
          })) {
            h.render().find(".filter--search").addClass("hide");
          }
          b.search();
        }).catch(function (a) {
          b.noConnectToServer(a);
        });
      };
      this.rch = function (a) {
        var c = this;
        var d = function d() {
          if (t) {
            t.stop();
            t = null;
          }
          t = new signalR.HubConnectionBuilder().withUrl(a.ws).build();
          t.on("RchClient", function (c, d, e) {
            var f = $("head meta[name=\"referrer\"]").attr("content");
            function g(d) {
              $("head meta[name=\"referrer\"]").attr("content", f);
              if (Lampa.Arrays.isObject(d) || Lampa.Arrays.isArray(d)) {
                d = JSON.stringify(d);
              }
              var e = {
                id: c,
                value: d
              };
              b.silent(a.result, false, false, e, {
                dataType: "text"
              });
            }
            $("head meta[name=\"referrer\"]").attr("content", "origin");
            var h = d.indexOf("cdnmovies") >= 0 ? {
              Origin: "https://cdnmovies.net",
              Referer: "https://cdnmovies.net/"
            } : {};
            b.native(d, g, function () {
              g("");
            }, e, {
              dataType: "text",
              timeout: 10000,
              headers: h
            });
          });
          t.start().then(function () {
            t.invoke("Registry", "rch").then(function () {
              c.find();
            });
          }).catch(function (a) {
            return console.error(a.toString());
          });
          u = // TOLOOK
          setTimeout(function () {
            t.stop();
          }, a.keepalive * 1000);
        };
        if (typeof signalR == "undefined") {
          Lampa.Utils.putScript(["https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js"], function () {}, false, function () {
            d();
          }, true);
        } else {
          d();
        }
      };
      this.externalids = function () {
        return new Promise(function (c, d) {
          if (!a.movie.imdb_id || !a.movie.kinopoisk_id) {
            var f = [];
            f.push("id=" + a.movie.id);
            f.push("serial=" + (a.movie.name ? 1 : 0));
            if (a.movie.imdb_id) {
              f.push("imdb_id=" + (a.movie.imdb_id || ""));
            }
            if (a.movie.kinopoisk_id) {
              f.push("kinopoisk_id=" + (a.movie.kinopoisk_id || ""));
            }
            var g = e.localhost + "externalids?" + f.join("&");
            b.timeout(10000);
            b.silent(z(g), function (b) {
              for (var d in b) {
                a.movie[d] = b[d];
              }
              c();
            }, function () {
              c();
            });
          } else {
            c();
          }
        });
      };
      this.updateBalanser = function (b) {
        var c = Lampa.Storage.cache("online_last_balanser", 3000, {});
        c[a.movie.id] = b;
        Lampa.Storage.set("online_last_balanser", c);
      };
      this.changeBalanser = function (a) {
        this.updateBalanser(a);
        Lampa.Storage.set("online_balanser", a);
        var b = this.getChoice(a);
        var c = this.getChoice();
        if (c.voice_name) {
          b.voice_name = c.voice_name;
        }
        this.saveChoice(b, a);
        Lampa.Activity.replace();
      };
      this.requestParams = function (b) {
        var c = [];
        var d = a.movie.source || "tmdb";
        c.push("id=" + a.movie.id);
        if (a.movie.imdb_id) {
          c.push("imdb_id=" + (a.movie.imdb_id || ""));
        }
        if (a.movie.kinopoisk_id) {
          c.push("kinopoisk_id=" + (a.movie.kinopoisk_id || ""));
        }
        c.push("title=" + encodeURIComponent(a.clarification ? a.search : a.movie.title || a.movie.name));
        c.push("original_title=" + encodeURIComponent(a.movie.original_title || a.movie.original_name));
        c.push("serial=" + (a.movie.name ? 1 : 0));
        c.push("original_language=" + (a.movie.original_language || ""));
        c.push("year=" + ((a.movie.release_date || a.movie.first_air_date || "0000") + "").slice(0, 4));
        c.push("source=" + d);
        c.push("clarification=" + (a.clarification ? 1 : 0));
        if (Lampa.Storage.get("account_email", "")) {
          c.push("cub_id=" + Lampa.Utils.hash(Lampa.Storage.get("account_email", "")));
        }
        return b + (b.indexOf("?") >= 0 ? "&" : "?") + c.join("&");
      };
      this.getLastChoiceBalanser = function () {
        var b = Lampa.Storage.cache("online_last_balanser", 3000, {});
        if (b[a.movie.id]) {
          return b[a.movie.id];
        } else {
          return Lampa.Storage.get("online_balanser", v.length ? v[0] : "");
        }
      };
      this.startSource = function (b) {
        return new Promise(function (c, d) {
          b.forEach(function (a) {
            var b = A(a);
            i[b] = {
              url: a.url,
              name: a.name,
              show: typeof a.show == "undefined" ? true : a.show
            };
          });
          v = Lampa.Arrays.getKeys(i);
          if (v.length) {
            var e = Lampa.Storage.cache("online_last_balanser", 3000, {});
            if (e[a.movie.id]) {
              l = e[a.movie.id];
            } else {
              l = Lampa.Storage.get("online_balanser", v[0]);
            }
            if (!i[l]) {
              l = v[0];
            }
            if (!i[l].show && !a.lampac_custom_select) {
              l = v[0];
            }
            k = i[l].url;
            c(b);
          } else {
            d();
          }
        });
      };
      this.lifeSource = function () {
        var a = this;
        return new Promise(function (c, d) {
          var f = a.requestParams(e.localhost + "lifeevents");
          var g = false;
          var j = function f(b, e) {
            if (b.accsdb) {
              return d(b);
            }
            var h = a.getLastChoiceBalanser();
            if (!g) {
              var i = b.online.filter(function (a) {
                if (e) {
                  return a.show;
                } else {
                  return a.show && a.name.toLowerCase() == h;
                }
              });
              if (i.length) {
                g = true;
                c(b.online.filter(function (a) {
                  return a.show;
                }));
              } else if (e) {
                d();
              }
            }
          };
          var k = function e(c) {
            b.timeout(3000);
            b.silent(z(f), function (b) {
              r++;
              v = [];
              i = {};
              b.online.forEach(function (a) {
                var b = A(a);
                i[b] = {
                  url: a.url,
                  name: a.name,
                  show: typeof a.show == "undefined" ? true : a.show
                };
              });
              v = Lampa.Arrays.getKeys(i);
              h.set("sort", v.map(function (a) {
                return {
                  title: i[a].name,
                  source: a,
                  selected: a == l,
                  ghost: !i[a].show
                };
              }));
              h.chosen("sort", [i[l] ? i[l].name : l]);
              j(b);
              var c = a.getLastChoiceBalanser();
              if (r > 15 || b.ready) {
                h.render().find(".lampac-balanser-loader").remove();
                j(b, true);
              } else if (!g && i[c] && i[c].show) {
                j(b, true);
                s = // TOLOOK
                setTimeout(e, 1000);
              } else {
                s = // TOLOOK
                setTimeout(e, 1000);
              }
            }, function () {
              r++;
              if (r > 15) {
                d();
              } else {
                s = // TOLOOK
                setTimeout(e, 1000);
              }
            });
          };
          k();
        });
      };
      this.createSource = function () {
        var a = this;
        return new Promise(function (c, d) {
          var f = a.requestParams(e.localhost + "lite/events?life=true");
          b.timeout(15000);
          b.silent(z(f), function (b) {
            if (b.accsdb) {
              return d(b);
            }
            if (b.life) {
              h.render().find(".filter--sort").append("<span class=\"lampac-balanser-loader\" style=\"width: 1.2em; height: 1.2em; margin-top: 0; background: url(./img/loader.svg) no-repeat 50% 50%; background-size: contain; margin-left: 0.5em\"></span>");
              a.lifeSource().then(a.startSource).then(c).catch(d);
            } else {
              a.startSource(b).then(c).catch(d);
            }
          }, d);
        });
      };
      this.create = function () {
        return this.render();
      };
      this.search = function () {
        var a = {
          source: v
        };
        this.filter(a, this.getChoice());
        this.find();
      };
      this.find = function () {
        this.request(this.requestParams(k));
      };
      this.request = function (a) {
        p++;
        if (p < 10) {
          b.native(z(a), this.parse.bind(this), this.doesNotAnswer.bind(this), false, {
            dataType: "text"
          });
          clearTimeout(q);
          q = // TOLOOK
          setTimeout(function () {
            p = 0;
          }, 4000);
        } else {
          this.empty();
        }
      };
      this.parseJsonDate = function (b, c) {
        try {
          var d = $("<div>" + b + "</div>");
          var e = [];
          d.find(c).each(function () {
            var b = $(this);
            var c = JSON.parse(b.attr("data-json"));
            var d = b.attr("s");
            var f = b.attr("e");
            var g = b.text();
            if (!a.movie.name) {
              if (g.match(/\d+p/i)) {
                if (!c.quality) {
                  c.quality = {};
                  c.quality[g] = c.url;
                }
                g = a.movie.title;
              }
              if (g == "По умолчанию") {
                g = a.movie.title;
              }
            }
            if (f) {
              c.episode = parseInt(f);
            }
            if (d) {
              c.season = parseInt(d);
            }
            if (g) {
              c.text = g;
            }
            c.active = b.hasClass("active");
            e.push(c);
          });
          return e;
        } catch (a) {
          return [];
        }
      };
      this.getFileUrl = function (a, c) {
        if (a.method == "play") {
          c(a, {});
        } else {
          Lampa.Loading.start(function () {
            Lampa.Loading.stop();
            Lampa.Controller.toggle("content");
            b.clear();
          });
          b.native(z(a.url), function (a) {
            Lampa.Loading.stop();
            c(a, a);
          }, function () {
            Lampa.Loading.stop();
            c(false, {});
          });
        }
      };
      this.toPlayElement = function (a) {
        var b = {
          title: a.title,
          url: a.url,
          quality: a.qualitys,
          timeline: a.timeline,
          subtitles: a.subtitles,
          callback: a.mark
        };
        var c = b;
        return c;
      };
      this.appendAPN = function (a) {
        if (e.api.indexOf("pwa") == 0 && e.apn.length && a.url && typeof a.url == "string" && a.url.indexOf(e.apn) == -1) {
          a.url_reserve = e.apn + a.url;
        }
      };
      this.setDefaultQuality = function (a) {
        if (Lampa.Arrays.getKeys(a.quality).length) {
          for (var b in a.quality) {
            if (parseInt(b) == Lampa.Storage.field("video_quality_default")) {
              a.url = a.quality[b];
              this.appendAPN(a);
              break;
            }
          }
        }
      };
      this.display = function (a) {
        var b = this;
        this.draw(a, {
          onEnter: function e(c, d) {
            b.getFileUrl(c, function (d, e) {
              if (d && d.url) {
                var f = [];
                var g = b.toPlayElement(c);
                g.url = d.url;
                g.quality = e.quality || c.qualitys;
                g.subtitles = d.subtitles;
                b.appendAPN(g);
                b.setDefaultQuality(g);
                if (c.season) {
                  a.forEach(function (a) {
                    var e = b.toPlayElement(a);
                    if (a == c) {
                      e.url = d.url;
                    } else if (a.method == "call") {
                      if (Lampa.Platform.is("android") && Lampa.Storage.field("player") == "android") {
                        e.url = a.stream;
                      } else {
                        e.url = function (c) {
                          b.getFileUrl(a, function (d, f) {
                            if (d.url) {
                              e.url = d.url;
                              e.quality = f.quality || a.qualitys;
                              e.subtitles = d.subtitles;
                              b.appendAPN(e);
                              b.setDefaultQuality(e);
                              a.mark();
                            } else {
                              e.url = "";
                              Lampa.Noty.show(Lampa.Lang.translate("lampac_nolink"));
                            }
                            c();
                          }, function () {
                            e.url = "";
                            c();
                          });
                        };
                      }
                    } else {
                      e.url = a.url;
                    }
                    b.appendAPN(e);
                    b.setDefaultQuality(e);
                    f.push(e);
                  });
                } else {
                  f.push(g);
                }
                if (f.length > 1) {
                  g.playlist = f;
                }
                if (g.url) {
                  Lampa.Player.play(g);
                  Lampa.Player.playlist(f);
                  c.mark();
                  b.updateBalanser(l);
                } else {
                  Lampa.Noty.show(Lampa.Lang.translate("lampac_nolink"));
                }
              } else {
                Lampa.Noty.show(Lampa.Lang.translate("lampac_nolink"));
              }
            }, true);
          },
          onContextMenu: function f(a, c, d, e) {
            b.getFileUrl(a, function (b) {
              var c = {
                file: b.url,
                quality: a.qualitys
              };
              e(c);
            }, true);
          }
        });
        this.filter({
          season: x.season.map(function (a) {
            return a.title;
          }),
          voice: x.voice.map(function (a) {
            return a.title;
          })
        }, this.getChoice());
      };
      this.parse = function (a) {
        var b = Lampa.Arrays.decodeJson(a, {});
        if (Lampa.Arrays.isObject(a) && a.rch) {
          b = a;
        }
        if (b.rch) {
          return this.rch(b);
        }
        try {
          var c = this.parseJsonDate(a, ".videos__item");
          var d = this.parseJsonDate(a, ".videos__button");
          if (c.length == 1 && c[0].method == "link" && !c[0].similar) {
            x.season = c.map(function (a) {
              var b = {
                title: a.text,
                url: a.url
              };
              return b;
            });
            this.replaceChoice({
              season: 0
            });
            this.request(c[0].url);
          } else {
            this.activity.loader(false);
            var e = c.filter(function (a) {
              return a.method == "play" || a.method == "call";
            });
            var f = c.filter(function (a) {
              return a.similar;
            });
            if (e.length) {
              if (d.length) {
                x.voice = d.map(function (a) {
                  var b = {
                    title: a.text,
                    url: a.url
                  };
                  return b;
                });
                var g = this.getChoice(l).voice_url;
                var h = this.getChoice(l).voice_name;
                var i = d.find(function (a) {
                  return a.url == g;
                });
                var j = d.find(function (a) {
                  return a.text == h;
                });
                var k = d.find(function (a) {
                  return a.active;
                });
                if (i && !i.active) {
                  console.log("Lampac", "go to voice", i);
                  this.replaceChoice({
                    voice: d.indexOf(i),
                    voice_name: i.text
                  });
                  this.request(i.url);
                } else if (j && !j.active) {
                  console.log("Lampac", "go to voice", j);
                  this.replaceChoice({
                    voice: d.indexOf(j),
                    voice_name: j.text
                  });
                  this.request(j.url);
                } else {
                  if (k) {
                    this.replaceChoice({
                      voice: d.indexOf(k),
                      voice_name: k.text
                    });
                  }
                  this.display(e);
                }
              } else {
                this.replaceChoice({
                  voice: 0,
                  voice_url: "",
                  voice_name: ""
                });
                this.display(e);
              }
            } else if (c.length) {
              if (f.length) {
                this.similars(f);
                this.activity.loader(false);
              } else {
                x.season = c.map(function (a) {
                  var b = {
                    title: a.text,
                    url: a.url
                  };
                  return b;
                });
                var m = this.getChoice(l).season;
                var n = x.season[m];
                if (!n) {
                  n = x.season[0];
                }
                console.log("Lampac", "go to season", n);
                this.request(n.url);
              }
            } else {
              this.doesNotAnswer();
            }
          }
        } catch (a) {
          console.log("Lampac", "error", a.stack);
          this.doesNotAnswer();
        }
      };
      this.similars = function (b) {
        var c = this;
        d.clear();
        b.forEach(function (b) {
          b.title = b.text;
          b.info = "";
          var e = [];
          var f = ((b.start_date || b.year || a.movie.release_date || a.movie.first_air_date || "") + "").slice(0, 4);
          if (f) {
            e.push(f);
          }
          if (b.details) {
            e.push(b.details);
          }
          var g = b.title || b.text;
          b.title = g;
          b.time = b.time || "";
          b.info = e.join("<span class=\"online-prestige-split\">●</span>");
          var h = Lampa.Template.get("lampac_prestige_folder", b);
          h.on("hover:enter", function () {
            c.reset();
            c.request(b.url);
          }).on("hover:focus", function (a) {
            j = a.target;
            d.update($(a.target), true);
          });
          d.append(h);
        });
        Lampa.Controller.enable("content");
      };
      this.getChoice = function (b) {
        var c = Lampa.Storage.cache("online_choice_" + (b || l), 3000, {});
        var d = c[a.movie.id] || {};
        Lampa.Arrays.extend(d, {
          season: 0,
          voice: 0,
          voice_name: "",
          voice_id: 0,
          episodes_view: {},
          movie_view: ""
        });
        return d;
      };
      this.saveChoice = function (b, c) {
        var d = Lampa.Storage.cache("online_choice_" + (c || l), 3000, {});
        d[a.movie.id] = b;
        Lampa.Storage.set("online_choice_" + (c || l), d);
        this.updateBalanser(c || l);
      };
      this.replaceChoice = function (a, b) {
        var c = this.getChoice(b);
        Lampa.Arrays.extend(c, a, true);
        this.saveChoice(c, b);
      };
      this.clearImages = function () {
        o.forEach(function (a) {
          a.onerror = function () {};
          a.onload = function () {};
          a.src = "";
        });
        o = [];
      };
      this.reset = function () {
        j = false;
        clearInterval(n);
        b.clear();
        this.clearImages();
        d.render().find(".empty").remove();
        d.clear();
        d.reset();
        d.body().append(Lampa.Template.get("lampac_content_loading"));
      };
      this.loading = function (a) {
        if (a) {
          this.activity.loader(true);
        } else {
          this.activity.loader(false);
          this.activity.toggle();
        }
      };
      this.filter = function (a, b) {
        var c = this;
        var d = [];
        var e = function f(b, e) {
          var g = c.getChoice();
          var h = a[b];
          var i = [];
          var j = g[b];
          h.forEach(function (a, b) {
            i.push({
              title: a,
              selected: j == b,
              index: b
            });
          });
          var k = {
            title: e,
            subtitle: h[j],
            items: i,
            stype: b
          };
          d.push(k);
        };
        a.source = v;
        d.push({
          title: Lampa.Lang.translate("torrent_parser_reset"),
          reset: true
        });
        this.saveChoice(b);
        if (a.voice && a.voice.length) {
          e("voice", Lampa.Lang.translate("torrent_parser_voice"));
        }
        if (a.season && a.season.length) {
          e("season", Lampa.Lang.translate("torrent_serial_season"));
        }
        h.set("filter", d);
        h.set("sort", v.map(function (a) {
          return {
            title: i[a].name,
            source: a,
            selected: a == l,
            ghost: !i[a].show
          };
        }));
        this.selected(a);
      };
      this.selected = function (a) {
        var b = this.getChoice();
        var c = [];
        for (var d in b) {
          if (a[d] && a[d].length) {
            if (d == "voice") {
              c.push(w[d] + ": " + a[d][b[d]]);
            } else if (d !== "source") {
              if (a.season.length >= 1) {
                c.push(w.season + ": " + a[d][b[d]]);
              }
            }
          }
        }
        h.chosen("filter", c);
        h.chosen("sort", [i[l].name]);
      };
      this.getEpisodes = function (c, d) {
        var e = [];
        if (["cub", "tmdb"].indexOf(a.movie.source || "tmdb") == -1) {
          return d(e);
        }
        if (typeof a.movie.id == "number" && a.movie.name) {
          var f = "tv/" + a.movie.id + "/season/" + c + "?api_key=" + Lampa.TMDB.key() + "&language=" + Lampa.Storage.get("language", "ru");
          var g = Lampa.TMDB.api(f);
          b.timeout(10000);
          b.native(g, function (a) {
            e = a.episodes || [];
            d(e);
          }, function (a, b) {
            d(e);
          });
        } else {
          d(e);
        }
      };
      this.watched = function (b) {
        var c = Lampa.Utils.hash(a.movie.number_of_seasons ? a.movie.original_name : a.movie.original_title);
        var d = Lampa.Storage.cache("online_watched_last", 5000, {});
        if (b) {
          if (!d[c]) {
            d[c] = {};
          }
          Lampa.Arrays.extend(d[c], b, true);
          Lampa.Storage.set("online_watched_last", d);
          this.updateWatched();
        } else {
          return d[c];
        }
      };
      this.updateWatched = function () {
        var a = this.watched();
        var b = d.body().find(".online-prestige-watched .online-prestige-watched__body").empty();
        if (a) {
          var c = [];
          if (a.balanser_name) {
            c.push(a.balanser_name);
          }
          if (a.voice_name) {
            c.push(a.voice_name);
          }
          if (a.season) {
            c.push(Lampa.Lang.translate("torrent_serial_season") + " " + a.season);
          }
          if (a.episode) {
            c.push(Lampa.Lang.translate("torrent_serial_episode") + " " + a.episode);
          }
          c.forEach(function (a) {
            b.append("<span>" + a + "</span>");
          });
        } else {
          b.append("<span>" + Lampa.Lang.translate("lampac_no_watch_history") + "</span>");
        }
      };
      this.draw = function (b) {
        var c = this;
        var e = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (!b.length) {
          return this.empty();
        }
        d.clear();
        d.append(Lampa.Template.get("lampac_prestige_watched", {}));
        this.updateWatched();
        this.getEpisodes(b[0].season, function (f) {
          var g = Lampa.Storage.cache("online_view", 5000, []);
          var h = a.movie.name ? true : false;
          var k = c.getChoice();
          var m = window.innerWidth > 480;
          var n = false;
          var p = false;
          b.forEach(function (q, r) {
            var s = h && f.length && !e.similars ? f.find(function (a) {
              return a.episode_number == q.episode;
            }) : false;
            var t = q.episode || r + 1;
            var u = k.episodes_view[q.season];
            var v = k.voice_name || (x.voice[0] ? x.voice[0].title : false) || q.voice_name || (h ? "Неизвестно" : q.text) || "Неизвестно";
            if (q.quality) {
              q.qualitys = q.quality;
              q.quality = Lampa.Arrays.getKeys(q.quality)[0];
            }
            Lampa.Arrays.extend(q, {
              voice_name: v,
              info: v.length > 60 ? v.substr(0, 60) + "..." : v,
              quality: "",
              time: Lampa.Utils.secondsToTime((s ? s.runtime : a.movie.runtime) * 60, true)
            });
            var w = Lampa.Utils.hash(q.season ? [q.season, q.season > 10 ? ":" : "", q.episode, a.movie.original_title].join("") : a.movie.original_title);
            var y = Lampa.Utils.hash(q.season ? [q.season, q.season > 10 ? ":" : "", q.episode, a.movie.original_title, q.voice_name].join("") : a.movie.original_title + q.voice_name);
            var z = {
              hash_timeline: w,
              hash_behold: y
            };
            var A = z;
            var B = [];
            if (q.season) {
              q.translate_episode_end = c.getLastEpisode(b);
              q.translate_voice = q.voice_name;
            }
            if (q.text && !s) {
              q.title = q.text;
            }
            q.timeline = Lampa.Timeline.view(w);
            if (s) {
              q.title = s.name;
              if (q.info.length < 30 && s.vote_average) {
                B.push(Lampa.Template.get("lampac_prestige_rate", {
                  rate: parseFloat(s.vote_average + "").toFixed(1)
                }, true));
              }
              if (s.air_date && m) {
                B.push(Lampa.Utils.parseTime(s.air_date).full);
              }
            } else if (a.movie.release_date && m) {
              B.push(Lampa.Utils.parseTime(a.movie.release_date).full);
            }
            if (!h && a.movie.tagline && q.info.length < 30) {
              B.push(a.movie.tagline);
            }
            if (q.info) {
              B.push(q.info);
            }
            if (B.length) {
              q.info = B.map(function (a) {
                return "<span>" + a + "</span>";
              }).join("<span class=\"online-prestige-split\">●</span>");
            }
            var C = Lampa.Template.get("lampac_prestige_full", q);
            var D = C.find(".online-prestige__loader");
            var E = C.find(".online-prestige__img");
            if (!h) {
              if (k.movie_view == y) {
                n = C;
              }
            } else if (typeof u !== "undefined" && u == t) {
              n = C;
            }
            if (h && !s) {
              E.append("<div class=\"online-prestige__episode-number\">" + ("0" + (q.episode || r + 1)).slice(-2) + "</div>");
              D.remove();
            } else if (!h && ["cub", "tmdb"].indexOf(a.movie.source || "tmdb") == -1) {
              D.remove();
            } else {
              var F = C.find("img")[0];
              F.onerror = function () {
                F.src = "./img/img_broken.svg";
              };
              F.onload = function () {
                E.addClass("online-prestige__img--loaded");
                D.remove();
                if (h) {
                  E.append("<div class=\"online-prestige__episode-number\">" + ("0" + (q.episode || r + 1)).slice(-2) + "</div>");
                }
              };
              F.src = Lampa.TMDB.image("t/p/w300" + (s ? s.still_path : a.movie.backdrop_path));
              o.push(F);
            }
            C.find(".online-prestige__timeline").append(Lampa.Timeline.render(q.timeline));
            if (g.indexOf(y) !== -1) {
              p = C;
              C.find(".online-prestige__img").append("<div class=\"online-prestige__viewed\">" + Lampa.Template.get("icon_viewed", {}, true) + "</div>");
            }
            q.mark = function () {
              g = Lampa.Storage.cache("online_view", 5000, []);
              if (g.indexOf(y) == -1) {
                g.push(y);
                Lampa.Storage.set("online_view", g);
                if (C.find(".online-prestige__viewed").length == 0) {
                  C.find(".online-prestige__img").append("<div class=\"online-prestige__viewed\">" + Lampa.Template.get("icon_viewed", {}, true) + "</div>");
                }
              }
              k = c.getChoice();
              if (!h) {
                k.movie_view = y;
              } else {
                k.episodes_view[q.season] = t;
              }
              c.saveChoice(k);
              var a = k.voice_name || q.voice_name || q.title;
              if (a.length > 30) {
                a = a.slice(0, 30) + "...";
              }
              c.watched({
                balanser: l,
                balanser_name: Lampa.Utils.capitalizeFirstLetter(i[l].name.split(" ")[0]),
                voice_id: k.voice_id,
                voice_name: a,
                episode: q.episode,
                season: q.season
              });
            };
            q.unmark = function () {
              g = Lampa.Storage.cache("online_view", 5000, []);
              if (g.indexOf(y) !== -1) {
                Lampa.Arrays.remove(g, y);
                Lampa.Storage.set("online_view", g);
                Lampa.Storage.remove("online_view", y);
                C.find(".online-prestige__viewed").remove();
              }
            };
            q.timeclear = function () {
              q.timeline.percent = 0;
              q.timeline.time = 0;
              q.timeline.duration = 0;
              Lampa.Timeline.update(q.timeline);
            };
            C.on("hover:enter", function () {
              if (a.movie.id) {
                Lampa.Favorite.add("history", a.movie, 100);
              }
              if (e.onEnter) {
                e.onEnter(q, C, A);
              }
            }).on("hover:focus", function (a) {
              j = a.target;
              if (e.onFocus) {
                e.onFocus(q, C, A);
              }
              d.update($(a.target), true);
            });
            if (e.onRender) {
              e.onRender(q, C, A);
            }
            c.contextMenu({
              html: C,
              element: q,
              onFile: function b(a) {
                if (e.onContextMenu) {
                  e.onContextMenu(q, C, A, a);
                }
              },
              onClearAllMark: function a() {
                b.forEach(function (a) {
                  a.unmark();
                });
              },
              onClearAllTime: function a() {
                b.forEach(function (a) {
                  a.timeclear();
                });
              }
            });
            d.append(C);
          });
          if (h && f.length > b.length && !e.similars) {
            var q = f.slice(b.length);
            q.forEach(function (c) {
              var e = [];
              if (c.vote_average) {
                e.push(Lampa.Template.get("lampac_prestige_rate", {
                  rate: parseFloat(c.vote_average + "").toFixed(1)
                }, true));
              }
              if (c.air_date) {
                e.push(Lampa.Utils.parseTime(c.air_date).full);
              }
              var f = new Date((c.air_date + "").replace(/-/g, "/"));
              var g = Date.now();
              var h = Math.round((f.getTime() - g) / 86400000);
              var i = Lampa.Lang.translate("full_episode_days_left") + ": " + h;
              var k = Lampa.Template.get("lampac_prestige_full", {
                time: Lampa.Utils.secondsToTime((c ? c.runtime : a.movie.runtime) * 60, true),
                info: e.length ? e.map(function (a) {
                  return "<span>" + a + "</span>";
                }).join("<span class=\"online-prestige-split\">●</span>") : "",
                title: c.name,
                quality: h > 0 ? i : ""
              });
              var l = k.find(".online-prestige__loader");
              var m = k.find(".online-prestige__img");
              var n = b[0] ? b[0].season : 1;
              k.find(".online-prestige__timeline").append(Lampa.Timeline.render(Lampa.Timeline.view(Lampa.Utils.hash([n, c.episode_number, a.movie.original_title].join("")))));
              var p = k.find("img")[0];
              if (c.still_path) {
                p.onerror = function () {
                  p.src = "./img/img_broken.svg";
                };
                p.onload = function () {
                  m.addClass("online-prestige__img--loaded");
                  l.remove();
                  m.append("<div class=\"online-prestige__episode-number\">" + ("0" + c.episode_number).slice(-2) + "</div>");
                };
                p.src = Lampa.TMDB.image("t/p/w300" + c.still_path);
                o.push(p);
              } else {
                l.remove();
                m.append("<div class=\"online-prestige__episode-number\">" + ("0" + c.episode_number).slice(-2) + "</div>");
              }
              k.on("hover:focus", function (a) {
                j = a.target;
                d.update($(a.target), true);
              });
              k.css("opacity", "0.5");
              d.append(k);
            });
          }
          if (n) {
            j = n[0];
          } else if (p) {
            j = p[0];
          }
          Lampa.Controller.enable("content");
        });
      };
      this.contextMenu = function (b) {
        b.html.on("hover:long", function () {
          function c(c) {
            var d = Lampa.Controller.enabled().name;
            var e = [];
            if (Lampa.Platform.is("webos")) {
              e.push({
                title: Lampa.Lang.translate("player_lauch") + " - Webos",
                player: "webos"
              });
            }
            if (Lampa.Platform.is("android")) {
              e.push({
                title: Lampa.Lang.translate("player_lauch") + " - Android",
                player: "android"
              });
            }
            e.push({
              title: Lampa.Lang.translate("player_lauch") + " - Lampa",
              player: "lampa"
            });
            e.push({
              title: Lampa.Lang.translate("lampac_video"),
              separator: true
            });
            e.push({
              title: Lampa.Lang.translate("torrent_parser_label_title"),
              mark: true
            });
            e.push({
              title: Lampa.Lang.translate("torrent_parser_label_cancel_title"),
              unmark: true
            });
            e.push({
              title: Lampa.Lang.translate("time_reset"),
              timeclear: true
            });
            if (c) {
              e.push({
                title: Lampa.Lang.translate("copy_link"),
                copylink: true
              });
            }
            e.push({
              title: Lampa.Lang.translate("more"),
              separator: true
            });
            if (Lampa.Account.logged() && b.element && typeof b.element.season !== "undefined" && b.element.translate_voice) {
              e.push({
                title: Lampa.Lang.translate("lampac_voice_subscribe"),
                subscribe: true
              });
            }
            e.push({
              title: Lampa.Lang.translate("lampac_clear_all_marks"),
              clearallmark: true
            });
            e.push({
              title: Lampa.Lang.translate("lampac_clear_all_timecodes"),
              timeclearall: true
            });
            Lampa.Select.show({
              title: Lampa.Lang.translate("title_action"),
              items: e,
              onBack: function a() {
                Lampa.Controller.toggle(d);
              },
              onSelect: function f(e) {
                if (e.mark) {
                  b.element.mark();
                }
                if (e.unmark) {
                  b.element.unmark();
                }
                if (e.timeclear) {
                  b.element.timeclear();
                }
                if (e.clearallmark) {
                  b.onClearAllMark();
                }
                if (e.timeclearall) {
                  b.onClearAllTime();
                }
                Lampa.Controller.toggle(d);
                if (e.player) {
                  Lampa.Player.runas(e.player);
                  b.html.trigger("hover:enter");
                }
                if (e.copylink) {
                  if (c.quality) {
                    var g = [];
                    for (var h in c.quality) {
                      var i = {
                        title: h,
                        file: c.quality[h]
                      };
                      g.push(i);
                    }
                    Lampa.Select.show({
                      title: Lampa.Lang.translate("settings_server_links"),
                      items: g,
                      onBack: function a() {
                        Lampa.Controller.toggle(d);
                      },
                      onSelect: function b(a) {
                        Lampa.Utils.copyTextToClipboard(a.file, function () {
                          Lampa.Noty.show(Lampa.Lang.translate("copy_secuses"));
                        }, function () {
                          Lampa.Noty.show(Lampa.Lang.translate("copy_error"));
                        });
                      }
                    });
                  } else {
                    Lampa.Utils.copyTextToClipboard(c.file, function () {
                      Lampa.Noty.show(Lampa.Lang.translate("copy_secuses"));
                    }, function () {
                      Lampa.Noty.show(Lampa.Lang.translate("copy_error"));
                    });
                  }
                }
                if (e.subscribe) {
                  var j = {
                    card: a.movie,
                    season: b.element.season,
                    episode: b.element.translate_episode_end,
                    voice: b.element.translate_voice
                  };
                  Lampa.Account.subscribeToTranslation(j, function () {
                    Lampa.Noty.show(Lampa.Lang.translate("lampac_voice_success"));
                  }, function () {
                    Lampa.Noty.show(Lampa.Lang.translate("lampac_voice_error"));
                  });
                }
              }
            });
          }
          b.onFile(c);
        }).on("hover:focus", function () {
          if (Lampa.Helper) {
            Lampa.Helper.show("online_file", Lampa.Lang.translate("helper_online_file"), b.html);
          }
        });
      };
      this.empty = function () {
        var a = Lampa.Template.get("lampac_does_not_answer", {});
        a.find(".online-empty__buttons").remove();
        a.find(".online-empty__title").text(Lampa.Lang.translate("empty_title_two"));
        a.find(".online-empty__time").text(Lampa.Lang.translate("empty_text"));
        d.clear();
        d.append(a);
        this.loading(false);
      };
      this.noConnectToServer = function (a) {
        var b = Lampa.Template.get("lampac_does_not_answer", {});
        b.find(".online-empty__buttons").remove();
        b.find(".online-empty__title").text(Lampa.Lang.translate("title_error"));
        b.find(".online-empty__time").text(a && a.accsdb ? a.msg : Lampa.Lang.translate("lampac_does_not_answer_text").replace("{balanser}", l[l].name));
        d.clear();
        d.append(b);
        this.loading(false);
      };
      this.doesNotAnswer = function () {
        var a = this;
        this.reset();
        var b = {
          balanser: l
        };
        var c = Lampa.Template.get("lampac_does_not_answer", b);
        var e = 4;
        c.find(".cancel").on("hover:enter", function () {
          clearInterval(n);
        });
        c.find(".change").on("hover:enter", function () {
          clearInterval(n);
          h.render().find(".filter--sort").trigger("hover:enter");
        });
        d.clear();
        d.append(c);
        this.loading(false);
        n = // TOLOOK
        setInterval(function () {
          e--;
          c.find(".timeout").text(e);
          if (e == 0) {
            clearInterval(n);
            var b = Lampa.Arrays.getKeys(i);
            var d = b.indexOf(l);
            var f = b[d + 1];
            if (!f) {
              f = b[0];
            }
            l = f;
            if (Lampa.Activity.active().activity == a.activity) {
              a.changeBalanser(l);
            }
          }
        }, 1000);
      };
      this.getLastEpisode = function (a) {
        var b = 0;
        a.forEach(function (a) {
          if (typeof a.episode !== "undefined") {
            b = Math.max(b, parseInt(a.episode));
          }
        });
        return b;
      };
      this.start = function () {
        if (Lampa.Activity.active().activity !== this.activity) {
          return;
        }
        if (!m) {
          m = true;
          this.initialize();
        }
        Lampa.Background.immediately(Lampa.Utils.cardImgBackgroundBlur(a.movie));
        Lampa.Controller.add("content", {
          toggle: function a() {
            Lampa.Controller.collectionSet(d.render(), f.render());
            Lampa.Controller.collectionFocus(j || false, d.render());
          },
          gone: function a() {
            clearTimeout(n);
          },
          up: function a() {
            if (Navigator.canmove("up")) {
              Navigator.move("up");
            } else {
              Lampa.Controller.toggle("head");
            }
          },
          down: function a() {
            Navigator.move("down");
          },
          right: function a() {
            if (Navigator.canmove("right")) {
              Navigator.move("right");
            } else {
              h.show(Lampa.Lang.translate("title_filter"), "filter");
            }
          },
          left: function a() {
            if (Navigator.canmove("left")) {
              Navigator.move("left");
            } else {
              Lampa.Controller.toggle("menu");
            }
          },
          back: this.back.bind(this)
        });
        Lampa.Controller.toggle("content");
      };
      this.render = function () {
        return f.render();
      };
      this.back = function () {
        Lampa.Activity.backward();
      };
      this.pause = function () {};
      this.stop = function () {};
      this.destroy = function () {
        b.clear();
        this.clearImages();
        f.destroy();
        d.destroy();
        clearInterval(n);
        clearTimeout(s);
        clearTimeout(u);
        if (t) {
          t.stop();
          t = null;
        }
      };
    }
    function i() {
      window.showy_plugin = true;
      var e = {
        type: "video",
        version: "1.2.6",
        name: "Showy",
        description: "Плагин для просмотра онлайн сериалов и фильмов",
        component: "showy",
        onContextMenu: function b(a) {
          return {
            name: Lampa.Lang.translate("lampac_watch"),
            description: "Плагин для просмотра онлайн сериалов и фильмов"
          };
        },
        onContextLauch: function b(a) {
          f();
          Lampa.Component.add("showy", h);
          Lampa.Activity.push({
            url: "",
            title: Lampa.Lang.translate("title_online"),
            component: "showy",
            search: a.title,
            search_one: a.title,
            search_two: a.original_title,
            movie: a,
            page: 1
          });
        }
      };
      Lampa.Manifest.plugins = e;
      Lampa.Lang.add({
        lampac_watch: {
          ru: "Смотреть онлайн",
          en: "Watch online",
          uk: "Дивитися онлайн",
          zh: "在线观看"
        },
        lampac_video: {
          ru: "Видео",
          en: "Video",
          uk: "Відео",
          zh: "视频"
        },
        lampac_no_watch_history: {
          ru: "Нет истории просмотра",
          en: "No browsing history",
          ua: "Немає історії перегляду",
          zh: "没有浏览历史"
        },
        lampac_nolink: {
          ru: "Не удалось извлечь ссылку",
          uk: "Неможливо отримати посилання",
          en: "Failed to fetch link",
          zh: "获取链接失败"
        },
        lampac_balanser: {
          ru: "Источник",
          uk: "Джерело",
          en: "Source",
          zh: "来源"
        },
        helper_online_file: {
          ru: "Удерживайте клавишу \"ОК\" для вызова контекстного меню",
          uk: "Утримуйте клавішу \"ОК\" для виклику контекстного меню",
          en: "Hold the \"OK\" key to bring up the context menu",
          zh: "按住“确定”键调出上下文菜单"
        },
        title_online: {
          ru: "Онлайн",
          uk: "Онлайн",
          en: "Online",
          zh: "在线的"
        },
        lampac_voice_subscribe: {
          ru: "Подписаться на перевод",
          uk: "Підписатися на переклад",
          en: "Subscribe to translation",
          zh: "订阅翻译"
        },
        lampac_voice_success: {
          ru: "Вы успешно подписались",
          uk: "Ви успішно підписалися",
          en: "You have successfully subscribed",
          zh: "您已成功订阅"
        },
        lampac_voice_error: {
          ru: "Возникла ошибка",
          uk: "Виникла помилка",
          en: "An error has occurred",
          zh: "发生了错误"
        },
        lampac_clear_all_marks: {
          ru: "Очистить все метки",
          uk: "Очистити всі мітки",
          en: "Clear all labels",
          zh: "清除所有标签"
        },
        lampac_clear_all_timecodes: {
          ru: "Очистить все тайм-коды",
          uk: "Очистити всі тайм-коди",
          en: "Clear all timecodes",
          zh: "清除所有时间代码"
        },
        lampac_change_balanser: {
          ru: "Изменить балансер",
          uk: "Змінити балансер",
          en: "Change balancer",
          zh: "更改平衡器"
        },
        lampac_balanser_dont_work: {
          ru: "Поиск на ({balanser}) не дал результатов",
          uk: "Пошук на ({balanser}) не дав результатів",
          en: "Search on ({balanser}) did not return any results",
          zh: "搜索 ({balanser}) 未返回任何结果"
        },
        lampac_balanser_timeout: {
          ru: "Источник будет переключен автоматически через <span class=\"timeout\">10</span> секунд.",
          uk: "Джерело буде автоматично переключено через <span class=\"timeout\">10</span> секунд.",
          en: "The source will be switched automatically after <span class=\"timeout\">10</span> seconds.",
          zh: "平衡器将在<span class=\"timeout\">10</span>秒内自动切换。"
        },
        lampac_does_not_answer_text: {
          ru: "Поиск на ({balanser}) не дал результатов",
          uk: "Пошук на ({balanser}) не дав результатів",
          en: "Search on ({balanser}) did not return any results",
          zh: "搜索 ({balanser}) 未返回任何结果"
        }
      });
      Lampa.Template.add("lampac_css", `
        <style>
        @charset 'UTF-8';.online-prestige{position:relative;-webkit-border-radius:.3em;border-radius:.3em;background-color:rgba(0,0,0,0.3);display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-prestige__body{padding:1.2em;line-height:1.3;-webkit-box-flex:1;-webkit-flex-grow:1;-moz-box-flex:1;-ms-flex-positive:1;flex-grow:1;position:relative}@media screen and (max-width:480px){.online-prestige__body{padding:.8em 1.2em}}.online-prestige__img{position:relative;width:13em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;min-height:8.2em}.online-prestige__img>img{position:absolute;top:0;left:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-border-radius:.3em;border-radius:.3em;opacity:0;-webkit-transition:opacity .3s;-o-transition:opacity .3s;-moz-transition:opacity .3s;transition:opacity .3s}.online-prestige__img--loaded>img{opacity:1}@media screen and (max-width:480px){.online-prestige__img{width:7em;min-height:6em}}.online-prestige__folder{padding:1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige__folder>svg{width:4.4em !important;height:4.4em !important}.online-prestige__viewed{position:absolute;top:1em;left:1em;background:rgba(0,0,0,0.45);-webkit-border-radius:100%;border-radius:100%;padding:.25em;font-size:.76em}.online-prestige__viewed>svg{width:1.5em !important;height:1.5em !important}.online-prestige__episode-number{position:absolute;top:0;left:0;right:0;bottom:0;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-moz-box-pack:center;-ms-flex-pack:center;justify-content:center;font-size:2em}.online-prestige__loader{position:absolute;top:50%;left:50%;width:2em;height:2em;margin-left:-1em;margin-top:-1em;background:url(./img/loader.svg) no-repeat center center;-webkit-background-size:contain;-o-background-size:contain;background-size:contain}.online-prestige__head,.online-prestige__footer{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;-moz-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige__timeline{margin:.8em 0}.online-prestige__timeline>.time-line{display:block !important}.online-prestige__title{font-size:1.7em;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}@media screen and (max-width:480px){.online-prestige__title{font-size:1.4em}}.online-prestige__time{padding-left:2em}.online-prestige__info{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige__info>*{overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:1;line-clamp:1;-webkit-box-orient:vertical}.online-prestige__quality{padding-left:1em;white-space:nowrap}.online-prestige__scan-file{position:absolute;bottom:0;left:0;right:0}.online-prestige__scan-file .broadcast__scan{margin:0}.online-prestige .online-prestige-split{font-size:.8em;margin:0 1em;-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0}.online-prestige.focus::after{content:'';position:absolute;top:-0.6em;left:-0.6em;right:-0.6em;bottom:-0.6em;-webkit-border-radius:.7em;border-radius:.7em;border:solid .3em #fff;z-index:-1;pointer-events:none}.online-prestige+.online-prestige{margin-top:1.5em}.online-prestige--folder .online-prestige__footer{margin-top:.8em}.online-prestige-watched{padding:1em}.online-prestige-watched__icon>svg{width:1.5em;height:1.5em}.online-prestige-watched__body{padding-left:1em;padding-top:.1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.online-prestige-watched__body>span+span::before{content:' ● ';vertical-align:top;display:inline-block;margin:0 .5em}.online-prestige-rate{display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center}.online-prestige-rate>svg{width:1.3em !important;height:1.3em !important}.online-prestige-rate>span{font-weight:600;font-size:1.1em;padding-left:.7em}.online-empty{line-height:1.4}.online-empty__title{font-size:1.8em;margin-bottom:.3em}.online-empty__time{font-size:1.2em;font-weight:300;margin-bottom:1.6em}.online-empty__buttons{display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex}.online-empty__buttons>*+*{margin-left:1em}.online-empty__button{background:rgba(0,0,0,0.3);font-size:1.2em;padding:.5em 1.2em;-webkit-border-radius:.2em;border-radius:.2em;margin-bottom:2.4em}.online-empty__button.focus{background:#fff;color:black}.online-empty__templates .online-empty-template:nth-child(2){opacity:.5}.online-empty__templates .online-empty-template:nth-child(3){opacity:.2}.online-empty-template{background-color:rgba(255,255,255,0.3);padding:1em;display:-webkit-box;display:-webkit-flex;display:-moz-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-moz-box-align:center;-ms-flex-align:center;align-items:center;-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template>*{background:rgba(0,0,0,0.3);-webkit-border-radius:.3em;border-radius:.3em}.online-empty-template__ico{width:4em;height:4em;margin-right:2.4em}.online-empty-template__body{height:1.7em;width:70%}.online-empty-template+.online-empty-template{margin-top:1em}
        </style>
    `);
      $("body").append(Lampa.Template.get("lampac_css", {}, true));
      function f() {
        Lampa.Template.add("lampac_prestige_full", `<div class="online-prestige online-prestige--full selector">
            <div class="online-prestige__img">
                <img alt="">
                <div class="online-prestige__loader"></div>
            </div>
            <div class="online-prestige__body">
                <div class="online-prestige__head">
                    <div class="online-prestige__title">{title}</div>
                    <div class="online-prestige__time">{time}</div>
                </div>

                <div class="online-prestige__timeline"></div>

                <div class="online-prestige__footer">
                    <div class="online-prestige__info">{info}</div>
                    <div class="online-prestige__quality">{quality}</div>
                </div>
            </div>
        </div>`);
        Lampa.Template.add("lampac_content_loading", `<div class="online-empty">
            <div class="broadcast__scan"><div></div></div>
\t\t\t
            <div class="online-empty__templates">
                <div class="online-empty-template selector">
                    <div class="online-empty-template__ico"></div>
                    <div class="online-empty-template__body"></div>
                </div>
                <div class="online-empty-template">
                    <div class="online-empty-template__ico"></div>
                    <div class="online-empty-template__body"></div>
                </div>
                <div class="online-empty-template">
                    <div class="online-empty-template__ico"></div>
                    <div class="online-empty-template__body"></div>
                </div>
            </div>
        </div>`);
        Lampa.Template.add("lampac_does_not_answer", `<div class="online-empty">
            <div class="online-empty__title">
                #{lampac_balanser_dont_work}
            </div>
            <div class="online-empty__time">
                #{lampac_balanser_timeout}
            </div>
            <div class="online-empty__buttons">
                <div class="online-empty__button selector cancel">#{cancel}</div>
                <div class="online-empty__button selector change">#{lampac_change_balanser}</div>
            </div>
            <div class="online-empty__templates">
                <div class="online-empty-template">
                    <div class="online-empty-template__ico"></div>
                    <div class="online-empty-template__body"></div>
                </div>
                <div class="online-empty-template">
                    <div class="online-empty-template__ico"></div>
                    <div class="online-empty-template__body"></div>
                </div>
                <div class="online-empty-template">
                    <div class="online-empty-template__ico"></div>
                    <div class="online-empty-template__body"></div>
                </div>
            </div>
        </div>`);
        Lampa.Template.add("lampac_prestige_rate", `<div class="online-prestige-rate">
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.39409 0.192139L10.99 5.30994L16.7882 6.20387L12.5475 10.4277L13.5819 15.9311L8.39409 13.2425L3.20626 15.9311L4.24065 10.4277L0 6.20387L5.79819 5.30994L8.39409 0.192139Z" fill="#fff"></path>
            </svg>
            <span>{rate}</span>
        </div>`);
        Lampa.Template.add("lampac_prestige_folder", `<div class="online-prestige online-prestige--folder selector">
            <div class="online-prestige__folder">
                <svg viewBox="0 0 128 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="20" width="128" height="92" rx="13" fill="white"></rect>
                    <path d="M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z" fill="white" fill-opacity="0.23"></path>
                    <rect x="11" y="8" width="106" height="76" rx="13" fill="white" fill-opacity="0.51"></rect>
                </svg>
            </div>
            <div class="online-prestige__body">
                <div class="online-prestige__head">
                    <div class="online-prestige__title">{title}</div>
                    <div class="online-prestige__time">{time}</div>
                </div>

                <div class="online-prestige__footer">
                    <div class="online-prestige__info">{info}</div>
                </div>
            </div>
        </div>`);
        Lampa.Template.add("lampac_prestige_watched", `<div class="online-prestige online-prestige-watched selector">
            <div class="online-prestige-watched__icon">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10.5" cy="10.5" r="9" stroke="currentColor" stroke-width="3"/>
                    <path d="M14.8477 10.5628L8.20312 14.399L8.20313 6.72656L14.8477 10.5628Z" fill="currentColor"/>
                </svg>
            </div>
            <div class="online-prestige-watched__body">
                
            </div>
        </div>`);
      }
      var g = `<div class="full-start__button selector view--online_showy showy--button" data-subtitle="${e.name} v${e.version}${`">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 392.697 392.697" xml:space="preserve">
            <path d="M21.837,83.419l36.496,16.678L227.72,19.886c1.229-0.592,2.002-1.846,1.98-3.209c-0.021-1.365-0.834-2.592-2.082-3.145
                L197.766,0.3c-0.903-0.4-1.933-0.4-2.837,0L21.873,77.036c-1.259,0.559-2.073,1.803-2.081,3.18
                C19.784,81.593,20.584,82.847,21.837,83.419z" fill="currentColor"></path>
            <path d="M185.689,177.261l-64.988-30.01v91.617c0,0.856-0.44,1.655-1.167,2.114c-0.406,0.257-0.869,0.386-1.333,0.386
                c-0.368,0-0.736-0.082-1.079-0.244l-68.874-32.625c-0.869-0.416-1.421-1.293-1.421-2.256v-92.229L6.804,95.5
                c-1.083-0.496-2.344-0.406-3.347,0.238c-1.002,0.645-1.608,1.754-1.608,2.944v208.744c0,1.371,0.799,2.615,2.045,3.185
                l178.886,81.768c0.464,0.211,0.96,0.315,1.455,0.315c0.661,0,1.318-0.188,1.892-0.555c1.002-0.645,1.608-1.754,1.608-2.945
                V180.445C187.735,179.076,186.936,177.831,185.689,177.261z" fill="currentColor"></path>
            <path d="M389.24,95.74c-1.002-0.644-2.264-0.732-3.347-0.238l-178.876,81.76c-1.246,0.57-2.045,1.814-2.045,3.185v208.751
                c0,1.191,0.606,2.302,1.608,2.945c0.572,0.367,1.23,0.555,1.892,0.555c0.495,0,0.991-0.104,1.455-0.315l178.876-81.768
                c1.246-0.568,2.045-1.813,2.045-3.185V98.685C390.849,97.494,390.242,96.384,389.24,95.74z" fill="currentColor"></path>
            <path d="M372.915,80.216c-0.009-1.377-0.823-2.621-2.082-3.18l-60.182-26.681c-0.938-0.418-2.013-0.399-2.938,0.045
                l-173.755,82.992l60.933,29.117c0.462,0.211,0.958,0.316,1.455,0.316s0.993-0.105,1.455-0.316l173.066-79.092
                C372.122,82.847,372.923,81.593,372.915,80.216z" fill="currentColor"></path>
        </svg>

        <span>#{title_online}</span>
    </div>`}`;
      Lampa.Component.add("showy", h);
      f();
      function i(a) {
        if (a.render.find(".showy--button").length) {
          return;
        }
        var b = $(Lampa.Lang.translate(g));
        b.on("hover:enter", function () {
          f();
          Lampa.Component.add("showy", h);
          Lampa.Activity.push({
            url: "",
            title: Lampa.Lang.translate("title_online"),
            component: "showy",
            search: a.movie.title,
            search_one: a.movie.title,
            search_two: a.movie.original_title,
            movie: a.movie,
            page: 1
          });
        });
        a.render.before(b);
      }
      Lampa.Listener.follow("full", function (a) {
        if (a.type == "complite") {
          if (Lampa.Storage.get("card_interfice_type") === "new") {
            i({
              render: a.object.activity.render().find(".button--play"),
              movie: a.data.movie
            });
          } else {
            i({
              render: a.object.activity.render().find(".view--torrent"),
              movie: a.data.movie
            });
          }
        }
      });
      try {
        if (Lampa.Activity.active().component == "full") {
          i({
            render: Lampa.Activity.active().activity.render().find(".view--torrent"),
            movie: Lampa.Activity.active().card
          });
        }
      } catch (a) {}
      if (Lampa.Manifest.app_digital >= 177) {
        var j = ["filmix", "fxapi", "kinobase", "rezka", "voidboost", "videocdn", "videodb", "collaps", "hdvb", "zetflix", "kodik", "ashdi", "eneyida", "kinoukr", "kinokrad", "kinotochka", "kinoprofi", "remux", "iframevideo", "cdnmovies", "anilibria", "animedia", "animego", "animevost", "animebesst", "redheadsound", "alloha", "seasonvar", "kinopub", "vokino"];
        j.forEach(function (a) {
          Lampa.Storage.sync("online_choice_" + a, "object_object");
        });
        Lampa.Storage.sync("online_watched_last", "object_object");
      }
    }
    Lampa.Listener.follow("full", function (a) {
      if (a.type == "complite") {
        // TOLOOK
        setTimeout(function () {
          $(".view--online_showy", Lampa.Activity.active().activity.render()).empty().append("<svg width=\"512\" height=\"512\" viewBox=\"0 0 512 512\" style=\"color:currentColor\" xmlns=\"http://www.w3.org/2000/svg\" class=\"h-full w-full\"><rect width=\"512\" height=\"512\" x=\"0\" y=\"0\" rx=\"30\" fill=\"transparent\" stroke=\"transparent\" stroke-width=\"0\" stroke-opacity=\"100%\" paint-order=\"stroke\"></rect><svg width=\"512px\" height=\"512px\" viewBox=\"0 0 16 16\" fill=\"currentColor\" x=\"0\" y=\"0\" role=\"img\" style=\"display:inline-block;vertical-align:middle\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"currentColor\"><g fill=\"currentColor\"><path d=\"M3.577 8.9v.03h1.828V5.898h-.062a46.781 46.781 0 0 0-1.766 3.001z\"/><path d=\"M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm2.372 3.715l.435-.714h1.71v3.93h.733v.957h-.733V11H5.405V9.888H2.5v-.971c.574-1.077 1.225-2.142 1.872-3.202zm7.73-.714h1.306l-2.14 2.584L13.5 11h-1.428l-1.679-2.624l-.615.7V11H8.59V5.001h1.187v2.686h.057L12.102 5z\"/></g></g></svg></svg>&nbsp&nbspShowy");
        }, 5);
      }
    });
    if (!window.showy_plugin) {
      i();
    }
  })();
})();
