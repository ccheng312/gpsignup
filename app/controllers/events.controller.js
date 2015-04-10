'use strict';

/**
 * Module Dependencies
 */
var Event = require('../models/events.model');


/**
 * Event Methods
 */
exports.create = function(req, res) {
    // create a new slot in db
     var signupEvent = new Event();      // create a new instance of the Event model
     signupEvent.name = req.body.name;
     signupEvent.description = req.body.description;
     signupEvent.enabled = req.body.enabled;

    // save the event and check for errors
    signupEvent.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Event created!' });
    });

};

exports.list = function(req, res) {
    // grab list of slots from db
    Event.find(function(err, events) {
        if (err)
            res.send(err);

        res.json(events);
    });
};


exports.single = function(req, res) {
    Event.findById(req.params.event_id, function(err, signupEvent) {
        if (err)
            res.send(err);
        res.json(signupEvent);
    });
};

exports.update = function(req, res) {
    // use our event model to find the event we want
    Event.findById(req.params.event_id, function(err, signupEvent) {
        if (err) {
            res.send(err);
        }

        signupEvent.name = req.body.name;
        signupEvent.description = req.body.description;
        signupEvent.enabled = req.body.enabled;

        // save the event
        signupEvent.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Event updated!' });
        });
    });
}