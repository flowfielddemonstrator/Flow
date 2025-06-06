// Example ADC values (replace with actual values from ESP32 or another source)

// Function to get the latest values from HTML table cells
function getAdcValues() {
    // Return the raw ADC0–ADC3 in the 0–1023 range, and ADC4–ADC7 for temperature
    return {
        current: [
            parseFloat(document.getElementById("adc0").innerText) || 0,
            parseFloat(document.getElementById("adc1").innerText) || 0,
            parseFloat(document.getElementById("adc2").innerText) || 0,
            parseFloat(document.getElementById("adc3").innerText) || 0,
        ],
        temperature: [
            parseFloat(document.getElementById("adc4").innerText) || 0,
            parseFloat(document.getElementById("adc5").innerText) || 0,
            parseFloat(document.getElementById("adc6").innerText) || 0,
            parseFloat(document.getElementById("adc7").innerText) || 0,
        ]
    };
}


// Function to get color based on ADC value (implement logic as needed)
// Function to get color based on ADC value
function getColorFromADC(adcValue) {
    if (adcValue >= 1100) {
        return 'rgb(255, 0, 0)'; // Super red for values over 1100
    } else if (adcValue <= 600) {
        return 'rgb(0, 0, 255)'; // Super blue for values below 600
    }

    // Scale between blue and red for values between 600 and 1100
    const maxADC = 1100;
    const minADC = 600;
    const percentage = (adcValue - minADC) / (maxADC - minADC);

    const red = Math.floor(percentage * 255); // Red increases with ADC value
    const blue = Math.floor((1 - percentage) * 255); // Blue decreases with ADC value
    return `rgb(${red}, 0, ${blue})`;
}



// Function to update the color of each SVG segment based on ADC values
function updateSegmentColors() {
    const adcValues = getAdcValues().current; // Get current values

    document.getElementById('conductor1').style.fill = getColorFromADC(adcValues[0]);
    document.getElementById('conductor2').style.fill = getColorFromADC(adcValues[1]);
    document.getElementById('conductor3').style.fill = getColorFromADC(adcValues[2]);
    document.getElementById('conductor4').style.fill = getColorFromADC(adcValues[3]);

    // Add a fixed border to each conductor (assuming they are SVG elements)
    const borderStyle = "#D2AB39";
    const borderWidth = "10px";

    document.getElementById('conductor1').style.stroke = borderStyle;
    document.getElementById('conductor1').style.strokeWidth = borderWidth;
    
    document.getElementById('conductor2').style.stroke = borderStyle;
    document.getElementById('conductor2').style.strokeWidth = borderWidth;

    document.getElementById('conductor3').style.stroke = borderStyle;
    document.getElementById('conductor3').style.strokeWidth = borderWidth;

    document.getElementById('conductor4').style.stroke = borderStyle;
    document.getElementById('conductor4').style.strokeWidth = borderWidth;
}

// Call the function to update segment colors when the page loads
window.onload = function() {
    updateSegmentColors();
    updateTextBoxColors();  // Ensure both color updates happen on page load
};

// Function to update the background color of each text box based on temperature ADC values
function updateTextBoxColors() {
    const adcTempValues = getAdcValues().temperature; // Get temperature values

    document.getElementById('value8').style.backgroundColor = getColorFromADC(adcTempValues[0]);
    document.getElementById('value7').style.backgroundColor = getColorFromADC(adcTempValues[1]);
    document.getElementById('value6').style.backgroundColor = getColorFromADC(adcTempValues[2]);
    document.getElementById('value5').style.backgroundColor = getColorFromADC(adcTempValues[3]);
}
