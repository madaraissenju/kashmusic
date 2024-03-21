
const express = require('express');
const router = express.Router();
const User = require("../../models/userModel");
const mongoose = require('mongoose');

const createrecents = async (req,res) => {
    try {
      const { userId } = req.params;
  console.log(userId)
      const { songName, songId, songImageUrl } = req.body;
  
      if (songName && songId && songImageUrl) {
        const user = await User.findOne({ _id: userId });
       // const user = await User.findById(userId);
  console.log(user)
        if (!user) {
          return res.status(404).json({ error: 'User not found.' });
        }
  
        // Create a new track object
        const track = {
          songName,
          songId,
          songImageUrl,
        };
  
        // Add the track to recently played
        user.recentlyPlayed.unshift(track);
  
        // Keep only the last 20 tracks
        user.recentlyPlayed = user.recentlyPlayed.slice(0, 20);
  
        // Save the user
        await user.save();
  
        res.status(201).json({ message: 'Track added to recently played.' });
      } else {
        res.status(400).json({ error: 'Invalid request. Please provide songName, songId, and songImageUrl.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };

module.exports = createrecents;