import serial
import json
from flask import Flask, jsonify, render_template
from collections import deque
import threading
import time  # Add this line to import the time module


# Initialize serial connection (replace with the correct port for your ESP32)
ser = serial.Serial('/dev/cu.usbserial-1420', 115200)


# Initialize Flask app
app = Flask(__name__)

# Global variable to store sensor data
sensor_data = {
    "adc0": 0, "adc1": 0, "adc2": 0, "adc3": 0,
    "adc4": 0, "adc5": 0, "adc6": 0, "adc7": 0
}

sensor_data_avg = {}

data_history = {key: deque(maxlen=5) for key in sensor_data.keys()}

# Function to continuously read data from serial
def read_serial():
    global sensor_data
    time.sleep(1)  # Wait for serial connection to stabilize
    while True:
        if ser.in_waiting > 0:
            try:
                line = ser.readline().decode('utf-8').strip()
                print("Raw data from ESP32:", line)  # Debugging line
                data = json.loads(line)
                sensor_data = data  # Update global variable with new sensor data
                calc_avg(sensor_data)

            except json.JSONDecodeError:
                print("Error decoding JSON from serial:", line)
            except serial.SerialException as e:
                print("Serial exception:", e)
                break  # Stop the thread if the port is disconnected

def calc_avg(new_data):            
    for key, value in sensor_data.items():
        data_history[key].append(value)  # Füge den neuen Wert hinzu
        sensor_data_avg[key] = sum(data_history[key]) / len(data_history[key])
        sensor_data_avg[key] = round(sensor_data_avg[key])

# Start the serial reading in a separate thread
thread = threading.Thread(target=read_serial)
thread.daemon = True
thread.start()

# Route to serve the HTML dashboard
@app.route('/')
def index():
    return render_template('index.html')

# API route to get sensor data
@app.route('/data')
def data():
    return jsonify(sensor_data)

# API route to get sensor data
@app.route('/dataavg')
def dataavg():
    return jsonify(sensor_data_avg)

# Run Flask app
if __name__ == '__main__':
    app.run(debug=True)
