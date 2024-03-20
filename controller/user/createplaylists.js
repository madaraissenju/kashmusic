const Playlist = require("../../models/playlistModel");

const createPlaylist = async (req, res) => {
    try {
        const { name, description, createdBy } = req.body;
        
        const playlist = new Playlist({
            name,
            description,
            createdBy
        });

        await playlist.save();

        res.status(201).json({ message: 'Playlist created successfully', playlist });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = { createPlaylist };
