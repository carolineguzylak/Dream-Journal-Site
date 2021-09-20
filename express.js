// this dynamically tells us which port we need to 
// be listening to according to Heroku
// BUT if a port hasn't been defined by Heroku,
// use 5000 as we are in a development environment
const PORT = process.env.PORT || 5000;


// If any of these modules are not found, run 
// npm install module_name
// in the console 
var mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
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


// THIS OPENS THE STATIC WEBPAGE
// has the same function as res.sendFile('client/index.html')
// in app.get
// app.use(express.static('mainpage'))

// welcomepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/welcomepage/welcome.html');
});

// login route
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login/login.html');
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
				res.redirect('/');
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



app.listen(PORT);