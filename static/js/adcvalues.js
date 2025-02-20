const databaseUrl = "https://flow-field-demonstrator-default-rtdb.europe-west1.firebasedatabase.app/sensor.json";  // Firebase RTDB path

// Fetch sensor data from Firebase every second
setInterval(async () => {
  try {
    const response = await fetch(databaseUrl); // Fetching data from Firebase
    const data = await response.json(); // Converting response to JSON

    // Loop through ADC values and update the webpage
    for (let i = 0; i < 8; i++) {
      const adcElement = document.getElementById(`adc${i}`);
      if (adcElement) {
        adcElement.innerText = data[`ADC${i}`] || "-"; // Use "ADCx" keys from Firebase
      }
      // Update global variables
      window[`adc${i}`] = data[`ADC${i}`] || null;
    }
  } catch (e) {
    console.error("Error fetching RTDB data:", e);
  }
}, 1000);  // Fetch new data every second
