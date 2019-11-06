var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../common/models/account');

passport.use(new GoogleStrategy({
    clientID: "899959220840-rf1mooqvfenn36b9i4e6rdv96h8l77uu.apps.googleusercontent.com",
    clientSecret: "XcK0rwbM7fP5XIJKibuUzOHD",
    callbackURL: "http://127.0.0.1:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

module.exports = passport;