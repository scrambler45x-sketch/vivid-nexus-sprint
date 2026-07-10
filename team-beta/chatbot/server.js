const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { handleChatStream } = require('./src/controllers/aiController');
require('dotenv').config();

const app = express();
const PORT = 5000;

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'VividNexus-sprint' // Forces Mongoose to use your specific database
})
.then(() => console.log("💾 MongoDB Connected to VividNexus-sprint"))
.catch(err => console.error("❌ Connection Error:", err));

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// 1. Lead Capture Webhook
app.post('/api/webhook/lead', (req, res) => {
    const { email, lastMessage } = req.body;

    console.log('[WEBHOOK TRIGGERED] New Lead Logged');
    console.log(`Email:        ${email || 'Not Provided'}`);
    console.log(`Last Message: "${lastMessage || 'None'}"`);

    return res.status(200).json({
        success: true,
        message: 'Lead captured successfully.'
    });
});

// 2. Onboarding Processing
app.post('/api/onboarding/start', (req, res) => {
    console.log(req.body);
    
    return res.status(200).json({
        success: true,
        message: 'Onboarding logs processed successfully.'
    });
});

// 3. AI Chat Stream
app.post('/api/chat/stream', handleChatStream);

// --- SERVER INITIALIZATION ---
app.listen(PORT, () => {
    console.log(`🚀 Webhook backend operational at http://localhost:${PORT}`);
});