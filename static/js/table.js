function updateTableValues() {
    // Get the current ADC values from the table and apply scaling
    const currentValues = [
        5 + ((parseFloat(document.getElementById("adc0").innerText) || 0) - 500) / 500 * 5,
        5 + ((parseFloat(document.getElementById("adc1").innerText) || 0) - 500) / 500 * 5,
        5 + ((parseFloat(document.getElementById("adc2").innerText) || 0) - 500) / 500 * 5,
        5 + ((parseFloat(document.getElementById("adc3").innerText) || 0) - 500) / 500 * 5,
    ];

    const temperatureValues = [
        parseFloat(document.getElementById("adc4").innerText) || 0,
        parseFloat(document.getElementById("adc5").innerText) || 0,
        parseFloat(document.getElementById("adc6").innerText) || 0,
        parseFloat(document.getElementById("adc7").innerText) || 0
    ];


    // Update table cells with scaled values and units
    document.getElementById("adc0").innerText = currentValues[0].toFixed(2) + " A";
    document.getElementById("adc1").innerText = currentValues[1].toFixed(2) + " A";
    document.getElementById("adc2").innerText = currentValues[2].toFixed(2) + " A";
    document.getElementById("adc3").innerText = currentValues[3].toFixed(2) + " A";
    
    document.getElementById("adc4").innerText = temperatureValues[0].toFixed(2) + " °C";
    document.getElementById("adc5").innerText = temperatureValues[1].toFixed(2) + " °C";
    document.getElementById("adc6").innerText = temperatureValues[2].toFixed(2) + " °C";
    document.getElementById("adc7").innerText = temperatureValues[3].toFixed(2) + " °C";
}



// Run the update function at a regular interval, for example, every second
setInterval(updateTableValues, 1000);
