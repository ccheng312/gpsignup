'use strict';

var express = require('express'),
    router = express.Router(),
    people = require('../controllers/people.controller');

router.path = '/people';

router.route('/')
    .get(people.list)
    .post(people.create);

router.route('/:personId')
    // get the person with that id (accessed at GET /api/people/:personId)
    .get(people.read)
    // update the person with that id (accessed at PUT /api/people/:personId)
    .put(people.update)
    .delete(people.delete);

// This middleware makes the person available as req.person when you supply personId
router.param('personId', people.personById);

module.exports = router;
