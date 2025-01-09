;
(function () {
    'use strict';

    Lampa.Platform.tv();
    (function () {
        "use strict";
        var c = 0;
        function d() {
            Lampa.Controller.listener.follow("toggle", function (a) {
                if (a.name == "select") {
                    // TOLOOK
                    setTimeout(function () {
                        if (Lampa.Activity.active().component == "full" && document.querySelector(".ad-server") !== null) {
                            $(".ad-server").remove();
                        }
                        if (Lampa.Activity.active().component === "modss_online") {
                            $(".selectbox-item--icon").remove();
                        }
                    }, 20);
                }
            });
        }
        function e() {
            // TOLOOK
            setTimeout(function () {
                $(".selectbox-item__lock").parent().css("display", "none");
                if (!$("[data-name=\"account_use\"]").length) {
                    $("div > span:contains(\"Статус\")").parent().remove();
                }
            }, 10);
        }
        function f() {
            document.addEventListener("DOMSubtreeModified", function b(a) {
                var d = document.getElementsByClassName("card");
                if (d.length > 0 && c == 0) {
                    c = 1;
                    e();
                    // TOLOOK
                    setTimeout(function () {
                        c = 0;
                    }, 500);
                }
            }, false);
        }
        function g() {
            var g = document.createElement("style");
            g.innerHTML = ".button--subscribe { display: none; }";
            document.body.appendChild(g);
            Lampa.Listener.follow("full", function (a) {
                if (a.type == "build" && a.name == "discuss") {
                    // TOLOOK
                    setTimeout(function () {
                        $(".full-reviews").parent().parent().parent().parent().remove();
                    }, 100);
                }
            });
            $(document).ready(function () {
                var a = new Date();
                var b = a.getTime();
                localStorage.setItem("region", "{\"code\":\"uk\",\"time\":" + b + "}");
            });
            $("[data-action=\"tv\"]").on("hover:enter hover:click hover:touch", function () {
                var a = // TOLOOK
                    setInterval(function () {
                        if (document.querySelector(".ad-bot") !== null) {
                            $(".ad-bot").remove();
                            clearInterval(a);
                            // TOLOOK
                            setTimeout(function () {
                                Lampa.Controller.toggle("content");
                            }, 0);
                        }
                    }, 50);
                var b = // TOLOOK
                    setInterval(function () {
                        if (document.querySelector(".card__textbox") !== null) {
                            $(".card__textbox").parent().parent().remove();
                            clearInterval(b);
                        }
                    }, 50);
            });
            // TOLOOK
            setTimeout(function () {
                $(".open--feed").remove();
                $(".open--premium").remove();
                $(".open--notice").remove();
                if ($(".icon--blink").length > 0) {
                    $(".icon--blink").remove();
                }
            }, 1000);
            Lampa.Settings.listener.follow("open", function (a) {
                if (a.name == "account") {
                    // TOLOOK
                    setTimeout(function () {
                        $(".settings--account-premium").remove();
                        $("div > span:contains(\"CUB Premium\")").remove();
                    }, 0);
                }
                if (a.name == "server" && document.querySelector(".ad-server") !== null) {
                    $(".ad-server").remove();
                }
            });
            Lampa.Listener.follow("full", function (a) {
                if (a.type == "complite") {
                    $(".button--book").on("hover:enter", function () {
                        e();
                    });
                }
            });
            Lampa.Storage.listener.follow("change", function (a) {
                if (a.name == "activity") {
                    if (Lampa.Activity.active().component === "bookmarks") {
                        $(".register:nth-child(4)").hide();
                        $(".register:nth-child(5)").hide();
                        $(".register:nth-child(6)").hide();
                        $(".register:nth-child(7)").hide();
                        $(".register:nth-child(8)").hide();
                    }
                    // TOLOOK
                    setTimeout(function () {
                        f();
                    }, 200);
                }
            });
        }
        if (window.appready) {
            g();
            f();
            d();
        } else {
            Lampa.Listener.follow("app", function (a) {
                if (a.type == "ready") {
                    g();
                    f();
                    d();
                    $("[data-action=feed]").eq(0).remove();
                    $("[data-action=subscribes]").eq(0).remove();
                    $("[data-action=myperson]").eq(0).remove();
                }
            });
        }
    })();
})();