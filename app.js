// app.js

const express = require('express');
const passport = require('passport');
const session = require("express-session");
const configureSecurity = require('./controllers/security.js');
const configureOAuth2 = require('./models/oauth2.js');

const app = express();
let bodyParser = require('body-parser')


// Mongoose and db setup
require('./models/db.js');

// User defined middleware and controllers (route implementations)
const login = require('./controllers/login.js');
const middleware = require("./lib/middleware.js");
const credentials = require('./models/credentials.js');

// set up handlebars view engine
let handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 80);

// Set up sessions
app.use(session({ resave: false, saveUninitialized: false, secret: credentials.cookieSecret}));

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

// Configure security settings using custom middleware
configureSecurity(app);

// Configure Google OAuth2 strategy
configureOAuth2();

// Configure passport-local to use account model for authentication
const Account = require('./models/account');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

app.use(express.static(__dirname + '/public'));

// Configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Main routes
// Home page
app.get('/', middleware.loginRequired, function(req, res) {
	res.render('home'); 
});

// Login and register pages
app.get('/login', login.login);
app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureMessage: true}), login.processLogin);
app.get('/register', login.register);
app.post('/register', login.processRegister);

// Logout route
app.post('/logout', login.logout);

// Google OAuth2 routes
app.get('/auth/google', login.processGoogleLogin);
app.get('/auth/google/callback', login.processGoogleCallback);

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
