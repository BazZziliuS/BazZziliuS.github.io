const tinymce = require('tinymce');

require('tinymce/themes/silver');

const plugins = "table lists image paste autosave link media fullscreen wordcount";
for (let plugin of plugins.split(' ')) {
    require('tinymce/plugins/' + plugin);
}

$(document).ready(function() {
    tinymce.init({
        selector: 'textarea:not([no-tinymce])',

        plugins: plugins,
        toolbar: "undo redo | styleselect | bold italic underline strikethrough superscript subscript image link | " +
            "forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | " +
            "fontselect fontsizeselect",
        branding: false,
        menubar: false,
        relative_urls: false,
        link_title: false,

        content_style: 'body { color: white;     }',

        autosave_restore_when_empty: true,
        autosave_retention: "30m",
    });
});