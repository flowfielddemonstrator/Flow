// Function to get ADC values from global variables instead of HTML
function getAdcValueById(id) {
    return window[id] !== undefined ? window[id] : 0;  // Return the global variable if it exists, otherwise return 0
}

  
  // Initialize Current Chart mit den ADC 0-3 Werten aus der Tabelle
  function populateCurrentChart() {
    const ctx = document.getElementById('currentchart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(4).fill(0),  // Placeholder labels for now
            datasets: [
                { label: 'ADC0', data: [getAdcValueById('adc0')], borderColor: 'red', borderWidth: 2, pointRadius: 0 },
                { label: 'ADC1', data: [getAdcValueById('adc1')], borderColor: 'orange', borderWidth: 2, pointRadius: 0 },
                { label: 'ADC2', data: [getAdcValueById('adc2')], borderColor: 'green', borderWidth: 2, pointRadius: 0 },
                { label: 'ADC3', data: [getAdcValueById('adc3')], borderColor: 'blue', borderWidth: 2, pointRadius: 0 }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Current',
                    font: { size: 20, weight: 'bold' },
                    color: '#ffffff'
                },
                legend: {
                    labels: { color: '#fff', font: { weight: 'bold' }, boxWidth: 20, padding: 20 }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Time (s)', font: { size: 14, weight: 'bold' }, color: '#ffffff' },
                    grid: { color: '#c2c2c2df', borderColor: '#c2c2c2df' },
                    ticks: { color: '#c2c2c2df', font: { weight: 'bold' } }
                },
                y: {
                    title: { display: true, text: 'Current (in Ampere)', font: { size: 14, weight: 'bold' }, color: '#ffffff' },
                    grid: { color: '#c2c2c2df', borderColor: '#c2c2c2df' },
                    ticks: { color: '#c2c2c2df', font: { weight: 'bold' } },
                    beginAtZero: true
                }
            }
        }
    });
}

  
  // Initialize Temperature Chart mit den ADC 4-7 Werten aus der Tabelle
  function populateTempChart() {
    const ctx2 = document.getElementById('tempchart');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: Array(4).fill(0),  // Placeholder labels for now
            datasets: [
                { label: 'ADC4', data: [getAdcValueById('adc4')], borderColor: 'red', borderWidth: 2, pointRadius: 0 },
                { label: 'ADC5', data: [getAdcValueById('adc5')], borderColor: 'orange', borderWidth: 2, pointRadius: 0 },
                { label: 'ADC6', data: [getAdcValueById('adc6')], borderColor: 'green', borderWidth: 2, pointRadius: 0 },
                { label: 'ADC7', data: [getAdcValueById('adc7')], borderColor: 'blue', borderWidth: 2, pointRadius: 0 }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Temperature',
                    font: { size: 20, weight: 'bold' },
                    color: '#ffffff'
                },
                legend: {
                    labels: { color: '#fff', font: { weight: 'bold' }, boxWidth: 20, padding: 20 }
                }
            },
            scales: {
                x: {
                    title: { display: true, text: 'Segments', font: { size: 14, weight: 'bold' }, color: '#ffffff' },
                    grid: { color: '#c2c2c2df', borderColor: '#c2c2c2df' },
                    ticks: { color: '#c2c2c2df', font: { weight: 'bold' } }
                },
                y: {
                    title: { display: true, text: 'Temperature (in °C)', font: { size: 14, weight: 'bold' }, color: '#ffffff' },
                    grid: { color: '#c2c2c2df', borderColor: '#c2c2c2df' },
                    ticks: { color: '#c2c2c2df', font: { weight: 'bold' } },
                    beginAtZero: true
                }
            }
        }
    });
}

  
  // Populate the table and initialize both charts once when the page loads
  populateCurrentChart();
  populateTempChart();

function updateCharts() {
    const adcValues = [
        getAdcValueById("adc0"), getAdcValueById("adc1"), getAdcValueById("adc2"), getAdcValueById("adc3"),
        getAdcValueById("adc4"), getAdcValueById("adc5"), getAdcValueById("adc6"), getAdcValueById("adc7")
    ];
    
    const currentChart = Chart.getChart("currentchart");
    const tempChart = Chart.getChart("tempchart");

    if (currentChart && tempChart) {
        currentChart.data.datasets.forEach((dataset, i) => {
            dataset.data.push(adcValues[i]);  // Append new ADC values
            if (dataset.data.length > 50) dataset.data.shift();  // Keep data size reasonable
        });

        tempChart.data.datasets.forEach((dataset, i) => {
            dataset.data.push(adcValues[i + 4]);  // Append temperature ADC values
            if (dataset.data.length > 50) dataset.data.shift();
        });

        currentChart.update();
        tempChart.update();
    }
}

// Update the charts every second
setInterval(updateCharts, 1000);
