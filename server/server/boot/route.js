module.exports = function (app) {
  var passportFacebook = require('../auth/facebook');
  var passportGoogle = require('../auth/google');

  app.get('/facebook', passportFacebook.authenticate('facebook', {
      scope: ["email"]
  }));
  app.get('/google',passportGoogle.authenticate('google', {
    scope: ["email", "profile"],
  }));

  app.get('/facebook/callback',
  passportFacebook.authenticate('facebook', {
    failureRedirect: 'http://localhost:3000',
    session: false
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    // console.log(req.user);
    
    res.redirect('http://localhost:8080/login?userdata=' + JSON.stringify(req.user));
  });

  app.get('/google/callback',
    passportGoogle.authenticate('google', {
      failureRedirect: 'http://localhost:8080/login',
      session: false
    }),
    function(req, res) {
      // console.log(req.user);
      res.redirect('http://localhost:8080/login?userdata=' + JSON.stringify(req.user));
    });
}