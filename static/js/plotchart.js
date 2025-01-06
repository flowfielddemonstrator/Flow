// Hilfsfunktion, um den inneren Text eines Elements anhand seiner ID zu holen
function getAdcValueById(id) {
    const element = document.getElementById(id);
    return element ? parseFloat(element.innerText) || 0 : 0;  // Standardwert 0, wenn leer oder nicht gefunden
  }
  
  // Initialize Current Chart mit den ADC 0-3 Werten aus der Tabelle
  function populateCurrentChart() {
    const ctx = document.getElementById('currentchart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(4).fill(0),  // Placeholder labels für jeden Segment
            datasets: [
                {
                    label: 'Segment 1',
                    data: [getAdcValueById('adc0')],  // Holt den Wert aus der Tabelle
                    borderColor: 'rgba(203, 67, 53, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'Segment 2',
                    data: [getAdcValueById('adc1')],
                    borderColor: 'rgba(212, 172, 13, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'Segment 3',
                    data: [getAdcValueById('adc2')],
                    borderColor: 'rgba(23, 165, 137, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'Segment 4',
                    data: [getAdcValueById('adc3')],
                    borderColor: 'rgba(46, 134, 193, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                }
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
  }
  
  // Initialize Temperature Chart mit den ADC 4-7 Werten aus der Tabelle
  function populateTempChart() {
    const ctx2 = document.getElementById('tempchart');
    new Chart(ctx2, {
        type: 'line',
        data: {
            labels: Array(4).fill(0),  // Placeholder labels für jeden Segment
            datasets: [
                {
                    label: 'Segment 1',
                    data: [getAdcValueById('adc4')],
                    borderColor: 'rgba(203, 67, 53, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'Segment 2',
                    data: [getAdcValueById('adc5')],
                    borderColor: 'rgba(212, 172, 13, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'Segment 3',
                    data: [getAdcValueById('adc6')],
                    borderColor: 'rgba(23, 165, 137, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                },
                {
                    label: 'Segment 4',
                    data: [getAdcValueById('adc7')],
                    borderColor: 'rgba(46, 134, 193, 1)',
                    borderWidth: 2,
                    pointRadius: 0
                }
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
                        text: 'Segments',
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
  }
  
  // Populate the table and initialize both charts once when the page loads
  populateCurrentChart();
  populateTempChart();