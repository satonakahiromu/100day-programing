interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'system';
    timestamp: string;
}

class ChatApp {
    private messages: ChatMessage[] = [];
    private messageInput: HTMLInputElement | null;
    private chatContainer: HTMLElement | null;
    private messageList: HTMLElement | null;

    constructor() {
        this.messageInput = document.getElementById('messageInput') as HTMLInputElement;
        this.chatContainer = document.getElementById('chatContainer');
        this.messageList = document.getElementById('messageList');
        
        this.initializeEventListeners();
        this.addSystemMessage('チャットを開始しました。');
    }

    private initializeEventListeners() {
        // 送信ボタンのイベントリスナー
        const sendButton = document.getElementById('sendMessage');
        sendButton?.addEventListener('click', () => this.sendMessage());

        // 入力フォームのEnterキーイベント
        this.messageInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // スクロール検出
        this.chatContainer?.addEventListener('scroll', () => this.handleScroll());
    }

    private handleScroll() {
        if (!this.chatContainer) return;
        
        const { scrollTop, scrollHeight, clientHeight } = this.chatContainer;
        const scrollBottom = scrollHeight - scrollTop - clientHeight;
        
        if (scrollBottom < 10) {
            this.chatContainer.classList.remove('new-message');
        }
    }

    private formatTimestamp(): string {
        return new Date().toLocaleTimeString('ja-JP', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    private addSystemMessage(text: string) {
        const systemMessage: ChatMessage = {
            id: Date.now(),
            text,
            sender: 'system',
            timestamp: this.formatTimestamp()
        };
        
        this.messages.push(systemMessage);
        this.renderMessages();
    }

    private sendMessage() {
        const text = this.messageInput?.value.trim();
        
        if (!text) return;

        const newMessage: ChatMessage = {
            id: Date.now(),
            text,
            sender: 'user',
            timestamp: this.formatTimestamp()
        };

        this.messages.push(newMessage);
        this.renderMessages();
        
        if (this.messageInput) {
            this.messageInput.value = '';
        }

        // 自動返信のシミュレーション
        setTimeout(() => {
            this.simulateResponse(text);
        }, 1000);
    }

    private simulateResponse(userMessage: string) {
        let response: string;

        // 簡単な応答パターン
        if (userMessage.includes('こんにちは')) {
            response = 'こんにちは！お手伝いできることはありますか？';
        } else if (userMessage.includes('?') || userMessage.includes('？')) {
            response = '申し訳ありません。現在はデモ版のため、詳しい回答はできません。';
        } else {
            response = 'メッセージを受け取りました。これはデモ用の自動応答です。';
        }

        const responseMessage: ChatMessage = {
            id: Date.now(),
            text: response,
            sender: 'system',
            timestamp: this.formatTimestamp()
        };

        this.messages.push(responseMessage);
        this.renderMessages();
    }

    private renderMessages() {
        if (!this.messageList || !this.chatContainer) return;

        const wasScrolledToBottom = 
            this.chatContainer.scrollHeight - this.chatContainer.scrollTop === this.chatContainer.clientHeight;

        this.messageList.innerHTML = this.messages
            .map(msg => `
                <div class="message ${msg.sender}">
                    <div class="message-content">
                        <div class="message-text">${this.escapeHtml(msg.text)}</div>
                        <div class="message-timestamp">${msg.timestamp}</div>
                    </div>
                </div>
            `)
            .join('');

        if (wasScrolledToBottom) {
            this.scrollToBottom();
        } else {
            this.chatContainer.classList.add('new-message');
        }
    }

    private scrollToBottom() {
        if (this.chatContainer) {
            this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        }
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});