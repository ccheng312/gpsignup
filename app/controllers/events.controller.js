'use strict';

/**
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    Slot = mongoose.model('Slot'),
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
        generateSlots(signupEvent);
        res.json({
            message: 'Event created!',
            id: signupEvent._id
        });
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

exports.getSlots = function(req, res) {
    var signupEvent = req.signupEvent;

    Slot.find({ slot_event: signupEvent._id })
        .exec(function (err, slots) {
            if (err) {
                return res.send(err);
            }
            res.json(slots);
        });
};

/**
 * Middleware
 */
exports.eventById = function(req, res, next, id) {
    Event.findById(id).exec(function(err, signupEvent) {
        if (err) {
            return next(err);
        }
        if (!signupEvent) {
            return next(new Error('Failed to load event ' + id));
        }
        req.signupEvent = signupEvent;
        next();
    });
};


/**
 * Helper Functions
 */

 function generateSlots(signupEvent) {
    var start_date = signupEvent.start;
    var end_date = signupEvent.end;
    var duration = signupEvent.duration;
    var slot_params = {
        start_time: null,
        capacity:  signupEvent.default_capacity,
        quantity: 0,
        enabled: true,
        slot_location: null,
        slot_event: signupEvent._id
    };

    var current_start_date = new Date(start_date);
    var current_end_date = new Date(end_date);
    current_end_date.setMonth(start_date.getMonth());
    current_end_date.setDate(start_date.getDate());

    for (var i = 0; i < signupEvent.locations.length; i++) {
        slot_params.slot_location = signupEvent.locations[i];
        while (current_end_date <= end_date) {
            while (current_start_date < current_end_date) {
                slot_params.start_time = new Date(current_start_date);
                var newSlot = new Slot(slot_params);
                newSlot.save(function(err) {
                    if (err) {
                    // TODO: make sure this works as expected.
                        return res.send(err);
                    }
                });
                current_start_date.setMinutes(current_start_date.getMinutes() + duration);
            }
            current_start_date.setDate(current_start_date.getDate() + 1);
            current_start_date.setHours(start_date.getHours(), start_date.getMinutes());
            current_end_date.setDate(current_end_date.getDate() + 1);
        }
        current_start_date = new Date(start_date);
        current_end_date = new Date(end_date);
        current_end_date.setMonth(start_date.getMonth());
        current_end_date.setDate(start_date.getDate());
    }
 }



