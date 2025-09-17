;
(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    Lampa.Platform.tv();
    function c() {
      var e = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\" viewBox=\"0 0 512 512\"><path fill=\"currentColor\" fill-rule=\"evenodd\" d=\"m368.256 214.573l-102.627 187.35c40.554 71.844 73.647 97.07 138.664 94.503c63.67-2.514 136.974-89.127 95.694-163.243L397.205 150.94c-3.676 12.266-25.16 55.748-28.95 63.634M216.393 440.625C104.077 583.676-57.957 425.793 20.85 302.892c0 0 83.895-147.024 116.521-204.303c25.3-44.418 53.644-72.37 90.497-81.33c44.94-10.926 97.565 12.834 125.62 56.167c19.497 30.113 36.752 57.676 6.343 109.738c-3.613 6.184-136.326 248.402-143.438 257.46m8.014-264.595c-30.696-17.696-30.696-62.177 0-79.873s69.273 4.544 69.273 39.936s-38.578 57.633-69.273 39.937\" clip-rule=\"evenodd\"/></svg>";
      var f = $("<li class=\"menu__item selector\" data-action=\"anime_tmdb\"><div class=\"menu__ico\">" + e + "</div><div class=\"menu__text\">Аниме TMDB</div></li>");
      f.on("hover:enter", function () {
        Lampa.Activity.push({
          url: "discover/tv?vote_average.gte=6&vote_average.lte=9,5&first_air_date.lte=2026-12-31&first_air_date.gte=2020-01-01&with_original_language=ja",
          title: "Аниме",
          component: "category_full",
          source: "tmdb",
          card_type: "true",
          page: 1
        });
      });
      $(".menu .menu__list").eq(0).append(f);
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