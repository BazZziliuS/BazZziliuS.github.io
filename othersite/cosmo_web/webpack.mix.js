const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .js('resources/js/tinymce.js', 'public/js')
    .js('resources/js/server-fetch.js', 'public/js')
    .js('resources/js/manage/index.js', 'public/js/manage')
    .js('resources/js/manage/dashboard.js', 'public/js/manage')
    .js('resources/js/themes/purity/main.js', 'public/themes/purity')
    .js('resources/js/themes/havart/main.js', 'public/themes/havart')
    .js('resources/js/reactions.js', 'public/js')
    .js('resources/js/likes.js', 'public/js')

    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/manage.scss', 'public/css')
    .sass('resources/sass/errors.scss', 'public/css')
    .sass('resources/sass/themes/purity/style.scss', 'public/themes/purity')
    .sass('resources/sass/themes/dxrk/style.scss', 'public/themes/dxrk')
    .sass('resources/sass/themes/havart/style.scss', 'public/themes/havart')
    .sass('resources/sass/themes/lara/style.scss', 'public/themes/lara')
    .sass('resources/sass/installer.scss', 'public/css')

    .copy('node_modules/tinymce/skins', 'public/js/skins')
    .copy('node_modules/tinymce/icons', 'public/js/icons');

mix.disableSuccessNotifications();