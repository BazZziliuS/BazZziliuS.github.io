(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    function c() {
      var c = ".notice-unread { position: relative; }.red-dot { position: absolute; top: 0; right: 0; width: 8px; height: 8px; border-radius: 50%; background-color: red; }.notification-item { margin-bottom: 4em; border: 2px solid #d99821; border-radius: 0.8em; padding: 1.5em; background-color: transparent;}.notification-header { display: flex; justify-content: space-between; align-items: center; }.notification-title { flex-grow: 1; margin: 0; font-size: 1.5em; font-style: italic; }.notification-date { background: #d99821; padding: 0.2em; border-radius: 0.4em; color: white; display: inline-block; margin-left: 10px; font-size: 1.3em; text-align: center; }.notification-message { line-height: 1.3em; margin-top: 1.2em; margin-bottom: 0; font-size: 1.3em; padding-left: 1em; }";
      var d = document.createElement("style");
      d.type = "text/css";
      d.innerHTML = c;
      document.head.appendChild(d);
      var e = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.2em\" height=\"1.2em\" viewBox=\"0 0 20 20\"><path fill=\"currentColor\" d=\"M10 0a10 10 0 1 0 10 10A10 10 0 0 0 10 0m1 16H9v-2h2zm0-4H9V4h2z\"/></svg>";
      var f = "<div id=\"NOTICE\" class=\"head__action selector notice-screen notice-unread\">" + e + "</div>";
      $("#app > div.head > div > div.head__actions").append(f);
      $("#NOTICE").insertAfter("div[class=\"head__action selector open--settings\"]");
      g();
      h();
      $("#NOTICE").on("hover:enter hover:click hover:touch", function () {
        i();
      });
      function g() {
        var e = localStorage.getItem("hasNewNotifications");
        if (e === "true") {
          $("#NOTICE").append("<div class=\"red-dot\"></div>");
        }
      }
      function h() {
        var a = new XMLHttpRequest();
        a.open("GET", "https://bazzzilius.github.io/notice/notice.json", true);
        a.onreadystatechange = function () {
          if (a.readyState === 4 && a.status === 200) {
            var b = JSON.parse(a.responseText);
            var c = localStorage.getItem("lastNotices");
            c = c ? JSON.parse(c) : [];
            var d = c.map(function (a) {
              return a.date;
            });
            var e = false;
            for (var f = 0; f < b.length; f++) {
              var g = b[f].date;
              if (d.indexOf(g) === -1) {
                e = true;
                break;
              }
            }
            if (e) {
              localStorage.setItem("hasNewNotifications", "true");
              if ($("#NOTICE .red-dot").length === 0) {
                $("#NOTICE").append("<div class=\"red-dot\"></div>");
              }
            }
            localStorage.setItem("lastNotices", JSON.stringify(b));
          } else if (a.readyState === 4) {
            console.log("Ошибка при загрузке уведомлений с сервера");
            Lampa.Noty.show("Ошибка при загрузке уведомлений с сервера");
          }
        };
        a.send();
      }
      function i() {
        var a = new XMLHttpRequest();
        a.open("GET", "https://bazzzilius.github.io/notice/notice.json", true);
        a.onreadystatechange = function () {
          if (a.readyState === 4 && a.status === 200) {
            var c = JSON.parse(a.responseText);
            b(c);
            $("#NOTICE .red-dot").remove();
            localStorage.setItem("hasNewNotifications", "false");
          } else if (a.readyState === 4) {
            console.log("Ошибка при загрузке уведомлений с сервера");
            Lampa.Noty.show("Ошибка при загрузке уведомлений с сервера");
          }
        };
        a.send();
        function b(a) {
          var b = $("<div style=\"padding: 0.1em;\">");
          for (var c = 0; c < a.length; c++) {
            b.append("<div class=\"notification-item\"><div class=\"notification-header\"><h3 class=\"notification-title\">" + a[c].title + "</h3><span class=\"notification-date\">" + a[c].date + "</span></div><p class=\"notification-message\">" + a[c].message + "</p></div>");
          }
          Lampa.Modal.open({
            title: "Уведомления",
            html: b,
            size: "medium",
            mask: true,
            onBack: function () {
              $(".modal").remove();
              Lampa.Controller.toggle("head");
            },
            onSelect: function () {}
          });
          $(".modal__title").css({
            "text-align": "center",
            background: "linear-gradient(180deg, #ffffff, #d99821)",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
            "font-weight": "bold"
          });
        }
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