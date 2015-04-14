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
    first_name: { type: String, maxlength: 30 },
    last_name: { type: String, maxlength: 30 },
    email: { type: String, maxlength: 100 },
    phone: { type: String, min: 10, max:14 },
    person_code: { type: String, maxlength: 100 }
});

mongoose.model('Person', PersonSchema);