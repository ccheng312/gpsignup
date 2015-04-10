'use strict';

/**
 * Module Dependencies
 */
var express = require('express');
var slots = require('../controllers/slots.controller');


/**
 * Slot Routes
 */
var router = express.Router();

router.route('/slots')
    .get(slots.list)
    .post(slots.create);

module.exports = router;
