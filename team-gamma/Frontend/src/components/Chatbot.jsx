import React, { useState, useRef, useEffect } from "react";

export default function Chatbot({
    brandName = "Smart Live Chat Assistant",
    welcomeMessage = "Thanks for reaching out! Ask me anything!",
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const historyRef = useRef([]);
    const messagesEndRef = useRef(null);
    const baseUrl = "http://localhost:5000";

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const streamAIResponse = async (message) => {
        setIsTyping(true);
        setMessages((prev) => [...prev, { role: "bot", text: "" }]);

        try {
            const response = await fetch(`${baseUrl}/api/chat/stream`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, history: historyRef.current }),
            });

            if (!response.ok) throw new Error("Stream failed");

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let accumulated = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                accumulated += chunk;
                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = { role: "bot", text: accumulated };
                    return updated;
                });
            }

            historyRef.current.push(
                { role: "user", parts: [{ text: message }] },
                { role: "model", parts: [{ text: accumulated }] }
            );
        } catch (err) {
            console.error("Stream error:", err);
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    role: "bot",
                    text: "Sorry, I ran into trouble connecting with my server engine.",
                };
                return updated;
            });
        } finally {
            setIsTyping(false);
        }
    };

    const handleSend = () => {
        const msg = inputValue.trim();
        if (!msg || isTyping) return;
        setInputValue("");
        setMessages((prev) => [...prev, { role: "user", text: msg }]);
        streamAIResponse(msg);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSend();
    };

    if (!isOpen) {
        return (
            <button
                className="vn-chatbot-toggle"
                onClick={() => setIsOpen(true)}
                aria-label="Open chat"
            >
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            </button>
        );
    }

    return (
        <div
            className="vn-chatbot"
        >
            <div className="vn-chatbot__header">
                <span className="vn-chatbot__dot" />
                <h3 className="vn-chatbot__title">{brandName}</h3>
                <button
                    className="vn-chatbot__close"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close chat"
                >
                    ✕
                </button>
            </div>

            <div className="vn-chatbot__messages">
                {messages.length === 0 && (
                    <div className="vn-chatbot__bubble vn-chatbot__bubble--bot">
                        {welcomeMessage}
                    </div>
                )}
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`vn-chatbot__bubble vn-chatbot__bubble--${msg.role}`}
                    >
                        {msg.text || "\u200B"}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="vn-chatbot__input-row">
                <input
                    className="vn-chatbot__input"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping}
                />
                <button
                    className="vn-chatbot__send"
                    onClick={handleSend}
                    disabled={isTyping}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
