var express = require('express');
    routes = require('./app/routes/index.js');
    mongoose = require('mongoose');
    passport = require('passport');
    session = require('express-session');
    bodyParser = require('body-parser');

var app = express();
require('dotenv').load();
require('./app/config/passport')(passport);

mongoose.connect(process.env.MONGO_URI);

app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secretClementine',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app, passport);

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'), function() {
  console.log('Clementine app listening on port ' + app.get('port'));
})
