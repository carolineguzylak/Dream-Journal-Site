// this dynamically tells us which port we need to 
// be listening to according to Heroku
// BUT if a port hasn't been defined by Heroku,
// use 5000 as we are in a development environment
const PORT = process.env.PORT || 5000;

const express = require('express');
const app = express();

app.use(express.static('client'))

// the '/' is if we are at localhost:5000/ 
// we are sending a get request to the root route
// app.get('/', (req, res) => {
//     // res.send({bye: 'see you soon!'});
//     res.render('index.html');
// });




app.listen(PORT);