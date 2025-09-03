(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    'use strict';

    var a = [];
    function b() {
      var a = Lampa.Storage.get("menu_hide", []);
      $(".wrap__left .menu__list .menu__item").removeClass("hidden");
      $(".wrap__left .menu__list .menu__item").each(function () {
        var b = $(this).text().trim();
        if (a.indexOf(b) !== -1) {
          $(this).addClass("hidden");
        }
      });
    }
    function c() {
      var a = Lampa.Storage.get("menu_sort", []);
      if (a.length === 0) {
        return;
      }
      var b = $(".wrap__left .menu__list").eq(0);
      var c = [];
      b.find(".menu__item").each(function () {
        var a = $(this);
        var b = a.text().trim();
        if (b) {
          c.push({
            element: a,
            text: b
          });
        }
      });
      var d = [];
      a.forEach(function (a) {
        var b = c.find(function (b) {
          return b.text === a;
        });
        if (b) {
          d.push(b);
          var e = c.indexOf(b);
          c.splice(e, 1);
        }
      });
      c.forEach(function (a) {
        d.push(a);
      });
      d.forEach(function (a, c) {
        if (c === 0) {
          b.prepend(a.element);
        } else {
          d[c - 1].element.after(a.element);
        }
      });
    }
    function d() {
      c();
      b();
    }
    function e(a) {
      var b = Lampa.Storage.get("menu_hide", []);
      var c = Lampa.Storage.get("menu_sort", []);
      var d = b.indexOf(a) !== -1;
      if (d) {
        return "Скрыто";
      }
      if (c.length > 0) {
        var e = c.indexOf(a) + 1;
        if (e > 0) {
          return "Позиция: " + e;
        } else {
          return "По умолчанию";
        }
      }
      var g = f(a);
      if (g > 0) {
        return "Позиция: " + g;
      } else {
        return "По умолчанию";
      }
    }
    function f(a) {
      var b = 0;
      $(".wrap__left .menu__list").eq(0).find(".menu__item").each(function (c) {
        var d = $(this).text().trim();
        if (d === a) {
          b = c + 1;
          return false;
        }
      });
      return b;
    }
    function g() {
      $(".wrap__left .menu__list").eq(0).find(".menu__item").each(function () {
        var b = $(this).text().trim();
        if (b) {
          a.push(b);
        }
      });
    }
    function h() {
      var b = $(".wrap__left .menu__list").eq(0);
      var c = [];
      b.find(".menu__item").each(function () {
        var a = $(this);
        var b = a.text().trim();
        if (b) {
          c.push({
            element: a,
            text: b
          });
        }
      });
      a.forEach(function (d, e) {
        var f = c.find(function (a) {
          return a.text === d;
        });
        if (f) {
          if (e === 0) {
            b.prepend(f.element);
          } else {
            var g = a[e - 1];
            var h = b.find(".menu__item").filter(function () {
              return $(this).text().trim() === g;
            });
            if (h.length > 0) {
              h.after(f.element);
            }
          }
        }
      });
    }
    function i() {
      Lampa.Storage.set("menu_hide", []);
      Lampa.Storage.set("menu_sort", []);
      h();
      b();
      // TOLOOK
      setTimeout(function () {
        $(".settings-param").each(function () {
          var a = $(this);
          var b = a.find(".settings-param__name").text().trim();
          if (b === "Вернуть все по умолчанию") {
            return;
          }
          var c = f(b);
          var d = c > 0 ? "Позиция: " + c : "По умолчанию";
          a.find(".settings-param__descr").text(d);
        });
      }, 100);
      Lampa.Noty.show("Настройки меню сброшены");
    }
    function j() {
      var a = Lampa.Storage.get("menu_hide", []);
      var b = Lampa.Storage.get("menu_sort", []);
      Lampa.SettingsApi.addParam({
        component: "menu_hide_component",
        param: {
          type: "static"
        },
        field: {
          name: "Вернуть все по умолчанию",
          description: "Сбросить все настройки меню"
        },
        onRender: function (a) {
          a.on("hover:enter", function () {
            i();
          });
        }
      });
      var c = [];
      $(".wrap__left .menu__list").eq(0).find(".menu__item").each(function () {
        var a = $(this).text().trim();
        if (a) {
          c.push(a);
        }
      });
      var d = [];
      b.forEach(function (a) {
        if (c.indexOf(a) !== -1) {
          d.push(a);
        }
      });
      c.forEach(function (a) {
        if (d.indexOf(a) === -1) {
          d.push(a);
        }
      });
      d.forEach(function (a) {
        Lampa.SettingsApi.addParam({
          component: "menu_hide_component",
          param: {
            type: "static"
          },
          field: {
            name: a,
            description: e(a)
          },
          onRender: function (b) {
            b.find(".settings-param__descr").text(e(a));
            b.on("hover:enter", function () {
              k(a);
            });
          }
        });
      });
    }
    function k(a) {
      var b = Lampa.Storage.get("menu_hide", []);
      var c = Lampa.Storage.get("menu_sort", []);
      var d = b.indexOf(a) !== -1;
      var f = [];
      if (d) {
        f.push({
          title: "Показать пункт",
          action: "show"
        });
      } else {
        f.push({
          title: "Скрыть пункт",
          action: "hide"
        });
      }
      f.push({
        title: "Переместить в начало",
        action: "top"
      });
      f.push({
        title: "Переместить вверх",
        action: "up"
      });
      f.push({
        title: "Переместить вниз",
        action: "down"
      });
      f.push({
        title: "Переместить в конец",
        action: "bottom"
      });
      var g = Lampa.Controller.enabled().name;
      var h = null;
      $(".settings-param").each(function (b) {
        var c = $(this);
        var d = c.find(".settings-param__name").text().trim();
        if (d === a) {
          var e = c[0].parentElement;
          var f = Array.from(e.children);
          var g = f.indexOf(c[0]);
          h = g + 1;
          return false;
        }
      });
      Lampa.Select.show({
        title: a,
        items: f,
        onSelect: function (b) {
          if (b.disabled) {
            return;
          }
          l(a, b.action);
          // TOLOOK
          setTimeout(function () {
            $(".settings-param").each(function () {
              var a = $(this);
              var b = a.find(".settings-param__name").text().trim();
              if (b === "Вернуть все по умолчанию") {
                return;
              }
              a.find(".settings-param__descr").text(e(b));
            });
          }, 100);
          Lampa.Controller.toggle(g);
          Lampa.Settings.create("menu_hide_component");
          // TOLOOK
          setTimeout(function () {
            if (h) {
              var a = document.querySelector("#app > div.settings.animate > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(" + h + ")");
              if (a) {
                Lampa.Controller.focus(a);
                Lampa.Controller.toggle("settings_component");
              } else {
                console.error("Ошибка: Элемент с индексом nth-child " + h + " не найден.");
              }
            }
          }, 200);
        },
        onBack: function () {
          Lampa.Controller.toggle(g);
          Lampa.Settings.create("menu_hide_component");
          // TOLOOK
          setTimeout(function () {
            if (h) {
              var a = document.querySelector("#app > div.settings.animate > div.settings__content.layer--height > div.settings__body > div > div > div > div > div:nth-child(" + h + ")");
              if (a) {
                Lampa.Controller.focus(a);
                Lampa.Controller.toggle("settings_component");
              }
            }
          }, 100);
        }
      });
    }
    function l(a, b) {
      var c = Lampa.Storage.get("menu_hide", []);
      switch (b) {
        case "show":
          var e = c.indexOf(a);
          if (e !== -1) {
            c.splice(e, 1);
            Lampa.Storage.set("menu_hide", c);
          }
          break;
        case "hide":
          if (c.indexOf(a) === -1) {
            c.push(a);
            Lampa.Storage.set("menu_hide", c);
          }
          break;
        case "top":
        case "up":
        case "down":
        case "bottom":
          m(a, b);
          break;
      }
      d();
      Lampa.Noty.show("Настройки меню обновлены");
    }
    function m(a, b) {
      var c = Lampa.Storage.get("menu_sort", []);
      var d = [];
      $(".wrap__left .menu__list").eq(0).find(".menu__item").each(function () {
        var a = $(this).text().trim();
        if (a) {
          d.push(a);
        }
      });
      if (c.length === 0) {
        c = d.slice();
      }
      var e = c.indexOf(a);
      switch (b) {
        case "top":
          if (e !== -1) {
            c.splice(e, 1);
          }
          c.unshift(a);
          break;
        case "up":
          if (e > 0) {
            c.splice(e, 1);
            c.splice(e - 1, 0, a);
          }
          break;
        case "down":
          if (e !== -1 && e < c.length - 1) {
            c.splice(e, 1);
            c.splice(e + 1, 0, a);
          }
          break;
        case "bottom":
          if (e !== -1) {
            c.splice(e, 1);
          }
          c.push(a);
          break;
      }
      Lampa.Storage.set("menu_sort", c);
    }
    function n() {
      Lampa.Settings.listener.follow("open", function (a) {
        if (a.name == "main") {
          if (Lampa.Settings.main().render().find("[data-component=\"menu_hide_component\"]").length == 0) {
            Lampa.SettingsApi.addComponent({
              component: "menu_hide_component",
              name: "Управление главным меню"
            });
          }
          Lampa.Settings.main().update();
          Lampa.Settings.main().render().find("[data-component=\"menu_hide_component\"]").addClass("hide");
        }
      });
      Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
          name: "menu_hide_component",
          type: "static",
          default: true
        },
        field: {
          name: "Управление главным меню",
          description: "Настройка отображения пунктов главного меню"
        },
        onRender: function (a) {
          // TOLOOK
          setTimeout(function () {
            $(".settings-param > div:contains(\"Управление главным меню\")").parent().insertAfter($("div[data-name=\"interface_size\"]"));
          }, 0);
          a.on("hover:enter", function () {
            Lampa.Settings.create("menu_hide_component");
            Lampa.Controller.enabled().controller.back = function () {
              Lampa.Settings.create("interface");
            };
          });
        }
      });
      // TOLOOK
      setTimeout(function () {
        j();
        d();
      }, 500);
    }
    function o() {
      if (window.menu_hide_plugin) {
        return;
      }
      window.menu_hide_plugin = true;
      g();
      n();
    }
    if (window.appready) {
      o();
    } else {
      Lampa.Listener.follow("app", function (a) {
        if (a.type === "ready") {
          o();
        }
      });
    }
  })();
})();