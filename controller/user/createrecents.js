// routes/createrecents.js
const express = require('express');
const router = express.Router();
const User = require("../../models/userModel");

const createRecents = async (req, res) => {
    try {
        const { userId } = req.params;
        const { songName, songId, songImageUrl } = req.body;

        console.log("User ID:", userId);
        console.log("Song Name:", songName);
        console.log("Song ID:", songId);
        console.log("Song Image URL:", songImageUrl);

        if (!userId || !songName || !songId || !songImageUrl) {
            return res.status(400).json({ error: 'Invalid request. Please provide userId, songName, songId, and songImageUrl.' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const track = {
            songName,
            songId,
            songImageUrl,
        };

        user.recentlyPlayed.unshift(track);
        user.recentlyPlayed = user.recentlyPlayed.slice(0, 20);

        await user.save();

        res.status(201).json({ message: 'Track added to recently played.' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = createRecents;
