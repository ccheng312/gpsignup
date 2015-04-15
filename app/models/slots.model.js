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
    startTime: { type: Date },
    capacity: { type: Number, min: 0 },
    quantity: { type: Number, min: 0 },
    enabled: { type: Boolean },
    slotLocation: { type: Schema.Types.ObjectId, required: true, ref: 'Location'},
    slotEvent: { type: Schema.Types.ObjectId, required: true, ref: 'Event' }

});

mongoose.model('Slot', SlotSchema);
