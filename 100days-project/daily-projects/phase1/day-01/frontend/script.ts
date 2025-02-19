async function fetchMessage() {
    try {
        const response = await fetch('http://localhost:5001/hello');  // ポートを5001に変更
        const data = await response.json();
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = data.message;
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchMessage();
    
    const button = document.getElementById('fetchButton');
    if (button) {
        button.addEventListener('click', fetchMessage);
    }
});