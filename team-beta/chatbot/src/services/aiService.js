const { GoogleGenAI } = require('@google/genai');
const Knowledge = require('../models/Knowledge');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateAIStream = async (userMessage, history, onChunk, onDone) => {
    try {
        // 1. Generate the query vector matching our ingestion model configuration
        const embeddingResponse = await ai.models.embedContent({
            model: 'gemini-embedding-001',
            contents: userMessage,
            config: {
                outputDimensionality: 768 // Matches our 768 index on Atlas
            }
        });
        const queryVector = embeddingResponse.embeddings[0].values;

        //console.log("🔍 Running Vector Search for message:", userMessage);

        // 2. Query MongoDB Vector Search Index
        const matchingChunks = await Knowledge.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "embedding",
                    queryVector: queryVector,
                    numCandidates: 15, // Raised from 10 to cover all 15 plans
                    limit: 5           // Raised from 3 to give a wider context pool          
                }
            }
        ]);

        //console.log("📦 Found matching chunks from Atlas:", matchingChunks);

        // 3. Extrapolate match content strings
        const contextText = matchingChunks.length > 0
            ? matchingChunks.map(chunk => chunk.text).join("\n\n")
            : "No specific pricing or framework information was found.";

        // 4. Form conversation structure
        const contents = [
            ...history,
            {
                role: 'user',
                parts: [{
                    text: `[WEBSITE KNOWLEDGE CONTEXT]\n${contextText}\n\n[USER QUESTION]\n${userMessage}`
                }]
            }
        ];

        // 5. Build strict streaming session
        const responseStream = await ai.models.generateContentStream({
            model: 'gemini-2.5-flash',
            contents: contents,
            config: {
                systemInstruction: `You are a professional website support assistant for Vivid Nexus.

CRITICAL BOUNDARIES:
- Answer the user's question using the facts provided in the [WEBSITE KNOWLEDGE CONTEXT].
- If the user asks general questions about our services or pricing, use the provided context to summarize our web architecture, AI automation, or branding levels.
- If the context genuinely doesn't contain the answer, or if they ask completely unrelated non-business questions, politely decline to answer and instruct them to contact support via email at support@vividnexus.com.
- Keep answers highly professional, concise, and beautifully structured.
- DO NOT use markdown bullet symbols like asterisks (*). Use clear line breaks and plain spacing to separate your points so it reads beautifully on a standard text display.`,
                temperature: 0.2
            }
        });

        for await (const chunk of responseStream) {
            const text = chunk.text;
            if (text) onChunk(text);
        }

        if (onDone) onDone();

    } catch (error) {
        console.error("Error inside Atlas Retrieval Engine:", error);
        throw error;
    }
};

module.exports = { generateAIStream };