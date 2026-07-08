const { generateAIStream } = require('../services/aiService');

const handleChatStream = async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message content payload required." });
    }

    // Lock HTTP server headers to persistent data transfer mode
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    try {
        await generateAIStream(
            message,
            history || [],
            (textChunk) => {
                res.write(textChunk); // Pipes parts straight to your widget.js
            },
            () => {
                res.end(); // Safely seals pipeline stream upon generation cutoff
            }
        );
    } catch (error) {
        console.error("Controller pipeline execution failure:", error);
        res.write("Sorry, I had an internal error formulating that answer.");
        res.end();
    }
};

module.exports = { handleChatStream };