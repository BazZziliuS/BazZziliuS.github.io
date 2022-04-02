'use strict';
const ipgeolocation =
    'https://api.ipgeolocation.io/ipgeo?apiKey=57862c090daa4d1b8d8a2d5b4fee6046',
  timeouts = [],
  mobileAndTabletCheck = () =>
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
$(document).ready(() => {
  const e = [
    { name: 's7antiz', link: 'tg' },
    { name: 'bury me when the sunset comes', link: 'vk' },
    { name: 'i miss you', link: 'inst' },
  ];
  for (let t in e) {
    let i = e[t];
    $('#marquee').append(
      `<a href="https://s7antiz.xyz/${i.link}" target="_BLANK">${i.name}</a>`
    ),
      (i = $('#marquee').children('a').last()),
      t != e.length - 1 &&
        $('#marquee').append(
          ' <img class="emoticon" src="assets/others/mgh_17.png"> '
        );
  }
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) &&
    ($('#background').replaceWith(
      '<div id="background" style="background-image: url(assets/images/mobile-background.jpg);"></div>'
    ),
    (app.shouldIgnoreVideo = !0)),
    app.titleChanger(['s7antiz', 'i love you <3']);
}),
  $.cookie('videoTime') &&
    ((app.videoElement.currentTime = $.cookie('videoTime')),
    (app.audioElement.currentTime = $.cookie('videoTime'))),
  document.addEventListener('contextmenu', e => {
    e.preventDefault();
  }),
  (document.body.onkeyup = e => {
    if (32 == e.keyCode && app.skippedIntro)
      return (
        app.backgroundToggler
          ? (app.videoElement.play(), app.audioElement.play())
          : (app.videoElement.pause(), app.audioElement.pause()),
        (app.backgroundToggler = !app.backgroundToggler)
      );
  }),
  $('html').on('contextmenu', e => {
    const t = document.createElement('img'),
      i = app.skippedIntro ? '' : 'trollface-light';
    (t.src = 'assets/others/trollface.png'),
      (t.width = 64),
      (t.height = 64),
      (t.alt = 'obnoxious.club'),
      (t.style = `position: absolute; left: ${e.pageX}px; top: ${e.pageY}px; z-index: 10`),
      (t.className = `troll ${i}`),
      document.body.appendChild(t);
  }),
  setInterval(() => {
    $('.troll').remove();
  }, 600),
  $('.skip').click(() => {
    skipIntro();
  }),
  $.fn.extend({
    animateCss: function (e) {
      return (
        this.addClass(`animated ${e}`).one(
          'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
          () => {
            $(this).removeClass(`animated ${e}`);
          }
        ),
        this
      );
    },
  });
const writeLine = (e, t, i, o) => {
  i = 'number' == typeof i ? i : [0, (o = i)];
  const a = 2 !== app.id ? ++app.id : (app.id += 2);
  setTimeout(() => {
    new Typed(`#line${a}`, { strings: e, typeSpeed: t, onComplete: o });
  }, i);
};
$.getJSON(ipgeolocation, e => {
  writeLine(
    [
      'Authenticating...',
      "Granting access to <span style='font-size: 14px; color: #06d;'>[unknown]</span>...",
    ],
    30,
    () => {
      if (app.skippedIntro) return;
      clearCursor();
      const t = ['user', 'dude'],
        i = e.ip ? e.ip : t[Math.floor(Math.random() * t.length)],
        o = e.country_name ? e.country_name : 'your country';
      writeLine(
        [
          "Access granted! <span style='font-size: 14px; color: #0f0;'>[success]</span>",
          `Welcome back, <i style='color: #0f0'>${i}</i>! By the way, nice to see someone from ${o} here!`,
        ],
        30,
        500,
        () => {
          app.skippedIntro ||
            (clearCursor(),
            writeLine(
              ["<i style='color: #F62459'>s7antiz $$$</i>"],
              120,
              500,
              () => {
                timeouts.push(
                  setTimeout(() => {
                    app.skippedIntro ||
                      (clearCursor(),
                      setTimeout(() => {
                        skipIntro();
                      }, 500));
                  }, 1e3)
                );
              }
            ));
        }
      );
    }
  );
});
const skipIntro = () => {
    app.skippedIntro ||
      ((app.skippedIntro = !0),
      timeouts.forEach(e => {
        clearTimeout(e);
      }),
      $('.top-right').remove(),
      $('#main').fadeOut(100, () => {
        $('#main').remove(),
          $('#marquee').marquee({
            duration: 15e3,
            gap: 420,
            delayBeforeStart: 1e3,
            direction: 'left',
            duplicated: !0,
          }),
          setTimeout(() => {
            $('.brand-header').animateCss(
              app.effects[Math.floor(Math.random() * app.effects.length)]
            );
          }, 200),
          setTimeout(() => {
            new Typed('#brand', {
              strings: app.brandDescription,
              typeSpeed: 40,
              onComplete: () => {
                clearCursor();
              },
            });
          }, 1350),
          setTimeout(() => {
            app.shouldIgnoreVideo ||
              (app.videoElement.play(), app.audioElement.play()),
              app.videoElement.addEventListener(
                'timeupdate',
                () => {
                  $.cookie('videoTime', app.videoElement.currentTime, {
                    expires: 1,
                  });
                },
                !1
              ),
              $('.marquee-container')
                .css('visibility', 'visible')
                .hide()
                .fadeIn(100),
              $('.marquee-container').animateCss('zoomIn'),
              $('.container').fadeIn(),
              $('.background').fadeIn(200, () => {
                app.shouldIgnoreVideo ||
                  $('#audio').animate(
                    { volume: app.musicVolume },
                    app.musicFadeIn
                  );
              });
          }, 200);
      }));
  },
  clearCursor = () => $('span').siblings('.typed-cursor').css('opacity', '0');
