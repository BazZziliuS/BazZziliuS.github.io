(function () {
    'use strict';

    Lampa.Platform.tv();
    if (Lampa.Manifest.app_digital >= 300) {
        (function () {
            "use strict";
            function c(a) {
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
            function d() {
                var a = [];
                this.getFavorite = function () {
                    var b = Lampa.Storage.get("favorite", {});
                    b.card = b.card || [];
                    var c = b.customTypes || {};
                    b.customTypes = c;
                    a = this.getCards(b);
                    var d = a.length === 0 || !!c.card ? [] : b.card.filter(function (b) {
                        return a.indexOf(b.id) !== -1;
                    });
                    b.customTypes.card = c.card || d;
                    if (d.length > 0) {
                        Lampa.Storage.set("favorite", b);
                    }
                    return b;
                };
                this.getTypes = function () {
                    return this.getTypesWithoutSystem(this.getFavorite());
                };
                this.hasTypeId = function (a, b) {
                    var c = a.customTypes;
                    for (var d in c) {
                        if (c.hasOwnProperty(d) && c[d] === b) {
                            return true;
                        }
                    }
                    return false;
                };
                this.getTypesWithoutSystem = function (a) {
                    return Object.keys(a.customTypes || {}).filter(function (a) {
                        return a !== "card";
                    });
                };
                this.getCards = function (b) {
                    if (!b && a.length > 0) {
                        return a;
                    }
                    b = b || this.getFavorite();
                    a = this.getTypesWithoutSystem(b).reduce(function (a, c) {
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
                    Lampa.Favorite.read(true);
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
                    Lampa.Favorite.read(true);
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
                    Lampa.Favorite.read(true);
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
                    var g = c.customTypes.card;
                    if (f.indexOf(b.id) === -1) {
                        if (g.every(function (a) {
                            return a.id !== b.id;
                        })) {
                            Lampa.Arrays.insert(g, 0, b);
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
                        var h = this.getCards(c);
                        Lampa.Favorite.listener.send("remove", {
                            card: b,
                            method: "id",
                            where: a,
                            typeId: d
                        });
                        var i = h.indexOf(b.id) >= 0;
                        if (!i) {
                            c.customTypes.card = g.filter(function (a) {
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
                    Lampa.Favorite.read(true);
                    return {
                        name: a,
                        uid: d,
                        counter: f.length
                    };
                };
            }
            var e = new d();
            function f() { }
            f.prototype.renderCustomFavoriteButton = function (a) {
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
                    var f = Lampa.Controller.enabled().name;
                    Lampa.Select.show({
                        title: Lampa.Lang.translate("title_action"),
                        items: b,
                        onBack: function () {
                            Lampa.Controller.toggle(f);
                            Lampa.Controller.toggle("content");
                        },
                        onSelect: function (b) {
                            switch (b.action) {
                                case "remove":
                                    {
                                        try {
                                            e.removeType(a.name);
                                            c.remove();
                                            Lampa.Controller.toggle(f);
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
                                            if (b === "" || a.name == b || b === "card") {
                                                Lampa.Controller.toggle("content");
                                                Lampa.Noty.show(Lampa.Lang.translate("invalid_name"));
                                                return;
                                            }
                                            try {
                                                e.renameType(a.name, b);
                                                c.find(".register__name").text(b);
                                                a.name = b;
                                            } finally {
                                                Lampa.Controller.toggle(f);
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
            f.prototype.refresh = function (a) {
                var b = Lampa.Activity.active();
                if (b.component === "bookmarks") {
                    $(".register__counter.custom-type-" + a.uid).text(a.counter || 0);
                }
            };
            f.prototype.renderAddButton = function () {
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
                        if (b === "" || b === "card") {
                            Lampa.Controller.toggle("content");
                            Lampa.Noty.show(Lampa.Lang.translate("invalid_name"));
                            return;
                        }
                        try {
                            var c = e.createType(b);
                            a.renderCustomFavoriteButton(c);
                        } finally {
                            Lampa.Controller.toggle("content");
                        }
                    });
                });
            };
            f.prototype.registerLines = function () {
                Lampa.ContentRows.add({
                    index: 1,
                    screen: ["bookmarks"],
                    call: function (a, b) {
                        var d = e.getFavorite();
                        var f = ["movies", "tv"];
                        var g = [];
                        e.getTypesWithoutSystem(d).reverse().forEach(function (a) {
                            var b = d.customTypes[a];
                            var e = d[b] || [];
                            var h = d.card.filter(function (a) {
                                return e.indexOf(a.id) !== -1;
                            });
                            var i = Lampa.Arrays.clone(h.slice(0, 20));
                            var j = 0;
                            f.forEach(function (d) {
                                var e = Lampa.Utils.filterCardsByType(h, d);
                                if (e.length) {
                                    Lampa.Arrays.insert(i, j, {
                                        results: e,
                                        media: d,
                                        params: {
                                            module: Lampa.Maker.module("Card").only("Folder", "Callback"),
                                            createInstance: function (f) {
                                                return new c(e, {
                                                    title: a,
                                                    category: b,
                                                    media: d
                                                });
                                            },
                                            emit: {
                                                onEnter: Lampa.Router.call.bind(Lampa.Router, "favorite", {
                                                    title: a + " - " + d,
                                                    type: b,
                                                    filter: d
                                                })
                                            }
                                        }
                                    });
                                    j++;
                                }
                            });
                            i = i.slice(0, 20);
                            i.forEach(function (a) {
                                if (!a.params) {
                                    a.params = {
                                        emit: {
                                            onEnter: Lampa.Router.call.bind(Lampa.Router, "full", a),
                                            onFocus: function () {
                                                Lampa.Background.change(Lampa.Utils.cardImgBackground(a));
                                            }
                                        }
                                    };
                                }
                            });
                            if (i.length > 0) {
                                g.push({
                                    title: a,
                                    results: i,
                                    type: b,
                                    total_pages: h.length > 20 ? Math.ceil(h.length / 20) : 1,
                                    icon_svg: Lampa.Template.string("custom-fav-icon-svg"),
                                    icon_bgcolor: "#fff",
                                    icon_color: "#fd4518",
                                    params: {
                                        module: Lampa.Maker.module("Line").toggle(Lampa.Maker.module("Line").MASK.base, "Icon", "Event"),
                                        emit: {
                                            onMore: function () {
                                                Lampa.Activity.push({
                                                    type: b,
                                                    title: a,
                                                    component: "favorite",
                                                    page: 2
                                                });
                                            }
                                        }
                                    }
                                });
                            }
                        });
                        if (g.length) {
                            return g;
                        }
                    }
                });
            };
            var g = new f();
            function h() {
                this.extendContextMenu = function (a) {
                    var b = this;
                    var c = $("body > .selectbox").find(".selectbox-item__title").filter(function () {
                        return $(this).text() === Lampa.Lang.translate("title_book");
                    });
                    e.getTypes().forEach(function (d) {
                        var f = $("<div class=\"selectbox-item selector\"><div class=\"selectbox-item__title\">" + d + "</div><div class=\"selectbox-item__checkbox\"></div></div>");
                        f.insertBefore(c.parent());
                        f.on("hover:enter", function () {
                            var c = $(this).find(".selectbox-item__title").text();
                            var d = e.toggleCard(c, a.data);
                            $(this).toggleClass("selectbox-item--checked");
                            // TOLOOK
                            setTimeout(function () {
                                if (a.card) {
                                    b.refreshCustomFavoriteIcon(a);
                                } else {
                                    b.refreshBookmarkIcon();
                                }
                            }, 0);
                            g.refresh(d);
                        });
                        if (e.getTypeList(d).indexOf(a.data.id) >= 0) {
                            f.addClass("selectbox-item--checked");
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
                    var b = e.getCards();
                    var c = $(".card__icons-inner", a.card);
                    var d = a.data.id;
                    var f = b.indexOf(d) >= 0;
                    var g = $(".icon--star", c);
                    var h = g.length !== 0;
                    var i = h && g.hasClass("hide");
                    if (f) {
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
                    var c = e.getCards().indexOf(b.id) !== -1;
                    var d = c ? {} : Lampa.Favorite.check(b);
                    var f = c || Object.keys(d).filter(function (a) {
                        return a !== "history" && a !== "any";
                    }).some(function (a) {
                        return !!d[a];
                    });
                    var g = $(".button--book svg path", a.activity.render());
                    if (f) {
                        g.attr("fill", "currentColor");
                    } else {
                        g.attr("fill", "transparent");
                    }
                };
            }
            var i = new h();
            function j() {
                if (window.custom_favorites) {
                    return;
                }
                window.custom_favorites = true;
                var f = Lampa.Maker.map("Card");
                var h = f.Favorite.onUpdate;
                f.Favorite.onUpdate = function () {
                    var a = this;
                    h.apply(a);
                    i.refreshCustomFavoriteIcon({
                        data: a.data,
                        card: a.html
                    });
                };
                var j = f.Menu.onCreate;
                f.Menu.onCreate = function () {
                    var a = this;
                    var b = this.menu_list.filter(function (a) {
                        return a.title === Lampa.Lang.translate("settings_input_links");
                    })[0];
                    var c = b.menu;
                    b.menu = function () {
                        var d = e.getTypes().map(function (b) {
                            var c = e.getTypeList(b).indexOf(a.data.id) >= 0;
                            return {
                                checkbox: true,
                                checked: c ? a.data.id : undefined,
                                onCheck: function () {
                                    e.toggleCard(b, a.data);
                                    Lampa.Maker.map("Card").Favorite.onUpdate.apply(a);
                                },
                                title: b
                            };
                        });
                        var f = c.apply(b).map(function (b) {
                            if (!b.onCheck) {
                                return b;
                            }
                            var c = b.onCheck;
                            b.onCheck = function () {
                                c.apply(this, arguments);
                                Lampa.Maker.map("Card").Favorite.onUpdate.apply(a);
                            };
                            return b;
                        });
                        return d.concat(f);
                    };
                    j.apply(this, arguments);
                };
                var k = Lampa.Favorite.get;
                Lampa.Favorite.get = function (a) {
                    if (!a || !a.type) {
                        return k.apply(this, arguments);
                    }
                    var b = e.getFavorite();
                    if (b && b.hasOwnProperty(a.type) && Array.isArray(b[a.type]) && e.hasTypeId(b, a.type)) {
                        var c = b[a.type];
                        var d = b.customTypes.card;
                        var f = [];
                        for (var g = 0; g < d.length; g++) {
                            var h = d[g];
                            if (c.indexOf(h.id) !== -1) {
                                f.push(h);
                            }
                        }
                        return f;
                    }
                    return k.apply(this, arguments);
                };
                Lampa.Lang.add({
                    rename: {
                        en: "Rename",
                        uk: "Змінити ім’я",
                        ru: "Изменить имя"
                    },
                    invalid_name: {
                        en: "Invalid name",
                        uk: "Некоректне ім’я",
                        ru: "Некорректное имя"
                    }
                });
                Lampa.Template.add("custom-fav-icon-svg", "<svg width=\"24\" height=\"23\" viewBox=\"0 0 24 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.6162 7.10981L15.8464 7.55198L16.3381 7.63428L22.2841 8.62965C22.8678 8.72736 23.0999 9.44167 22.6851 9.86381L18.4598 14.1641L18.1104 14.5196L18.184 15.0127L19.0748 20.9752C19.1622 21.5606 18.5546 22.002 18.025 21.738L12.6295 19.0483L12.1833 18.8259L11.7372 19.0483L6.34171 21.738C5.81206 22.002 5.20443 21.5606 5.29187 20.9752L6.18264 15.0127L6.25629 14.5196L5.9069 14.1641L1.68155 9.86381C1.26677 9.44167 1.49886 8.72736 2.08255 8.62965L8.02855 7.63428L8.52022 7.55198L8.75043 7.10981L11.5345 1.76241C11.8078 1.23748 12.5589 1.23748 12.8322 1.76241L15.6162 7.10981Z\" stroke=\"currentColor\" stroke-width=\"2.2\"></path></svg>");
                Lampa.Template.add("custom-fav-icon", "<div class=\"card__icon icon--star\"><svg width=\"24\" height=\"23\" viewBox=\"0 0 24 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.6162 7.10981L15.8464 7.55198L16.3381 7.63428L22.2841 8.62965C22.8678 8.72736 23.0999 9.44167 22.6851 9.86381L18.4598 14.1641L18.1104 14.5196L18.184 15.0127L19.0748 20.9752C19.1622 21.5606 18.5546 22.002 18.025 21.738L12.6295 19.0483L12.1833 18.8259L11.7372 19.0483L6.34171 21.738C5.81206 22.002 5.20443 21.5606 5.29187 20.9752L6.18264 15.0127L6.25629 14.5196L5.9069 14.1641L1.68155 9.86381C1.26677 9.44167 1.49886 8.72736 2.08255 8.62965L8.02855 7.63428L8.52022 7.55198L8.75043 7.10981L11.5345 1.76241C11.8078 1.23748 12.5589 1.23748 12.8322 1.76241L15.6162 7.10981Z\" stroke=\"currentColor\" stroke-width=\"2.2\"></path></svg></div>");
                $("<style>").prop("type", "text/css").html(".card__icon { position: relative; } .icon--star svg { position: absolute; height: 60%; width: 60%; top: 50%; left: 50%; transform: translate(-50%, -50%) }.new-custom-type .register__counter { display:flex; justify-content:center; align-items:center }.new-custom-type .register__counter img { height:2.2em; padding:0.4em; }").appendTo("head");
                Lampa.Listener.follow("full", function (a) {
                    if (a.type == "complite") {
                        var b = Lampa.Activity.active();
                        i.refreshBookmarkIcon();
                        var c = $(".button--book", b.activity.render());
                        c.on("hover:enter", function () {
                            i.extendContextMenu({
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
                        g.renderAddButton();
                        var b = e.getFavorite();
                        e.getTypesWithoutSystem(b).reverse().forEach(function (a) {
                            var c = b.customTypes[a];
                            var d = b[c] || [];
                            var e = d.length;
                            g.renderCustomFavoriteButton({
                                name: a,
                                uid: c,
                                counter: e
                            });
                        });
                        Lampa.Activity.active().activity.toggle();
                    }
                });
                g.registerLines();
            }
            if (window.appready) {
                j();
            } else {
                Lampa.Listener.follow("app", function (a) {
                    if (a.type === "ready") {
                        j();
                    }
                });
            }
        })();
    } else {
        ;
        (function () {
            'use strict';

            function a(a) {
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
            function b() {
                var a = [];
                this.getFavorite = function () {
                    var b = Lampa.Storage.get("favorite", {});
                    b.card = b.card || [];
                    var c = b.customTypes || {};
                    b.customTypes = c;
                    a = this.getCards(b);
                    var d = a.length === 0 || !!c.card ? [] : b.card.filter(function (b) {
                        return a.indexOf(b.id) !== -1;
                    });
                    b.customTypes.card = c.card || d;
                    if (d.length > 0) {
                        Lampa.Storage.set("favorite", b);
                    }
                    return b;
                };
                this.getTypes = function () {
                    return this.getTypesWithoutSystem(this.getFavorite());
                };
                this.hasTypeId = function (a, b) {
                    var c = a.customTypes;
                    for (var d in c) {
                        if (c.hasOwnProperty(d) && c[d] === b) {
                            return true;
                        }
                    }
                    return false;
                };
                this.getTypesWithoutSystem = function (a) {
                    return Object.keys(a.customTypes || {}).filter(function (a) {
                        return a !== "card";
                    });
                };
                this.getCards = function (b) {
                    if (!b && a.length > 0) {
                        return a;
                    }
                    b = b || this.getFavorite();
                    a = this.getTypesWithoutSystem(b).reduce(function (a, c) {
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
                    var g = c.customTypes.card;
                    if (f.indexOf(b.id) === -1) {
                        if (g.every(function (a) {
                            return a.id !== b.id;
                        })) {
                            Lampa.Arrays.insert(g, 0, b);
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
                        var h = this.getCards(c);
                        Lampa.Favorite.listener.send("remove", {
                            card: b,
                            method: "id",
                            where: a,
                            typeId: d
                        });
                        var i = h.indexOf(b.id) >= 0;
                        if (!i) {
                            c.customTypes.card = g.filter(function (a) {
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
            var c = new b();
            function d() { }
            d.prototype.renderCustomFavoriteButton = function (a) {
                var b = "custom-type-" + a.uid;
                var d = Lampa.Template.js("register").addClass("selector").addClass(b).addClass("custom-type");
                d.find(".register__name").text(a.name).addClass(b);
                d.find(".register__counter").text(a.counter || 0).addClass(b);
                var e = Lampa.Activity.active().activity.render();
                d.on("hover:long", function () {
                    var b = [{
                        title: Lampa.Lang.translate("rename"),
                        action: "rename"
                    }, {
                        title: Lampa.Lang.translate("settings_remove"),
                        action: "remove"
                    }];
                    var f = Lampa.Controller.enabled().name;
                    Lampa.Select.show({
                        title: Lampa.Lang.translate("title_action"),
                        items: b,
                        onBack: function () {
                            Lampa.Controller.toggle(f);
                            Lampa.Controller.toggle("content");
                        },
                        onSelect: function (b) {
                            switch (b.action) {
                                case "remove":
                                    {
                                        try {
                                            c.removeType(a.name);
                                            d.remove();
                                            Lampa.Controller.toggle(f);
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
                                            if (b === "" || a.name == b || b === "card") {
                                                Lampa.Controller.toggle("content");
                                                Lampa.Noty.show(Lampa.Lang.translate("invalid_name"));
                                                return;
                                            }
                                            try {
                                                c.renameType(a.name, b);
                                                d.find(".register__name").text(b);
                                                a.name = b;
                                            } finally {
                                                Lampa.Controller.toggle(f);
                                                Lampa.Controller.collectionFocus(d, e);
                                            }
                                        });
                                        break;
                                    }
                            }
                        }
                    });
                });
                d.on("hover:enter", function () {
                    Lampa.Activity.push({
                        url: "",
                        component: "favorite",
                        title: a.name,
                        type: a.uid,
                        page: 1
                    });
                });
                $(".register:first", e).after(d);
                return d;
            };
            d.prototype.refresh = function (a) {
                var b = Lampa.Activity.active();
                if (b.component === "bookmarks") {
                    $(".register__counter.custom-type-" + a.uid).text(a.counter || 0);
                }
            };
            d.prototype.renderAddButton = function () {
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
                        if (b === "" || b === "card") {
                            Lampa.Controller.toggle("content");
                            Lampa.Noty.show(Lampa.Lang.translate("invalid_name"));
                            return;
                        }
                        try {
                            var d = c.createType(b);
                            a.renderCustomFavoriteButton(d);
                        } finally {
                            Lampa.Controller.toggle("content");
                        }
                    });
                });
            };
            d.prototype.renderLines = function () {
                var b = Lampa.Activity.active();
                var d = c.getFavorite();
                var e = ["movies", "tv"];
                var f = [];
                c.getTypesWithoutSystem(d).reverse().forEach(function (c) {
                    var f = d.customTypes[c];
                    var g = d[f] || [];
                    var h = d.card.filter(function (a) {
                        return g.indexOf(a.id) !== -1;
                    });
                    var i = Lampa.Arrays.clone(h.slice(0, 20));
                    var j = 0;
                    e.forEach(function (b) {
                        var d = Lampa.Utils.filterCardsByType(h, b);
                        if (d.length) {
                            Lampa.Arrays.insert(i, j, {
                                cardClass: function e() {
                                    return new a(d, {
                                        title: c,
                                        category: f,
                                        media: b
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
                        b.activity.component().append({
                            title: c,
                            results: i,
                            type: f
                        });
                    }
                });
            };
            var e = new d();
            function f() {
                this.extendContextMenu = function (a) {
                    var b = this;
                    var d = $("body > .selectbox").find(".selectbox-item__title").filter(function () {
                        return $(this).text() === Lampa.Lang.translate("title_book");
                    });
                    c.getTypes().forEach(function (f) {
                        var g = $("<div class=\"selectbox-item selector\"><div class=\"selectbox-item__title\">" + f + "</div><div class=\"selectbox-item__checkbox\"></div></div>");
                        g.insertBefore(d.parent());
                        g.on("hover:enter", function () {
                            var d = $(this).find(".selectbox-item__title").text();
                            var f = c.toggleCard(d, a.data);
                            $(this).toggleClass("selectbox-item--checked");
                            // TOLOOK
                            setTimeout(function () {
                                if (a.card) {
                                    b.refreshCustomFavoriteIcon(a);
                                } else {
                                    b.refreshBookmarkIcon();
                                }
                            }, 0);
                            e.refresh(f);
                        });
                        if (c.getTypeList(f).indexOf(a.data.id) >= 0) {
                            g.addClass("selectbox-item--checked");
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
                    var b = c.getCards();
                    var d = $(".card__icons-inner", a.card);
                    var e = a.data.id;
                    var f = b.indexOf(e) >= 0;
                    var g = $(".icon--star", d);
                    var h = g.length !== 0;
                    var i = h && g.hasClass("hide");
                    if (f) {
                        if (!h) {
                            d.prepend(Lampa.Template.get("custom-fav-icon"));
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
                    var d = c.getCards().indexOf(b.id) !== -1;
                    var e = d ? {} : Lampa.Favorite.check(b);
                    var f = d || Object.keys(e).filter(function (a) {
                        return a !== "history" && a !== "any";
                    }).some(function (a) {
                        return !!e[a];
                    });
                    var g = $(".button--book svg path", a.activity.render());
                    if (f) {
                        g.attr("fill", "currentColor");
                    } else {
                        g.attr("fill", "transparent");
                    }
                };
            }
            var g = new f();
            function h() {
                if (window.lampa_listener_extensions) {
                    return;
                }
                window.lampa_listener_extensions = true;
                Object.defineProperty(window.Lampa.Card.prototype, "build", {
                    get: function () {
                        return this._build;
                    },
                    set: function (a) {
                        this._build = function () {
                            a.apply(this);
                            Lampa.Listener.send("card", {
                                type: "build",
                                object: this
                            });
                        }.bind(this);
                    }
                });
            }
            function i() {
                if (window.custom_favorites) {
                    return;
                }
                window.custom_favorites = true;
                if (typeof Lampa.Listener !== "undefined") {
                    h();
                    Lampa.Listener.follow("card", function (a) {
                        if (a.type !== "build") {
                            return;
                        }
                        var b = a.object.favorite;
                        a.object.favorite = function () {
                            b.apply(this, arguments);
                            g.refreshCustomFavoriteIcon(a.object);
                        };
                        var c = a.object.onMenu;
                        a.object.onMenu = function () {
                            c.apply(this, arguments);
                            g.extendContextMenu(a.object);
                        };
                    });
                }
                var a = Lampa.Favorite.get;
                Lampa.Favorite.get = function (b) {
                    if (!b || !b.type) {
                        return a.apply(this, arguments);
                    }
                    var d = c.getFavorite();
                    if (d && d.hasOwnProperty(b.type) && Array.isArray(d[b.type]) && c.hasTypeId(d, b.type)) {
                        var e = d[b.type];
                        var f = d.customTypes.card;
                        var g = [];
                        for (var h = 0; h < f.length; h++) {
                            var i = f[h];
                            if (e.indexOf(i.id) !== -1) {
                                g.push(i);
                            }
                        }
                        return g;
                    }
                    return a.apply(this, arguments);
                };
                Lampa.Lang.add({
                    rename: {
                        en: "Rename",
                        uk: "Змінити ім’я",
                        ru: "Изменить имя"
                    },
                    invalid_name: {
                        en: "Invalid name",
                        uk: "Некоректне ім’я",
                        ru: "Некорректное имя"
                    }
                });
                Lampa.Template.add("custom-fav-icon", "<div class=\"card__icon icon--star\"><svg width=\"24\" height=\"23\" viewBox=\"0 0 24 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.6162 7.10981L15.8464 7.55198L16.3381 7.63428L22.2841 8.62965C22.8678 8.72736 23.0999 9.44167 22.6851 9.86381L18.4598 14.1641L18.1104 14.5196L18.184 15.0127L19.0748 20.9752C19.1622 21.5606 18.5546 22.002 18.025 21.738L12.6295 19.0483L12.1833 18.8259L11.7372 19.0483L6.34171 21.738C5.81206 22.002 5.20443 21.5606 5.29187 20.9752L6.18264 15.0127L6.25629 14.5196L5.9069 14.1641L1.68155 9.86381C1.26677 9.44167 1.49886 8.72736 2.08255 8.62965L8.02855 7.63428L8.52022 7.55198L8.75043 7.10981L11.5345 1.76241C11.8078 1.23748 12.5589 1.23748 12.8322 1.76241L15.6162 7.10981Z\" stroke=\"currentColor\" stroke-width=\"2.2\"></path></svg></div>");
                $("<style>").prop("type", "text/css").html(".card__icon { position: relative; } .icon--star svg { position: absolute; height: 60%; width: 60%; top: 50%; left: 50%; transform: translate(-50%, -50%) }.new-custom-type .register__counter { display:flex; justify-content:center; align-items:center }.new-custom-type .register__counter img { height:2.2em; padding:0.4em; }").appendTo("head");
                Lampa.Listener.follow("full", function (a) {
                    if (a.type == "complite") {
                        var b = Lampa.Activity.active();
                        g.refreshBookmarkIcon();
                        var c = $(".button--book", b.activity.render());
                        c.on("hover:enter", function () {
                            g.extendContextMenu({
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
                        e.renderAddButton();
                        var b = c.getFavorite();
                        e.renderLines();
                        c.getTypesWithoutSystem(b).reverse().forEach(function (a) {
                            var c = b.customTypes[a];
                            var d = b[c] || [];
                            var f = d.length;
                            e.renderCustomFavoriteButton({
                                name: a,
                                uid: c,
                                counter: f
                            });
                        });
                        Lampa.Activity.active().activity.toggle();
                    }
                });
            }
            function j() {
                i();
            }
            if (window.appready) {
                j();
            } else {
                Lampa.Listener.follow("app", function (a) {
                    if (a.type === "ready") {
                        j();
                    }
                });
            }
        })();
    }
})();