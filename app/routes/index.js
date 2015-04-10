module.exports = function (app) {
    app.use('/api', require('./events.routes'));
    app.use('/api', require('./slots.routes'));
};