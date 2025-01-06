// Initial setup of the temperature chart
const ctx2 = document.getElementById('tempchart');
const tempChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: Array(20).fill(0),  // Placeholder labels for 11 time points
        datasets: [
            {
                label: 'Segment 1',
                data: [],  // Start with an empty array, to be filled dynamically
                borderColor: 'rgba(203, 67, 53, 1)',
                borderWidth: 2,
                pointRadius: 0
            },
            {
                label: 'Segment 2',
                data: [],
                borderColor: 'rgba(212, 172, 13, 1)',
                borderWidth: 2,
                pointRadius: 0
            },
            {
                label: 'Segment 3',
                data: [],
                borderColor: 'rgba(23, 165, 137, 1)',
                borderWidth: 2,
                pointRadius: 0
            },
            {
                label: 'Segment 4',
                data: [],
                borderColor: 'rgba(46, 134, 193, 1)',
                borderWidth: 2,
                pointRadius: 0
            }
        ]
    },
    options: {
        plugins: {
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy'
                },
                zoom: {
                    enabled: true,
                    mode: 'xy',
                    speed: 0.1
                }
            },
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
                    text: 'Time (in seconds)',
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

// Function to fetch and update temperature chart data
async function fetchAndUpdateTempData() {
    try {
        const response = await fetch('http://127.0.0.1:5000/data');  // Adjust URL if needed
        const data = await response.json();

        // Assuming data.adc4, data.adc5, data.adc6, data.adc7 are the latest temperature values
        const tempValues = [data.adc4, data.adc5, data.adc6, data.adc7];

        // Add the new data points to each dataset
        tempChart.data.datasets[0].data.push(tempValues[0]);
        tempChart.data.datasets[1].data.push(tempValues[1]);
        tempChart.data.datasets[2].data.push(tempValues[2]);
        tempChart.data.datasets[3].data.push(tempValues[3]);

        // Limit data points to 11 to keep chart readable
        tempChart.data.datasets.forEach(dataset => {
            if (dataset.data.length > 20) {
                dataset.data.shift();
            }
        });

        // Update the chart
        tempChart.update();
    } catch (error) {
        console.error("Error fetching or updating temperature data:", error);
    }
}

// Fetch and update temperature data every second
setInterval(fetchAndUpdateTempData, 1000);
