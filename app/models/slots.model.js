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
    enabled: { type: Boolean },
    location: { type: Schema.Types.ObjectId, required: true, ref: 'Location'},
    slot_event: { type: Schema.Types.ObjectId, required: true, ref: 'Event' }

});

mongoose.model('Slot', SlotSchema);
