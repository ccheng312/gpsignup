'use strict';

/**
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    Slot = mongoose.model('Slot'),
    moment = require('moment'),
    _ = require('lodash'),
    Promise = require('bluebird');

/**
 * Event Methods
 */
exports.create = function(req, res) {
    var signupEvent = new Event(req.body);

    // save the event and check for errors
    signupEvent.save(function(err, evt) {
        if (err) {
            // TODO: make sure this works as expected.
            return res.send(err);
        }
        Promise.map(generateSlots(signupEvent), function(slot) {
            return slot.save();
        })
        .then(function() {
            res.send(evt);
        })
        .catch(function() {
            res.status(500).send(err);
        });
    });
};

exports.list = function(req, res) {
    // grab list of slots from db
    Event.find(function(err, events) {
        if (err) {
            return res.send(err);
        }
        res.send(events);
    });
};

exports.read = function(req, res) {
    res.send(req.signupEvent);
};

exports.update = function(req, res) {
    var signupEvent = _.extend(req.signupEvent, req.body);

    signupEvent.save(function(err, evt) {
        if (err) {
            return res.send(err);
        }
        res.send(evt);
    });
};

exports.delete = function(req, res) {
    var signupEvent = req.signupEvent;

    Slot.remove({ slotEvent: signupEvent._id })
        .exec()
        .then(function() {
            signupEvent.remove(function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.send();
                }
            });
        }, function(err) {
            res.send(err);
        });
};

exports.getPublicSlots = function(req, res) {
    var queryParams = generateQueryParams(req);

    Slot.find(queryParams, '-people', function(err, slots) {
        if (err) {
            res.send(err);
        } else {
            res.send(slots);
        }
    });
};

exports.getAdminSlots = function(req, res) {
    var queryParams = generateQueryParams(req);

    Slot.find(queryParams)
        .exec(function (err, slots) {
            if (err) {
                return res.send(err);
            }
            res.send(slots);
        });
};

exports.adminList = function(req, res) {
    res.status(501).send({ error: 'not implemented'});
};

exports.signup = function(req, res) {
    var signupEvent = req.signupEvent;

    addSlotsForPerson(req);
    addSignupToSlots(req);
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
            return res.status(404).send({ message: 'Event not found.' });
        }
        req.signupEvent = signupEvent;
        next();
    });
};


/**
 * Helper Functions
 */

function addSlotsForPerson(req, signupEvent, person) {
    console.log("Update the person with slot information");
}

function addSignupToSlots(req, signupEvent) {
    console.log("Add person to each slot");

    // Here we want to loop through the request and add the person's info
}

function generateQueryParams(req) {
    var signupEvent = req.signupEvent;
    var queryParams = { slotEvent: signupEvent._id };

    if (req.query.slotLocation) {
        queryParams.slotLocation = req.query.slotLocation;
    }

    return queryParams;
}

function generateSlots(signupEvent) {
    var startDate = signupEvent.start;
    var endDate = signupEvent.end;
    var duration = moment.duration(signupEvent.duration, 'minutes');
    var slotTemplate = {
        startTime: null,
        capacity:  signupEvent.defaultCapacity,
        quantity: 0,
        enabled: true,
        slotLocation: null,
        slotEvent: signupEvent._id
    };
    var slots = [];

    var currentStartDate = moment(startDate);
    var currentEndDate = moment(endDate);
    currentEndDate.month(currentStartDate.month()).date(currentStartDate.date());

    for (var i = 0; i < signupEvent.locations.length; i++) {
        //Loop through each location so we do slots for each location
        slotTemplate.slotLocation = signupEvent.locations[i];
        while (!currentEndDate.isAfter(endDate, 'day')) {
            // While our current end date hasn't hit the final end date for the event
            while (currentStartDate.isBefore(currentEndDate)) {
                var slotParams = _.clone(slotTemplate);
                // While our current looping start time is before the day's end time
                slotParams.startTime = currentStartDate.clone().toDate();
                var newSlot = new Slot(slotParams);
                slots.push(newSlot);
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
    return slots;
}



