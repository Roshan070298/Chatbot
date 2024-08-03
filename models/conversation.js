const mongoose = require('mongoose');



const messageSchema = new mongoose.Schema({
    question: String,
    response: String,
    timestamp: { type: Date, default: Date.now }
});

const conversationSchema = new mongoose.Schema({
  chat_id: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  messages: [messageSchema]
});

const Conversation = mongoose.model('Conversation', conversationSchema);

module.exports = Conversation;
