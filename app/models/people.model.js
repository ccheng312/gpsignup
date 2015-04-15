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
    firstName: { type: String, maxlength: 30 },
    lastName: { type: String, maxlength: 30 },
    email: { type: String, maxlength: 100 },
    phone: { type: String, min: 10, max:14 },
    personCode: { type: String, maxlength: 100 }
});

mongoose.model('Person', PersonSchema);