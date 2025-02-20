from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

# メッセージを保存するためのインメモリストア
messages = []

@app.route('/messages', methods=['GET'])
def get_messages():
    """全メッセージを取得するエンドポイント"""
    return jsonify(messages)

@app.route('/messages/latest', methods=['GET'])
def get_latest_messages():
    """最新の10件のメッセージを取得するエンドポイント"""
    return jsonify(messages[-10:] if messages else [])

@app.route('/messages', methods=['POST'])
def send_message():
    """新しいメッセージを送信するエンドポイント"""
    try:
        data = request.get_json()
        
        if not data or 'text' not in data:
            return jsonify({'error': 'メッセージが必要です'}), 400
            
        message = {
            'id': len(messages) + 1,
            'text': data['text'],
            'sender': data.get('sender', 'user'),
            'timestamp': datetime.now().strftime('%H:%M')
        }
        
        messages.append(message)
        
        # 自動応答を生成
        if message['sender'] == 'user':
            response = generate_auto_response(message['text'])
            messages.append(response)
            return jsonify({
                'message': message,
                'response': response
            })
            
        return jsonify({'message': message})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def generate_auto_response(user_message: str) -> dict:
    """ユーザーのメッセージに対する自動応答を生成"""
    response_text = "申し訳ありません。現在メンテナンス中です。"
    
    # 簡単な応答パターン
    if "こんにちは" in user_message:
        response_text = "こんにちは！お手伝いできることはありますか？"
    elif "?" in user_message or "？" in user_message:
        response_text = "ご質問ありがとうございます。担当者に確認して返信いたします。"
    elif "ありがとう" in user_message:
        response_text = "こちらこそありがとうございます！"
    
    return {
        'id': len(messages) + 2,
        'text': response_text,
        'sender': 'system',
        'timestamp': datetime.now().strftime('%H:%M')
    }

@app.route('/messages/<int:message_id>', methods=['DELETE'])
def delete_message(message_id):
    """特定のメッセージを削除するエンドポイント"""
    global messages
    original_length = len(messages)
    messages = [msg for msg in messages if msg['id'] != message_id]
    
    if len(messages) == original_length:
        return jsonify({'error': 'メッセージが見つかりません'}), 404
        
    return jsonify({'message': 'メッセージを削除しました'})

@app.route('/messages/clear', methods=['POST'])
def clear_messages():
    """全メッセージを削除するエンドポイント"""
    global messages
    messages = []
    return jsonify({'message': '全メッセージを削除しました'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)