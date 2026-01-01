const express = require('express');
const path = require('path');

// Load config (server-side only - never exposed to client)
const FRIENDS_CONFIG = require('./config.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(express.json());

// Block access to config.js - this file should NEVER be served to the client
app.get('/config.js', (req, res) => {
    res.status(403).json({ error: 'Access denied' });
});

// API endpoint for login - validates credentials and returns only the matching user's data
app.post('/api/login', (req, res) => {
    const { firstName, lastName, password } = req.body;

    if (!firstName || !lastName || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find matching friend (supports individuals and families with different last names)
    const friend = FRIENDS_CONFIG.friends.find(f => {
        const passwordMatch = f.password === password;

        // Check if this is the first person
        const isPerson1 =
            f.firstName.toLowerCase() === firstName.toLowerCase() &&
            f.lastName.toLowerCase() === lastName.toLowerCase();

        // Check if this is the second person (for families/couples)
        const isPerson2 = f.firstName2 &&
            f.firstName2.toLowerCase() === firstName.toLowerCase() &&
            (f.lastName2
                ? f.lastName2.toLowerCase() === lastName.toLowerCase()
                : f.lastName.toLowerCase() === lastName.toLowerCase());

        return passwordMatch && (isPerson1 || isPerson2);
    });

    if (friend) {
        // Return only the matched user's data (without the password!)
        const safeUserData = {
            firstName: friend.firstName,
            lastName: friend.lastName,
            nickname: friend.nickname || null,
            firstName2: friend.firstName2 || null,
            lastName2: friend.lastName2 || null,
            nickname2: friend.nickname2 || null,
            finalMessage: friend.finalMessage,
            memories: friend.memories || []
        };

        res.json({
            success: true,
            user: safeUserData,
            senderName: FRIENDS_CONFIG.senderName
        });
    } else {
        res.status(401).json({
            success: false,
            error: 'Invalid credentials. Please check your name and password.'
        });
    }
});

// Serve static files (excluding config.js which is blocked above)
app.use(express.static(__dirname, {
    index: 'index.html'
}));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🎉 New Year Greeting App running on port ${PORT}`);
    console.log(`🔒 Config.js is protected - only authenticated users can see their own data`);
});
