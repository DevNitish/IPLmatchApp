//Starting point of the app
var express =require('express');
var app =express();
var path =require('path');
var favicon = require('serve-favicon');
var bodyParser=require('body-parser');

var mainRoute = require('./server/routes/mainRoute.js'); //for routing
var teamRoute = require('./server/routes/teamRoute.js'); //for routing

var user = require('./server/models/user.js');


//connect to db
var mongoose = require('mongoose');
var config = require('./config/config'); // getting the mongo server from config file

//Connect to Mongo using mongoose
app.use(function(req, res, next) {
  if (mongoose.connection.readyState != 1) {
    mongoose.connect(config.mongoconnectionstring, function(error) {
      if (error) {
        console.log("error while connecting to mongo");
        throw error;
      } // Handle failed connection
      console.log('conn ready:  ' + mongoose.connection.readyState);
      next();
    });
  } else {
    next();
  }
});


//Use the requires
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); //for website icon
app.use(bodyParser.json());//Read and parse the data sent from HTML form
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', mainRoute);// use this file for all main API calls
app.use('/', teamRoute);// use this file for all team API calls

//This is for view handle bar
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//To set the view for client site
app.use(express.static(path.join(__dirname, 'public')));



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = app;
