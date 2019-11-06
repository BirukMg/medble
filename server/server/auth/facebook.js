var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var app = require('../../server/server');
var models = app.models;
// const Cryptr = require('cryptr');
var User;
var Account;

var id;
passport.use(new FacebookStrategy({
    provider: "facebook",
    module: "passport-facebook",
    profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'name'],
    clientID: "808346952916402",
    clientSecret: "0d6980a0e4347bd5b8d6461b5ff86ac0",
    callbackURL: "/facebook/callback",
    authPath: "/facebook",
    callbackPath: "http://localhost:3000",
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login",
    failureFlash: true
  },
  function(accessToken, refreshToken, profile, done) {
    

    // done(null,profile._json);
    let user = {
      username: 'username@' + profile.id,
      password: 'pass@' + profile.id,
      email: profile._json.email,
      socialId: profile.id
    };
    User = models.Medbleuser;
    Account = models.Account
    User.findOrCreate({where: {socialId : profile.id}}, user, function(err, userData){
      // return done('err', profile._json);
      if (err) {
        return done(null, {message: 'Email already used'});
      } else {
        let account = {
          full_name: profile._json.first_name + ' ' + profile._json.last_name,
          username: user.username,
          email: user.email,
          password: user.password,
          img: profile._json.picture.data.url,
          medbleuser_id: userData.id
        }
        Account.findOrCreate({where: {medbleuser_id: userData.id}}, account, function(err, accountData){
          if (err) {
            console.log(err);
            
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