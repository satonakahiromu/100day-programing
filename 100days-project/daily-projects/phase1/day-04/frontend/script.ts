interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
}

class TodoApp {
    private todoList: TodoItem[] = [];
    private todoInput: HTMLInputElement | null;
    private todoContainer: HTMLElement | null;
    private messageElement: HTMLElement | null;

    constructor() {
        this.todoInput = document.getElementById('todoInput') as HTMLInputElement;
        this.todoContainer = document.getElementById('todoList');
        this.messageElement = document.getElementById('message');
        
        this.loadTodos();
        this.initializeEventListeners();
    }

    private initializeEventListeners() {
        // 追加ボタンのイベントリスナー
        const addButton = document.getElementById('addTodo');
        addButton?.addEventListener('click', () => this.addTodo());

        // 入力フォームのEnterキーイベント
        this.todoInput?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // クリアボタンのイベントリスナー
        const clearButton = document.getElementById('clearCompleted');
        clearButton?.addEventListener('click', () => this.clearCompleted());
    }

    private loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            this.todoList = JSON.parse(savedTodos);
            this.renderTodos();
        }
    }

    private saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todoList));
    }

    private showMessage(message: string, isError: boolean = false) {
        if (this.messageElement) {
            this.messageElement.textContent = message;
            this.messageElement.className = isError ? 'error' : 'success';
            setTimeout(() => {
                this.messageElement!.textContent = '';
                this.messageElement!.className = '';
            }, 3000);
        }
    }

    private addTodo() {
        const text = this.todoInput?.value.trim();
        
        if (!text) {
            this.showMessage('タスクを入力してください', true);
            return;
        }

        const newTodo: TodoItem = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toLocaleString()
        };

        this.todoList.unshift(newTodo);
        this.saveTodos();
        this.renderTodos();
        
        if (this.todoInput) {
            this.todoInput.value = '';
        }
        
        this.showMessage('タスクを追加しました');
    }

    private toggleTodo(id: number) {
        this.todoList = this.todoList.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        
        this.saveTodos();
        this.renderTodos();
    }

    private deleteTodo(id: number) {
        this.todoList = this.todoList.filter(todo => todo.id !== id);
        this.saveTodos();
        this.renderTodos();
        this.showMessage('タスクを削除しました');
    }

    private clearCompleted() {
        const hasCompleted = this.todoList.some(todo => todo.completed);
        if (!hasCompleted) {
            this.showMessage('完了したタスクはありません', true);
            return;
        }

        this.todoList = this.todoList.filter(todo => !todo.completed);
        this.saveTodos();
        this.renderTodos();
        this.showMessage('完了したタスクを全て削除しました');
    }

    private renderTodos() {
        if (!this.todoContainer) return;

        this.todoContainer.innerHTML = '';
        
        this.todoList.forEach(todo => {
            const todoElement = document.createElement('div');
            todoElement.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            
            todoElement.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <span class="todo-date">${todo.createdAt}</span>
                <button class="delete-btn">削除</button>
            `;

            const checkbox = todoElement.querySelector('input');
            checkbox?.addEventListener('change', () => this.toggleTodo(todo.id));

            const deleteBtn = todoElement.querySelector('.delete-btn');
            deleteBtn?.addEventListener('click', () => this.deleteTodo(todo.id));

            if (this.todoContainer) {
                this.todoContainer.appendChild(todoElement);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});