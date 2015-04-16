'use strict';

/**
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    Slot = mongoose.model('Slot'),
    _ = require('lodash');


/**
 * Slot Methods
 */
exports.create = function(req, res) {
    var slot = new Slot(req.body);

    // save the slot and check for errors
    slot.save(function(err, slot) {
        if (err) {
            // TODO: make sure this works as expected.
            return res.send(err);
        }
        res.send(slot);
    });
};

exports.list = function(req, res) {
    // grab list of slots from db
    Slot.find(function(err, slots) {
        if (err) {
            return res.send(err);
        }

        res.send(slots);
    });
};

exports.read = function(req, res) {
    res.send(req.slot);
};

exports.update = function(req, res) {
    var slot = _.extend(req.slot, req.body);

    slot.save(function(err, slot) {
        if (err) {
            return res.send(err);
        }
        res.send(slot);
    });
};

exports.delete = function(req, res) {
    var slot = req.slot;

    slot.remove(function(err) {
        if (err) {
            return res.send(err);
        }
        res.send();
    });
};

/**
 * Middleware
 */
exports.slotById = function(req, res, next, id) {
    Slot.findById(id).exec(function(err, slot) {
        if (err) {
            return next(err);
        }
        if (!slot) {
            return next(new Error('Failed to load slot ' + id));
        }
        req.slot = slot;
        next();
    });
};
