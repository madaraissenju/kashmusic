const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type: String,
        required : [true, "email is required"]
    },
    password : {
        type : String,
        required : [true, "password is required"]
    }
},{timestamps: true})


module.exports = mongoose.model("Admin", adminSchema);