function updateTableValues() {
    // Pull the raw ADC readings from window.adc0 … window.adc3
    const rawCurrent = [
        window.adc0 || 0,
        window.adc1 || 0,
        window.adc2 || 0,
        window.adc3 || 0
    ];

    // Convert raw ADC (0–1023) into "Current in Ampere":
    //    scaled = 5 + ((ADCraw – 500) / 500) * 5
    const currentValues = rawCurrent.map(raw => 5 + ((raw - 500) / 500) * 5);

    // Pull the raw temperature readings from window.adc4 … window.adc7
    const rawTemp = [
        window.adc4 || 0,
        window.adc5 || 0,
        window.adc6 || 0,
        window.adc7 || 0
    ];

    // We assume raw temperature ADC is already in °C (or needs no scaling).
    const temperatureValues = rawTemp;

    // Now write the _formatted_ strings back into each cell:

    // Segment 1 current→adc0 cell
    document.getElementById("adc0").innerText = currentValues[0].toFixed(2) + " A";
    document.getElementById("adc1").innerText = currentValues[1].toFixed(2) + " A";
    document.getElementById("adc2").innerText = currentValues[2].toFixed(2) + " A";
    document.getElementById("adc3").innerText = currentValues[3].toFixed(2) + " A";

    // Temperature cells (adc4…adc7)
    document.getElementById("adc4").innerText = temperatureValues[0].toFixed(2) + " °C";
    document.getElementById("adc5").innerText = temperatureValues[1].toFixed(2) + " °C";
    document.getElementById("adc6").innerText = temperatureValues[2].toFixed(2) + " °C";
    document.getElementById("adc7").innerText = temperatureValues[3].toFixed(2) + " °C";
}


// Run the update function at a regular interval, for example, every second
setInterval(updateTableValues, 1000);
