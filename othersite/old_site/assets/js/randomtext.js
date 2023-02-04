document.addEventListener("DOMContentLoaded", function(event) { 
    var quotes = new Array(
        "Либо заявляйте свою позицию, либо мы враги", 
        "Начинающий разработчик на Python", 
        "Страх - это то, что лишает нас жизни"

    ),
    randomize = quotes[Math.floor( Math.random() * quotes.length )];
    document.querySelector('.quote_item').innerHTML = randomize;
});