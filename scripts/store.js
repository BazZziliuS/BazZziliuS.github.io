"use strict";

(function () {
  function b() {
    var c = `[data-component="mad_store"]`;
    if (Lampa.Settings.main && Lampa.Settings.main().render().find(c).length === 0) {
      var a = $(`
              <div class="settings-folder selector" data-component="mad_store"${` data-static="true">
                <div class="settings-folder__icon">
                    <svg height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="21" height="21" rx="2" fill="white"></rect>
                        <mask id="path-2-inside-1_154:24" fill="white">
                            <rect x="2" y="27" width="17" height="17" rx="2"></rect>
                        </mask>
                        <rect x="2" y="27" width="17" height="17" rx="2" stroke="white" stroke-width="6" mask="url(#path-2-inside-1_154:24)"></rect>
                        <rect x="27" y="2" width="17" height="17" rx="2" fill="white"></rect>
                        <rect x="27" y="34" width="17" height="3" fill="white"></rect>
                        <rect x="34" y="44" width="17" height="3" transform="rotate(-90 34 44)" fill="white"></rect>
                    </svg>
                </div>
                <div class="settings-folder__name">`}Расширения :: Lampa plugins repo${`</div>
              </div>
            `}`);
      Lampa.Settings.listener.follow("open", function (a) {
        if (a.name === "main") {
          a.body.find(c).on("hover:enter", function () {
            Lampa.Extensions.show({
              store: "https://znh339.github.io/plugins/store.json",
              with_installed: true
            });
          });
        }
      });
      Lampa.Settings.main().render().find("[data-component=\"plugins\"]").after(a);
      Lampa.Settings.main().update();
    }
  }
  if (window.appready) {
    b();
  } else {
    Lampa.Listener.follow("app", function (a) {
      if (a.type === "ready") {
        b();
      }
    });
  }
})();