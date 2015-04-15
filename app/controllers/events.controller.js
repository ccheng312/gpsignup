'use strict';

/**
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    Slot = mongoose.model('Slot'),
    moment = require('moment'),
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
    var duration = moment.duration(signupEvent.duration, 'minutes');
    var slot_params = {
        start_time: null,
        capacity:  signupEvent.default_capacity,
        quantity: 0,
        enabled: true,
        slot_location: null,
        slot_event: signupEvent._id
    };

    var current_start_date = moment(start_date);
    var current_end_date = moment(end_date);
    current_end_date.month(current_start_date.month()).date(current_start_date.date());

    for (var i = 0; i < signupEvent.locations.length; i++) {
        //Loop through each location so we do slots for each location
        slot_params.slot_location = signupEvent.locations[i];
        while (!current_end_date.isAfter(end_date, 'day')) {
            // While our current end date hasn't hit the final end date for the event
            while (current_start_date.isBefore(current_end_date)) {
                // While our current looping start time is before the day's end time
                slot_params.start_time = current_start_date.clone().toDate();
                var newSlot = new Slot(slot_params);
                newSlot.save(function(err) {
                    if (err) {
                    // TODO: make sure this works as expected.
                        return res.send(err);
                    }
                });
                // Add the duration to our next slot time
                current_start_date.add(duration);
            }
            // Reset the start time back to original time
            current_start_date.hours(start_date.getHours()).minutes(start_date.getMinutes());
            // Increase the start and end dates by 1 day to get to next day
            current_start_date.add(1, 'days');
            current_end_date.add(1, 'days');
        }
        // Hard reset of current start and end date to original values
        current_start_date = moment(start_date);
        current_end_date = moment(end_date);
        current_end_date.month(current_start_date.month()).date(current_start_date.date());
    }
 }



