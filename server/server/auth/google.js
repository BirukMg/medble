var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var app = require('../../server/server');
var models = app.models;
var User;
var Account;

passport.use(new GoogleStrategy({
    provider: "google",
    module: "passport-google-oauth",
    strategy: "OAuth2Strategy",
    clientID: "899959220840-rf1mooqvfenn36b9i4e6rdv96h8l77uu.apps.googleusercontent.com",
    clientSecret: "XcK0rwbM7fP5XIJKibuUzOHD",
    callbackURL: "/google/callback",
    authPath: "/google",
    callbackPath: "/google/callback",
    successRedirect: "/account",
    failureRedirect: "/login",
    scope: ["email", "profile"],
    failureFlash: true
  },
  function(accessToken, refreshToken, profile, done) {
      // done(null,profile);
      let user = {
        username: 'username@' + profile.id,
        password: 'pass@' + profile.id,
        email: profile._json.email,
        socialId: profile.id
      };
      User = models.Medbleuser;
      Account = models.Account;
      User.findOrCreate({where: {socialId : profile.id}}, user, function(err, userData){
        // return done('err', profile._json);
        if (err) {
          return done(null, {message: 'Email already used'});
        } else {
          let account = {
            full_name: profile._json.name,
            username: user.username,
            email: user.email,
            password: user.password,
            img: profile._json.picture,
            medbleuser_id: userData.id
          }
          Account.findOrCreate({where: {medbleuser_id: userData.id}}, account, function(err, accountData){
            if (err) {
              done(err)
            } else {
              done(null, {
                user_id: accountData.id 
              })
            }
          })
        }
      });
  }
));

module.exports = passport;