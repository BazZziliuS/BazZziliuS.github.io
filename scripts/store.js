(function () {
    "use strict";

    const DOMAIN = "https://cdn.abros.dev/lampa";

    window.skull = true;

    console.groupCollapsed(
        `%c👨🏻‍💻 Development by ABROS`,
        "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;"
    );
    console.log("✨ Сторонний магазин плагинов Scull Store разработан Daniel Abros");
    console.log(`💻 Site: https://abros.dev`);
    console.groupEnd();

    /** Utility Functions */
    const log = (message) => console.log(`[Skull Store]: ${message}`);
    const errorHandler = (error) => console.error(`[Error]:`, error);

    const loadScript = (src) => {
        document.head.appendChild(
            Object.assign(document.createElement("script"), { src })
        );
    };

    const loadCSS = (href) => {
        document.head.appendChild(
            Object.assign(document.createElement("link"), { rel: "stylesheet", href })
        );
    };

    /** Load Data */
    async function loadData() {
        try {
            const response = await fetch(`${DOMAIN}/storelist.json`);
            if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`);

            const { plugins, news } = await response.json();
            skullStart(plugins, news);
        } catch (error) {
            errorHandler(error);
        }
    }

    /** Manage Plugins */
    const managePlugin = {
        add: (plugin) => {
            const plugins = Lampa.Storage.get("plugins") || [];
            plugins.push(plugin);
            Lampa.Storage.set("plugins", plugins);
        },

        remove: (pluginUrl) => {
            const plugins = Lampa.Storage.get("plugins") || [];
            const updatedPlugins = plugins.filter((p) => p.url !== pluginUrl);
            Lampa.Storage.set("plugins", updatedPlugins);
        },

        check: (pluginUrl) => {
            const plugins = Lampa.Storage.get("plugins") || [];
            return plugins.some((plugin) => plugin.url === pluginUrl);
        },
    };

    /** UI Actions */
    const showReload = (message) => {
        Lampa.Modal.open({
            title: "",
            align: "center",
            zIndex: 300,
            html: `<div class="about">${message}</div>`,
            buttons: [
                {
                    name: "Нет",
                    onSelect: () => {
                        Lampa.Modal.close();
                        $(".modal").remove();
                        Lampa.Controller.toggle("settings_component");
                    },
                },
                {
                    name: "Да",
                    onSelect: () => window.location.reload(),
                },
            ],
        });
    };

    const skullStart = (plugins, news) => {
        log("Initializing Skull Store");

        /** Add Skull Store Component */
        Lampa.SettingsApi.addComponent({
            component: "skull",
            name: "Skull Store",
            icon: "<svg>...</svg>",
        });

        /** Add News Section */
        const newsHtml = news
            .map(
                (item) => `
                    <div style="${item.bg}; color:${item.colortext}; border-radius: 1em; padding: 0.8em;">
                        <div style="font-size: 1.1em; margin-bottom: 1em;">${item.title}</div>
                        <div style="font-size: 0.9em;">${item.text}</div>
                    </div>`
            )
            .join("");

        Lampa.SettingsApi.addParam({
            component: "skull",
            param: { name: "skull_news", type: "static" },
            field: { name: `<div>${newsHtml}</div>` },
        });

        /** Add Plugins to UI */
        plugins.forEach((plugin) => {
            Lampa.SettingsApi.addParam({
                component: plugin.component,
                param: {
                    name: plugin.param.name,
                    type: "select",
                    values: { 1: "Установить", 2: "Удалить" },
                },
                field: {
                    name: plugin.field.name,
                    description: plugin.field.description,
                },
                onChange: (value) => {
                    if (value === "1") managePlugin.add(plugin);
                    if (value === "2") managePlugin.remove(plugin.url);
                },
            });
        });
    };

    /** Load Dependencies */
    loadCSS(`${DOMAIN}/main/slick/slick.css`);
    loadCSS(`${DOMAIN}/main/slick/slick-theme.css`);
    loadScript(`${DOMAIN}/main/slick/slick.min.js`);

    if (window.appready) {
        loadData();
    } else {
        Lampa.Listener.follow("app", (e) => {
            if (e.type === "ready") loadData();
        });
    }
})();
