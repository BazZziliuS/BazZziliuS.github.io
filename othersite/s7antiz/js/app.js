class _app {
  id = 0;
  videoElement = null;
  audioElement = null;
  musicVolume = 0.2;
  musicFadeIn = 4e3;
  skippedIntro = !1;
  backgroundToggler = !1;
  shouldIgnoreVideo = !1;
  effects = [
    'bounce',
    'flash',
    'pulse',
    'rubberBand',
    'shake',
    'swing',
    'tada',
    'wobble',
    'jello',
  ];
  brandDescription = [
    'Im so high right here',
    'And you dont even know',
    'dont even know',
    'Young kid is so afraid to be alone',
    'alone',
    'Young kid is so afraid to be left out',
    'left out',
    'Oh...',
    'I will not forget that',
    'The way you look at me when I am down',
    'The way life spins round when Im not around',
    'The way you smile when I smile down',
    'The way you',
    'The way you',
    'The way you',
    'The way you',
  ];
  titleChanger = (e, n) => {
    if (!e) return;
    n = n || 3e3;
    let o = 0;
    setInterval(() => {
      o < e.length ? (document.title = e[o++]) : (document.title = e[(o = 0)]);
    }, n);
  };
  iconChanger = (e, n) => {
    if (!e) return;
    n = n || 3e3;
    let o = 0;
    setInterval(() => {
      if (o < e.length) {
        const n =
          document.querySelector("link[rel*='icon']") ||
          document.createElement('link');
        (n.type = 'image/x-icon'),
          (n.rel = 'shortcut icon'),
          (n.href = e[o]),
          document.getElementsByTagName('head')[0].appendChild(n);
      } else o = 0;
      ++o;
    }, n);
  };
}
const app = new _app();
