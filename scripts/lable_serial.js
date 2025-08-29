(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    function c() {
      if (window.lable_tv_plugin) {
        return;
      }
      window.lable_tv_plugin = true;
      Lampa.Lang.add({
        lable_tv_caption: {
          ru: "СЕРИАЛ",
          en: "SERIES",
          uk: "СЕРIАЛ"
        }
      });
      function c() {
        var e = Lampa.Lang.translate("lable_tv_caption");
        $("#lable_tv_styles").remove();
        var f = "<style id=\"lable_tv_styles\">.card--tv .card__type { font-size: 0.9em; background: transparent; color: transparent;}.card--tv .card__type::after { content: \"" + e + "\"; color: #fff; position: absolute; left: 0; top: 0; padding: 0.4em 0.4em; border-radius: 0.3em; font-weight: 600; background: #ff4242; font-size: 0.95em; }</style>";
        $("body").append(f);
      }
      c();
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
