'use strict'
// Cargamos los modelos para usarlos posteriormente

var Events = require('../models/eventsModel');



// Handle index actions
exports.index = function (req, res) {
    console.log("index")
    Events.get(function (err, events) {
        if (err) {
          
            return res.status(404).send({
                status: "error",
                message: err,
            });
        }

           return res.status(200).send({
            
            status: "success",
            message: "Events retrieved successfully",
            data: events
        });
      
    });
};


// Handle view Events info
exports.viewNameEvent= (req, res) => {
    console.log("viewNameEvent"); 
  // Validate request
  if(!req.params.NameEvent) {
    return res.status(400).send({
        message: "Event NameEvent can not be empty"
    });
}


       Events.findOne({NameEvent:req.params.NameEvent})
    .then(events => {
        if(!events) {
            return res.status(404).send({
                message: "Event not found with name " + req.params.NameEvent,
                status:'400',
                data: err
            });            
        }
        return res.status(200).send({
            status: "success",
            message: "Event found",
            data: events
        });
   
    }).catch(err => {
        console.log(err)
        if(err.kind === 'NameEvent') {
            return res.status(404).send({
                message: "Event not found with Name " + req.params.NameEvent,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Event with id " + req.params.NameEvent,
            status:'500',
            data: err
        });
    });
};

// Handle view event info
exports.view= (req, res) => {
    console.log("view"); 
  // Validate request
  if(!req.params.events_id) {
    return res.status(400).send({
        message: "Event  event_id can not be empty"
    });
}

Events.findById(req.params.events_id)
    .then(events => {
        if(!events) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.events_id,
                status:'400',
                data: err
            });            
        }
        return res.status(200).send({
            status: "success",
            message: "Events found",
            data: events
        });
   
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.events_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Event with id " + req.params.events_id,
            status:'500',
            data: err
        });
    });
};



// Create and Save a new Event
exports.new= (req, res) => {
    console.log("new  " ); 
  // Validate request
  if(!req) {
    return res.status(400).send({
        message: "Event body can not be empty",
        data: res.err
    });
}


    var events = new Events();
    events.NameEvent = req.body.NameEvent ? req.body.NameEvent : events.NameEvent;
    events.DescriptEvent = req.body.DescriptEvent;
    events.OffertEvent = req.body.OffertEvent;
    events.ImgEvent = req.body.ImgEvent;
    events.StatusEvent = req.body.StatusEvent;
    events.DateBeginEvent = req.body.DateBeginEvent ? req.body.DateBeginEvent : new Date();
    events.DateEndEvent = req.body.DateEndEvent;



    // Save User in the database
    events.save()
    .then(events => {
        return res.status(200).send({
            message: 'New event created!',
            status:"success",
            data: events
        });
    }).catch(err => {

       
        res.status(500).send({
            message: err.message || "Some error occurred while creating the events.",
            status:'500',
            data: err
           
        });
    });
};


// Update a event identified by the EventId in the request
exports.update = (req, res) => {

    console.log("update  " +   req.params.events_id); 
    // Validate Request
    if(!req.params.events_id) {
        return res.status(400).send({
            message: "event id can not be empty"
        });
    }

      // Validate Request
      if(!req.body) {
        console.log("update  " +  req.body); 
        return res.status(400).send({
            message: "event body can not be empty"
        });
    }



    // Find User and update it with the request body
    Events.findByIdAndUpdate( req.params.events_id, {
        NameEvent : req.body.NameEvent ? req.body.NameEvent : events.NameEvent,
        DescriptEvent : req.body.DescriptEvent,
        OffertEvent : req.body.OffertEvent,
        ImgEvent : req.body.ImgEvent,
        StatusEvent : req.body.StatusEvent,
        DateEndEvent : req.body.DateEndEvent 
     
    }, {new: true})
    .then(event => {
        if(!event) {
            return res.status(404).send({
                message: "User not found with id " +  req.params.events_id,
                    status:'404',
                    data: err
            });
        }
        return res.status(200).send({
            message: 'user Info updated',
            status:"success",
            data: event
        });
      
           
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.events_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.events_id,
            status:'500',
            data: err
        });
    });
};



    
// Delete a Events with the specified EventId in the request
exports.delete = (req, res) => {
    console.log("delete  " +   req.params.events_id); 
    if(!req.params.events_id) {
        return res.status(400).send({
            message: "Event content can not be empty"
        });
    }

    Events.findByIdAndRemove(req.params.events_id)
    .then(events => {
        if(!events) {
            return res.status(404).send({
                message: "Event not found with id " + req.params.events_id,
                status:'404',
                data: err
            });
        }
        res.send({  
            message: "Event deleted successfully!",
            status:"success",
            data: events
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Event not found with id " + req.params.events_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Could not delete Event with id " + req.params.events_id,
            status:'500',
            data: err
        });
    });
};
