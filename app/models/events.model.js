var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EventSchema   = new Schema({
    name: { type: String, maxlength: 100, required: true },
    description: { type: String, maxlength: 1000 },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    duration: { type: Number, min: 0, required: true },
    defaultCapacity: { type: Number, min: 0, default: 1 },
    //creator: { type: String, maxlength: 100 },
    //password: { type: String, maxlength: 100 },
    isPrivate: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    locations: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
});

mongoose.model('Event', EventSchema);