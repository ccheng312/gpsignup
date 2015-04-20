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
    person.save(function(err, person) {
        if (err) {
            // TODO: make sure this works as expected.
            return res.send(err);
        }

        res.send(person);
    });
};

exports.list = function(req, res) {
    // grab list of people from db
    Person.find(function(err, people) {
        if (err) {
            return res.send(err);
        }

        res.send(people);
    });
};

exports.read = function(req, res) {
    res.send(req.person);
};

exports.update = function(req, res) {
    var person = _.extend(req.person, req.body);

    person.save(function(err, person) {
        if (err) {
            return res.send(err);
        }
        res.send(person);
    });
};

exports.delete = function(req, res) {
    var person = req.person;

    person.remove(function(err) {
        if (err) {
            return res.send(err);
        }
        res.send();
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
            return res.status(404).send({ message: 'Person not found.' });
        }
        req.person = person;
        next();
    });
};
