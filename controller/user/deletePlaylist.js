const Playlist = require('../../models/playlistModel');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost/your_database', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Delete operation - Allows users to delete a playlist
app.delete('/api/playlists/:id', async (req, res) => {
    try {
      
        const Playlist = mongoose.model("Playlist");

        const playlist = await Playlist.findByIdAndRemove(req.params.id);

        if (!playlist) return res.status(404).send('Playlist not found');

        res.send({ status: true, message: "Playlist deleted successfully", data: playlist });
    } catch (error) {
        res.status(500).send({ status: false, error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
