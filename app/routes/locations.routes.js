var express = require('express');
var router = express.Router();

var locations = require('../controllers/locations.controller');

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening on location.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/locations')

    // create a location (accessed at POST api/locations)
    .post(locations.create)
    // get a list of locations
    .get(locations.list);

router.route('/locations/:locationId')

    // get the location with that id (accessed at GET /api/locations/:locationId)
    .get(locations.read)
    // update the location with that id (accessed at PUT /api/locations/:locationId)
    .put(locations.update)
    .delete(locations.delete);

// This middleware makes the location available as req.thisLocation when you supply locations
router.param('locationId', locations.locationById);

module.exports = router;