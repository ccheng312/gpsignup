'use strict';

/**
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    _ = require('lodash');

/**
 * Event Methods
 */
exports.create = function(req, res) {
    var signupEvent = new Event(req.body);

    // save the event and check for errors
    signupEvent.save(function(err) {
        if (err) {
            // TODO: make sure this works as expected.
            return res.send(err);
        }

        res.json({ message: 'Event created!' });
    });
};

exports.list = function(req, res) {
    // grab list of slots from db
    Event.find(function(err, events) {
        if (err) {
            return res.send(err);
        }

        res.json(events);
    });
};

exports.read = function(req, res) {
    res.json(req.signupEvent);
};

exports.update = function(req, res) {
    var signupEvent = _.extend(req.signupEvent, req.body);

    signupEvent.save(function(err) {
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Event updated!' });
    });
};

exports.delete = function(req, res) {
    var signupEvent = req.signupEvent;

    signupEvent.remove(function(err) {
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Event deleted!' });
    });
};

/**
 * Middleware
 */
exports.eventById = function(req, res, next, id) { Event.findById(id).exec(function(err, signupEvent) {
        if (err) { return next(err); }
        if (!signupEvent) { return next(new Error('Failed to load event ' + id)); }
        req.signupEvent = signupEvent;
        next();
    });
};
