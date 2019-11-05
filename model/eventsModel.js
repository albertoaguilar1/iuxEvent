// usersModel.js
var mongoose = require('mongoose');
// Setup schema
var EventsSchema = mongoose.Schema({
  

//  event_id: mongoose.Schema.Types.ObjectId,
NameEvent: {
    type: String,
    required: true
},
DescriptEvent: {
    type: String,
    required: true
},
OffertEvent: {
    type: String,
    required: true
},
ImgEvent: {
    type: String,
    required: true
},
StatusEvent: {
    type: Boolean,
    required: true
},
DateBeginEvent: {
    type: Date,
    default: Date.now
} ,
DateEndEvent: {
    type: Date,
    default: Date.now
}


});
// Export Users model
var Events = module.exports = mongoose.model('Events', EventsSchema);
module.exports.get = function (callback, limit) {
    Events.find(callback).limit(limit);
}