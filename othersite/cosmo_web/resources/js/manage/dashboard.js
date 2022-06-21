const chartJS = require('chart.js');

window.fillInBlanks = function(obj, len) {
    console.log(obj);

    if (obj instanceof Array) {
        obj = {};
    }
    
    for (let i = 1; i <= len; i++) {
        if (obj[i] === undefined) {
            obj[i] = 0;
        }
    }

    return obj;
};

window.createChart = function(ctx, labels, data, col, bgCol) {
    return new chartJS(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: false,
                    fill: 'start',
                    data: data,
                    borderColor: col,
                    backgroundColor: bgCol
                }
            ]
        },
        options: {
            maintainAspectRatio: true,
            spanGaps: false,
            legend: {
                display: false,
            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            plugins: {
                filler: {
                    propagate: false
                }
            },
            scales: {
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        maxRotation: 0
                    }
                }],
                yAxes: [{
                    ticks: {
                        suggestedMin: 0
                    }
                }]
            }
        }
    });
};

let letters = '0123456789ABCDEF';
function getRandomColor() {
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

window.createPieChart = function(ctx, labels, data) {
    const colors = [];
    for (let i = 0; i < data.length; i++) {
        colors.push(getRandomColor());
    }

    return new chartJS(ctx, {
        type: 'pie',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            legend: {
                display: false
            }
        }
    });
}