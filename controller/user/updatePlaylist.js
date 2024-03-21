    const Playlist = require('../../models/playlistModel');
    const express = require('express');
    const mongoose = require('mongoose');
    const Joi = require('joi');

    const app = express();
    app.use(express.json());

    // Update operation - Allows users to update a playlist
    app.put('/api/playlists/:id', async (req, res) => {
        try {
            const { error } = validatePlaylist(req.body);
            if (error) return res.status(400).send(error.details[0].message);

            const playlist = await Playlist.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            if (!playlist) return res.status(404).send('Playlist not found');

            res.send({ status: true, message: "Playlist updated successfully", data: playlist });
        } catch (error) {
            res.status(500).send({ status: false, error: error.message });
        }
    });