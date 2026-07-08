const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

// Initialize client with key from .env file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateAIStream = async (userMessage, history, onChunk, onDone) => {
    try {
        // Form conversation context array matching Gemini's specifications
        const contents = [
            ...history,
            { role: 'user', parts: [{ text: userMessage }] }
        ];

        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash', // Latency-optimized for responsive conversational widgets
            contents: contents,
            config: {
                systemInstruction: "You are a professional AI Chatbot Assistant. Keep answers concise, clear, and focused on helping the website visitor.",
                temperature: 0.7,
            }
        });

        // Push text data fragments downstream as they clear the API
        for await (const chunk of responseStream) {
            if (chunk.text) {
                onChunk(chunk.text);
            }
        }
        
        if (onDone) onDone();

    } catch (error) {
        console.error("Error inside Gemini Core Engine Service:", error);
        throw error;
    }
};

module.exports = { generateAIStream };