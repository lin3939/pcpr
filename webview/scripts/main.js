const vscode = acquireVsCodeApi();
const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

let isStreaming = false;

function appendMessage(content, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = content;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function streamAgentMessage(text) {
    let i = 0;
    isStreaming = true;
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message agent';
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    function typeChar() {
        if (i < text.length) {
            msgDiv.textContent += text[i];
            i++;
            chatContainer.scrollTop = chatContainer.scrollHeight;
            setTimeout(typeChar, 18);
        } else {
            isStreaming = false;
        }
    }
    typeChar();
}

sendBtn.addEventListener('click', () => {
    sendUserMessage();
});

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});

function sendUserMessage() {
    const content = chatInput.value.trim();
    if (!content || isStreaming) return;
    appendMessage(content, 'user');
    chatInput.value = '';
    sendBtn.disabled = true;
    vscode.postMessage({ command: 'chat', text: content });
}

window.addEventListener('message', event => {
    const message = event.data;
    if (message.command === 'agentResponse') {
        sendBtn.disabled = false;
        streamAgentMessage(message.text);
    }
});