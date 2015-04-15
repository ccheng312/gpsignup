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

    Slot.find({ slotEvent: signupEvent._id })
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
    var startDate = signupEvent.start;
    var endDate = signupEvent.end;
    var duration = moment.duration(signupEvent.duration, 'minutes');
    var slotParams = {
        startTime: null,
        capacity:  signupEvent.defaultCapacity,
        quantity: 0,
        enabled: true,
        slotLocation: null,
        slotEvent: signupEvent._id
    };

    var currentStartDate = moment(startDate);
    var currentEndDate = moment(endDate);
    currentEndDate.month(currentStartDate.month()).date(currentStartDate.date());

    for (var i = 0; i < signupEvent.locations.length; i++) {
        //Loop through each location so we do slots for each location
        slotParams.slotLocation = signupEvent.locations[i];
        while (!currentEndDate.isAfter(endDate, 'day')) {
            // While our current end date hasn't hit the final end date for the event
            while (currentStartDate.isBefore(currentEndDate)) {
                // While our current looping start time is before the day's end time
                slotParams.startTime = currentStartDate.clone().toDate();
                var newSlot = new Slot(slotParams);
                newSlot.save(function(err) {
                    if (err) {
                    // TODO: make sure this works as expected.
                        return res.send(err);
                    }
                });
                // Add the duration to our next slot time
                currentStartDate.add(duration);
            }
            // Reset the start time back to original time
            currentStartDate.hours(startDate.getHours()).minutes(startDate.getMinutes());
            // Increase the start and end dates by 1 day to get to next day
            currentStartDate.add(1, 'days');
            currentEndDate.add(1, 'days');
        }
        // Hard reset of current start and end date to original values
        currentStartDate = moment(startDate);
        currentEndDate = moment(endDate);
        currentEndDate.month(currentStartDate.month()).date(currentStartDate.date());
    }
 }



