var glob = require('glob');

console.log('Registering models');
glob.sync('./*.model.js', { cwd: __dirname })
    .forEach(function(file) {
        require(file);
    });
