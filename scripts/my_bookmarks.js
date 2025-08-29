;
(function () {
  'use strict';

  Lampa.Platform.tv();
  (function () {
    "use strict";
    function c(a, b) {
      var c;
      return function () {
        var d = this;
        var e = arguments;
        clearTimeout(c);
        c = // TOLOOK
        setTimeout(function () {
          a.apply(d, e);
        }, b);
      };
    }
    function d(a) {
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.data = a;
      this.params = b;
      this.card = this.data.length ? this.data[0] : {};
      this.create = function () {
        var a = this;
        this.folder = Lampa.Template.js("bookmarks_folder");
        this.folder.querySelector(".bookmarks-folder__title").innerText = Lampa.Lang.translate("menu_" + b.media);
        this.folder.querySelector(".bookmarks-folder__num").innerText = this.data.length;
        this.folder.addEventListener("hover:focus", function () {
          if (a.onFocus) {
            a.onFocus(a.folder, a.card);
          }
        });
        this.folder.addEventListener("hover:touch", function () {
          if (a.onTouch) {
            a.onTouch(a.folder, a.card);
          }
        });
        this.folder.addEventListener("hover:hover", function () {
          if (a.onHover) {
            a.onHover(a.folder, a.card);
          }
        });
        this.folder.addEventListener("hover:enter", function () {
          Lampa.Activity.push({
            url: "",
            title: b.title + " - " + Lampa.Lang.translate("menu_" + b.media),
            component: "favorite",
            type: b.category,
            filter: b.media,
            page: 1
          });
        });
        this.folder.addEventListener("visible", this.visible.bind(this));
      };
      this.image = function (a, b) {
        var c = this;
        var d = document.createElement("img");
        d.addClass("card__img");
        d.addClass("i-" + b);
        d.onload = function () {
          c.folder.classList.add("card--loaded");
        };
        d.onerror = function () {
          d.src = "./img/img_broken.svg";
        };
        this.folder.querySelector(".bookmarks-folder__body").append(d);
        d.src = a;
      };
      this.visible = function () {
        var b = this;
        var c = this.data.filter(function (a) {
          return a.poster_path;
        }).slice(0, 3);
        c.forEach(function (a, c) {
          b.image(Lampa.Api.img(a.poster_path), c);
        });
        if (c.length == 0) {
          this.image("./img/img_load.svg");
        }
        if (this.onVisible) {
          this.onVisible(this.folder, a);
        }
      };
      this.destroy = function () {
        this.folder.remove();
      };
      this.render = function (a) {
        if (a) {
          return this.folder;
        } else {
          return $(this.folder);
        }
      };
    }
    function e() {
      var a = [];
      this.getFavorite = function () {
        var b = Lampa.Storage.get("favorite", {});
        b.card = b.card || [];
        var c = b.customTypes || {};
        b.customTypes = c;
        a = this.getCards(b);
        return b;
      };
      this.getTypes = function () {
        return Object.keys(this.getFavorite().customTypes);
      };
      this.getCards = function (b) {
        if (!b && a.length > 0) {
          return a;
        }
        b = b || this.getFavorite();
        a = Object.keys(b.customTypes).reduce(function (a, c) {
          var d = b.customTypes[c];
          if (b.hasOwnProperty(d)) {
            return a.concat(b[d]);
          } else {
            return a;
          }
        }, []);
        return a;
      };
      this.createType = function (a) {
        var b = this.getFavorite();
        if (b.customTypes[a]) {
          var c = new Error("custom.fav.name-used");
          c.code = "custom.fav";
          throw c;
        }
        var d = Lampa.Utils.uid(8).toLowerCase();
        b.customTypes[a] = d;
        b[d] = [];
        Lampa.Storage.set("favorite", b);
        Lampa.Favorite.init();
        return {
          name: a,
          uid: d,
          counter: 0
        };
      };
      this.renameType = function (a, b) {
        var c = this.getFavorite();
        var d = c.customTypes[a];
        if (!d) {
          var e = new Error("custom.fav.not-defined");
          e.code = "custom.fav";
          throw e;
        }
        if (c.customTypes[b]) {
          var e = new Error("custom.fav.name-used");
          e.code = "custom.fav";
          throw e;
        }
        c.customTypes[b] = d;
        delete c.customTypes[a];
        Lampa.Storage.set("favorite", c);
        Lampa.Favorite.init();
        return true;
      };
      this.removeType = function (a) {
        var b = this.getFavorite();
        var c = b.customTypes[a];
        if (!c) {
          var d = new Error("custom.fav.not-defined");
          d.code = "custom.fav";
          throw d;
        }
        delete b.customTypes[a];
        delete b[c];
        Lampa.Storage.set("favorite", b);
        Lampa.Favorite.init();
        return true;
      };
      this.getTypeList = function (a) {
        var b = this.getFavorite();
        var c = b.customTypes[a];
        if (!c) {
          var d = new Error("custom.fav.not-defined");
          d.code = "custom.fav";
          throw d;
        }
        return b[c] || [];
      };
      this.toggleCard = function (a, b) {
        var c = this.getFavorite();
        var d = c.customTypes[a];
        if (!d) {
          var e = new Error("custom.fav.not-defined");
          e.code = "custom.fav";
          throw e;
        }
        var f = c[d] || [];
        c[d] = f;
        if (f.indexOf(b.id) === -1) {
          if (c.card.every(function (a) {
            return a.id !== b.id;
          })) {
            Lampa.Arrays.insert(c.card, 0, b);
          }
          Lampa.Arrays.insert(f, 0, b.id);
          this.getCards(c);
          Lampa.Favorite.listener.send("add", {
            card: b,
            where: a,
            typeId: d
          });
        } else {
          Lampa.Arrays.remove(f, b.id);
          var g = this.getCards(c);
          Lampa.Favorite.listener.send("remove", {
            card: b,
            method: "id",
            where: a,
            typeId: d
          });
          var h = g.indexOf(b.id) >= 0 || Lampa.Favorite.check(b).any;
          if (!h) {
            c.card = c.card.filter(function (a) {
              return a.id !== b.id;
            });
            Lampa.Favorite.listener.send("remove", {
              card: b,
              method: "card",
              where: a,
              typeId: d
            });
          }
        }
        Lampa.Storage.set("favorite", c);
        Lampa.Favorite.init();
        return {
          name: a,
          uid: d,
          counter: f.length
        };
      };
    }
    var f = new e();
    function g() {}
    g.prototype.renderCustomFavoriteButton = function (a) {
      var b = "custom-type-" + a.uid;
      var c = Lampa.Template.js("register").addClass("selector").addClass(b).addClass("custom-type");
      c.find(".register__name").text(a.name).addClass(b);
      c.find(".register__counter").text(a.counter || 0).addClass(b);
      var d = Lampa.Activity.active().activity.render();
      c.on("hover:long", function () {
        var b = [{
          title: Lampa.Lang.translate("rename"),
          action: "rename"
        }, {
          title: Lampa.Lang.translate("settings_remove"),
          action: "remove"
        }];
        var e = Lampa.Controller.enabled().name;
        Lampa.Select.show({
          title: Lampa.Lang.translate("title_action"),
          items: b,
          onBack: function () {
            Lampa.Controller.toggle(e);
            Lampa.Controller.toggle("content");
          },
          onSelect: function (b) {
            switch (b.action) {
              case "remove":
                {
                  try {
                    f.removeType(a.name);
                    c.remove();
                    Lampa.Controller.toggle(e);
                    Lampa.Controller.toggle("content");
                  } finally {
                    break;
                  }
                }
              case "rename":
                {
                  var g = {
                    title: Lampa.Lang.translate("filter_set_name"),
                    value: a.name,
                    free: true,
                    nosave: true
                  };
                  Lampa.Input.edit(g, function (b) {
                    if (b === "" || a.name == b) {
                      Lampa.Controller.toggle("content");
                      return;
                    }
                    try {
                      f.renameType(a.name, b);
                      c.find(".register__name").text(b);
                      a.name = b;
                    } finally {
                      Lampa.Controller.toggle(e);
                      Lampa.Controller.collectionFocus(c, d);
                    }
                  });
                  break;
                }
            }
          }
        });
      });
      c.on("hover:enter", function () {
        Lampa.Activity.push({
          url: "",
          component: "favorite",
          title: a.name,
          type: a.uid,
          page: 1
        });
      });
      $(".register:first", d).after(c);
      return c;
    };
    g.prototype.refresh = function (a) {
      var b = Lampa.Activity.active();
      if (b.component === "bookmarks") {
        $(".register__counter.custom-type-" + a.uid).text(a.counter || 0);
      }
    };
    g.prototype.renderAddButton = function () {
      var a = this;
      var b = Lampa.Template.js("register").addClass("selector").addClass("new-custom-type");
      b.find(".register__counter").html("<img src=\"./img/icons/add.svg\"/>");
      $(".register:first").before(b);
      b.on("hover:enter", function () {
        var b = {
          title: Lampa.Lang.translate("filter_set_name"),
          value: "",
          free: true,
          nosave: true
        };
        Lampa.Input.edit(b, function (b) {
          if (b === "") {
            Lampa.Controller.toggle("content");
            return;
          }
          try {
            var c = f.createType(b);
            a.renderCustomFavoriteButton(c);
          } finally {
            Lampa.Controller.toggle("content");
          }
        });
      });
    };
    g.prototype.renderLines = function () {
      var a = Lampa.Activity.active();
      var b = f.getFavorite();
      var c = ["movies", "tv"];
      var e = [];
      Object.keys(b.customTypes).reverse().forEach(function (e) {
        var f = b.customTypes[e];
        var g = b[f] || [];
        var h = b.card.filter(function (a) {
          return g.indexOf(a.id) !== -1;
        });
        var i = Lampa.Arrays.clone(h.slice(0, 20));
        var j = 0;
        c.forEach(function (a) {
          var b = Lampa.Utils.filterCardsByType(h, a);
          if (b.length) {
            Lampa.Arrays.insert(i, j, {
              cardClass: function c() {
                return new d(b, {
                  title: e,
                  category: f,
                  media: a
                });
              }
            });
            j++;
          }
        });
        i = i.slice(0, 20);
        i.forEach(function (a) {
          a.ready = false;
        });
        if (i.length > 0) {
          a.activity.component().append({
            title: e,
            results: i,
            type: f
          });
        }
      });
    };
    var h = new g();
    function i() {
      this.extendContextMenu = function (a) {
        var b = this;
        var c = $("body > .selectbox").find(".selectbox-item__title").filter(function () {
          return $(this).text() === Lampa.Lang.translate("title_book");
        });
        f.getTypes().forEach(function (d) {
          var e = $("<div class=\"selectbox-item selector\"><div class=\"selectbox-item__title\">" + d + "</div><div class=\"selectbox-item__checkbox\"></div></div>");
          e.insertBefore(c.parent());
          e.on("hover:enter", function () {
            var c = $(this).find(".selectbox-item__title").text();
            var d = f.toggleCard(c, a.data);
            $(this).toggleClass("selectbox-item--checked");
            // TOLOOK
            setTimeout(function () {
              if (a.card) {
                b.refreshCustomFavoriteIcon(a);
              } else {
                b.refreshBookmarkIcon();
              }
            }, 0);
            h.refresh(d);
          });
          if (f.getTypeList(d).indexOf(a.data.id) >= 0) {
            e.addClass("selectbox-item--checked");
          }
        });
        Lampa.Controller.collectionSet($("body > .selectbox").find(".scroll__body"));
        // TOLOOK
        setTimeout(function () {
          var a = $("body > .selectbox").find(".selector");
          if (a.length > 0) {
            Lampa.Controller.focus(a.get(0));
            Navigator.focus(a.get(0));
          }
        }, 10);
      };
      this.refreshCustomFavoriteIcon = function (a) {
        var b = f.getCards();
        var c = $(".card__icons-inner", a.card);
        var d = a.data.id;
        var e = b.indexOf(d) >= 0;
        var g = $(".icon--star", c);
        var h = g.length !== 0;
        var i = h && g.hasClass("hide");
        if (e) {
          if (!h) {
            c.prepend(Lampa.Template.get("custom-fav-icon"));
          } else if (i) {
            g.removeClass("hide");
          }
        } else if (h && !i) {
          g.addClass("hide");
        }
      };
      this.refreshBookmarkIcon = function () {
        var a = Lampa.Activity.active();
        if (a.component !== "full") {
          return;
        }
        var b = a.card;
        var c = f.getCards().indexOf(b.id) !== -1;
        var d = c ? {} : Lampa.Favorite.check(b);
        var e = c || Object.keys(d).filter(function (a) {
          return a !== "history" && a !== "any";
        }).some(function (a) {
          return !!d[a];
        });
        var g = $(".button--book svg path", a.activity.render());
        if (e) {
          g.attr("fill", "currentColor");
        } else {
          g.attr("fill", "transparent");
        }
      };
    }
    var j = new i();
    function k() {
      if (window.custom_favorites) {
        return;
      }
      window.custom_favorites = true;
      Lampa.Utils.putScript(["https://bazzzilius.github.io/scripts/bookmarks_module.js"], function () {
        Lampa.Listener.follow("card", function (a) {
          if (a.type !== "build") {
            return;
          }
          var b = a.object.favorite;
          a.object.favorite = function () {
            b.apply(this, arguments);
            j.refreshCustomFavoriteIcon(a.object);
          };
          var c = a.object.onMenu;
          a.object.onMenu = function () {
            c.apply(this, arguments);
            j.extendContextMenu(a.object);
          };
        });
      });
      Lampa.Favorite.listener.follow("remove", function () {
        var g = [];
        var h = false;
        function i() {
          if (g.length === 0 || h) {
            return;
          }
          h = true;
          var a = f.getFavorite();
          var b = [];
          var c;
          var d;
          for (c = 0; c < g.length; c++) {
            d = g[c];
            if (d.method === "card" && !d.typeId && f.getCards().indexOf(d.card.id) >= 0) {
              b.push(d.card);
            }
          }
          if (b.length > 0) {
            for (c = 0; c < b.length; c++) {
              a.card.push(b[c]);
            }
            Lampa.Storage.set("favorite", a);
          }
          g = [];
          var e = false;
          for (c = 0; c < g.length; c++) {
            if (g[c].method !== "card") {
              e = true;
              break;
            }
          }
          if (e) {
            // TOLOOK
            setTimeout(j.refreshBookmarkIcon, 0);
          }
          h = false;
          if (g.length > 0) {
            // TOLOOK
            setTimeout(i, 0);
          }
        }
        var k = c(i, 100);
        return function (a) {
          g.push(a);
          k();
        };
      }());
      Lampa.Lang.add({
        rename: {
          en: "Rename",
          uk: "Змінити ім’я",
          ru: "Изменить имя"
        }
      });
      Lampa.Template.add("custom-fav-icon", "<div class=\"card__icon icon--star\"><svg width=\"24\" height=\"23\" viewBox=\"0 0 24 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.6162 7.10981L15.8464 7.55198L16.3381 7.63428L22.2841 8.62965C22.8678 8.72736 23.0999 9.44167 22.6851 9.86381L18.4598 14.1641L18.1104 14.5196L18.184 15.0127L19.0748 20.9752C19.1622 21.5606 18.5546 22.002 18.025 21.738L12.6295 19.0483L12.1833 18.8259L11.7372 19.0483L6.34171 21.738C5.81206 22.002 5.20443 21.5606 5.29187 20.9752L6.18264 15.0127L6.25629 14.5196L5.9069 14.1641L1.68155 9.86381C1.26677 9.44167 1.49886 8.72736 2.08255 8.62965L8.02855 7.63428L8.52022 7.55198L8.75043 7.10981L11.5345 1.76241C11.8078 1.23748 12.5589 1.23748 12.8322 1.76241L15.6162 7.10981Z\" stroke=\"currentColor\" stroke-width=\"2.2\"></path></svg></div>");
      $("<style>").prop("type", "text/css").html(".card__icon { position: relative; } .icon--star svg { position: absolute; height: 60%; width: 60%; top: 50%; left: 50%; transform: translate(-50%, -50%) }.new-custom-type .register__counter { display:flex; justify-content:center; align-items:center }.new-custom-type .register__counter img { height:2.2em; padding:0.4em; }").appendTo("head");
      Lampa.Listener.follow("full", function (a) {
        if (a.type == "complite") {
          var b = Lampa.Activity.active();
          j.refreshBookmarkIcon();
          var c = $(".button--book", b.activity.render());
          c.on("hover:enter", function () {
            j.extendContextMenu({
              data: b.card
            });
          });
        }
      });
      Lampa.Storage.listener.follow("change", function (a) {
        if (a.name !== "activity") {
          return;
        }
        if (Lampa.Activity.active().component === "bookmarks") {
          if ($(".new-custom-type").length !== 0) {
            return;
          }
          h.renderAddButton();
          var b = f.getFavorite();
          h.renderLines();
          Object.keys(b.customTypes).reverse().forEach(function (a) {
            var c = b.customTypes[a];
            var d = b[c] || [];
            var e = d.length;
            h.renderCustomFavoriteButton({
              name: a,
              uid: c,
              counter: e
            });
          });
          Lampa.Activity.active().activity.toggle();
        }
      });
    }
    if (window.appready) {
      k();
    } else {
      Lampa.Listener.follow("app", function (a) {
        if (a.type === "ready") {
          k();
        }
      });
    }
  })();
})();