(function () {
    'use strict';
  
    Lampa.Platform.tv();
    (function () {
      "use strict";
      function e() {
        var g = Lampa.Storage.get("menu_sort");
        if (g.includes("В качестве")) {
          var h = g.indexOf("В качестве");
          g.splice(h, 1);
          g.splice(4, 0, "В качестве");
          Lampa.Storage.set(g);
        }
        var i = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1.2em\" height=\"1.2em\" viewBox=\"0 0 16 16\"><g fill=\"currentColor\"><path d=\"M3.577 8.9v.03h1.828V5.898h-.062a47 47 0 0 0-1.766 3.001z\"/><path d=\"M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm2.372 3.715l.435-.714h1.71v3.93h.733v.957h-.733V11H5.405V9.888H2.5v-.971c.574-1.077 1.225-2.142 1.872-3.202m7.73-.714h1.306l-2.14 2.584L13.5 11h-1.428l-1.679-2.624l-.615.7V11H8.59V5.001h1.187v2.686h.057L12.102 5z\"/></g></svg>";
        var j = $("<li class=\"menu__item selector\" data-action=\"hd\"><div class=\"menu__ico\">" + i + "</div><div class=\"menu__text\">В качестве</div></li>");
        j.on("hover:enter", function () {
          Lampa.Activity.push({
            url: "?cat=&sort=now&uhd=true",
            title: "В качестве",
            component: "category_full",
            source: "cub",
            sort: "now",
            card_type: "true",
            page: 1
          });
        });
        $(".menu .menu__list").eq(0).append(j);
      }
      if (window.appready) {
        e();
      } else {
        Lampa.Listener.follow("app", function (a) {
          if (a.type == "ready") {
            e();
          }
        });
      }
    })();
  })();