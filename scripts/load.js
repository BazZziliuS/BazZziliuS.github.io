(function () {
  "use strict";
  window.Lampa.Plugins.load = new Proxy(window.Lampa.Plugins.load, {
    apply(a, b, c) {
      console.log("!Interceptor: Intercepted call to window.Lampa.Plugins.load");
      console.log("!Plugins", "start load");
      modify();
      loadBlackList(d => {
        Account.plugins(e => {
          let f = window.lampa_settings.plugins_use ? e.filter(a => a.status).map(a => a.url).concat(Storage.get("plugins", "[]").filter(a => a.status).map(a => a.url)) : [];
          f.push("./plugins/modification.js");
          f = f.filter((a, b) => {
            return f.indexOf(a) === b;
          });
          console.log("!Plugins", "load list:", f);
          b._blacklist = d;
          d.forEach(a => {
            f = f.filter(b => b.toLowerCase().indexOf(a) == -1);
          });
          console.log("!Plugins", "clear list:", f);
          let g = [];
          let h = {};
          let i = [];
          f.forEach(a => {
            let b = addPluginParams(a);
            i.push(b);
            h[b] = a;
          });
          Utils.putScriptAsync(i, () => {
            Reflect.apply(a, b, c);
            delete b._blacklist;
            delete b.analysisPlugins;
          }, a => {
            if (a.indexOf("modification.js") == -1) {
              console.log("Plugins", "error:", h[a]);
              g.push(h[a]);
              createPluginDB(h[a], a);
            }
          }, a => {
            console.log("!Plugins", "include:", h[a]);
            b._created.push(h[a]);
            updatePluginDB(h[a], a);
            delete b.analysisPlugins;
          }, false);
        });
      });
    }
  });
})();
(function () {
  let b;
  try {
    const a = Function("return (function() {}.constructor(\"return this\")( ));");
    b = a();
  } catch (a) {
    b = window;
  }
  b.setInterval(a, 4000);
})();
