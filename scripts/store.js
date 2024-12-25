(function () {
    "use strict";

    window.skull = true;

    console.groupCollapsed(
        `%c👨🏻‍💻 Development by ABROS`,
        "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;"
    );
    console.log(
        "✨ Сторонний магазин плагинов Scull Store разработан Daniel Abros"
    );
    console.log(`💻 Site: https://abros.dev`);
    console.groupEnd();

    /* Домен-регулятор */
    const domain = "https://cdn.abros.dev/lampa";

    /* Иконки */
    const icons = {
        skull: '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="currentColor" style="border: 1px solid; border-radius: 5px; padding: 2px;">...</svg>',
        online: '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500.000000pt" height="500.000000pt" viewBox="-1.09 0 122.88 122.88" version="1.1" id="Layer_1" style="enable-background:new 0 0 120.71 122.88" xml:space="preserve"><g stroke-linecap="round" stroke-linejoin="round"/></g><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g>...</g></svg></div><div class="settings-folder__name" style="font-size: 1.3em;">Онлайн</div></div>',
        tv: '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">...</g></svg></div><div class="settings-folder__name" style="font-size: 1.3em;">ТВ</div></div>',
        torpars: '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 24 24" fill="#ffffff"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z"/></svg></div><div class="settings-folder__name" style="font-size: 1.3em;">Торренты и Парсеры</div></div>',
        interface: '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">...</g></svg></div><div class="settings-folder__name" style="font-size:1.3em">Интерфейс</div></div>',
        control: '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="800px" height="800px" viewBox="0 0 1024 1024" class="icon">...</svg></div><div class="settings-folder__name" style="font-size: 1.3em;">Управление</div></div>',
        style: '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="64px" width="64px" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff" style="&#10;"><g>...</g></svg></div><div class="settings-folder__name" style="font-size:1.3em">Темы</div></div>'
    };

    /* Регулярно вызываемые функции */
    Lampa.Storage.set("needReboot", false);
    Lampa.Storage.set("needRebootSettingExit", false);

    /* Подключение скриптов и стилей для визуала */
    loadScript(`${domain}/main/slick/slick.min.js`);
    loadCSS(`${domain}/main/slick/slick.css`);
    loadCSS(`${domain}/main/slick/slick-theme.css`);

    function loadScript(src) {
        document.head.appendChild(
            Object.assign(document.createElement("script"), { src })
        );
    }

    function loadCSS(href) {
        document.head.appendChild(
            Object.assign(document.createElement("link"), { rel: "stylesheet", href })
        );
    }

    /* Загрузка данных */
    function loadData() {
        fetch(`${domain}/storelist.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const { plugins, news } = data;
                skullStart(plugins, news);
            })
            .catch((error) => {
                console.error(
                    "There has been a problem with your fetch operation:",
                    error
                );
            });
    }

    /* Запрос на перезагрузку в модальном окне */
    function showReload(reloadText) {
        Lampa.Modal.open({
            title: "",
            align: "center",
            zIndex: 300,
            html: $('<div class="about">' + reloadText + "</div>"),
            buttons: [
                {
                    name: "Нет",
                    onSelect: function onSelect() {
                        Lampa.Modal.close();
                        $(".modal").remove();
                        Lampa.Controller.toggle("settings_component");
                    },
                },
                {
                    name: "Да",
                    onSelect: function onSelect() {
                        window.location.reload();
                    },
                },
            ],
        });
    }

    /* Следим за настройками */
    function settingsWatch() {
        /* проверяем флаг перезагрузки и ждём выхода из настроек */
        if (Lampa.Storage.get("needRebootSettingExit")) {
            const intervalSettings = setInterval(function () {
                const elementSettings = $(
                    "#app > div.settings > div.settings__content.layer--height > div.settings__body > div"
                );
                if (!elementSettings.length > 0) {
                    clearInterval(intervalSettings);
                    showReload("Для полного удаления плагина перезагрузите приложение!");
                }
            }, 1000);
        }
    }

    function itemON(sourceURL, sourceName, sourceAuthor, itemName) {
        if (
            $('DIV[data-name="' + itemName + '"]')
                .find(".settings-param__status")
                .hasClass("active")
        ) {
            Lampa.Noty.show("Плагин уже установлен!");
        } else {
            // Если перезагрузки не требуется - контроль после удаления плагинов
            if (!Lampa.Storage.get("needReboot")) {
                // Получаем список плагинов
                const pluginsArray = Lampa.Storage.get("plugins");
                // Добавляем новый элемент к списку
                pluginsArray.push({
                    author: sourceAuthor,
                    url: sourceURL,
                    name: sourceName,
                    status: 1,
                });
                // Внедряем изменённый список в лампу
                Lampa.Storage.set("plugins", pluginsArray);
                // Делаем инъекцию скрипта для немедленной работы
                const script = document.createElement("script");
                script.src = sourceURL;
                document.getElementsByTagName("head")[0].appendChild(script);
                setTimeout(function () {
                    Lampa.Settings.update();
                    Lampa.Noty.show("Плагин " + sourceName + " успешно установлен");
                }, 300);
            }
        }
    }

    function hideInstall() {
        $("#hideInstall").remove();
        $("body").append(
            '<div id="hideInstall"><style>div.settings-param__value{opacity: 0%!important;display: none;}</style><div>'
        );
    }

    function deletePlugin(pluginToRemoveUrl) {
        const plugins = Lampa.Storage.get("plugins");
        const updatedPlugins = plugins.filter(function (obj) {
            return obj.url !== pluginToRemoveUrl;
        });
        Lampa.Storage.set("plugins", updatedPlugins);
        Lampa.Settings.update();
        Lampa.Noty.show("Плагин успешно удален");
        Lampa.Storage.set("needRebootSettingExit", true);
        settingsWatch();
    }

    function checkPlugin(pluginToCheck) {
        const plugins = Lampa.Storage.get("plugins");
        const checkResult = plugins.filter(function (obj) {
            return obj.url == pluginToCheck;
        });
        return JSON.stringify(checkResult) !== "[]";
    }

    /* Создание Skull Store и его меню */
    function skullStart(plugins, news) {
        /* Skull Store */
        Lampa.SettingsApi.addComponent({
            component: "skull",
            name: "Skull Store",
            icon: icons.skull,
        });

        Lampa.Settings.listener.follow("open", function (e) {
            if (e.name == "main") {
                setTimeout(function () {
                    $('div[data-component="skull_online"]').remove();
                    $('div[data-component="skull_tv"]').remove();
                    $('div[data-component="skull_torpars"]').remove();
                    $('div[data-component="skull_interface"]').remove();
                    $('div[data-component="skull_control"]').remove();
                    $('div[data-component="skull_style"]').remove();
                }, 0);
                $("#hideInstall").remove();
                /* Сдвигаем раздел выше */
                setTimeout(function () {
                    $("div[data-component=plugins]").before(
                        $("div[data-component=skull]")
                    );
                }, 30);
            }
        });

        /* Новости */
        const newsBlock = `
            <div>
                <div style="margin-bottom: 5px; font-size: 1.2em; font-weight: 600; color: #6f6f6f;">
                    <div>Новости</div>
                </div>
                <div id="newsbody">
                    ${news
                        .map(
                            (item) => `
                        <div style="${item.bg}; color:${item.colortext}; border-radius: 1em; padding: 0.8em; height: auto;">
                            <div style="font-size: 1.1em; margin-bottom: 1em;">${item.title}</div>
                            <div style="font-size: 0.9em;">${item.text}</div>
                        </div>`
                        )
                        .join("")}
                </div>
            </div>`;

        Lampa.SettingsApi.addParam({
            component: "skull",
            param: {
                name: "skull_news",
                type: "static",
            },
            field: { name: newsBlock },
        });

        /* Магазин */
        Lampa.SettingsApi.addParam({
            component: "skull",
            param: {
                name: "skull_info",
                type: "title",
            },
            field: {
                name: "Магазин",
            },
        });

        /* Онлайн */
        addStaticParam("skull_online", icons.online, "Онлайн");

        /* ТВ */
        addStaticParam("skull_tv", icons.tv, "ТВ");

        /* Торренты и Парсеры */
        addStaticParam("skull_torpars", icons.torpars, "Торренты и Парсеры");

        /* Интерфейс */
        addStaticParam("skull_interface", icons.interface, "Интерфейс");

        /* Управление */
        addStaticParam("skull_control", icons.control, "Управление");

        /* Темы */
        addStaticParam("skull_style", icons.style, "Темы");

        Lampa.SettingsApi.addParam({
            component: "skull_style",
            param: {
                name: "skull_style_info",
                type: "title",
            },
            field: {
                name: "Важно!<br>Перед применением темы отключите предыдущую.",
            },
        });

        /* Подвал */
        Lampa.SettingsApi.addParam({
            component: "skull",
            param: {
                name: "skull_info",
                type: "title",
            },
            field: {
                name: "✨ Данный магазин разрабатывается только из интереса к проекту. Если ты хочешь помочь в разработке пиши мне в телеграм @abrosxd",
            },
        });

        /* Плагины */
        plugins.forEach(addPluginSettings);

        /* Настройки меню */
        Lampa.Settings.listener.follow("open", function (e) {
            const titles = {
                main: "title_settings",
                skull: "💀 Skull Store",
                skull_online: "Online",
                skull_tv: "ТВ",
                skull_torpars: "Торренты и Парсеры",
                skull_interface: "Интерфейс",
                skull_control: "Управление",
                skull_style: "Темы",
            };
            $(".settings__title").text(Lampa.Lang.translate(titles[e.name] || e.name));
            if (e.name == "skull") {
                $("#newsbody").slick({
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 12000,
                    arrows: false,
                });
            }
        });

        /* Авторство и замена CubPremium */
        Lampa.Settings.main()
            .render()
            .find('[data-component="plugins"]')
            .unbind("hover:enter")
            .on("hover:enter", function () {
                Lampa.Extensions.show();
                setTimeout(function () {
                    $(".extensions__item", Lampa.Extensions.render()).each(function (
                        i,
                        e
                    ) {
                        const descr = $(e).find(".extensions__item-descr").text();
                        const regex = /https:\/\/cdn\.abros\.dev\/lampa\/store\.js/;
                        if (regex.test(descr)) {
                            $(e)
                                .find(".extensions__item-author")
                                .html("💀")
                                .append(
                                    '<span class="extensions__item-premium">Development by @abrosxd</span>'
                                );
                            $(e).find(".extensions__item-name").html("Skull Store");
                            $(e)
                                .find(".extensions__item-descr")
                                .html(
                                    "Альтернативный магазин плагинов. Включает множество платных и бесплатных плагинов для Lampa."
                                );
                        }
                    });
                }, 500);
            });
    }

    if (window.appready) {
        loadData();
    } else {
        Lampa.Listener.follow("app", (e) => {
            if (e.type === "ready") {
                loadData();
            }
        });
    }

    function addStaticParam(name, icon, title) {
        Lampa.SettingsApi.addParam({
            component: "skull",
            param: {
                name: name,
                type: "static",
                default: true,
            },
            field: {
                name: icon,
            },
            onRender: function (item) {
                item.on("hover:enter", function () {
                    Lampa.Settings.create(name);
                    Lampa.Controller.enabled().controller.back = function () {
                        Lampa.Settings.create("skull");
                    };
                });
            },
        });

        Lampa.Settings.listener.follow("open", function (e) {
            if (e.name == "main") {
                Lampa.SettingsApi.addComponent({
                    component: name,
                    name: title,
                });
            }
        });
    }

    function addPluginSettings(plugin) {
        Lampa.SettingsApi.addParam({
            component: plugin.component,
            param: {
                name: plugin.param.name,
                type: "select",
                values: {
                    1: "Установить",
                    2: "Удалить",
                },
                //default: '1',
            },
            field: {
                name:
                    plugin.field.name +
                    '<br><span style="background-color: #D8C39A; color: #000; padding: 0.1em 0.5em; -webkit-border-radius: 0.3em; -moz-border-radius: 0.3em; border-radius: 0.3em; font-size: 0.8em; top: 0.7em; position: relative;">' +
                    plugin.field.price +
                    "</span>",
                description: plugin.field.description,
            },
            onChange: function (value) {
                if (value == "1") {
                    itemON(
                        plugin.field.link,
                        plugin.field.name,
                        plugin.field.author,
                        plugin.param.name
                    );
                }
                if (value == "2") {
                    const pluginToRemoveUrl = plugin.field.link;
                    deletePlugin(pluginToRemoveUrl);
                }
            },
            onRender: function (item) {
                // $('.settings-param__name', item).css('color','f3d900');
                hideInstall();
                const myResult = checkPlugin(plugin.field.link);
                setTimeout(function () {
                    $('div[data-name="' + plugin.param.name + '"]').append(
                        '<div class="settings-param__status one" style="border: 0.1em solid #D8C39A;"></div>'
                    );
                    if (myResult) {
                        $('div[data-name="' + plugin.param.name + '"]')
                            .find(".settings-param__status")
                            .removeClass("active error wait")
                            .addClass("active");
                    } else {
                        $('div[data-name="' + plugin.param.name + '"]')
                            .find(".settings-param__status")
                            .removeClass("active error wait")
                            .addClass("error");
                    }
                }, 100);
            },
        });
    }
})();