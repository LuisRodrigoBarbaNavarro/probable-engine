from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import socket as sc
import time

app = Flask(__name__)
socket = SocketIO(app)

# Create list with fruits and vegetables
fruits = ['apple', 'banana', 'orange', 'lemon', 'lime']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('test.html')

i = 0
@socket.on('test')
def test(msg):
    global i
    if i < len(fruits):
        socket.send(fruits[i])
        i += 1

@socket.on('message')
def message(msg):
    s = sc.socket(sc.AF_INET, sc.SOCK_STREAM)
    s.bind(('192.168.43.22', 8585))
    s.listen(0)
    
    while True:
        client, addr = s.accept()
        client.settimeout(5)
        
        while True:
            content = client.recv(1024)
            if len(content) == 0:
                break
            if str(content, 'utf-8') == '\r\n':
                continue
            else:
                socket.send(str(content, 'utf-8'))
                print("Sensor Data: " + str(content, 'utf-8'))
                break
        break
        
        client.close()

if __name__ == '__main__':
    socket.run(app, debug=True)