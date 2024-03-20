const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    songName: {
        type: String,
        required: true
    },
    songId: {
        type: String,
        required: true
    },
    songImageUrl: {
        type: String,
        required: true
    }
});

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who created the playlist
        required: true
    },
    songs: {
        type: [songSchema], // Array of objects using songSchema
        default: [] // Optional: set default value as empty array
    }
}, { timestamps: true });

module.exports = mongoose.model("Playlist", playlistSchema);
