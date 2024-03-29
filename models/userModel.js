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

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    recentlyPlayed: {
        type: [songSchema], // Array of objects using songSchema
        default: [] // Optional: set default value as empty array
    }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
