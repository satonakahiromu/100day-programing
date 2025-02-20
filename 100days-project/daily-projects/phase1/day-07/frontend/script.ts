interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'system';
    timestamp: string;
}

class ChatApp {
    private messageInput: HTMLInputElement | null;
    private chatContainer: HTMLElement | null;
    private messageList: HTMLElement | null;
    private messageElement: HTMLElement | null;
    private isPolling: boolean = false;
    private lastMessageId: number = 0;

    constructor() {
        this.messageInput = document.getElementById('messageInput') as HTMLInputElement;
        this.chatContainer = document.getElementById('chatContainer');
        this.messageList = document.getElementById('messageList');
        this.messageElement = document.getElementById('message');
        
        this.initializeEventListeners();
        this.loadMessages();
        this.startPolling();
    }

    private async initializeEventListeners() {
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

        // クリアボタンのイベントリスナー
        const clearButton = document.getElementById('clearMessages');
        clearButton?.addEventListener('click', () => this.clearMessages());
    }

    private async loadMessages() {
        try {
            const response = await fetch('http://localhost:5001/messages');
            const messages = await response.json();
            this.renderMessages(messages);
        } catch (error) {
            this.showMessage('メッセージの読み込みに失敗しました', true);
        }
    }

    private startPolling() {
        this.isPolling = true;
        this.pollNewMessages();
    }

    private async pollNewMessages() {
        while (this.isPolling) {
            try {
                const response = await fetch('http://localhost:5001/messages/latest');
                const messages = await response.json() as ChatMessage[];
                
                const newMessages = messages.filter((msg: ChatMessage) => msg.id > this.lastMessageId);
                if (newMessages.length > 0) {
                    this.renderNewMessages(newMessages);
                    this.lastMessageId = Math.max(...messages.map((m: ChatMessage) => m.id));
                }
            } catch (error) {
                console.error('Polling error:', error);
            }
            
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    private async sendMessage() {
        const text = this.messageInput?.value.trim();
        
        if (!text) return;

        try {
            const response = await fetch('http://localhost:5001/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text,
                    sender: 'user'
                })
            });

            const data = await response.json();
            
            if (response.ok) {
                if (this.messageInput) {
                    this.messageInput.value = '';
                }
                this.renderNewMessages([data.message, data.response]);
                this.lastMessageId = Math.max(data.message.id, data.response.id);
            } else {
                this.showMessage('メッセージの送信に失敗しました', true);
            }
        } catch (error) {
            this.showMessage('サーバーとの通信に失敗しました', true);
        }
    }

    private async clearMessages() {
        try {
            const response = await fetch('http://localhost:5001/messages/clear', {
                method: 'POST'
            });

            if (response.ok) {
                if (this.messageList) {
                    this.messageList.innerHTML = '';
                }
                this.showMessage('メッセージを全て削除しました');
                this.lastMessageId = 0;
            } else {
                this.showMessage('メッセージの削除に失敗しました', true);
            }
        } catch (error) {
            this.showMessage('サーバーとの通信に失敗しました', true);
        }
    }

    private showMessage(message: string, isError: boolean = false) {
        if (this.messageElement) {
            this.messageElement.textContent = message;
            this.messageElement.className = isError ? 'error' : 'success';
            setTimeout(() => {
                if (this.messageElement) {
                    this.messageElement.textContent = '';
                    this.messageElement.className = '';
                }
            }, 3000);
        }
    }

    private renderMessages(messages: ChatMessage[]) {
        if (!this.messageList) return;

        this.messageList.innerHTML = messages
            .map(msg => this.createMessageHTML(msg))
            .join('');

        this.scrollToBottom();
    }

    private renderNewMessages(messages: ChatMessage[]) {
        if (!this.messageList) return;

        const wasScrolledToBottom = this.isScrolledToBottom();

        messages.forEach(msg => {
            const messageHTML = this.createMessageHTML(msg);
            this.messageList!.insertAdjacentHTML('beforeend', messageHTML);
        });

        if (wasScrolledToBottom) {
            this.scrollToBottom();
        } else {
            this.showNewMessageNotification();
        }
    }

    private createMessageHTML(msg: ChatMessage): string {
        return `
            <div class="message ${msg.sender}">
                <div class="message-content">
                    <div class="message-text">${this.escapeHtml(msg.text)}</div>
                    <div class="message-timestamp">${msg.timestamp}</div>
                </div>
            </div>
        `;
    }

    private isScrolledToBottom(): boolean {
        if (!this.chatContainer) return false;
        
        const { scrollTop, scrollHeight, clientHeight } = this.chatContainer;
        return Math.abs(scrollHeight - scrollTop - clientHeight) < 10;
    }

    private scrollToBottom() {
        if (this.chatContainer) {
            this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        }
    }

    private showNewMessageNotification() {
        if (this.chatContainer) {
            this.chatContainer.classList.add('new-message');
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