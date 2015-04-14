var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LocationSchema   = new Schema({
    name: { type: String, maxlength: 100 },
});

mongoose.model('Location', LocationSchema);