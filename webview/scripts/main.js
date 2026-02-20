const vscode = acquireVsCodeApi();
const chatContainer = document.getElementById('chat-container');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const localPlanToggle = document.getElementById('local-plan-toggle');
localPlanToggle.checked = true;
const loadingSpinner = document.getElementById('loading-spinner');
if (loadingSpinner) loadingSpinner.style.display = 'none';

let isStreaming = false;
let projectContext = null;

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

    // Info container for model and usage
    const infoDiv = document.createElement('div');
    infoDiv.className = 'agent-info';
    infoDiv.style.fontSize = '0.75em';
    infoDiv.style.color = '#aaa';
    infoDiv.style.marginBottom = '2px';
    msgDiv.appendChild(infoDiv);

    // Content container for streaming text
    const contentDiv = document.createElement('div');
    msgDiv.appendChild(contentDiv);
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    function typeChar() {
        if (i <= text.length) {
            if (window.marked && typeof window.marked.parse === 'function') {
                contentDiv.innerHTML = window.marked.parse(text.slice(0, i));
            } else {
                contentDiv.textContent = text.slice(0, i);
            }
            chatContainer.scrollTop = chatContainer.scrollHeight;
            i++;
            setTimeout(typeChar, 18);
        } else {
            isStreaming = false;
            sendBtn.disabled = false;
        }
    }
    typeChar();
}

sendBtn.addEventListener('click', () => {
    sendUserMessage();
});

chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendUserMessage();
    }
});

function sendUserMessage() {
    const content = chatInput.value.trim();
    if (!content || isStreaming) return;
    appendMessage(content, 'user');
    chatInput.value = '';
    sendBtn.disabled = true;
    if (loadingSpinner) loadingSpinner.style.display = 'flex';
    const useLocal = localPlanToggle && localPlanToggle.checked;
    vscode.postMessage({ command: 'chat', text: content, local: useLocal });
}

window.addEventListener('message', event => {
    const message = event.data;
    switch (message.command) {
        case 'projectContext':
            projectContext = message.data;
            try {
                const fileCount = projectContext.openedFiles ? Object.keys(projectContext.openedFiles).length : 0;
                // appendMessage(`dev: Project loaded: ${fileCount} opened file(s) recorded.`, 'agent');
            } catch (e) {
                console.error(e);
            }
            break;
        case 'agentResponse':
            if (loadingSpinner) loadingSpinner.style.display = 'none';
            try {
                if (message.text) {
                    streamAgentMessage(message.text);
                    // Find the last agent message and fill infoDiv
                    setTimeout(() => {
                        const agentMessages = chatContainer.getElementsByClassName('message agent');
                        if (agentMessages.length > 0) {
                            const lastAgentMsg = agentMessages[agentMessages.length - 1];
                            const infoDiv = lastAgentMsg.querySelector('.agent-info');
                            if (infoDiv) {
                                let infoText = '';
                                if (message.model) infoText += `Model: ${message.model}`;
                                if (message.usage !== undefined) infoText += `${infoText ? ' | ' : ''}Tokens: ${message.usage}`;
                                infoDiv.textContent = infoText;
                            }
                        }
                    }, 10);
                } else {
                    sendBtn.disabled = false;
                }
            } catch (e) {
                console.error(e);
                sendBtn.disabled = false;
            }
            break;
        default:
            break;
    }
});
