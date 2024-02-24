(function() {
    'use strict';

    // Функция для скипа рекламы
    function skipAdadSkipButton(adSkipButton) {
         // Замените '.ad-skip-button' на селектор вашей кнопки "Пропустить"
        if (adSkipButton) {
            adSkipButton.click(); // Можно также использовать adSkipButton.dispatchEvent(new Event('click'));
            console.log('Реклама пропущена!');
        } 
    }
    
    // Функция для мониторинга новых элементов на странице
    function monitorAds() {
        // Создаем экземпляр MutationObserver
        let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Проверяем, появился ли новый элемент с классом '.ad-video-block'
            let newAdBlock = mutation.target.querySelector('.ad-video-block');
            if (newAdBlock) {
                // Если элемент найден, вызываем функцию для его пропуска
                let adSkipButton = document.querySelector('.ad-skip-button');
                if (adSkipButton) {
                    skipAd(adSkipButton);
                } else {
                    console.log('Кнопка "Пропустить" не найдена.');
                }
            }
        });
        });
    
        // Настраиваем и запускаем Observer для отслеживания изменений в DOM
        let observerConfig = { childList: true, subtree: true };
        observer.observe(document.body, observerConfig);
    }
    
    // Вызываем функцию мониторинга после загрузки страницы
    function startMe() {
        window.addEventListener('load', monitorAds);
    }

    if(window.appready) startMe();
        else {
            Lampa.Listener.follow('app', function(e) {
                if(e.type == 'ready') {
                    startMe();
                }
            });
        }

})();
