// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 2004; // Change the port to 3000, as 27017 is the MongoDB port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Snackers-Republic');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//... rest of the code remains the same

// Schema and Model
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

const { MongoClient } = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017', {
  // Remove these options
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});
// Sign In Route
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});