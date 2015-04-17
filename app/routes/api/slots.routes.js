'use strict';

/**
 * Module Dependencies
 */
var express = require('express');
var slots = require('../../controllers/slots.controller');


/**
 * Slot Routes
 */
var router = express.Router();

router.route('/slots/:slotId')
    // get the slot with that id (accessed at GET /api/slots/:slotId)
    .get(slots.read)


// This middleware makes the slot available as req.slot when you supply slotId
router.param('slotId', slots.slotById);

module.exports = router;
