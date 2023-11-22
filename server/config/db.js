const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

// Event listeners for MongoDB connection events
db.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});