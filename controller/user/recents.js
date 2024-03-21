// routes/recentlyPlayed.js
const express = require('express');
const router = express.Router();
const User = require('../../models/songs');
const UserModel = require("../../models/userModel");
const mongoose = require('mongoose');


const recent = async (req, res) => {
    try {
    const { userId } = req.params;

    // Assuming you have a User model with a "recentlyPlayed" array
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Return only the last 20 songs
    const recentlyPlayed = user.recentlyPlayed.slice(0, 20);

    res.json(recentlyPlayed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
    console.error(error);
    res.status(500).json({ error: 'Server Error'});

};
module.exports = recent;