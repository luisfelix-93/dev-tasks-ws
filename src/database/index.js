const mongoose = require('mongoose');
require('dotenv').config();

class Database {
    constructor() {

        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
          throw new Error('The MONGODB_URI environment variable is not set.');
        }

        mongoose.connect(mongoUri);
        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
        db.once('open', () => {
            console.log('Connected to MongoDB database');
          });
    };
};

module.exports = new Database();