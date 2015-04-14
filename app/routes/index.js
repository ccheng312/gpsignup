var glob = require('glob');

module.exports = function (app) {
    console.log('Requiring routes');
    glob.sync('./*.routes.js', { cwd: __dirname })
        .forEach(function(file) {
            app.use('/api', require(file));
        });
};
