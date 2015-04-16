var glob = require('glob');

module.exports = function (app) {
    console.log('Registering admin routes');
    glob.sync('./*.routes.js', { cwd: __dirname })
        .forEach(function(file) {
            app.use('/admin', require(file));
        });
};
