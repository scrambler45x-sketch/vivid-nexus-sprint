const mongoose = require('mongoose');

const knowledgeSchema = new mongoose.Schema({
    text: { 
        type: String, 
        required: true 
    },
    embedding: { 
        type: [Number], 
        required: true 
    },
    metadata: { 
        source: {
            type: String
        }
    }
}, { 
    timestamps: true 
});

// Explicitly forcing connection target to 'ServicesBook' collection as seen in your Atlas dashboard
module.exports = mongoose.model('Knowledge', knowledgeSchema, 'ServicesBook');