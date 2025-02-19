from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# カウンターの初期値
counter = 0

@app.route('/counter', methods=['GET'])
def get_counter():
    return jsonify({'count': counter})

@app.route('/counter/increment', methods=['POST'])
def increment_counter():
    global counter
    counter += 1
    return jsonify({'count': counter})

@app.route('/counter/decrement', methods=['POST'])
def decrement_counter():
    global counter
    counter -= 1
    return jsonify({'count': counter})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)