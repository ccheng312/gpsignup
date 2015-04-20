var glob = require('glob'),
    express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.send({ message: 'This is the main API location' });
});

glob.sync('./*.routes.js', {
    cwd: __dirname,
}).forEach(function(file) {
    var subRouter = require(file);
    router.use(subRouter.path, subRouter);
});

module.exports = router;