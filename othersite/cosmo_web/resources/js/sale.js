let expireDate = localStorage.getItem('sale_hide');
expireDate = expireDate && new Date(expireDate);

if (expireDate > new Date()) {
    $('#alert').remove();
} else {
    const sales = $('.sale').not('.price');
    let activeSale = 0;

    sales.each(function(i) {
        if (i !== activeSale) $(this).hide();

        $(this).find('.close-btn').click(function() {
            const newDate = new Date();
            newDate.setMinutes(newDate.getMinutes() + 10);

            localStorage.setItem('sale_hide', newDate);
            $('#alert').remove();
        });
    })

    $('#sale-prev').click(function() {
        $(sales[activeSale]).hide();

        let nextId = activeSale - 1;
        if (!sales[nextId]) {
            nextId = sales.length - 1;
        }

        activeSale = nextId;
        $(sales[nextId]).show();
    });

    $('#sale-next').click(function() {
        $(sales[activeSale]).hide();

        let nextId = activeSale + 1;
        if (!sales[nextId]) {
            nextId = 0;
        }

        activeSale = nextId;
        $(sales[nextId]).show();
    });
}