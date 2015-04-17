var express = require('express');
var router = express.Router();

var events = require('../../controllers/events.controller');

router.route('/events')

    // get a list of events
    .get(events.list);

router.route('/events/:eventId')

    // get the event with that id (accessed at GET /api/events/:event_id)
    .get(events.read)


router.route('/events/:eventId/slots')
    .get(events.getPublicSlots);

// This middleware makes the event available as req.signupEvent when you supply eventId
router.param('eventId', events.eventById);

module.exports = router;