var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
    name: { type: String, maxlength: 100 },
    description: { type: String, maxlength: 1000 },
    start_time: { type: Date },
    end_time: { type: Date },
    slot_duration: { type: Number, min: 0 },
    default_slot_capacity: { type: Number, min: 0 },
    //creator: { type: String, maxlength: 100 },
    //password: { type: String, maxlength: 100 },
    is_private: { type: Boolean },
    enabled: { type: Boolean }
});

mongoose.model('Event', EventSchema);