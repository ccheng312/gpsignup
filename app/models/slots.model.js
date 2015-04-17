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
    slotEvent: { type: Schema.Types.ObjectId, required: true, index: true, ref: 'Event' },
    people: [{
                person: {type: Schema.Types.ObjectId, ref: 'Person'},
                comment: {type: String, maxLength: 100},
                approved: {type: Boolean, default: false }
            }]
});

mongoose.model('Slot', SlotSchema);
