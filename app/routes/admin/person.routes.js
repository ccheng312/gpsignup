'use strict';

/**
 * Module Dependencies
 */
var express = require('express');
var people = require('../../controllers/people.controller');


/**
 * People Routes
 */
var router = express.Router();

router.route('/people/:personId')
    // get the person with that id (accessed at GET /admin/people/:personId)
    .get(people.read)
    // update the person with that id (accessed at PUT /admin/people/:personId)
    .put(people.update)

// This middleware makes the person available as req.person when you supply personId
router.param('personId', people.personById);

module.exports = router;