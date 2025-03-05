(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    window.lampa_settings = {
      socket_use: false,
      socket_url: undefined,
      socket_methods: false,
      account_use: true,
      account_sync: true,
      plugins_use: true,
      plugins_store: true,
      torrents_use: true,
      white_use: false,
      lang_use: true,
      read_only: false,
      dcma: false,
      push_state: true,
      iptv: false,
      feed: false
    };
    window.lampa_settings.disable_features = {
      dmca: true,
      reactions: false,
      discuss: true,
      ai: true,
      subscribe: true,
      blacklist: true,
      persons: true,
      ads: true,
      trailers: false
    };
    var c = 0;
    function d() {
      Lampa.Controller.listener.follow("toggle", function (a) {
        if (a.name == "select") {
          // TOLOOK
          setTimeout(function () {
            if (Lampa.Activity.active().component == "full" && document.querySelector(".ad-server") !== null) {
              $(".ad-server").remove();
            }
            if (Lampa.Activity.active().component === "modss_online") {
              $(".selectbox-item--icon").remove();
            }
          }, 20);
        }
      });
    }
    function e() {
      // TOLOOK
      setTimeout(function () {
        $(".selectbox-item__lock").parent().css("display", "none");
        if (!$("[data-name=\"account_use\"]").length) {
          $("div > span:contains(\"Статус\")").parent().remove();
        }
      }, 10);
    }
    function f() {
      var a = new MutationObserver(function (a) {
        for (var b = 0; b < a.length; b++) {
          var d = a[b];
          if (d.type === "childList") {
            var f = document.getElementsByClassName("card");
            if (f.length > 0 && c === 0) {
              c = 1;
              e();
              // TOLOOK
              setTimeout(function () {
                c = 0;
              }, 500);
            }
          }
        }
      });
      a.observe(document.body, _0x3f7bb7);
    }
    function g() {
      var g = document.createElement("style");
      g.innerHTML = ".button--subscribe { display: none; }";
      document.body.appendChild(g);
      $(document).ready(function () {
        var a = new Date();
        var b = a.getTime();
        localStorage.setItem("region", "{\"code\":\"uk\",\"time\":" + b + "}");
      });
      // TOLOOK
      setTimeout(function () {
        $(".open--notice").remove();
        if ($(".icon--blink").length > 0) {
          $(".icon--blink").remove();
        }
        if ($(".black-friday__button").length > 0) {
          $(".black-friday__button").remove();
        }
        if ($(".christmas__button").length > 0) {
          $(".christmas__button").remove();
        }
      }, 1000);
      Lampa.Settings.listener.follow("open", function (a) {
        if (a.name == "account") {
          // TOLOOK
          setTimeout(function () {
            $(".settings--account-premium").remove();
            $("div > span:contains(\"CUB Premium\")").remove();
          }, 0);
        }
        if (a.name == "server" && document.querySelector(".ad-server") !== null) {
          $(".ad-server").remove();
        }
      });
      Lampa.Listener.follow("full", function (a) {
        if (a.type == "complite") {
          $(".button--book").on("hover:enter", function () {
            e();
          });
        }
      });
      Lampa.Storage.listener.follow("change", function (a) {
        if (a.name == "activity") {
          if (Lampa.Activity.active().component === "bookmarks") {
            $(".register").filter(function () {
              var a = $(this).text().replace(/\d+$/, "").trim();
              return ["Смотрю", "Просмотрено", "Запланировано", "Продолжение следует", "Брошено"].includes(a);
            }).hide();
          }
          // TOLOOK
          setTimeout(function () {
            f();
          }, 200);
        }
      });
    }
    if (window.appready) {
      g();
      f();
      d();
    } else {
      Lampa.Listener.follow("app", function (a) {
        if (a.type == "ready") {
          g();
          f();
          d();
          $("[data-action=timetable]").remove();
        }
      });
    }
  })();
})();
