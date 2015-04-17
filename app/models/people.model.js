'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Slot Schema
 */
var PersonSchema = new Schema({
    firstName: { type: String, required: true, maxlength: 30 },
    lastName: { type: String, required: true, maxlength: 30 },
    email: { type: String, required: true, maxlength: 100 },
    phone: { type: String, required: true, min: 10, max:14 },
    personCode: { type: String, maxlength: 100 },
    slots: [{
                slot: {type: Schema.Types.ObjectId, ref: 'Slot'},
                slotEvent: {type: Schema.Types.ObjectId, ref: 'Event'},
                comment: {type: String, maxLength: 100},
                approved: {type: Boolean, default: false}
            }]
});

mongoose.model('Person', PersonSchema);