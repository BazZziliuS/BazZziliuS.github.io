/*!
 * Scull Store v1.0
 * (c) 2024-2024
 * by Daniel Abros
 * Site → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Магазин сторонних плагинов для Lampa
 */

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
    var icon_skull =
      '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="currentColor" style="border: 1px solid; border-radius: 5px; padding: 2px;><style type="text/css">  .st0{fill:currentColor;}  </style><path class="st0" d="M133.234,478.948l-21.141-68.984c2.656-3.203,4.141-7.296,3.813-11.671 c-0.688-9.375-9.25-16.438-19.156-15.797c-9.906,0.656-17.375,8.766-16.688,18.141c0.516,6.984,5.406,12.671,11.938,14.875 l21.141,68.984c-2.656,3.188-4.141,7.281-3.813,11.672c0.688,9.359,9.266,16.438,19.156,15.797 c9.906-0.656,17.375-8.781,16.688-18.141C144.656,486.839,139.781,481.151,133.234,478.948z"></path> <path class="st0" d="M40.953,438.651c-7.078,1.844-11.234,8.781-9.297,15.484l7.984,27.422c1.938,6.703,9.266,10.641,16.344,8.797 l38.016-9.5l-15.031-51.703L40.953,438.651z"></path> <path class="st0" d="M192.125,401.527c-37.25,11.296-62.797,16.187-62.797,16.187L144,462.12c0,0,50.578-12.813,112-35.109 c61.422,22.297,112,35.109,112,35.109l14.672-44.406c0,0-25.547-4.891-62.797-16.187c54.813-24.141,107.875-54.375,134.625-88.75 c53.984-69.359,26.734-125.938,26.734-125.938s-4.125-9.469-9.656,8.75c-32.203,92.281-132,150.094-215.578,183.547 c-83.578-33.453-183.375-91.266-215.578-183.547c-5.531-18.219-9.656-8.75-9.656-8.75S3.516,243.417,57.5,312.777 C84.25,347.152,137.313,377.386,192.125,401.527z"></path> <path class="st0" d="M420,415.511c6.531-2.203,11.422-7.89,11.938-14.875c0.688-9.375-6.781-17.484-16.688-18.141 c-9.906-0.641-18.469,6.422-19.156,15.797c-0.328,4.375,1.156,8.469,3.813,11.671l-21.141,68.984 c-6.547,2.203-11.422,7.891-11.938,14.875c-0.688,9.359,6.781,17.484,16.688,18.141c9.891,0.641,18.469-6.438,19.156-15.797 c0.328-4.391-1.156-8.484-3.813-11.672L420,415.511z"></path> <path class="st0" d="M471.047,438.651l-38.016-9.5L418,480.854l38.016,9.5c7.078,1.844,14.406-2.094,16.344-8.797l7.984-27.422 C482.281,447.433,478.125,440.495,471.047,438.651z"></path> <path class="st0" d="M187.141,274.871v28.578c0,5.156,4.188,9.344,9.359,9.344h22.813c5.172,0,9.359-4.188,9.359-9.344v-23.922 h7.797v23.922c0,5.156,4.188,9.344,9.344,9.344h22.828c5.172,0,9.359-4.188,9.359-9.344v-23.922h7.781v23.922 c0,5.156,4.188,9.344,9.359,9.344h22.828c5.156,0,9.344-4.188,9.344-9.344v-28.578c23.781-7.219,63.5-23.984,77-57.859 c9.828-24.641,5.984-57.063-8.719-119.578C380.875,34.917,338.125-0.004,257.234-0.004c-80.906,0-123.656,34.922-138.359,97.438 c-14.719,62.516-18.563,94.938-8.734,119.578C123.641,250.886,163.359,267.652,187.141,274.871z M313.672,112.808 c21.516-3.672,42.5,14.031,46.859,39.547s-9.547,49.188-31.063,52.875c-21.516,3.672-42.5-14.031-46.859-39.547 C278.25,140.152,292.156,116.496,313.672,112.808z M257.234,197.558l20.672,25.859h-20.672h-20.688L257.234,197.558z M153.922,152.355c4.375-25.516,25.344-43.219,46.859-39.547c21.531,3.688,35.438,27.344,31.063,52.875 c-4.359,25.516-25.344,43.219-46.859,39.547C163.469,201.542,149.563,177.871,153.922,152.355z"></path></svg>';
    var icon_online =
      '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500.000000pt" height="500.000000pt" viewBox="-1.09 0 122.88 122.88" version="1.1" id="Layer_1" style="enable-background:new 0 0 120.71 122.88" xml:space="preserve"><g stroke-linecap="round" stroke-linejoin="round"/></g><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g> <path class="st0" d="M59.97,0c33.11,0,59.96,26.85,59.96,59.97c0,16.04-6.3,30.62-16.57,41.38c3.34,9.99,4.44,6.97,17.36,8.88v12.5 c-19.28,0.78-15.44-1.14-27.55-12.83c-9.51,6.34-20.92,10.03-33.2,10.03C26.85,119.93,0,93.08,0,59.97C0,26.85,26.86,0,59.97,0 L59.97,0z M27.63,44.25c8.91,0,16.14,7.22,16.14,16.14c0,8.91-7.22,16.13-16.14,16.13c-8.91,0-16.13-7.22-16.13-16.13 C11.5,51.47,18.72,44.25,27.63,44.25L27.63,44.25z M93.08,44.25c8.91,0,16.14,7.22,16.14,16.14c0,8.91-7.22,16.13-16.14,16.13 c-8.91,0-16.13-7.22-16.13-16.13C76.95,51.47,84.17,44.25,93.08,44.25L93.08,44.25z M60.83,10.86c8.91,0,16.13,7.22,16.13,16.14 c0,8.91-7.22,16.13-16.13,16.13c-8.91,0-16.14-7.22-16.14-16.13C44.69,18.09,51.92,10.86,60.83,10.86L60.83,10.86L60.83,10.86z M60.26,51.71c4.58,0,8.3,3.72,8.3,8.3c0,4.58-3.72,8.3-8.3,8.3c-4.58,0-8.3-3.72-8.3-8.3C51.96,55.42,55.68,51.71,60.26,51.71 L60.26,51.71L60.26,51.71z M60.83,78.38c8.91,0,16.13,7.22,16.13,16.14c0,8.91-7.22,16.13-16.13,16.13 c-8.91,0-16.14-7.22-16.14-16.13C44.69,85.61,51.92,78.38,60.83,78.38L60.83,78.38L60.83,78.38z"/></g></svg></div><div class="settings-folder__name" style="font-size: 1.3em;">Онлайн</div></div>';
    var icon_tv =
      '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 3L12 7L7 3M6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V11.8C22 10.1198 22 9.27976 21.673 8.63803C21.3854 8.07354 20.9265 7.6146 20.362 7.32698C19.7202 7 18.8802 7 17.2 7H6.8C5.11984 7 4.27976 7 3.63803 7.32698C3.07354 7.6146 2.6146 8.07354 2.32698 8.63803C2 9.27976 2 10.1198 2 11.8V16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg></div><div class="settings-folder__name" style="font-size: 1.3em;">ТВ</div></div>';
    var icon_torpars =
      '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 24 24" fill="#ffffff"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z"/></svg></div><div class="settings-folder__name" style="font-size: 1.3em;">Торренты и Парсеры</div></div>';
    var icon_interface =
      '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.27209 20.7279L10.8686 14.1314C11.2646 13.7354 11.4627 13.5373 11.691 13.4632C11.8918 13.3979 12.1082 13.3979 12.309 13.4632C12.5373 13.5373 12.7354 13.7354 13.1314 14.1314L19.6839 20.6839M14 15L16.8686 12.1314C17.2646 11.7354 17.4627 11.5373 17.691 11.4632C17.8918 11.3979 18.1082 11.3979 18.309 11.4632C18.5373 11.5373 18.7354 11.7354 19.1314 12.1314L22 15M10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9ZM6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div><div class="settings-folder__name" style="font-size:1.3em">Интерфейс</div></div>';
    var icon_control =
      '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="800px" height="800px" viewBox="0 0 1024 1024" class="icon"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM340 683v77c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-77c-10.1 3.3-20.8 5-32 5s-21.9-1.8-32-5zm64-198V264c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v221c10.1-3.3 20.8-5 32-5s21.9 1.8 32 5zm-64 198c10.1 3.3 20.8 5 32 5s21.9-1.8 32-5c41.8-13.5 72-52.7 72-99s-30.2-85.5-72-99c-10.1-3.3-20.8-5-32-5s-21.9 1.8-32 5c-41.8 13.5-72 52.7-72 99s30.2 85.5 72 99zm.1-115.7c.3-.6.7-1.2 1-1.8v-.1l1.2-1.8c.1-.2.2-.3.3-.5.3-.5.7-.9 1-1.4.1-.1.2-.3.3-.4.5-.6.9-1.1 1.4-1.6l.3-.3 1.2-1.2.4-.4c.5-.5 1-.9 1.6-1.4.6-.5 1.1-.9 1.7-1.3.2-.1.3-.2.5-.3.5-.3.9-.7 1.4-1 .1-.1.3-.2.4-.3.6-.4 1.2-.7 1.9-1.1.1-.1.3-.1.4-.2.5-.3 1-.5 1.6-.8l.6-.3c.7-.3 1.3-.6 2-.8.7-.3 1.4-.5 2.1-.7.2-.1.4-.1.6-.2.6-.2 1.1-.3 1.7-.4.2 0 .3-.1.5-.1.7-.2 1.5-.3 2.2-.4.2 0 .3 0 .5-.1.6-.1 1.2-.1 1.8-.2h.6c.8 0 1.5-.1 2.3-.1s1.5 0 2.3.1h.6c.6 0 1.2.1 1.8.2.2 0 .3 0 .5.1.7.1 1.5.2 2.2.4.2 0 .3.1.5.1.6.1 1.2.3 1.7.4.2.1.4.1.6.2.7.2 1.4.4 2.1.7.7.2 1.3.5 2 .8l.6.3c.5.2 1.1.5 1.6.8.1.1.3.1.4.2.6.3 1.3.7 1.9 1.1.1.1.3.2.4.3.5.3 1 .6 1.4 1 .2.1.3.2.5.3.6.4 1.2.9 1.7 1.3s1.1.9 1.6 1.4l.4.4 1.2 1.2.3.3c.5.5 1 1.1 1.4 1.6.1.1.2.3.3.4.4.4.7.9 1 1.4.1.2.2.3.3.5l1.2 1.8s0 .1.1.1a36.18 36.18 0 0 1 5.1 18.5c0 6-1.5 11.7-4.1 16.7-.3.6-.7 1.2-1 1.8 0 0 0 .1-.1.1l-1.2 1.8c-.1.2-.2.3-.3.5-.3.5-.7.9-1 1.4-.1.1-.2.3-.3.4-.5.6-.9 1.1-1.4 1.6l-.3.3-1.2 1.2-.4.4c-.5.5-1 .9-1.6 1.4-.6.5-1.1.9-1.7 1.3-.2.1-.3.2-.5.3-.5.3-.9.7-1.4 1-.1.1-.3.2-.4.3-.6.4-1.2.7-1.9 1.1-.1.1-.3.1-.4.2-.5.3-1 .5-1.6.8l-.6.3c-.7.3-1.3.6-2 .8-.7.3-1.4.5-2.1.7-.2.1-.4.1-.6.2-.6.2-1.1.3-1.7.4-.2 0-.3.1-.5.1-.7.2-1.5.3-2.2.4-.2 0-.3 0-.5.1-.6.1-1.2.1-1.8.2h-.6c-.8 0-1.5.1-2.3.1s-1.5 0-2.3-.1h-.6c-.6 0-1.2-.1-1.8-.2-.2 0-.3 0-.5-.1-.7-.1-1.5-.2-2.2-.4-.2 0-.3-.1-.5-.1-.6-.1-1.2-.3-1.7-.4-.2-.1-.4-.1-.6-.2-.7-.2-1.4-.4-2.1-.7-.7-.2-1.3-.5-2-.8l-.6-.3c-.5-.2-1.1-.5-1.6-.8-.1-.1-.3-.1-.4-.2-.6-.3-1.3-.7-1.9-1.1-.1-.1-.3-.2-.4-.3-.5-.3-1-.6-1.4-1-.2-.1-.3-.2-.5-.3-.6-.4-1.2-.9-1.7-1.3s-1.1-.9-1.6-1.4l-.4-.4-1.2-1.2-.3-.3c-.5-.5-1-1.1-1.4-1.6-.1-.1-.2-.3-.3-.4-.4-.4-.7-.9-1-1.4-.1-.2-.2-.3-.3-.5l-1.2-1.8v-.1c-.4-.6-.7-1.2-1-1.8-2.6-5-4.1-10.7-4.1-16.7s1.5-11.7 4.1-16.7zM620 539v221c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V539c-10.1 3.3-20.8 5-32 5s-21.9-1.8-32-5zm64-198v-77c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v77c10.1-3.3 20.8-5 32-5s21.9 1.8 32 5zm-64 198c10.1 3.3 20.8 5 32 5s21.9-1.8 32-5c41.8-13.5 72-52.7 72-99s-30.2-85.5-72-99c-10.1-3.3-20.8-5-32-5s-21.9 1.8-32 5c-41.8 13.5-72 52.7-72 99s30.2 85.5 72 99zm.1-115.7c.3-.6.7-1.2 1-1.8v-.1l1.2-1.8c.1-.2.2-.3.3-.5.3-.5.7-.9 1-1.4.1-.1.2-.3.3-.4.5-.6.9-1.1 1.4-1.6l.3-.3 1.2-1.2.4-.4c.5-.5 1-.9 1.6-1.4.6-.5 1.1-.9 1.7-1.3.2-.1.3-.2.5-.3.5-.3.9-.7 1.4-1 .1-.1.3-.2.4-.3.6-.4 1.2-.7 1.9-1.1.1-.1.3-.1.4-.2.5-.3 1-.5 1.6-.8l.6-.3c.7-.3 1.3-.6 2-.8.7-.3 1.4-.5 2.1-.7.2-.1.4-.1.6-.2.6-.2 1.1-.3 1.7-.4.2 0 .3-.1.5-.1.7-.2 1.5-.3 2.2-.4.2 0 .3 0 .5-.1.6-.1 1.2-.1 1.8-.2h.6c.8 0 1.5-.1 2.3-.1s1.5 0 2.3.1h.6c.6 0 1.2.1 1.8.2.2 0 .3 0 .5.1.7.1 1.5.2 2.2.4.2 0 .3.1.5.1.6.1 1.2.3 1.7.4.2.1.4.1.6.2.7.2 1.4.4 2.1.7.7.2 1.3.5 2 .8l.6.3c.5.2 1.1.5 1.6.8.1.1.3.1.4.2.6.3 1.3.7 1.9 1.1.1.1.3.2.4.3.5.3 1 .6 1.4 1 .2.1.3.2.5.3.6.4 1.2.9 1.7 1.3s1.1.9 1.6 1.4l.4.4 1.2 1.2.3.3c.5.5 1 1.1 1.4 1.6.1.1.2.3.3.4.4.4.7.9 1 1.4.1.2.2.3.3.5l1.2 1.8v.1a36.18 36.18 0 0 1 5.1 18.5c0 6-1.5 11.7-4.1 16.7-.3.6-.7 1.2-1 1.8v.1l-1.2 1.8c-.1.2-.2.3-.3.5-.3.5-.7.9-1 1.4-.1.1-.2.3-.3.4-.5.6-.9 1.1-1.4 1.6l-.3.3-1.2 1.2-.4.4c-.5.5-1 .9-1.6 1.4-.6.5-1.1.9-1.7 1.3-.2.1-.3.2-.5.3-.5.3-.9.7-1.4 1-.1.1-.3.2-.4.3-.6.4-1.2.7-1.9 1.1-.1.1-.3.1-.4.2-.5.3-1 .5-1.6.8l-.6.3c-.7.3-1.3.6-2 .8-.7.3-1.4.5-2.1.7-.2.1-.4.1-.6.2-.6.2-1.1.3-1.7.4-.2 0-.3.1-.5.1-.7.2-1.5.3-2.2.4-.2 0-.3 0-.5.1-.6.1-1.2.1-1.8.2h-.6c-.8 0-1.5.1-2.3.1s-1.5 0-2.3-.1h-.6c-.6 0-1.2-.1-1.8-.2-.2 0-.3 0-.5-.1-.7-.1-1.5-.2-2.2-.4-.2 0-.3-.1-.5-.1-.6-.1-1.2-.3-1.7-.4-.2-.1-.4-.1-.6-.2-.7-.2-1.4-.4-2.1-.7-.7-.2-1.3-.5-2-.8l-.6-.3c-.5-.2-1.1-.5-1.6-.8-.1-.1-.3-.1-.4-.2-.6-.3-1.3-.7-1.9-1.1-.1-.1-.3-.2-.4-.3-.5-.3-1-.6-1.4-1-.2-.1-.3-.2-.5-.3-.6-.4-1.2-.9-1.7-1.3s-1.1-.9-1.6-1.4l-.4-.4-1.2-1.2-.3-.3c-.5-.5-1-1.1-1.4-1.6-.1-.1-.2-.3-.3-.4-.4-.4-.7-.9-1-1.4-.1-.2-.2-.3-.3-.5l-1.2-1.8v-.1c-.4-.6-.7-1.2-1-1.8-2.6-5-4.1-10.7-4.1-16.7s1.5-11.7 4.1-16.7z"/></svg></div><div class="settings-folder__name" style="font-size: 1.3em;">Управление</div></div>';
    var icon_style =
      '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="64px" width="64px" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff" style="&#10;"><g> <path class="st0" d="M433.803,171.939c-2.142-3.556-4.324-7.127-6.72-10.714c-11.636-17.458-26.107-35.154-43.181-52.22 c-22.65-22.65-46.637-40.976-69.525-53.804c-11.483-6.366-22.728-11.482-33.503-15.015c-10.776-3.465-21.237-5.507-31.222-5.507 c-6.529,0-12.903,0.86-19.033,2.987c-6.06,2.043-11.882,5.507-16.598,10.223l-24.778,24.778l-13.087,13.088 c-34.372-8.011-66.86-13.318-94.749-13.349C65.039,72.421,50.17,74.21,37.19,78.834c-12.926,4.57-24.202,12.389-31.33,24.002 C2.043,108.98-0.023,115.97,0,122.913c0,7.396,2.227,14.502,5.791,20.984c6.298,11.352,16.544,21.352,29.617,30.976 c19.639,14.354,45.961,27.726,76.438,39.731c30.461,11.982,65.032,22.52,100.901,30.715L218,222.324v-0.008 c-52.997-12.09-103.166-29.579-139.312-48.542c-18.057-9.448-32.582-19.324-42.006-28.495c-4.716-4.57-8.126-8.941-10.208-12.75 c-2.104-3.833-2.872-6.967-2.88-9.617c0.031-2.511,0.606-4.816,2.35-7.696c3.848-6.183,9.839-10.784,19.187-14.163 c9.285-3.349,21.682-5.069,36.276-5.054c21.283-0.023,47.105,3.618,74.986,9.525l-13.311,13.31l-46.33,46.322 c9.516,4.638,19.977,9.125,31.068,13.449l78.734-78.735c2.888,14.532,9.202,30.124,18.265,46.414 c12.626,22.543,30.684,46.252,53.134,68.711c22.458,22.45,46.168,40.5,68.711,53.135c16.406,9.132,32.098,15.484,46.722,18.341 L240.996,438.465l0.868-0.944c-2.435,2.519-5.661,4.485-9.986,5.975c-4.247,1.498-9.601,2.366-15.891,2.366 c-14.078,0.077-32.558-4.562-51.99-14.078c-19.425-9.516-39.871-23.91-58.673-42.627c-18.948-18.956-33.58-39.878-43.335-59.779 c-9.831-19.901-14.623-38.849-14.547-53.166c0-6.214,0.86-11.406,2.282-15.577c1.413-4.162,3.302-7.235,5.66-9.593l30.361-30.361 c-10.776-4.716-20.845-9.594-29.97-14.547l-22.65,22.65c-6.137,6.137-10.461,13.61-13.211,21.706 c-2.758,8.104-3.932,16.675-3.932,25.723c0,20.837,6.367,43.726,17.773,67.006c11.406,23.28,27.996,46.798,49.394,68.19 c21.152,21.16,44.202,37.443,67.006,48.61c22.812,11.168,45.301,17.22,65.83,17.304c9.125,0,17.935-1.259,26.114-4.094 c8.18-2.75,15.807-7.235,22.02-13.448L405.093,319.2c-0.062,3.334-0.093,6.114-0.093,8.395c0,17.835-1.981,50.523,23.78,50.523 c7.027,0,17.834-4.953,17.834-29.716c0-15.231,15.853-10.038,15.853-0.998c0,13.879,0,18.18,0,26.744 c0,27.742,8.917,37.658,23.779,37.658c14.862,0,25.753-10.9,25.753-36.66c0-25.761,0-80.247,0-115.917 C512,227.816,478.443,186.425,433.803,171.939z M311.428,213.998c-5.638-4.923-11.26-10.146-16.79-15.684 c-21.037-21.038-37.858-43.227-49.225-63.557c-11.429-20.27-17.15-38.841-17.058-51.269c0-2.189,0.192-4.124,0.484-5.898 l7.443-7.443c1.183-1.098,2.519-2.042,4.638-2.75c2.128-0.791,5.039-1.259,8.734-1.259c5.66,0,13.056,1.175,21.467,4.009 c12.665,4.094,27.612,11.559,43.18,21.867c15.577,10.376,31.776,23.672,47.351,39.248c11.79,11.752,22.175,23.872,31.03,35.808 C365.738,169.397,337.434,183.014,311.428,213.998z"/> <path class="st0" d="M244.806,258.231c9.409,0,17.036-7.626,17.036-17.036c0-9.417-7.627-17.043-17.036-17.043 c-9.417,0-17.044,7.626-17.044,17.043C227.762,250.605,235.389,258.231,244.806,258.231z"/> </g></svg></div><div class="settings-folder__name" style="font-size:1.3em">Темы</div></div>';
  
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
          var { plugins, news } = data;
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
        var intervalSettings = setInterval(function () {
          var elementSettings = $(
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
          var pluginsArray = Lampa.Storage.get("plugins");
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
          var script = document.createElement("script");
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
      var plugins = Lampa.Storage.get("plugins");
      var updatedPlugins = plugins.filter(function (obj) {
        return obj.url !== pluginToRemoveUrl;
      });
      Lampa.Storage.set("plugins", updatedPlugins);
      Lampa.Settings.update();
      Lampa.Noty.show("Плагин успешно удален");
      Lampa.Storage.set("needRebootSettingExit", true);
      settingsWatch();
    }
  
    function checkPlugin(pluginToCheck) {
      var plugins = Lampa.Storage.get("plugins");
      var checkResult = plugins.filter(function (obj) {
        return obj.url == pluginToCheck;
      });
      if (JSON.stringify(checkResult) !== "[]") {
        return true;
      } else {
        return false;
      }
    }
  
    /* Создание Skull Store и его меню */
    function skullStart(plugins, news) {
      /* Skull Store */
      Lampa.SettingsApi.addComponent({
        component: "skull",
        name: "Skull Store",
        icon: icon_skull,
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
      Lampa.SettingsApi.addParam({
        component: "skull",
        param: {
          name: "skull_online",
          type: "static",
          default: true,
        },
        field: {
          name: icon_online,
        },
        onRender: function (item) {
          item.on("hover:enter", function () {
            Lampa.Settings.create("skull_online");
            Lampa.Controller.enabled().controller.back = function () {
              Lampa.Settings.create("skull");
            };
          });
        },
      });
  
      Lampa.Settings.listener.follow("open", function (e) {
        if (e.name == "main") {
          Lampa.SettingsApi.addComponent({
            component: "skull_online",
            name: "Онлайн",
          });
        }
      });
  
      /* ТВ */
      Lampa.SettingsApi.addParam({
        component: "skull",
        param: {
          name: "skull_tv",
          type: "static",
          default: true,
        },
        field: {
          name: icon_tv,
        },
        onRender: function (item) {
          item.on("hover:enter", function () {
            Lampa.Settings.create("skull_tv");
            Lampa.Controller.enabled().controller.back = function () {
              Lampa.Settings.create("skull");
            };
          });
        },
      });
  
      Lampa.Settings.listener.follow("open", function (e) {
        if (e.name == "main") {
          Lampa.SettingsApi.addComponent({
            component: "skull_tv",
            name: "ТВ",
          });
        }
      });
  
      /* Торренты и Парсеры */
      Lampa.SettingsApi.addParam({
        component: "skull",
        param: {
          name: "skull_torpars",
          type: "static",
          default: true,
        },
        field: {
          name: icon_torpars,
        },
        onRender: function (item) {
          item.on("hover:enter", function () {
            Lampa.Settings.create("skull_torpars");
            Lampa.Controller.enabled().controller.back = function () {
              Lampa.Settings.create("skull");
            };
          });
        },
      });
  
      Lampa.Settings.listener.follow("open", function (e) {
        if (e.name == "main") {
          Lampa.SettingsApi.addComponent({
            component: "skull_torpars",
            name: "Торренты и Парсеры",
          });
        }
      });
  
      /* Интерфейс */
      Lampa.SettingsApi.addParam({
        component: "skull",
        param: {
          name: "skull_interface",
          type: "static",
          default: true,
        },
        field: {
          name: icon_interface,
        },
        onRender: function (item) {
          item.on("hover:enter", function () {
            Lampa.Settings.create("skull_interface");
            Lampa.Controller.enabled().controller.back = function () {
              Lampa.Settings.create("skull");
            };
          });
        },
      });
  
      Lampa.Settings.listener.follow("open", function (e) {
        if (e.name == "main") {
          Lampa.SettingsApi.addComponent({
            component: "skull_interface",
            name: "Интерфейс",
          });
        }
      });
  
      /* Управление */
      Lampa.SettingsApi.addParam({
        component: "skull",
        param: {
          name: "skull_control",
          type: "static",
          default: true,
        },
        field: {
          name: icon_control,
        },
        onRender: function (item) {
          item.on("hover:enter", function () {
            Lampa.Settings.create("skull_control");
            Lampa.Controller.enabled().controller.back = function () {
              Lampa.Settings.create("skull");
            };
          });
        },
      });
  
      Lampa.Settings.listener.follow("open", function (e) {
        if (e.name == "main") {
          Lampa.SettingsApi.addComponent({
            component: "skull_control",
            name: "Управление",
          });
        }
      });
  
      /* Темы */
      Lampa.SettingsApi.addParam({
        component: "skull",
        param: {
          name: "skull_style",
          type: "static",
          default: true,
        },
        field: {
          name: icon_style,
        },
        onRender: function (item) {
          item.on("hover:enter", function () {
            Lampa.Settings.create("skull_style");
            Lampa.Controller.enabled().controller.back = function () {
              Lampa.Settings.create("skull");
            };
          });
        },
      });
  
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
  
      Lampa.Settings.listener.follow("open", function (e) {
        if (e.name == "main") {
          Lampa.SettingsApi.addComponent({
            component: "skull_style",
            name: "Темы",
          });
        }
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
              var pluginToRemoveUrl = plugin.field.link;
              deletePlugin(pluginToRemoveUrl);
            }
          },
          onRender: function (item) {
            // $('.settings-param__name', item).css('color','f3d900');
            hideInstall();
            var myResult = checkPlugin(plugin.field.link);
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
      plugins.forEach(addPluginSettings);
  
      /* Настройки меню */
      Lampa.Settings.listener.follow("open", function (e) {
        if (e.name == "main") {
          $(".settings__title").text(Lampa.Lang.translate("title_settings"));
        }
        if (e.name == "skull") {
          $(".settings__title").text("💀 Skull Store");
          $("#newsbody").slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 12000,
            arrows: false,
          });
        }
        if (e.name == "skull_online") {
          $(".settings__title").text("Online");
        }
        if (e.name == "skull_tv") {
          $(".settings__title").text("ТВ");
        }
        if (e.name == "skull_torpars") {
          $(".settings__title").text("Торренты и Парсеры");
        }
        if (e.name == "skull_interface") {
          $(".settings__title").text("Интерфейс");
        }
        if (e.name == "skull_control") {
          $(".settings__title").text("Управление");
        }
        if (e.name == "skull_style") {
          $(".settings__title").text("Темы");
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
              var descr = $(e).find(".extensions__item-descr").text();
              var regex = /https:\/\/cdn\.abros\.dev\/lampa\/store\.js/;
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
  
      /* Уведомления */
      //     var notice = new Lampa.NoticeClassLampa({name: 'Skull Store',db_name: 'notice_skull'});
      //     Lampa.Notice.addClass('skull', notice);
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
  })();