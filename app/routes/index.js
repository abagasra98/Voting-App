var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function(app, passport) {
  var clickHandler = new ClickHandler();
  var pollHandler = new PollHandler();

  app.route('/')
      .get(isLoggedIn, function(req, res) {
        res.sendFile(path + '/public/index.html');
      })

  app.route('/login')
      .get(function(req, res) {
        res.sendFile(path + '/public/login.html');
      });

  app.route('/logout')
      .get(function(req, res) {
        req.logout();
        res.redirect('/login');
      });

  app.route('/profile')
      .get(isLoggedIn, function(req, res) {
        res.sendFile(path + '/public/profile.html');
      });

  app.route('/api/user/:id')
      .get(isLoggedIn, function(req, res) {
        res.json(req.user.twitter);
      });

  app.route('/api/poll/')
      .get(isLoggedIn, pollHandler.getPoll);

  app.route('/auth/twitter')
      .get(passport.authenticate('twitter'));

  app.route('/auth/twitter/callback')
      .get(passport.authenticate('twitter', {
        successRedirect: '/',
        failureRedirect: '/login'
      }));

  app.route('/api/:id/clicks')
      .get(isLoggedIn, clickHandler.getClicks)
      .post(isLoggedIn, clickHandler.addClick)
      .delete(isLoggedIn, clickHandler.resetClicks);

  app.route('/api/clicks')
      .get(clickHandler.getClicks)
      .post(clickHandler.addClick)
      .delete(clickHandler.resetClicks);

  app.route('/newpoll')
      .get(function(req, res) {
        res.sendFile(path + '/public/newPoll.html');
      })
      .post(pollHandler.createNewPoll);

  app.route('/polls')
      .get(isLoggedIn, function(req, res) {
        res.sendFile(path + '/public/pollList.html');
      })

  app.route('/poll')
      .get(isLoggedIn, function(req, res) {
        res.sendFile(path + '/public/poll.html');
      })
      .post(pollHandler.recordVote);

  app.route('*')
      .get(function(req, res) {res.sendFile(path + '/public/404.html')});

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    else
      res.redirect('/login');
  }
}
