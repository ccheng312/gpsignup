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

router.route('/slots/:slotId')
    // get the slot with that id (accessed at GET /api/slots/:slotId)
    .get(slots.read)
    // update the slot with that id (accessed at PUT /api/slots/:slotId)
    .put(slots.update)
    .delete(slots.delete);

// This middleware makes the slot available as req.slot when you supply slotId
router.param('slotId', slots.slotById);

module.exports = router;
