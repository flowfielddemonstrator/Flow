// Define global variables for adc0 through adc7
let adc0, adc1, adc2, adc3, adc4, adc5, adc6, adc7;

// Fetch sensor data from the Python server every second
setInterval(async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/dataavg');
    const data = await response.json();

    // Update each ADC value in the corresponding HTML element and global variables
    for (let i = 0; i < 8; i++) {
      const adcElement = document.getElementById(`adc${i}`);
      if (adcElement) {
        adcElement.innerText = data[`adc${i}`] || "-";
      }
      // Update global variables
      window[`adc${i}`] = data[`adc${i}`] || null;
    }
  } catch (e) {
    console.error("Error fetching or parsing data:", e);
  }
}, 1000);  // Fetch new data every second
