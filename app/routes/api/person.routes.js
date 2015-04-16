'use strict';

/**
 * Module Dependencies
 */
var express = require('express');
var people = require('../../controllers/people.controller');


/**
 * Slot Routes
 */
var router = express.Router();

router.route('/people')
    .post(people.create);


// This middleware makes the person available as req.person when you supply personId
router.param('personId', people.personById);

module.exports = router;
