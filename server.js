const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const route = require('./routes/route'); 
const { default: mongoose } = require('mongoose');
const app = express();
const axios = require('axios');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_CONNECTION_STRING,
 { useNewUrlParser: true})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});