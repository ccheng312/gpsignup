var express = require('express');
var router = express.Router();

var Event = require('../models/events.model');

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening on event.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/events')

    // create a event (accessed at POST api/events)
    .post(function(req, res) {

        var signupEvent = new Event();      // create a new instance of the Event model
        signupEvent.name = req.body.name;
        signupEvent.description = req.body.description;
        signupEvent.enabled = req.body.enabled;

        // save the event and check for errors
        signupEvent.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Event created!' });
        });

    })

    .get(function(req, res) {
        Event.find(function(err, events) {
            if (err)
                res.send(err);

            res.json(events);
        });
    });

router.route('/events/:event_id')

    // get the event with that id (accessed at GET /api/events/:event_id)
    .get(function(req, res) {
        Event.findById(req.params.event_id, function(err, signupEvent) {
            if (err)
                res.send(err);
            res.json(signupEvent);
        });
    })

    .put(function(req, res) {

        // use our event model to find the event we want
        Event.findById(req.params.event_id, function(err, signupEvent) {

            if (err)
                res.send(err);

            signupEvent.name = req.body.name;
            signupEvent.description = req.body.description;
            signupEvent.enabled = req.body.enabled;

            // save the event
            signupEvent.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Event updated!' });
            });

        });
    });

module.exports = router;