const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Automatically injects configurations from your .env file
const { handleChatStream } = require('./src/controllers/aiController');

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());

app.post('/api/webhook/lead', (req, res) => {
    const { email, lastMessage } = req.body;

    // Log the intercepted details 
    console.log('[WEBHOOK TRIGGERED] New Lead Logged');
    console.log(`Email:        ${email || 'Not Provided'}`);
    console.log(`Last Message: "${lastMessage || 'None'}"`);


    return res.status(200).json({
        success: true,
        message: 'Lead captured successfully.'
    });
});

app.post('/api/onboarding/start', (req, res) => {
    console.log(req.body);
    return res.status(200).json({
        success: true,
        message: 'Onboarding logs processed successfully.'
    });
})

app.post('/api/chat/stream', handleChatStream);

// Start the server listener
app.listen(PORT, () => {
    console.log(`🚀 Webhook backend operational at http://localhost:${PORT}`);
});