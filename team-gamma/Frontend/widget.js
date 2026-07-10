(function () {
  window.initSmartChatWidget = function (userConfig = {}) {
    const defaults = {
      brandName: "Smart Live Chat Assistant",
      brandColor: "#00D2FF",
      backgroundColor: "#0b0f19",
      welcomeMessage:
        "Thanks for reaching out! To help our team connect with you, what is your email address?",
      baseUrl: "http://localhost:5000", // Updated to reflect real-world deployments
      path: "/api/chat/stream",
      method: "POST",
    };

    const settings = { ...defaults, ...userConfig };

    if (document.getElementById("smart-chat-widget-root")) return;

    const host = document.createElement("div");
    host.id = "smart-chat-widget-root";
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = `
  /* --- Toggle Button --- */
  .chat-toggle-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #000000;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    box-shadow: 0 4px 20px #2a2a2e;
    transition: transform 0.2s, box-shadow 0.2s;
    color: #f3f3f0;
    font-size: 24px;
  }

  .chat-toggle-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 28px #141416;
  }

  .chat-toggle-btn.hidden {
    display: none !important;
  }

  /* --- Chatbot Container --- */
  .chatApp-wrapper {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 380px;
    max-width: 90vw;
    height: 600px;
    max-height: 80vh;
    background: #0a0a0b;
    border: 1px solid #2a2a2e;
    border-radius: 16px;
    box-shadow: 0 12px 40px #2a2a2e;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    font-family: system-ui, sans-serif;
    z-index: 999999;
  }

  .chatApp-wrapper.hidden {
    display: none !important;
  }

  /* --- Header --- */
  .chatApp-chat-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 16px;
    background: #0a0a0b;
    border-bottom: 1px solid #2a2a2e;
  }

  .chatApp-chat-status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #0a0a0b;
    box-shadow: 0 0 8px #000000;
    flex-shrink: 0;
  }

  .chatApp-chat-header h3 {
    flex: 1;
    margin: 0;
    color: #f3f3f0;
    font-size: 15px;
    font-weight: 600;
  }

  .chatApp-close-btn {
    background: none;
    border: none;
    color: #f3f3f0;
    font-size: 20px;
    cursor: pointer;
    padding: 0 0 0 12px;
    transition: color 0.2s;
  }

  .chatApp-close-btn:hover {
    color: #94949a;
  }

  /* --- Messages --- */
  .chatApp-chat-messages {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;

    /* Hide scrollbar for IE, Edge, Firefox */
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Hide scrollbar for Chrome, Safari, Opera */
  .chatApp-chat-messages::-webkit-scrollbar {
    display: none;
  }

  .chatApp-user-chat-bubble,
  .chatApp-bot-chat-bubble {
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid #2a2a2e;
    max-width: 70%;
    font-size: 14px;
    line-height: 1.4;
    background: #0a0a0b;
    color: #f3f3f0;
  }

  .chatApp-user-chat-bubble {
    align-self: flex-end;
  }

  .chatApp-bot-chat-bubble {
    align-self: flex-start;
  }

  /* --- Input Area --- */
  .chatApp-chat-input-container {
    display: flex;
    gap: 10px;
    padding: 16px;
    background: #0a0a0b;
    border-top: 1px solid #2a2a2e;
  }

  .chatApp-chat-input {
    flex: 1;
    background: #0a0a0b;
    border: 1px solid #2a2a2e;
    border-radius: 8px;
    padding: 10px 14px;
    color: #ffffff;
    font-size: 14px;
    outline: none;
  }

  .chatApp-chat-send-btn {
    background: #141416;
    color: #f3f3f0;
    border: none;
    border-radius: 8px;
    padding: 0 16px;
    font-weight: 600;
    cursor: pointer;
  }
`;
    shadow.appendChild(style);

    const chatApp = document.createElement("div");
    chatApp.className = "chatApp-wrapper hidden";

    chatApp.innerHTML = `
        <div class="chatApp-chat-header">
            <div class="chatApp-chat-status-dot"></div>
            <h3>${settings.brandName}</h3>
            <button class="chatApp-close-btn">✕</button>
        </div>
        <div class="chatApp-chat-messages"></div>
        <div class="chatApp-chat-input-container">
            <input type="text" class="chatApp-chat-input" placeholder="Type your message..." />
            <button class="chatApp-chat-send-btn">Send</button>
        </div>`;

    shadow.appendChild(chatApp);

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "chat-toggle-btn";
    toggleBtn.textContent = settings.brandChatLogo;

    const toggleStyle = document.createElement("style");
    toggleStyle.textContent = `
        .chat-toggle-btn { position: fixed; bottom: 24px; right: 24px; width: 60px; height: 60px; border-radius: 50%; background-color: ${settings.brandColor}; border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4); display: flex; align-items: center; justify-content: center; z-index: 9999; transition: transform 0.2s; font-size: 28px; color: #000; }
        .chat-toggle-btn.hidden { display: none !important; }
    `;

    document.head.appendChild(toggleStyle);
    document.body.appendChild(toggleBtn);

    const sendButton = chatApp.querySelector(".chatApp-chat-send-btn");
    const closeBtn = chatApp.querySelector(".chatApp-close-btn");
    const chatInput = chatApp.querySelector(".chatApp-chat-input");
    const chatMessagesArea = chatApp.querySelector(".chatApp-chat-messages");

    let isTyping = false;
    let welcomeRendered = false;
    const conversationHistory = [];

    const setInputDisabledState = (disabledValue) => {
      chatInput.disabled = disabledValue;
      sendButton.disabled = disabledValue;
      if (!disabledValue) chatInput.focus();
    };

    const appendBubble = (message, sender) => {
      const bubble = document.createElement("div");
      bubble.classList.add(`chatApp-${sender}-chat-bubble`);
      bubble.textContent = message;
      chatMessagesArea.appendChild(bubble);
      chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
      return bubble;
    };

    const streamAIResponse = async (message) => {
      isTyping = true;
      setInputDisabledState(true);
      const botBubble = appendBubble("", "bot");

      try {
        const response = await fetch(`${settings.baseUrl}${settings.path}`, {
          method: settings.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: message,
            history: conversationHistory,
          }),
        });

        if (!response.ok)
          throw new Error("Could not pipe active streaming channel.");

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let accumulatedBotText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const textChunk = decoder.decode(value, { stream: true });
          accumulatedBotText += textChunk;
          botBubble.textContent = accumulatedBotText;
          chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
        }

        conversationHistory.push({ role: "user", parts: [{ text: message }] });
        conversationHistory.push({
          role: "model",
          parts: [{ text: accumulatedBotText }],
        });
      } catch (error) {
        console.error(
          "Failed to safely decode backend engine stream payload:",
          error,
        );
        botBubble.textContent =
          "Sorry, I ran into trouble connecting with my server engine.";
      } finally {
        isTyping = false;
        setInputDisabledState(false);
      }
    };

    const handleSend = () => {
      if (isTyping) return;
      const message = chatInput.value.trim();
      if (message.length === 0) return;

      appendBubble(message, "user");
      chatInput.value = "";
      streamAIResponse(message);
    };

    sendButton.addEventListener("click", handleSend);
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSend();
    });

    toggleBtn.addEventListener("click", () => {
      chatApp.classList.remove("hidden");
      toggleBtn.classList.add("hidden");
      if (!welcomeRendered && settings.welcomeMessage) {
        appendBubble(settings.welcomeMessage, "bot");
        welcomeRendered = true;
      }
    });

    closeBtn.addEventListener("click", () => {
      chatApp.classList.add("hidden");
      toggleBtn.classList.remove("hidden");
    });
  };
})();
