(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    function c() {
      Lampa.Controller.listener.follow("toggle", function (a) {
        ;
        if (Lampa.Activity.active().component == "category_full" || Lampa.Activity.active().component == "favorite") {
          console.log("Начинаем обработку события toggle с типом select");
          $(".card").on("hover:long", function () {
            console.log("Событие hover:long сработало на элементе", this);
            var a = $(".card").index(this);
            var b = $(".card")[a].card_data.id;
            var c = $(".card")[a].card_data;
            console.log("Долгое нажатие на элемент, id:", b, "и данные карты:", c);
            if ($(".selectbox__title").text() === "Действие") {
              var d = JSON.parse(localStorage.getItem("favorite")) || {};
              var f = d.registerItems || [];
              console.log("Избранные элементы:", f);
              var g = $("body > .selectbox").find(".selectbox-item__title").filter(function () {
                return $(this).text() === "Закладки";
              });
              f.forEach(function (b) {
                console.log("Проверяем существование элемента с именем:", b);
                var c = $("body > .selectbox").find(".selectbox-item__title").filter(function () {
                  return $(this).text() === b;
                });
                if (c.length === 0) {
                  console.log("Элемент не существует, создаем новый:", b);
                  var d = $("<div class=\"selectbox-item selector\"><div class=\"selectbox-item__title\">" + b + "</div><div class=\"selectbox-item__checkbox\"></div></div>");
                  d.insertBefore(g.parent());
                  d.on("hover:enter", function () {
                    var b = $(".card")[a].card_data.id;
                    var c = $(".card")[a].card_data;
                    var d = $(this).find(".selectbox-item__title").text();
                    if ($(this).hasClass("selectbox-item--checked")) {
                      $(this).removeClass("selectbox-item--checked");
                      e(d, b, false);
                      j(d, b);
                    } else {
                      $(this).addClass("selectbox-item--checked");
                      e(d, b, true);
                      h(d, b, c);
                    }
                    console.log("Нажат пункт:", d);
                  });
                  var f = $(".card")[a].card_data.id;
                  var i = $(".card")[a].card_data;
                  var k = JSON.parse(localStorage.getItem("favorite")) || {};
                  var l = k.checkedItems || {};
                  if (l[b] && l[b][f]) {
                    d.addClass("selectbox-item--checked");
                    console.log("Элемент был отмечен ранее:", b);
                  }
                } else {
                  console.log("Элемент уже существует:", b);
                }
              });
              var i = $("body > .selectbox").find(".scroll__body");
              Lampa.Controller.collectionSet(i);
              // TOLOOK
              setTimeout(function () {
                var a = $("body > .selectbox").find(".selector");
                if (a.length > 0) {
                  Lampa.Controller.focus(a.get(0));
                  Navigator.focus(a.get(0));
                  console.log("Фокус установлен на первый элемент в селекторе");
                }
              }, 10);
            } else {
              console.log("Заголовок селектора не совпадает с \"Действие\"");
            }
          });
        }
      });
      Lampa.Listener.follow("line", function (a) {
        var b = a.items;
        if (b) {
          $(".card").on("hover:long", function () {
            var a = $(".card").index(this);
            var b = $(".card")[a].card_data.id;
            var c = $(".card")[a].card_data;
            if ($(".selectbox__title").text() === "Действие") {
              var d = JSON.parse(localStorage.getItem("favorite")) || {};
              var f = d.registerItems || [];
              var g = $("body > .selectbox").find(".selectbox-item__title").filter(function () {
                return $(this).text() === "Закладки";
              });
              f.forEach(function (b) {
                var c = $("body > .selectbox").find(".selectbox-item__title").filter(function () {
                  return $(this).text() === b;
                });
                if (c.length === 0) {
                  var d = $("<div class=\"selectbox-item selector\"><div class=\"selectbox-item__title\">" + b + "</div><div class=\"selectbox-item__checkbox\"></div></div>");
                  d.insertBefore(g.parent());
                  d.on("hover:enter", function () {
                    var b = $(".card")[a].card_data.id;
                    var c = $(".card")[a].card_data;
                    var d = $(this).find(".selectbox-item__title").text();
                    if ($(this).hasClass("selectbox-item--checked")) {
                      $(this).removeClass("selectbox-item--checked");
                      e(d, b, false);
                      j(d, b);
                    } else {
                      $(this).addClass("selectbox-item--checked");
                      e(d, b, true);
                      h(d, b, c);
                    }
                    var d = $(this).find(".selectbox-item__title").text();
                    console.log("Нажат пункт:", d);
                  });
                  var f = $(".card")[a].card_data.id;
                  var i = $(".card")[a].card_data;
                  var k = JSON.parse(localStorage.getItem("favorite")) || {};
                  var l = k.checkedItems || {};
                  if (l[b] && l[b][f]) {
                    d.addClass("selectbox-item--checked");
                  }
                }
              });
              var i = $("body > .selectbox").find(".scroll__body");
              Lampa.Controller.collectionSet(i);
              // TOLOOK
              setTimeout(function () {
                var a = $("body > .selectbox").find(".selector");
                if (a.length > 0) {
                  Lampa.Controller.focus(a.get(0));
                  Navigator.focus(a.get(0));
                }
              }, 10);
            }
          });
        }
      });
      Lampa.Listener.follow("full", function (a) {
        if (a.type == "complite") {
          $(".button--book").on("hover:enter", function () {
            if ($(".selectbox__title").text() === "Действие" || $(".selectbox__title").text() === "Избранное") {
              var a = JSON.parse(localStorage.getItem("favorite")) || {};
              var b = a.registerItems || [];
              var c = $("body > .selectbox").find(".selectbox-item__title").filter(function () {
                return $(this).text() === "Закладки";
              });
              b.forEach(function (a) {
                var b = $("body > .selectbox").find(".selectbox-item__title").filter(function () {
                  return $(this).text() === a;
                });
                if (b.length === 0) {
                  var d = $("<div class=\"selectbox-item selector\"><div class=\"selectbox-item__title\">" + a + "</div><div class=\"selectbox-item__checkbox\"></div></div>");
                  d.insertBefore(c.parent());
                  d.on("hover:enter", function () {
                    var a = localStorage.getItem("activity");
                    if (a) {
                      var b = JSON.parse(a);
                      var c = b.id;
                      var d = $(this).find(".selectbox-item__title").text();
                      var f = b.card;
                      console.log(f);
                      if ($(this).hasClass("selectbox-item--checked")) {
                        $(this).removeClass("selectbox-item--checked");
                        e(d, c, false);
                        j(d, c);
                      } else {
                        $(this).addClass("selectbox-item--checked");
                        e(d, c, true);
                        h(d, c, f);
                      }
                    }
                    var d = $(this).find(".selectbox-item__title").text();
                    console.log("Нажат пункт:", d);
                  });
                  var f = localStorage.getItem("activity");
                  var g = JSON.parse(f);
                  var i = g.id;
                  var k = JSON.parse(localStorage.getItem("favorite")) || {};
                  var l = k.checkedItems || {};
                  if (l[a] && l[a][g.id]) {
                    d.addClass("selectbox-item--checked");
                  }
                }
              });
              var d = $("body > .selectbox").find(".scroll__body");
              Lampa.Controller.collectionSet(d);
              // TOLOOK
              setTimeout(function () {
                var a = $("body > .selectbox").find(".selector");
                if (a.length > 0) {
                  Lampa.Controller.focus(a.get(0));
                  Navigator.focus(a.get(0));
                }
              }, 10);
            }
          });
        }
      });
      function e(a, b, c) {
        var d = JSON.parse(localStorage.getItem("favorite")) || {};
        if (!d.checkedItems) {
          d.checkedItems = {};
        }
        if (!d.checkedItems[a]) {
          d.checkedItems[a] = {};
        }
        d.checkedItems[a][b] = c;
        Lampa.Storage.set("favorite", JSON.stringify(d));
      }
      function f() {
        var a = JSON.parse(localStorage.getItem("favorite")) || {};
        var b = a.registerItems || [];
        b.forEach(function (b) {
          if ($(".register__name:contains(\"" + b + "\")").length === 0) {
            var c = a.counters && a.counters[b] ? a.counters[b] : 0;
            g(b, c);
          }
        });
      }
      function g(a, b) {
        var c = $("<div>", _0x5a6e54).append($("<div>", {
          class: "register__name",
          text: a
        }), $("<div>", {
          class: "register__counter",
          text: b || "0"
        }));
        c.on("hover:long", function () {
          c.remove();
          i(a);
          var b = JSON.parse(localStorage.getItem("favorite")) || {};
          if (b.counters && b.counters[a]) {
            delete b.counters[a];
            Lampa.Storage.set("favorite", JSON.stringify(b));
          }
          Lampa.Controller.toggle("content");
        });
        c.on("hover:enter", function () {
          var b = {
            url: "",
            title: a,
            component: "favorite",
            type: a,
            page: 1
          };
          Lampa.Activity.push(b);
        });
        $(".register:first").after(c);
      }
      function h(a, b, c) {
        var d = JSON.parse(localStorage.getItem("favorite")) || {};
        if (!d.registerItems) {
          d.registerItems = [];
        }
        if (!d.registerItems.includes(a)) {
          d.registerItems.unshift(a);
        }
        if (!d.counters) {
          d.counters = {};
        }
        var e = d.counters[a] || 0;
        e += 1;
        d.counters[a] = e;
        var f = $(".register__name:contains(\"" + a + "\")").closest(".register");
        if (f.length) {
          var g = f.find(".register__counter");
          g.text(e);
        }
        if (c) {
          if (!d.card) {
            d.card = [];
          }
          var h = d.card.some(function (a) {
            return a.id === c.id;
          });
          if (!h) {
            d.card.unshift(c);
          }
        }
        if (b) {
          if (!d[a]) {
            d[a] = [];
          }
          if (!d[a].includes(b)) {
            d[a].unshift(b);
          }
        }
        Lampa.Storage.set("favorite", JSON.stringify(d));
        Lampa.Favorite.init();
      }
      function i(a) {
        var b = JSON.parse(localStorage.getItem("favorite")) || {};
        if (b.registerItems) {
          b.registerItems = b.registerItems.filter(function (b) {
            return b !== a;
          });
        }
        if (b.checkedItems && b.checkedItems[a]) {
          delete b.checkedItems[a];
        }
        Lampa.Storage.set("favorite", JSON.stringify(b));
        Lampa.Favorite.init();
      }
      function j(a, b, c) {
        var d = JSON.parse(localStorage.getItem("favorite")) || {};
        var e = d.counters ? d.counters[a] || 0 : 0;
        if (e > 0) {
          e -= 1;
          d.counters[a] = e;
          var f = $(".register__name:contains(\"" + a + "\")").closest(".register");
          if (f.length) {
            var g = f.find(".register__counter");
            g.text(e);
          }
        }
        if (b) {
          if (d[a]) {
            d[a] = d[a].filter(function (a) {
              return a !== b;
            });
          }
        }
        Lampa.Storage.set("favorite", JSON.stringify(d));
      }
      function k() {
        if ($(".register__name:contains(\"Создать\")").length === 0) {
          var a = $("<div>", _0x34c6cd).append($("<div>", {
            class: "register__name",
            text: "Создать",
            css: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          }), $("<div>", {
            class: "register__counter",
            text: "+",
            css: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }
          }));
          $(".register:first").before(a);
          a.on("hover:enter hover:click hover:touch", function () {
            var a = {
              title: "Укажите название",
              value: "",
              free: true
            };
            Lampa.Input.edit(a, function (a) {
              if (a !== "") {
                if ($(".register__name:contains(\"" + a + "\")").length === 0) {
                  g(a);
                  var b = JSON.parse(localStorage.getItem("favorite")) || {};
                  b.registerItems = b.registerItems || [];
                  b.registerItems.push(a);
                  b.counters = b.counters || {};
                  b.counters[a] = 0;
                  Lampa.Storage.set("favorite", JSON.stringify(b));
                  var c = $(".register__name:contains(\"" + a + "\")").closest(".register");
                  c.find(".register__counter").text("0");
                }
              }
              Lampa.Controller.toggle("content");
            });
          });
        }
      }
      Lampa.Storage.listener.follow("change", function (a) {
        if (a.name === "activity" && Lampa.Activity.active().component === "bookmarks") {
          k();
          f();
          Lampa.Controller.toggle("content");
        }
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
