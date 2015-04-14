'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Slot Schema
 */
var SlotSchema = new Schema({
    start_time: { type: Date },
    end_time: { type: Date },
    capacity: { type: Number, min: 0 },
    quantity: { type: Number, min: 0 },
    enabled: { type: Boolean }
    // Need some foreign key into the event it's part of and the location

});

mongoose.model('Slot', SlotSchema);
