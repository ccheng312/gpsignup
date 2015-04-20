var _ = require('lodash'),
    assert = require('chai').assert,
    app = require('../../server'),
    request = require('supertest-as-promised')(app),
    mongoose = require('mongoose'),
    Person = mongoose.model('Person');

var person = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'JohnSmith@email.com',
    phone: '123-456-7890',
    personCode: 'secret'
};

describe('Person tests', function() {
    before(function(done) {
        // ping server
        var res = request.get('/api')
            .expect(200, done);
    });

    it('person CRUD test', function(done) {
        var id;
        // POST
        request.post('/api/people')
            .send(person)
            .expect(200)
            .expect(function(res) {
                id = res.body._id;
                assert.propertyVal(res.body, 'firstName', person.firstName);
            })
            // list
            .then(function() {
                return request.get('/api/people')
                    .expect(200)
                    .expect(function(res) {
                        assert.propertyVal(_.find(res.body, person), 'firstName', person.firstName);
                    });
            })
            // GET
            .then(function() {
                return request.get('/api/people/' + id)
                    .expect(200)
                    .expect(function(res) {
                        assert.propertyVal(res.body, 'firstName', person.firstName);
                    });
            })
            // PUT
            .then(function() {
                var changed = _.extend(_.clone(person), { firstName: 'Peter' });
                return request.put('/api/people/' + id)
                    .send(changed)
                    .expect(200)
                    .expect(function(res) {
                        assert.propertyVal(res.body, 'firstName', changed.firstName);
                    });
            })
            // DELETE
            .then(function() {
                return request.delete('/api/people/' + id)
                    .expect(200);
            })
            // verify deleted
            .then(function() {
                request.get('/api/people/' + id)
                    .expect(404);
                done();
            })
            .catch(function(err) {
                done(err);
            });
    });

    afterEach(function(done) {
        Person.remove().exec();
        done();
    });
});