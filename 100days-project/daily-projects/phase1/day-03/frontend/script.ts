class Calculator {
    private num1Input: HTMLInputElement | null;
    private num2Input: HTMLInputElement | null;
    private resultDisplay: HTMLElement | null;
    private expressionDisplay: HTMLElement | null;
    private messageDisplay: HTMLElement | null;
    private selectedOperator: string = '+';

    constructor() {
        this.num1Input = document.getElementById('num1') as HTMLInputElement;
        this.num2Input = document.getElementById('num2') as HTMLInputElement;
        this.resultDisplay = document.getElementById('result');
        this.expressionDisplay = document.getElementById('expression');
        this.messageDisplay = document.getElementById('message');
        
        this.initializeEventListeners();
    }

    private initializeEventListeners() {
        // 演算子ボタンのイベントリスナー
        document.querySelectorAll('[data-operator]').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                this.selectedOperator = target.getAttribute('data-operator') || '+';
                this.highlightSelectedOperator();
            });
        });

        // 計算ボタンのイベントリスナー
        const calculateButton = document.getElementById('calculate');
        if (calculateButton) {
            calculateButton.addEventListener('click', () => this.calculate());
        }
    }

    private highlightSelectedOperator() {
        document.querySelectorAll('[data-operator]').forEach(button => {
            const operator = button.getAttribute('data-operator');
            if (operator === this.selectedOperator) {
                button.classList.add('selected');
            } else {
                button.classList.remove('selected');
            }
        });
    }

    private showMessage(message: string, isError: boolean = false) {
        if (this.messageDisplay) {
            this.messageDisplay.textContent = message;
            this.messageDisplay.style.color = isError ? '#dc3545' : '#28a745';
        }
    }

    private async calculate() {
        try {
            const num1 = this.num1Input?.value;
            const num2 = this.num2Input?.value;

            if (!num1 || !num2) {
                this.showMessage('両方の数値を入力してください', true);
                return;
            }

            const response = await fetch('http://localhost:5001/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    num1: parseFloat(num1),
                    num2: parseFloat(num2),
                    operator: this.selectedOperator
                })
            });

            const data = await response.json();

            if (data.error) {
                this.showMessage(data.error, true);
                return;
            }

            if (this.resultDisplay) {
                this.resultDisplay.textContent = data.result.toString();
            }
            if (this.expressionDisplay) {
                this.expressionDisplay.textContent = data.expression;
            }
            this.showMessage('計算完了！');

        } catch (error) {
            this.showMessage('計算中にエラーが発生しました', true);
            console.error('Error:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});