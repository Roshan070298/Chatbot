const express = require('express');
const Conversation = require('../models/conversation'); // Import Conversation model
const axios = require('axios'); // Import axios for making HTTP requests
const { v4: uuidv4 } = require('uuid'); // Import uuid for generating unique IDs

const router = express.Router();
const FLASK_API_URL = 'http://127.0.0.1:5000/genAI'; // URL of your Flask API



router.post('/chat', async(req, res) => {
    const { model, question, new: isNew } = req.body;


    try{

    const flaskResponse = await axios.post(FLASK_API_URL, {
        endpoint_name: model,
        prompt: question,
        new: isNew // Start a new conversation
    });

    const responseText = flaskResponse.data.response;

    let conversation;

    if (isNew) {
        // Create a new conversation
        const chat_id = uuidv4();
        conversation = new Conversation({
            chat_id,
            messages: [{ question, response: responseText }]
        });
    }

    else {
        conversation = await Conversation.findOne().sort({ created_at: -1 });
            if (!conversation) {
                return res.status(404).json({ error: 'Conversation not found' });
    }

    conversation.messages.push({ question, response: responseText });
        }

    await conversation.save();

    res.status(201).json({ message: 'Message added successfully!', conversation });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add message', details: error.message });
    }
});


router.get('/conversation/:chat_id/messages', async (req, res) => {
    try {
        const { chat_id } = req.params;
        const conversation = await Conversation.findOne({ chat_id }).exec();

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Sort messages by timestamp
        const sortedMessages = conversation.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        res.status(200).json({ messages: sortedMessages });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
    }
});


router.get('/conversation/allChats', async (req, res) => {
    try {
        const conversations = await Conversation.find().sort({ created_at: -1 }).exec();

        res.status(200).json({ conversations });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversations', details: error.message });
    }
});

module.exports = router;