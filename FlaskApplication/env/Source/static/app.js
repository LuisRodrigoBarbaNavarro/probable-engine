var dataPoints = [];

function updateChart() {

    // Crea o actualiza la gráfica con los datos limitados
    Plotly.newPlot('chart-container', [{
        y: dataPoints,
        type: 'line'
    }], {
        yaxis: {
            title: 'Light (Lumen)',
            range: [0, 700],
            dtick: 100
        },
        xaxis: {
            title: 'Time (Seconds)',
            range: [Math.max(0, dataPoints.length - 30), dataPoints.length],
            dtick: 2
        },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)',
        title: 'Graph of variation of light intensity with respect to time',
        font: {
            color: 'white'
        }
    });

}

function updateXLabels() {
    var xData = Array.from({ length: Math.min(30, dataPoints.length) }, (_, i) => i + 1);
    Plotly.restyle('chart-container', { x: [xData] });
}

socket = io();
socket.connect('http://localhost:5000');

socket.on('connect', (data) => {
    console.log("Connected");
    socket.send('Hello');
});

socket.on('message', (data) => {
    //Verify if the data is arriving correctly
    console.log("Sensor Data: " + data);

    //Convert the data to integer
    var value = parseInt(data);

    //Show the data in the Luminous Intensity Section
    document.querySelector('.data-sensor').innerHTML = value;

    function getTime() {
        const date = new Date();
        const hour = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return hour + ':' + minutes + ':' + seconds;
    }

    function addRow(data) {
        const table = document.getElementById('table-data-history');
        const row = table.insertRow(1);
        const col_number = row.insertCell(0);
        const col_data = row.insertCell(1);
        const col_time = row.insertCell(2);

        col_number.innerHTML = table.rows.length - 1;
        col_data.innerHTML = data + ' Lumen';
        col_time.innerHTML = getTime();
    }

    var div_messages = document.getElementById("table-notifications");

    function showMessage(msg) {
        const row = div_messages.insertRow(1);
        const col_message = row.insertCell(0);
        col_message.innerHTML = msg;
    }

    function evaluateMessage(value) {
        if (value >= 7 && value <= 150) {
            showMessage("Artificial light is set 95%");
        } else if (value >= 150 && value <= 300) {
            showMessage("Artificial light is set 75%");
        } else if (value >= 300 && value <= 450) {
            showMessage("Artificial light is set 55%");
        } else if (value >= 450 && value <= 550) {
            showMessage("Artificial light is set 35%");
        } else if (value >= 700) {
            showMessage("Artificial light is set 15%");
        }
    }

    // Agregar el valor al inicio del arreglo
    dataPoints.push(value);

    // Actualiza la gráfica con los nuevos datos
    updateChart();

    function evaluateLight(value) {
        var sunImage = document.getElementById('sun-image');
        var moonImage = document.getElementById('moon-image');

        if (value >= 100) {
            // Mostrar el sol suavemente
            fadeIn(sunImage);
            fadeOut(moonImage);
        } else {
            // Mostrar la luna suavemente
            fadeIn(moonImage);
            fadeOut(sunImage);
        }
    }

    function fadeIn(element) {
        element.style.opacity = '0'; // Establecer opacidad inicial a 0
        element.style.display = 'block'; // Mostrar el elemento

        var opacity = 0;
        var timer = setInterval(function () {
            if (opacity >= 1) {
                clearInterval(timer); // Detener el temporizador
            }
            element.style.opacity = opacity.toString();
            opacity += 0.1; // Incrementar la opacidad gradualmente
        }, 50); // Intervalo de tiempo en milisegundos para la transición
    }

    function fadeOut(element) {
        element.style.opacity = '1'; // Establecer opacidad inicial a 1

        var opacity = 1;
        var timer = setInterval(function () {
            if (opacity <= 0) {
                clearInterval(timer); // Detener el temporizador
                element.style.display = 'none'; // Ocultar el elemento al final de la transición
            }
            element.style.opacity = opacity.toString();
            opacity -= 0.1; // Decrementar la opacidad gradualmente
        }, 50); // Intervalo de tiempo en milisegundos para la transición
    }

    function evaluateProgressBar(value) {
        var progressBar = document.getElementById('progress-bar-1');
        var progressBar_2 = document.getElementById('progress-bar-2');
        var progressBar_3 = document.getElementById('progress-bar-3');
        var percentage = 0;

        if (value <= 80) {
            percentage = 100;
        } else if (value >= 700) {
            percentage = 0;
        } else {
            percentage = 100 - ((value - 80) / (700 - 80)) * 100;
        }

        progressBar.style.width = percentage + '%';
        progressBar.textContent = Math.round(percentage) + '%';

        progressBar_2.style.width = (percentage + 30) + '%';
        progressBar_2.textContent = Math.round(Math.max(0, Math.min(100, percentage + 30))) + '%';

        progressBar_3.style.width = (percentage + 10) + '%';
        progressBar_3.textContent = Math.round(Math.max(0, Math.min(100, percentage + 10))) + '%';
    }

    function evaluateSensorBar(value) {
        var progressBar = document.getElementById('progress-bar-sensor-light');
        var percentage = 0;

        if (value <= 80) {
            percentage = 0;
        } else if (value >= 700) {
            percentage = 100;
        } else {
            percentage = ((value - 80) / (700 - 80)) * 100;
        }

        progressBar.style.height = percentage + '%';
        progressBar.className = getProgressBarColor(percentage);
    }

    function getProgressBarColor(percentage) {
        if (percentage <= 50) {
            return 'progress-bar bg-danger';
        } else if (percentage <= 80) {
            return 'progress-bar bg-warning';
        } else {
            return 'progress-bar bg-success';
        }
    }

    evaluateMessage(value);
    evaluateLight(value);
    evaluateProgressBar(value);
    evaluateSensorBar(value);
    addRow(value);

    socket.send('Hello');
});