var express = require('express');
var router = express.Router();

router.use('/', function (req,res,next) {
    console.log("Admin stuff");
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'This is the main ADMIN location' });
});

module.exports = router;