const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recentSchema = new Schema({
    songName : {
        type : String
    },
    songId : {                                                  
        type: String,
    
    },
    songImageUrl : {
        type : String,
       
    }
},{timestamps: true})


module.exports = mongoose.model("recent", recentSchema);
