var express = require('express');
var router = express.Router();

var events = require('../../controllers/events.controller');

router.route('/events')

    // create a event (accessed at POST admin/events)
    .post(events.create)
    // get a list of events
    .get(events.list);

router.route('/events/:eventId')

    // get the event with that id (accessed at GET /admin/events/:event_id)
    .get(events.read)
    // update the event with that id (accessed at PUT /admin/events/:event_id)
    .put(events.update)
    .delete(events.delete);

router.route('/events/:eventId/slots')
    .get(events.getSlots);

// This middleware makes the event available as req.signupEvent when you supply eventId
router.param('eventId', events.eventById);

module.exports = router;