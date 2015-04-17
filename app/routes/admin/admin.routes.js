var express = require('express');
var router = express.Router();

router.use('/', function (req,res,next) {
    console.log("Admin stuff");

    // This is where we would want to check that the user is logged in
    // and maybe set some stuff to indicate that this is a legitimate user
    // also to check if they are an admin for event creation and stuff
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'This is the main ADMIN location' });
});

module.exports = router;