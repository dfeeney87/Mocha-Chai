// *** main dependencies *** //
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');

// *** routes *** //
var routes = require('./routes/index.js');

// *** express instance *** //
var app = express();

// // *** config file *** //
var config = require('./_config');

var mongoURI = config.mongoURI[app.settings.env];
mongoose.connect(mongoURI, {useMongoClient:true});
var MongoDB = mongoose.connection 
// console.log(MongoDB);
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
  // console.log(MongoDB);
});


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));

// *** main routes *** //
app.use('/', routes);

// *** server config *** //
var server   = http.createServer(app);
server.listen(1337, function() {
  console.log("Node server running on http://localhost:1337");
});

module.exports = app;
