(function () {
  window.initSmartChatWidget = function (userConfig = {}) {
    const defaults = {
      brandName: "Smart Live Chat Assistant",
      brandColor: "#00D2FF",
      backgroundColor: "#0b0f19",
      welcomeMessage:
        "Thanks for reaching out! To help our team connect with you, what is your email address?",
      baseUrl: "http://localhost:5000",
      path: "/api/onboarding/start",
      method: "POST",
    };

    const settings = { ...defaults, ...userConfig };

    if (document.getElementById("smart-chat-widget-root")) {
      return;
    }

    const sendInputToBackend = async (textMessage) => {
      try {
        const response = await fetch(`${settings.baseUrl}${settings.path}`, {
          method: settings.method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: textMessage,
            timestamp: new Date().toISOString(),
            source: "live_chat_assistant",
          }),
        });

        const data = await response.json();
        console.log("Backend response recieved: ", data);
      } catch (error) {
        console.error("Failed to ship webhook to backend: ", error);
      }
    };

    const stylesheet = document.createElement("style");
    stylesheet.id = "smart-chat-widget-styles";
    stylesheet.textContent = `
            #smart-chat-widget-root {
                position: fixed;     
                bottom: 24px;
                right: 24px;
                width: 380px;
                max-width: 90vw;
                height: 600px;
                max-height: 80vh;
                
                /* Color Palette from image_cef5e6.png */
                background-color: ${settings.backgroundColor};
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
            #smart-chat-widget-root .chatApp-chat-header {
                background-color: #111827;
                padding: 16px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            }
            #smart-chat-widget-root .chatApp-chat-status-dot {
                width: 8px;
                height: 8px;
                background-color: ${settings.brandColor};
                border-radius: 50%;
                margin-right: 10px;
                box-shadow: 0 0 8px ${settings.brandColor};
            }
            #smart-chat-widget-root .chatApp-chat-header h3 {
                color: #ffffff;
                margin: 0;
                font-size: 15px;
                font-weight: 600;
                flex: 1;
            }
            .chatApp-close-btn {
                background: none;
                border: none;
                color: #9ca3af;
                font-size: 20px;
                cursor: pointer;
                padding: 0 0 0 12px;
                line-height: 1;
                transition: color 0.2s;
            }
            .chatApp-close-btn:hover {
                color: #ffffff;
            }

            /* Message Display Area */
            #smart-chat-widget-root .chatApp-chat-messages {
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            #smart-chat-widget-root .chatApp-user-chat-bubble, 
            #smart-chat-widget-root .chatApp-bot-chat-bubble {
                background-color: #1f2937;
                color: #e5e7eb;
                padding: 10px 14px;
                border-radius: 12px;
                max-width: 80%;
                font-size: 14px;
                line-height: 1.4;
                align-self: flex-end;
            }
            
            #smart-chat-widget-root .chatApp-bot-chat-bubble {
                align-self: flex-start;
            }

            /* Chat Input Field Container */
            #smart-chat-widget-root .chatApp-chat-input-container {
                padding: 16px;
                background-color: #111827;
                border-top: 1px solid rgba(255, 255, 255, 0.08);
                display: flex;
                gap: 10px;
            }
            #smart-chat-widget-root .chatApp-chat-input {
                flex: 1;
                background-color: #1f2937;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 10px 14px;
                color: #ffffff;
                font-size: 14px;
                outline: none;
            }
            #smart-chat-widget-root .chatApp-chat-input:focus {
                border-color: ${settings.brandColor};
            }
            #smart-chat-widget-root .chatApp-chat-send-btn {
                background-color: ${settings.brandColor};
                color: #000000;
                border: none;
                border-radius: 8px;
                padding: 0 16px;
                font-weight: 600;
                font-size: 14px;
                cursor: pointer;
                transition: opacity 0.2s;
            }
            #smart-chat-widget-root .chatApp-chat-send-btn:hover {
                opacity: 0.9;
            }
            .chat-app.hidden {
                display: none;
            }

            .chat-toggle-btn {
                position: fixed;
                bottom: 24px;
                right: 24px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background-color: #00D4FF;
                border: none;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                transition: transform 0.2s, box-shadow 0.2s;
                font-size: 28px;
                color: #000;
            }
            .chat-toggle-btn:hover {
                transform: scale(1.08);
                box-shadow: 0 6px 28px rgba(0, 212, 255, 0.6);
            }
            .chat-toggle-btn.active {
                background-color: #1f2937;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
                color: #e5e7eb;
            }
        `;
    document.head.appendChild(stylesheet);

    const chatApp = document.createElement("div");
    
    chatApp.classList.add("chat-app", "hidden");
	  const toggleBtn = document.createElement("button");
    toggleBtn.classList.add("chat-toggle-btn");
    toggleBtn.textContent = "💬";
    
    chatApp.classList.add("chat-app");
    chatApp.id = "smart-chat-widget-root";
    let isTyping = false;

    const chats = [];
    let currentStep = 0;

    chatApp.innerHTML = `<div class="chatApp-chat-header">
            <div class="chatApp-chat-status-dot"></div>
            <h3>${settings.brandName}</h3>
            <button class="chatApp-close-btn">✕</button>
        </div>
        <div class="chatApp-chat-messages">
					<!-- Messages will be rendered here dynamically -->
        </div>
        <div class="chatApp-chat-input-container">
            <input type="text" class="chatApp-chat-input" placeholder="Type your message..." />
            <button class="chatApp-chat-send-btn" >Send</button>
        </div>`;

    const sendButton = chatApp.querySelector(".chatApp-chat-send-btn");
    const closeBtn = chatApp.querySelector('.chatApp-close-btn');
    const chatInput = chatApp.querySelector(".chatApp-chat-input");
    const chatMessagesArea = chatApp.querySelector(".chatApp-chat-messages");

    const setInputDisabledState = (disabledValue) => {
      chatInput.disabled = disabledValue;
      sendButton.disabled = disabledValue;

      if (!disabledValue) {
        chatInput.focus();
      }
    };

    const chatBot = (message) => {
      isTyping = true;
      setInputDisabledState(true);
      let fullResponse = "Hello, this is live chat application";

      if (currentStep === 0) {
        fullResponse = settings.welcomeMessage;
        currentStep = 1;
      } else if (currentStep === 1) {
        if (message.includes("@") && message.includes(".")) {
          fullResponse =
            "Perfect! I've received your email. A team representative will contact you shortly.";
          currentStep = 2;
        } else {
          fullResponse =
            "Hmm, that doesn't look like a valid email address. Could you try typing it again?";
        }
      } else {
        fullResponse =
          "Our team has been notified! Feel free to ask anything else, or have a wonderful day.";
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
            sender: "bot",
            message: fullResponse,
          });
          isTyping = false;
          setInputDisabledState(false);
        }
      };

      typeLetter();
    };

    const appendBubble = (message, sender) => {
      const bubble = document.createElement("div");
      bubble.classList.add(`chatApp-${sender}-chat-bubble`);
      bubble.textContent = message;
      chatMessagesArea.appendChild(bubble);
      chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
      return bubble;
    };

    const handleSend = () => {
      if (isTyping) return;
      const chatInput = chatApp.querySelector(".chatApp-chat-input");
      const userMessage = chatInput.value.trim();
      console.log(userMessage);

      if (userMessage.length === 0) return;

      chats.push({
        sender: "user",
        message: userMessage,
      });
      appendBubble(userMessage, "user");
      chatInput.value = "";
      setTimeout(() => chatBot(userMessage), 400);
      sendInputToBackend(userMessage);
    };

    if (sendButton) {
      sendButton.addEventListener("click", handleSend);
    }

    chatInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") handleSend();
    });

    toggleBtn.addEventListener('click', () => {
      chatApp.classList.remove('hidden');
      toggleBtn.classList.add('hidden');
    });

    closeBtn.addEventListener('click', () => {
        chatApp.classList.add('hidden');
        toggleBtn.classList.remove('hidden');
    });

    document.body.appendChild(toggleBtn);
    document.body.appendChild(chatApp);
  };
})();
