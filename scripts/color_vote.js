(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    function c() {
      function e() {
        var a = document.querySelectorAll(".card__vote");
        for (var b = 0; b < a.length; b++) {
          var c = a[b];
          var d = parseFloat(c.textContent.trim());
          c.style.background = "rgba(0, 0, 0, 0.8)";
          if (d >= 0 && d <= 3) {
            c.style.color = "#e74c3c";
          } else if (d > 3 && d <= 5) {
            c.style.color = "#e67e22";
          } else if (d > 5 && d <= 6.5) {
            c.style.color = "#f1c40f";
          } else if (d > 6.5 && d < 8) {
            c.style.color = "#3498db";
          } else if (d >= 8 && d <= 10) {
            c.style.color = "#2ecc71";
          }
        }
        var e = document.querySelectorAll(".full-start__rate > div, .info__rate > span");
        for (var b = 0; b < e.length; b++) {
          var f = e[b];
          var d = parseFloat(f.textContent.trim());
          if (d >= 0 && d <= 3) {
            f.style.color = "#e74c3c";
          } else if (d > 3 && d <= 5) {
            f.style.color = "#e67e22";
          } else if (d > 5 && d <= 6.5) {
            f.style.color = "#f1c40f";
          } else if (d > 6.5 && d < 8) {
            f.style.color = "#3498db";
          } else if (d >= 8 && d <= 10) {
            f.style.color = "#2ecc71";
          }
        }
      }
      document.addEventListener("DOMContentLoaded", function () {
        // TOLOOK
        setTimeout(e, 500);
      });
      var f = new MutationObserver(e);
      f.observe(document.body, {
        childList: true,
        subtree: true
      });
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
