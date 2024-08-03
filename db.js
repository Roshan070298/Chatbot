// db.js
const mongoose = require('mongoose');
const properties = require('./config');

const env = 'local';
const { dbUri } = properties[env];

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));

module.exports = { db};
