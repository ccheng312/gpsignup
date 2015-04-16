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
    startTime: { type: Date, required: true },
    capacity: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    enabled: { type: Boolean, default: true },
    slotLocation: { type: String, required: true, maxlength: 50 },
    slotEvent: { type: Schema.Types.ObjectId, required: true, index: true, ref: 'Event' }

});

mongoose.model('Slot', SlotSchema);
