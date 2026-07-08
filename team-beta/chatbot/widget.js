(function () {
    const config = {
        method: "POST",
        path: "/api/onboarding/start",
        baseUrl: "http://localhost:5000"
    }


    const sendInputToBackend = async (textMessage) => {
        try {
            const response = await fetch(`${config.baseUrl}${config.path}`, {
                method: config.method, 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({
                    text: textMessage,
                    timestamp: new Date().toISOString(),
                    source: "live_chat_assistant"
                })
            });

            const data = await response.json();
            console.log("Backend response recieved: ", data);
        } catch(error) {
            console.error("Failed to ship webhook to backend: ", error);
        }
    };

    const stylesheet = document.createElement("style");
    stylesheet.textContent = `
            .chat-app {
                position: fixed;     
                bottom: 24px;
                right: 24px;
                width: 380px;
                max-width: 90vw;
                height: 600px;
                max-height: 80vh;
                
                /* Color Palette from image_cef5e6.png */
                background-color: #0b0f19;
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 16px;
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
                
                /* Layout Layout */
                display: flex;
                flex-direction: column;
                overflow: hidden;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                z-index: 9999;
            }

            /* Header Styling */
            .chatApp-chat-header {
                background-color: #111827;
                padding: 16px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }
            .chatApp-chat-status-dot {
                width: 8px;
                height: 8px;
                background-color: #00D2FF; /* Vibrant Cyan */
                border-radius: 50%;
                margin-right: 10px;
                box-shadow: 0 0 8px #00D2FF;
            }
            .chatApp-chat-header h3 {
                color: #ffffff;
                margin: 0;
                font-size: 15px;
                font-weight: 600;
            }

            /* Message Display Area */
            .chatApp-chat-messages {
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            .chatApp-user-chat-bubble, .chatApp-bot-chat-bubble {
                background-color: #1f2937;
                color: #e5e7eb;
                padding: 10px 14px;
                border-radius: 12px;
                max-width: 80%;
                font-size: 14px;
                line-height: 1.4;
                align-self: flex-end;
            }
            
            .chatApp-bot-chat-bubble {
                align-self: flex-start;
            }

            /* Chat Input Field Container */
            .chatApp-chat-input-container {
                padding: 16px;
                background-color: #111827;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                gap: 10px;
            }
            .chatApp-chat-input {
                flex: 1;
                background-color: #1f2937;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 10px 14px;
                color: #ffffff;
                font-size: 14px;
                outline: none;
            }
            .chatApp-chat-input:focus {
                border-color: #00D2FF;
            }
            .chatApp-chat-send-btn {
                background-color: #00D4FF; /* Cyan Accent */
                color: #000000;
                border: none;
                border-radius: 8px;
                padding: 0 16px;
                font-weight: 600;
                font-size: 14px;
                cursor: pointer;
                transition: opacity 0.2s;
            }
            .chatApp-chat-send-btn:hover {
                opacity: 0.9;
            }
        `;
    document.head.appendChild(stylesheet);

    const chatApp = document.createElement("div");
    chatApp.classList.add("chat-app");

	const chats = [];
    let currentStep = 0;

    chatApp.innerHTML = `<div class="chatApp-chat-header">
            <div class="chatApp-chat-status-dot"></div>
            <h3>Smart Live Chat Assistant</h3>
        </div>
        <div class="chatApp-chat-messages">
					<!-- Messages will be rendered here dynamically -->
        </div>
        <div class="chatApp-chat-input-container">
            <input type="text" class="chatApp-chat-input" placeholder="Type your message..." />
            <button class="chatApp-chat-send-btn" >Send</button>
        </div>`;

	const sendButton = chatApp.querySelector('.chatApp-chat-send-btn');
    const chatInput = chatApp.querySelector('.chatApp-chat-input');
	const chatMessagesArea = chatApp.querySelector('.chatApp-chat-messages');

    const chatBot = (message) => {
        let fullResponse = "Hello, this is live chat application";

        if (currentStep === 0) {
            fullResponse = "Thanks for reaching out! To help our team connect with you, what is your email address?";
            currentStep = 1;
        } 
        else if (currentStep === 1) {
            if(message.includes('@') && message.includes(".")) {
                fullResponse = "Perfect! I've received your email. A team representative will contact you shortly.";
                currentStep = 2;
            } else {
                fullResponse = "Hmm, that doesn't look like a valid email address. Could you try typing it again?";
            }
        } else {
            fullResponse = "Our team has been notified! Feel free to ask anything else, or have a wonderful day.";
        }

        const bubble = document.createElement("div");
        bubble.classList.add("chatApp-bot-chat-bubble");

        bubble.textContent = "";

        chatMessagesArea.appendChild(bubble);

        let index = 0;
        const typeLetter = () => {
        if (index < fullResponse.length) {
            bubble.textContent += fullResponse[index];
            index++;

            chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;

            setTimeout(typeLetter, 40);
        } else {
            chats.push({
            "sender": "bot",
            "message": fullResponse,
            });
        }
        };

        typeLetter();
    };

    const appendBubble = (message, sender) => {
        const bubble = document.createElement('div');
        bubble.classList.add(`chatApp-${sender}-chat-bubble`);
        bubble.textContent = message;
        chatMessagesArea.appendChild(bubble);
        chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
        return bubble;
    }

	const handleSend = () => {
		const chatInput = chatApp.querySelector('.chatApp-chat-input');
		const userMessage = chatInput.value.trim();
		console.log(userMessage);
        
        if(userMessage.length === 0) return;

		chats.push({
            "sender": "user",
            "message": userMessage
        });
		appendBubble(userMessage, 'user');
		chatInput.value ="";
        setTimeout(() => chatBot(userMessage), 400);
        sendInputToBackend(userMessage);
	};

	if(sendButton) {
		sendButton.addEventListener('click', handleSend);
	}

    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') handleSend()
    })

    document.body.appendChild(chatApp);
})();
