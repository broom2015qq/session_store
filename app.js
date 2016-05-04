var express = require('express');

var session = require('express-session');
var cookieParser = require('cookie-parser');
var parseurl = require('parseurl');
var app = express();
// var FileStore = require('session-file-store')(session);
var myStore = require('./myStore')(session);
app.use(session({
    // store: new FileStore,
    secret: 'keyboard cat',
    resave: 'false',
    saveUninitialized: true,
    store: new myStore("sessions")
  })
);

app.get('/', function (req, res) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.end();
  } else {
    req.session.views = 1;
    res.end('Welcome to the file session demo. Refresh page!');
  }
});

app.listen(3000);

