(function() {
    'use strict';

    // Функция для удаления элемента
    function removeAdVideoBlock(targetElement) {
        targetElement.remove();
        print('Удален рекламный блок');
    }

    // Создаем новый экземпляр MutationObserver с колбэком
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Проверяем, появился ли элемент с классом ad-video-block ad-preroll ad-preroll__bg
            var adVideoBlock = document.querySelector('.ad-video-block');
            var adpreroll = document.querySelector('.ad-preroll');
            var adpreroll__bg = document.querySelector('.ad-preroll__bg');
            if (adVideoBlock) {
                // Если элемент найден, вызываем функцию для его удаления
                removeAdVideoBlock(adVideoBlock);
            }
            if (adpreroll) {
                // Если элемент найден, вызываем функцию для его удаления
                removeAdVideoBlock(adpreroll);
            }
            if (adpreroll__bg) {
                // Если элемент найден, вызываем функцию для его удаления
                removeAdVideoBlock(adpreroll__bg);
            }
        });
    });

    function startMe() {
        // Настраиваем и запускаем Observer для отслеживания изменений в DOM
        var observerConfig = { childList: true, subtree: true };
        observer.observe(document.body, observerConfig);
    };

    if(window.appready) startMe();
        else {
            Lampa.Listener.follow('app', function(e) {
                if(e.type == 'ready') {
                    startMe();
                }
            });
        }

})();
