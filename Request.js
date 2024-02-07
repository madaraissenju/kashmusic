const mongoose = requrie('mongoose');
const axios = require('axios');
const options = {
    method: 'GET',
    url: 'https://http-cors-proxy.p.rapidapi.com/',
    headers: {
      'content-type': 'application/json',
      Origin: 'www.example.com',
      'X-Requested-With': 'www.example.com',
      'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
      'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com'
    },
    data: {
      url: 'https://jiosavvan.vercel.app/playlists?id={ID}'
    }
  };
  
  try {
      const response = await axios.request(options);
      console.log(response.data);
  } catch (error) {
      console.error(error);
  }
  