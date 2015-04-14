'use strict';

/**
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    Location = mongoose.model('Location'),
    _ = require('lodash');

/**
 * Location Methods
 */
exports.create = function(req, res) {
    var location = new Location(req.body);

    // save the location and check for errors
    location.save(function(err) {
        if (err) {
            // TODO: make sure this works as expected.
            return res.send(err);
        }

        res.json({ message: 'Location created!' });
    });
};

exports.list = function(req, res) {
    // grab list of slots from db
    Location.find(function(err, locations) {
        if (err) {
            return res.send(err);
        }

        res.json(locations);
    });
};

exports.read = function(req, res) {
    res.json(req.thisLocation);
};

exports.update = function(req, res) {
    var location = _.extend(req.thisLocation, req.body);

    location.save(function(err) {
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Location updated!' });
    });
};

exports.delete = function(req, res) {
    var location = req.thisLocation;

    location.remove(function(err) {
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Location deleted!' });
    });
};

/**
 * Middleware
 */
exports.locationById = function(req, res, next, id) {
    Location.findById(id).exec(function(err, location) {
        if (err) {
            return next(err);
        }
        if (!location) {
            return next(new Error('Failed to load location ' + id));
        }
        req.thisLocation = location;
        next();
    });
};
