const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const route = require('./routes/route'); 
const { default: mongoose } = require('mongoose');
const app = express();
const axios = require('axios');

const options = {
  method: 'POST',
  url: 'https://http-cors-proxy.p.rapidapi.com/',
  headers: {
    'content-type': 'application/json',
    Origin: 'www.example.com',
    'X-Requested-With': 'www.example.com',
    'X-RapidAPI-Key': '04dd3eae32msha771e2cd5999624p1f092cjsn6c48802a5994',
    'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
  },
  data: {
    url: 'https://jiosavvan.vercel.app/playlists?id={ID}',
    method: 'POST',
    body: {
      title: 'foo',
      body: 'bar',
      userId: '1'
    },
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }
};

try {
	const response = axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

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