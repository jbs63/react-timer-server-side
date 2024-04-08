const express = require('express');
const passport = require('passport');
const session = require("express-session");
const configureSecurity = require('./controllers/security.js');

const app = express();
let bodyParser = require('body-parser')

// Mongoose and db setup
require('./models/db.js');

// User defined middleware and controllers (route implementations)
const main = require ('./controllers/main.js')
const login = require('./controllers/login.js');
const credentials = require('./models/credentials.js');

app.set('port', process.env.PORT || 3000);

// Set up sessions
app.use(session({ resave: false, saveUninitialized: false, secret: credentials.cookieSecret}));

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

// Configure security settings using custom middleware
configureSecurity(app);

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

// Profile page
app.get('/', main.root);
app.get('/times', main.getShotTimes);
app.post('/times', main.addTime);

// Login and register pages
app.post('/login', passport.authenticate('local', { failureMessage: true}), login.processLogin);
app.post('/register', login.processRegister);

// Logout route
app.post('/logout', login.logout);

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});