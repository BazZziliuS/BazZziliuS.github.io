(function () {
  'use strict';

  Lampa.Platform.tv();
  if (!Date.now) {
    Date.now = function () {
      return new Date().getTime();
    };
  }
  (function () {
    "use strict";
    for (var e = ["webkit", "moz"], f = 0; f < e.length && !window.requestAnimationFrame; ++f) {
      var g = e[f];
      window.requestAnimationFrame = window[g + "RequestAnimationFrame"];
      window.cancelAnimationFrame = window[g + "CancelAnimationFrame"] || window[g + "CancelRequestAnimationFrame"];
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
      var h = 0;
      window.requestAnimationFrame = function (a) {
        var b = Date.now();
        var c = Math.max(h + 16, b);
        return (// TOLOOK
          setTimeout(function () {
            a(h = c);
          }, c - b)
        );
      };
      window.cancelAnimationFrame = clearTimeout;
    }
  })();
  (function (a) {
    a.snowfall = function (b, c) {
      function d(d, e, f, g) {
        this.x = d;
        this.y = e;
        this.size = f;
        this.speed = g;
        this.step = 0;
        this.stepSize = i(1, 10) / 100;
        if (c.collection) {
          this.target = p[i(0, p.length - 1)];
        }
        var j = null;
        if (c.image) {
          j = document.createElement("img");
          j.src = c.image;
        } else {
          j = document.createElement("div");
          a(j).css({
            background: c.flakeColor
          });
        }
        a(j).attr({
          class: "snowfall-flakes"
        }).css({
          width: this.size,
          height: this.size,
          position: c.flakePosition,
          top: this.y,
          left: this.x,
          fontSize: 0,
          zIndex: c.flakeIndex
        });
        if (a(b).get(0).tagName === a(document).get(0).tagName) {
          a("body").append(a(j));
          b = a("body");
        } else {
          a(b).append(a(j));
        }
        this.element = j;
        this.update = function () {
          this.y += this.speed;
          if (this.y > k - (this.size + 6)) {
            this.reset();
          }
          this.element.style.top = this.y + "px";
          this.element.style.left = this.x + "px";
          this.step += this.stepSize;
          if (w === false) {
            this.x += Math.cos(this.step);
          } else {
            this.x += w + Math.cos(this.step);
          }
          if (c.collection && this.x > this.target.x && this.x < this.target.width + this.target.x && this.y > this.target.y && this.y < this.target.height + this.target.y) {
            var a = this.target.element.getContext("2d");
            var b = this.x - this.target.x;
            var d = this.y - this.target.y;
            var e = this.target.colData;
            if (e[parseInt(b)][parseInt(d + this.speed + this.size)] !== undefined || d + this.speed + this.size > this.target.height) {
              if (d + this.speed + this.size > this.target.height) {
                for (; d + this.speed + this.size > this.target.height && this.speed > 0;) {
                  this.speed *= 0.5;
                }
                a.fillStyle = h.flakeColor;
                if (e[parseInt(b)][parseInt(d + this.speed + this.size)] == undefined) {
                  e[parseInt(b)][parseInt(d + this.speed + this.size)] = 1;
                  a.fillRect(b, d + this.speed + this.size, this.size, this.size);
                } else {
                  e[parseInt(b)][parseInt(d + this.speed)] = 1;
                  a.fillRect(b, d + this.speed, this.size, this.size);
                }
                this.reset();
              } else {
                this.speed = 1;
                this.stepSize = 0;
                if (parseInt(b) + 1 < this.target.width && e[parseInt(b) + 1][parseInt(d) + 1] == undefined) {
                  this.x++;
                } else if (parseInt(b) - 1 > 0 && e[parseInt(b) - 1][parseInt(d) + 1] == undefined) {
                  this.x--;
                } else {
                  a.fillStyle = h.flakeColor;
                  a.fillRect(b, d, this.size, this.size);
                  e[parseInt(b)][parseInt(d)] = 1;
                  this.reset();
                }
              }
            }
          }
          if (this.x + this.size > l - m || this.x < m) {
            this.reset();
          }
        };
        this.reset = function () {
          this.y = 0;
          this.x = i(m, l - m);
          this.stepSize = i(1, 10) / 100;
          this.size = i(c.minSize * 100, c.maxSize * 100) / 100;
          this.element.style.width = this.size + "px";
          this.element.style.height = this.size + "px";
          this.speed = i(c.minSpeed, c.maxSpeed);
        };
      }
      function e() {
        for (j = 0; j < g.length; j += 1) {
          g[j].update();
        }
        n = requestAnimationFrame(function () {
          e();
        });
      }
      var f = {
        flakeCount: 35,
        flakeColor: "#ffffff",
        flakePosition: "absolute",
        flakeIndex: 999999,
        minSize: 1,
        maxSize: 2,
        minSpeed: 1,
        maxSpeed: 5,
        round: !1,
        shadow: !1,
        collection: !1,
        collectionHeight: 40,
        deviceorientation: !1
      };
      var g = [];
      var h = f;
      var c = a.extend(h, c);
      function i(a, b) {
        return Math.round(a + Math.random() * (b - a));
      }
      a(b).data("snowfall", this);
      var j = 0;
      var k = a(b).height();
      var l = a(b).width();
      var m = 0;
      var n = 0;
      if (c.collection !== !1) {
        var o = document.createElement("canvas");
        if (o.getContext && o.getContext("2d")) {
          for (var p = [], q = a(c.collection), r = c.collectionHeight, j = 0; j < q.length; j++) {
            var s = q[j].getBoundingClientRect();
            var t = a("<canvas/>", {
              class: "snowfall-canvas"
            });
            var u = [];
            if (s.top - r > 0) {
              a("body").append(t);
              t.css({
                position: c.flakePosition,
                left: s.left + "px",
                top: s.top - r + "px"
              }).prop({
                width: s.width,
                height: r
              });
              for (var v = 0; v < s.width; v++) {
                u[v] = [];
              }
              p.push({
                element: t.get(0),
                x: s.left,
                y: s.top - r,
                width: s.width,
                height: r,
                colData: u
              });
            }
          }
        } else {
          c.collection = !1;
        }
      }
      if (a(b).get(0).tagName === a(document).get(0).tagName) {
        m = 25;
      }
      a(window).bind("resize", function () {
        k = a(b)[0].clientHeight;
        l = a(b)[0].offsetWidth;
      });
      j = 0;
      for (; j < c.flakeCount; j += 1) {
        g.push(new d(i(m, l - m), i(0, k), i(c.minSize * 100, c.maxSize * 100) / 100, i(c.minSpeed, c.maxSpeed)));
      }
      if (c.round) {
        a(".snowfall-flakes").css({
          "-moz-border-radius": c.maxSize,
          "-webkit-border-radius": c.maxSize,
          "border-radius": c.maxSize
        });
      }
      if (c.shadow) {
        a(".snowfall-flakes").css({
          "-moz-box-shadow": "1px 1px 1px #555",
          "-webkit-box-shadow": "1px 1px 1px #555",
          "box-shadow": "1px 1px 1px #555"
        });
      }
      var w = !1;
      if (c.deviceorientation) {
        a(window).bind("deviceorientation", function (a) {
          w = a.originalEvent.gamma * 0.1;
        });
      }
      e();
      this.clear = function () {
        a(".snowfall-canvas").remove();
        a(b).children(".snowfall-flakes").remove();
        cancelAnimationFrame(n);
      };
    };
    a.fn.snowfall = function (b) {
      if (typeof b == "object" || b == undefined) {
        return this.each(function (c) {
          new a.snowfall(this, b);
        });
      } else if (typeof b == "string") {
        return this.each(function (b) {
          var c = a(this).data("snowfall");
          if (c) {
            c.clear();
          }
        });
      } else {
        return undefined;
      }
    };
  })(jQuery);
  (function () {
    'use strict';

    function a() {
      Lampa.SettingsApi.addParam({
        component: "interface",
        param: {
          name: "Snow",
          type: "trigger",
          default: true
        },
        field: {
          name: "Показывать снег"
        },
        onChange: function (c) {
          if (Lampa.Storage.field("Snow") == true) {
            a();
          } else {
            b();
          }
        },
        onRender: function (a) {
          // TOLOOK
          setTimeout(function () {
            $("div[data-name=\"Snow\"]").insertAfter("div[data-name=\"black_style\"]");
          }, 0);
        }
      });
      if (Lampa.Storage.field("Snow") == true) {
        a();
      } else {
        b();
      }
      function a() {
        window.snow = true;
        var a = {
          deviceorientation: true,
          round: true,
          minSize: 5,
          maxSize: 8
        };
        $(".background").snowfall(a);
      }
      function b() {
        window.snow = false;
        $(".background").snowfall("clear");
      }
    }
    if (window.appready) {
      a();
    } else {
      Lampa.Listener.follow("app", function (b) {
        if (b.type == "ready") {
          a();
        }
      });
    }
  })();
})();
