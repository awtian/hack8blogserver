var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors')

var index = require('./routes/index');
var articles = require('./routes/articles')
var users = require('./routes/users')

var app = express();
var mongoose = require('mongoose');
 
app.use(cors())
mongoose.connect('mongodb://aku:ganteng@ds227168.mlab.com:27168/hacktivblog');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config()

app.use('/', index);
app.use('/articles', articles)
app.use('/users', users)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log('waduh ', err)
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
