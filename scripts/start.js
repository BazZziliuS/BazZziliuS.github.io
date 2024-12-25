(function () {
    'use strict';
  
    Lampa.Platform.tv();
    document.addEventListener("DOMSubtreeModified", function (a) {
      var b = document.getElementsByClassName("search__sources");
      var c = Lampa.Storage.get("source");
      if (b.length > 0) {
        if (Lampa.Storage.get("source") == "cub") {
          var c = Lampa.Storage.get("source");
          Lampa.Storage.set("mySource", c);
          Lampa.Storage.set("source", "tmdb");
        }
      } else {
        // TOLOOK
        setTimeout(function () {
          if (localStorage.getItem("mySource")) {
            Lampa.Storage.set("source", Lampa.Storage.get("mySource"));
          }
          localStorage.removeItem("mySource");
        }, 1500);
      }
    }, false);
    var f = Lampa.Storage.get("plugins");
    var g = f.filter(function (a) {
      return a.url !== "http://cub.red/plugin/tmdb-proxy";
    });
    Lampa.Storage.set("plugins", g);
    var h = Lampa.Storage.get("plugins");
    var i = h.filter(function (a) {
      return a.url !== "https://cub.red/plugin/tmdb-proxy";
    });
    Lampa.Storage.set("plugins", i);
    Lampa.TMDB.image = function (a) {
      var b = Lampa.Utils.protocol() + "image.tmdb.org/" + a;
      if (Lampa.Storage.field("proxy_tmdb")) {
        return "https://imagetmdb.cub.red/" + Lampa.Utils.addUrlComponent(b);
      } else {
        return b;
      }
    };
    Lampa.TMDB.api = function (a) {
      var b = Lampa.Utils.protocol() + "api.themoviedb.org/3/" + a;
      if (Lampa.Storage.field("proxy_tmdb")) {
        return "http://5.42.84.243:9118/proxy/" + Lampa.Utils.addUrlComponent(b);
      } else {
        return b;
      }
    };
    Lampa.Settings.listener.follow("open", function (a) {
      if (a.name == "tmdb") {
        a.body.find("[data-parent=\"proxy\"]").remove();
      }
    });
    var j = // TOLOOK
    setInterval(function () {
      if (typeof window.lampa_settings != "undefined" && (window.lampa_settings.fixdcma || window.lampa_settings.dcma)) {
        clearInterval(j);
        if (window.lampa_settings.dcma) {
          window.lampa_settings.dcma = false;
        }
      }
    }, 100);
  })();