var glob = require('glob');

glob.sync('./*.model.js', { cwd: __dirname })
    .forEach(function(file) {
        require(file);
    });
