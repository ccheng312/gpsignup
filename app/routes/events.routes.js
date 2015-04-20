var express = require('express'),
    router = express.Router(),
    events = require('../controllers/events.controller');

router.path = '/events';

router.route('/')
    // create an event
    .post(events.create)
    // get a list of events
    .get(events.list);

router.route('/:eventId')
    // get the event with that id (accessed at GET /api/events/:event_id)
    .get(events.read)
    // update the event with that id (accessed at PUT /api/events/:event_id)
    .put(events.update)
    .delete(events.delete);

router.get('/:eventId/slots', events.getPublicSlots);

router.post('/:eventId/signup', events.signup);

// This middleware makes the event available as req.signupEvent when you supply eventId
router.param('eventId', events.eventById);

module.exports = router;