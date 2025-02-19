from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return jsonify({'message': 'Welcome to Day 1 API'})

@app.route('/hello')
def hello():
    return jsonify({'message': 'こんにちは、世界！'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)  # ポートを5001に変更