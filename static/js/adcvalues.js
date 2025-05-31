const databaseUrl = "https://flow-field-demonstrator-default-rtdb.europe-west1.firebasedatabase.app/sensor.json";  // Firebase RTDB path

// Fetch sensor data from Firebase every second
setInterval(async () => {
  try {
    const response = await fetch(databaseUrl); // Fetching data from Firebase
    const data = await response.json(); // Converting response to JSON

    // Loop through ADC values and update the webpage
    for (let i = 0; i < 8; i++) {
      // Don’t write raw ADC into the cell. Instead, only update the global JS variable:
      window[`adc${i}`] = data[`ADC${i}`] || 0;
    }

  } catch (e) {
    console.error("Error fetching RTDB data:", e);
  }
}, 1000);  // Fetch new data every second
