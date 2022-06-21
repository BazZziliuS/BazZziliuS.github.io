window.$ = window.jQuery = require('jquery');
window.Popper = require('popper.js');

require('bootstrap');

// Initialize tippy.js
const tippy = require('tippy.js');

tippy.default('[data-tippy-content]', {
    theme: 'material',
    plugins: [tippy.animateFill],
    interactive: true,
    allowHTML: true
});

window.toastr = require('toastr');

window.Axios = require('axios');
window.Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.Axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

// Include sale alert js
require('./sale');