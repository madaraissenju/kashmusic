const Playlist = require('../../models/playlistModel');

const express = require('express');
const mongoose = require('mongoose');
const Joi = require('joi');

const app = express();
app.use(express.json());

// Validation function using Joi
const validatePlaylist = (playlist) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        user: Joi.string().required(), // Assuming user is a string (you may need to adjust based on your User model)
        desc: Joi.string().allow(""),
        songs: Joi.array().items(Joi.string()),
        img: Joi.string().allow("")
    });

    return schema.validate(playlist);
};

// Create operation - Allows users to create a playlist
app.post('/api/playlists', async (req, res) => {
    try {
        const { error } = validatePlaylist(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const playlist = new Playlist(req.body);
        await playlist.save();

        res.status(201).send({ status: true, message: "Playlist created successfully", data: playlist });
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
});

