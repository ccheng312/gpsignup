'use strict';

/**
 * Module Dependencies
 */
var express = require('express');
var people = require('../controllers/people.controller');


/**
 * Slot Routes
 */
var router = express.Router();

router.route('/people')
    .get(people.list)
    .post(people.create);

router.route('/people/:personId')
    // get the person with that id (accessed at GET /api/people/:personId)
    .get(people.read)
    // update the person with that id (accessed at PUT /api/people/:personId)
    .put(people.update)
    .delete(people.delete);

// This middleware makes the person available as req.person when you supply personId
router.param('personId', people.personById);

module.exports = router;
