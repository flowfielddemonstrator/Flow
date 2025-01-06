// plotchart.js

// Initialize arrays to store time-series data
const adcCurrentData = [[], [], [], []];  // Stores data over time for adc0 - adc3
const adcTemperatureData = [[], [], [], []];  // Stores data over time for adc4 - adc7
const timeLabels = [];  // Stores timestamps for x-axis

// Function to get the latest values from HTML table cells
function getAdcValues() {
    return {
        current: [
            0.007 * parseFloat(document.getElementById("adc0").innerText) || 0,
            0.007 * parseFloat(document.getElementById("adc1").innerText) || 0,
            0.007 * parseFloat(document.getElementById("adc2").innerText) || 0,
            0.007 * parseFloat(document.getElementById("adc3").innerText) || 0,
        ],
        temperature: [
            0.025 * (parseFloat(document.getElementById("adc4").innerText) || 0) + 5,
            0.025 * (parseFloat(document.getElementById("adc5").innerText) || 0) + 5,
            0.025 * (parseFloat(document.getElementById("adc6").innerText) || 0) + 5,
            0.025 * (parseFloat(document.getElementById("adc7").innerText) || 0) + 5,
        ]
        
    };
}

// Initialize the charts
const currentCtx = document.getElementById("currentchart").getContext("2d");
const tempCtx = document.getElementById("tempchart").getContext("2d");

const currentChart = new Chart(currentCtx, {
    type: 'line',
    data: {
        labels: timeLabels,
        datasets: [
            { label: 'Segment 1', data: adcCurrentData[0], borderColor: 'red', fill: false, pointRadius: 0 },
            { label: 'Segment 2', data: adcCurrentData[1], borderColor: 'orange', fill: false, pointRadius: 0  },
            { label: 'Segment 3', data: adcCurrentData[2], borderColor: 'green', fill: false, pointRadius: 0  },
            { label: 'Segment 4', data: adcCurrentData[3], borderColor: 'blue', fill: false, pointRadius: 0  }
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Current',
                font: {
                    size: 20,
                    weight: 'bold'
                },
                color: '#ffffff'
            },
            legend: {
                labels: {
                    color: '#fff',
                    font: {
                        weight: 'bold'
                    },
                    boxWidth: 20,
                    padding: 20
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (s)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#ffffff'
                },
                grid: {
                    color: '#c2c2c2df',
                    borderColor: '#c2c2c2df'
                },
                ticks: {
                    color: '#c2c2c2df',
                    font: {
                        weight: 'bold'
                    }
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Current (in Ampere)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#ffffff'
                },
                grid: {
                    color: '#c2c2c2df',
                    borderColor: '#c2c2c2df'
                },
                ticks: {
                    color: '#c2c2c2df',
                    font: {
                        weight: 'bold'
                    }
                },
                beginAtZero: true
            }
        }
    }
});

const tempChart = new Chart(tempCtx, {
    type: 'line',
    data: {
        labels: timeLabels,
        datasets: [
            { label: 'Segment 1', data: adcTemperatureData[0], borderColor: 'red', fill: false, pointRadius: 0  },
            { label: 'Segment 2', data: adcTemperatureData[1], borderColor: 'orange', fill: false, pointRadius: 0  },
            { label: 'Segment 3', data: adcTemperatureData[2], borderColor: 'green', fill: false, pointRadius: 0  },
            { label: 'Segment 4', data: adcTemperatureData[3], borderColor: 'blue', fill: false, pointRadius: 0  }
        ]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text: 'Temperature',
                font: {
                    size: 20,
                    weight: 'bold'
                },
                color: '#ffffff'
            },
            legend: {
                labels: {
                    color: '#fff',
                    font: {
                        weight: 'bold'
                    },
                    boxWidth: 20,
                    padding: 20
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time (s)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#ffffff'
                },
                grid: {
                    color: '#c2c2c2df',
                    borderColor: '#c2c2c2df'
                },
                ticks: {
                    color: '#c2c2c2df',
                    font: {
                        weight: 'bold'
                    }
                }
            },
            y: {
                min: 15,
                max: 50,
                
                title: {
                    display: true,
                    text: 'Temperature (in °C)',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    color: '#ffffff'
                },
                grid: {
                    color: '#c2c2c2df',
                    borderColor: '#c2c2c2df'
                },
                ticks: {
                    color: '#c2c2c2df',
                    font: {
                        weight: 'bold'
                    }
                },
                beginAtZero: true
            }
        }
    }
});

// Function to update charts with new ADC values
function updateCharts() {
    const adcValues = getAdcValues();
    const currentTime = timeLabels.length;  // Use the length as the time index (e.g., seconds)

    // Add new data points to each ADC data array
    timeLabels.push(currentTime);
    adcCurrentData.forEach((arr, index) => arr.push(adcValues.current[index]));
    adcTemperatureData.forEach((arr, index) => arr.push(adcValues.temperature[index]));

    // Limit the length of the time-series data to avoid memory issues
    if (timeLabels.length > 1800) {  // Display only the last 50 points
        timeLabels.shift();
        adcCurrentData.forEach(arr => arr.shift());
        adcTemperatureData.forEach(arr => arr.shift());
    }

    // Update the charts
    currentChart.update();
    tempChart.update();
}

// Update the charts at regular intervals (e.g., every second)
setInterval(updateCharts, 1000);
