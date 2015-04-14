var express = require('express');
var router = express.Router();

var locations = require('../controllers/locations.controller');

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening on location.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/locations')

    // create a event (accessed at POST api/events)
    .post(locations.create)
    // get a list of events
    .get(locations.list);

router.route('/locations/:locationId')

    // get the event with that id (accessed at GET /api/locations/:locationId)
    .get(locations.read)
    // update the event with that id (accessed at PUT /api/locations/:locationId)
    .put(locations.update)
    .delete(locations.delete);

// This middleware makes the event available as req.signupEvent when you supply eventId
router.param('locationId', locations.locationById);

module.exports = router;