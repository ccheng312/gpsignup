var glob = require('glob');

console.log('Requiring models');
glob.sync('./*.model.js', { cwd: __dirname })
    .forEach(function(file) {
        require(file);
    });
