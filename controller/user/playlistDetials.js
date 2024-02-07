const Playlist = require('../../models/playlistModel');
// getPlaylist.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

app.get('/api/playlists/:id', async (req, res) => {
    try {
        // Assuming you have a Playlist model
        const Playlist = mongoose.model("Playlist");

        const playlist = await Playlist.findById(req.params.id);

        if (!playlist) return res.status(404).send('Playlist not found');

        res.send({ status: true, data: playlist });
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
