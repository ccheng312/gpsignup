var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
    name: { type: String, maxlength: 100 },
    description: { type: String, maxlength: 1000 },
    start: { type: Date },
    end: { type: Date },
    duration: { type: Number, min: 0 },
    default_capacity: { type: Number, min: 0 },
    //creator: { type: String, maxlength: 100 },
    //password: { type: String, maxlength: 100 },
    is_private: { type: Boolean },
    enabled: { type: Boolean },
    locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
});

mongoose.model('Event', EventSchema);