'use strict';

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// Set the environment
if (!process.env.NODE_ENV) {
    console.log('No environment found! Will use dev environment.');
    process.env.NODE_ENV = 'development';
}
console.log('App environment: ' + process.env.NODE_ENV);
var config = require('./config')(process.env.NODE_ENV);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure mongoose to connect to mongodb
mongoose.connect(config.db, function(err) {
    if (err) {
        console.error('Could not connect to MongoDB!');
        console.log(err);
    } else {
        console.log("Connection success to MongoDB");
    }
});

// Register models and routes
require('./app/models');
require('./app/routes')(app);

// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Started server on port ' + config.port);
