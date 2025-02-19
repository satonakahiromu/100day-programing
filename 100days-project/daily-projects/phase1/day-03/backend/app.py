from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        num1 = float(data['num1'])
        num2 = float(data['num2'])
        operator = data['operator']

        result = 0
        if operator == '+':
            result = num1 + num2
        elif operator == '-':
            result = num1 - num2
        elif operator == '*':
            result = num1 * num2
        elif operator == '/':
            if num2 == 0:
                return jsonify({'error': '0で割ることはできません'}), 400
            result = num1 / num2
        
        return jsonify({
            'result': result,
            'expression': f'{num1} {operator} {num2} = {result}'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)