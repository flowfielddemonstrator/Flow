// Define global variables for adc0 through adc7
let adc0, adc1, adc2, adc3, adc4, adc5, adc6, adc7;
const databaseUrl = "https://flow-field-demonstrator-default-rtdb.europe-west1.firebasedatabase.app/";  // Firebase URL

// Fetch sensor data from the Python server every second
setInterval(async () => {
  try {
    const response = await fetch(databaseUrl); // Fetching Data
    const data = await response.json(); // Converting response to JSON


    // Loop through ADC values and update the webpage
    for (let i = 0; i < 8; i++) {
      const adcElement = document.getElementById(`adc${i}`);
      if (adcElement) {
        adcElement.innerText = data[`adc${i}`] || "-";
      }
      // Update global variables
      window[`adc${i}`] = data[`adc${i}`] || null;
    }
  } catch (e) {
    console.error("Error fetching RTDB data:", e);
  }
}, 1000);  // Fetch new data every second
