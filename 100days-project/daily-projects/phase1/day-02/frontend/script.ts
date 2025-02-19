class Counter {
    private counterElement: HTMLElement | null;
    private messageElement: HTMLElement | null;
    private count: number = 0;

    constructor() {
        this.counterElement = document.getElementById('counter');
        this.messageElement = document.getElementById('message');
        this.initializeButtons();
        this.fetchCurrentCount();
    }

    private async fetchCurrentCount() {
        try {
            const response = await fetch('http://localhost:5001/counter');
            const data = await response.json();
            this.updateDisplay(data.count);
        } catch (error) {
            this.showError('カウンターの取得に失敗しました');
        }
    }

    private async updateCounter(endpoint: string) {
        try {
            const response = await fetch(`http://localhost:5001/counter/${endpoint}`, {
                method: 'POST'
            });
            const data = await response.json();
            this.updateDisplay(data.count);
        } catch (error) {
            this.showError('カウンターの更新に失敗しました');
        }
    }

    private updateDisplay(count: number) {
        this.count = count;
        if (this.counterElement) {
            this.counterElement.textContent = count.toString();
        }
    }

    private showError(message: string) {
        if (this.messageElement) {
            this.messageElement.textContent = message;
        }
    }

    private initializeButtons() {
        const incrementBtn = document.getElementById('incrementBtn');
        const decrementBtn = document.getElementById('decrementBtn');

        incrementBtn?.addEventListener('click', () => this.updateCounter('increment'));
        decrementBtn?.addEventListener('click', () => this.updateCounter('decrement'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Counter();
});