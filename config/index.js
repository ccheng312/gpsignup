/**
 * Module dependencies.
 */
var _ = require('lodash');

/**
 * Load app configurations
 */
module.exports = function(env) {
    return _.extend(
        require('./env/all'),
        require('./env/' + env) || {}
    );
};