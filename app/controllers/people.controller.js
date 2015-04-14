'use strict';

/**
 * Module Dependencies
 */
var mongoose = require('mongoose'),
    Person = mongoose.model('Person'),
    _ = require('lodash');


/**
 * People Methods
 */
exports.create = function(req, res) {
    var person = new Person(req.body);

    // save the person and check for errors
    person.save(function(err) {
        if (err) {
            // TODO: make sure this works as expected.
            return res.send(err);
        }

        res.json({ message: 'Person created!' });
    });
};

exports.list = function(req, res) {
    // grab list of people from db
    Person.find(function(err, people) {
        if (err) {
            return res.send(err);
        }

        res.json(people);
    });
};

exports.read = function(req, res) {
    res.json(req.person);
};

exports.update = function(req, res) {
    var person = _.extend(req.person, req.body);

    person.save(function(err) {
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Person updated!' });
    });
};

exports.delete = function(req, res) {
    var person = req.person;

    person.remove(function(err) {
        if (err) {
            return res.send(err);
        }
        res.json({ message: 'Person deleted!' });
    });
};

/**
 * Middleware
 */
exports.personById = function(req, res, next, id) {
    Person.findById(id).exec(function(err, person) {
        if (err) {
            return next(err);
        }
        if (!person) {
            return next(new Error('Failed to load person ' + id));
        }
        req.person = person;
        next();
    });
};
