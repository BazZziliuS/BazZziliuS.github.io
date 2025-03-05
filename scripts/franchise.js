;
(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    var c = "https://api.themoviedb.org/3/";
    var d = "?language=en-US&api_key=4ef0d7355d9ffb5151e987764708ce96";
    var e;
    var f;
    function g(a, b, c) {
      return new Promise(function (d, e) {
        var f = new XMLHttpRequest();
        f.open("GET", "https://cors.apn.monster/" + a + (b ? b : "") + (c ? "+" + c : ""));
        f.onload = function () {
          if (f.status === 200) {
            var a = new DOMParser().parseFromString(f.responseText, "text/html");
            d(a);
          } else {
            e(f.status);
          }
        };
        f.onerror = function () {
          e(f.status);
        };
        f.send();
      });
    }
    function h(a) {
      return a.replace(/[\s.,:;''`!?]+/g, "%20").trim();
    }
    function i(a) {
      return h(a.toLowerCase().replace(/[\-\u2010-\u2015\u2E3A\u2E3B\uFE58\uFE63\uFF0D]+/g, "-").replace(/ё/g, "е"));
    }
    function j(a, b) {
      var c = g("https://hdrezka.ag/search/?do=search&subaction=search&q=", a, b).then(function (a) {
        var b = Array.from(a.getElementsByClassName("b-content__inline_item-link"));
        var c = b[0].children[0].href;
        return g(c, "", "").then(function (a) {
          var b = Array.from(a.getElementsByClassName("b-post__partcontent_item"));
          return k(b);
        });
      });
    }
    function k(a) {
      if (a.length === 0) {
        return;
      }
      var b = "";
      var c = $("<h2>Франшиза</h2>");
      c.css({
        "font-size": "1.6em",
        "font-weight": "normal"
      });
      var d;
      a.forEach(function (a, b) {
        if (a.className.indexOf("current") !== -1) {
          d = b;
        }
      });
      a.forEach(function (a, c) {
        b += "<div id=\"search" + a.children[0].innerText + "\" class=\"stringhide selector " + a.className;
        if (d + 2 >= c && c >= d - 2) {
          b += " show";
        } else {
          b += " hide hdhd";
        }
        b += "\"><span class=\"" + a.children[0].className + "\">" + a.children[0].innerText + "</span><span class=\"" + a.children[1].className + "\">" + a.children[1].innerText + "</span><span class=\"" + a.children[1].className + "\">";
        if ($("a", a.children[1]).attr("href")) {
          b += Lampa.Lang.translate($("a", a.children[1]).attr("href").split("/")[3]);
        } else {
          b += "";
        }
        b += "</span><span class=\"" + a.children[2].className + "\">" + a.children[2].innerText + "</span><span class=\"" + a.children[3].className + "\"><i class=\"hd-tooltip tooltipstered\">" + a.children[3].innerText + "</i></span></div>";
      });
      var e = $("<div id=\"collect\" class=\"collection selector collectionfocus\" style='display: table;width: 100%;'>" + b + "</div>");
      $(".collection").remove();
      $(".full-descr__text").after(e);
      if (a.length > 0) {
        $(".full-descr__text").after(c);
      }
      $("#collect").ready(function () {
        $(".collectionfocus").one("hover:enter", function () {
          $(".hdhd").removeClass("hide");
          $("#collect").removeClass("collectionfocus selector");
          $(".b-post__partcontent_item").bind("hover:enter", function (a) {
            var b = $(this).children()[1].innerText.split("/")[0].trim().replace(/\s+$/, "");
            Lampa.Search.open({
              input: b
            });
          });
        });
      });
    }
    function l(a, b) {
      var e;
      if (b === "movie") {
        e = "https://cors.apn.monster/" + c + "movie/" + a + d;
      } else {
        e = "https://cors.apn.monster/" + c + "tv/" + a + d;
      }
      m(e);
    }
    function m(a) {
      var b;
      var c = new XMLHttpRequest();
      c.open("GET", a, true);
      c.onreadystatechange = function () {
        if (c.readyState === 4 && c.status === 200) {
          var a = JSON.parse(c.responseText);
          b = a.title || a.name;
          j(i(b), f);
        }
      };
      c.send();
    }
    function n() {
      if (Lampa.Storage.get("source") == "cub" || Lampa.Storage.get("source") == "tmdb") {
        window.rezkacoll_plugin = true;
        Lampa.Listener.follow("full", function (a) {
          if (a.type == "complite") {
            Lampa.Lang.add({
              films: {
                ru: "Фильм",
                uk: "Фільм",
                en: "Film",
                be: "Фільм"
              },
              series: {
                ru: "Сериал",
                uk: "Серіал",
                en: "Series",
                be: "Серыял"
              },
              cartoons: {
                ru: "Мультфильм",
                uk: "Мультфільм",
                en: "Cartoon",
                be: "Мультфільм"
              },
              animation: {
                ru: "Аниме",
                uk: "Аніме",
                en: "Anime",
                be: "Анімэ"
              }
            });
            if (a.data.movie.release_date) {
              f = a.data.movie.release_date.slice(0, 4);
            } else if (a.data.movie.first_air) {
              f = a.data.movie.first_air.slice(0, 4);
            } else {
              f = "";
            }
            e = a.data.movie.title || a.data.movie.name;
            l(a.data.movie.id, a.object.method);
            var b = document.createElement("style");
            b.setAttribute("type", "text/css");
            b.innerHTML = ".searchfr{border-radius: 100%;}.td{display:table-cell;border-bottom:2.5px solid rgba(255,255,255,.1);color:rgba(255,255,255);padding:9 10px;font-size: 1.3em;font-weight: normal}.collection{display:table;width:90%}.collectionfocus{}.collectionfocus.focus{outline:outset #FFF}.rating{text-align:center;width:4em}.year{width:8em;text-align:right}.title{text-align:left}.num{text-align:center;width:3em}.b-post__partcontent_item{display:table-row;width:90%}.searchfr.focus{background-color:#fff;color:#000}.b-post__partcontent_item:hover{background-color:#ffffff11}.focus{background-color:#ffffff11}.current{background-color:#ffffff1f}.show{visibility:visible}.hide{visibility:hidden}";
            document.head.appendChild(b);
            // TOLOOK
            setTimeout(function () {
              $(".current").removeClass("current");
              $(".collectionfocus").removeClass("selector");
              if (Navigator.canmove("right")) {
                Navigator.move("right");
              }
              if (Navigator.canmove("left")) {
                Navigator.move("left");
              }
              $(".stringhide.selector.b-post__partcontent_item.show").on("hover:enter", function (a) {
                var b = $(this).children()[1].innerText.split("/")[0].trim().replace(/\s+$/, "");
                Lampa.Search.open({
                  input: b
                });
              });
            }, 2000);
          }
        });
      }
    }
    if (!window.rezkacoll_plugin) {
      n();
    }
  })();
})();
