const express = require('express');
const app = express();
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

app.listen(3000, () => console.log('Listening at port 3000'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

// DataBase
db = new Datastore({ filename: './database.db' });
db.loadDatabase(function (err) {    
  console.log(err);
});

// GET Request Of Location Coordinates
app.get('/api', (request, response) => {
  db.find({}, (error, data) => {
    if(error) {
      response.end();
      return;
    } else {
      response.json(data);
    }
  }) 
})

// POST Request
app.post('/api', (request, response) => {
  console.log(request.body);
  const timestamp = Date.now();
  const {lat, lon} = request.body;
  const data = request.body;
  data.timestamp = timestamp;
  response.json({
    status: 'success',
    latitude: lat,
    longitude: lon,
    timestamp: timestamp
  })
  db.insert(request.body);
})

// Get Request Of Weather Data
app.get('/weather/:latlon', async (request, response) => {
  const api_key = process.env.API_KEY;
  const api_url = `https://api.darksky.net/forecast/${api_key}/${request.params.latlon}`;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
})