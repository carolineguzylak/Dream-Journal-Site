const express = require('express');
const app = express();

// the '/' is if we are at localhost:5000/ 
// we are sending a get request to the root route
app.get('/', (req, res) => {
    res.send({hi: 'there'});
});



// this dynamically tells us which port we need to 
// be listening to according to Heroku
// BUT if a port hasn't been defined by Heroku,
// use 5000 as we are in a development environment
const PORT = process.env.PORT || 5000;

app.listen(PORT);