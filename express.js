// this dynamically tells us which port we need to 
// be listening to according to Heroku
// BUT if a port hasn't been defined by Heroku,
// use 5000 as we are in a development environment
const PORT = process.env.PORT || 5000;


// If any of these modules are not found, run 
// npm install module_name
// in the console 
var mysql = require('mysql');
var path = require('path');
const express = require('express');
// body parser allows us to interact with form data
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// // this provides css styling
app.use(express.static('public'));
// because we use public as the static root, the 
// srcs and hrefs must use paths without public at the beginning,
// since we have already set public as the root.
// That's why there are two versions of hookups for css and js
// files in fiels like index.html, so the static files can be accessed
// in both the express server and the live vscode server for testing.
// for details: https://expressjs.com/en/starter/static-files.html


app.use(bodyParser.urlencoded({
    extended: false
})); 
app.use(bodyParser.json()); 

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'DREAMS'
}); 
 
// welcomepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/welcome.html');
});

// login route 
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/auth', (req, res) => {
    var email = req.body.email;
	var password = req.body.password;

    var user = {
        email: email,
        password: password
    };

    // USE THIS FOR MAKE ACCOUNT PAGE!! INSERTS NEW LOGINS
    // if (email && password) {
    //     var query = connection.query('insert into Logins set ?', user, function (err, result) {
    //         if (err) {
    //           console.error(err);
    //           return;
    //         }
    //         console.error(result);
    //     });
    // } else {
    //     response.send('Please enter Email and Password!');
    //     response.end();
    // }

	if (email && password) {
		connection.query('SELECT * FROM Logins WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			if (results.length > 0) {
				// request.session.loggedin = true;
				// request.session.username = username;
				res.redirect('/home');
                // res.sendFile(__dirname + '/mainpage/index.html');
                // res.send("logged in!");
			} else {
				res.send('Incorrect Email and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Email and Password!');
		res.end();
	}
});


//main page
app.get('/home', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT);