// index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');

// const messageRouter = require('./routes/');
const conversationRouter = require('./routes/conversation'); 


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/chatbot', conversationRouter);

// Define routes and controllers (sample route)
app.get('/', (req, res) => {
    res.json({ message: 'Welcome !' });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
