module.exports = function (app) {
    app.use('/api', require('./events.routes'));
};