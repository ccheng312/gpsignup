var express = require('express'),
    router = express.Router(),
    events = require('../controllers/events.controller'),
    slots = require('../controllers/slots.controller');

router.path = '/admin';

router.use('/', function(req, res, next) {
    console.log("This is admin route");
    next();
});

router.get('/', function(req, res) {
    res.send({ message: 'This is the main ADMIN location' });
});

router.get('/events', events.adminList);
router.get('/events/:eventId/slots', events.getAdminSlots);

router.get('/slots', slots.adminList);
router.get('/slots/:slotId', slots.adminRead);
router.route('/slots/:slotId/enable')
    .get(slots.enabled)
    .post(slots.enable);
router.route('/slots/:slotId/capacity')
    .get(slots.capacity)
    .post(slots.changeCapacity);

// This middleware makes the event available as req.signupEvent when you supply eventId
router.param('eventId', events.eventById);
router.param('slotId', slots.slotById);

module.exports = router;