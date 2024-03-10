// oauth2.js

const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const Account = require('./account');
const credentials = require('./credentials');

module.exports = function () {
  passport.use(new GoogleStrategy({
    clientID: credentials.google.clientID,
    clientSecret: credentials.google.clientSecret,
    callbackURL: credentials.google.callbackURL,
  }, (token, tokenSecret, profile, done) => {
      // Use findOneAndUpdate to create or update the user
      Account.findOneAndUpdate(
        { email: profile.emails[0].value },
        { $setOnInsert: { username: profile.displayName, email: profile.emails[0].value } },
        { upsert: true, new: true },
        (err, user) => {
          if (err) {
            return done(err);
          }
          return done(null, user);
        }
      );
    }
  ));
};