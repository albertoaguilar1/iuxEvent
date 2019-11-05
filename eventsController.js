// eventsController.js
// Import user model
var Events = require('./model/eventsModel');



// Handle index actions
exports.index = function (req, res) {
    Events.get(function (err, events) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Events retrieved successfully",
            data: events
        });
    });
};





// Handle view events info
exports.view = function (req, res) {
    Events.findById(req.params.events_id, function (err, events) {
        console.log("req.params.events_id, IS: " + req.params.events_id);
        if (err)
            res.send(err);
           
            res.json({
            message: 'Events details loading..',
           
            data: events
        });
    });
};


// Handle create events actions
exports.new = function (req, res) {
    var events = new Events();
    events.NameEvent = req.body.NameEvent ? req.body.NameEvent : events.NameEvent;
    events.DescriptEvent = req.body.DescriptEvent;
    events.OffertEvent = req.body.OffertEvent;
    events.ImgEvent = req.body.ImgEvent;
    events.StatusEvent = req.body.StatusEvent;
    events.DateBeginEvent = req.body.DateBeginEvent;
    events.DateEndEvent = req.body.DateEndEvent;

    console.log("REQ.BODY.NameEvent IS: " + req.body.NameEvent);
    console.log("REQ.BODY.DescriptEvent IS: " + req.body.DescriptEvent);
  
// save the user and check for errors
events.save(function (err) {
         if (err)
             res.json(err);
res.json({
            message: 'New event created!',
            data: events
        });
    });
};




// Handle update user info
exports.update = function (req, res) {
    Events.findById(req.params.events_id, function (err, events) {
        console.log("req.params.events_id IS: " +   req.params.events_id); 

        if (err)
            res.send(err);
            events.NameEvent = req.body.NameEvent ? req.body.NameEvent : events.NameEvent;
            events.DescriptEvent = req.body.DescriptEvent;
            events.OffertEvent = req.body.OffertEvent;
            events.ImgEvent = req.body.ImgEvent;
            events.StatusEvent = req.body.StatusEvent;
            events.DateBeginEvent = req.body.DateBeginEvent;
            events.DateEndEvent = req.body.DateEndEvent;  
         
           
// save the user and check for errors
events.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'events Info updated',
                data: events
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    Events.remove({
   
    }, 
    

    function (err, events) {
        console.log("req.params.events_id IS: " + req.params.events_id); 
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'events deleted'
        });
    });
};


