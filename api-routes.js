//inicializa express router
let router = require('express').Router();

//set deafuilt API RESPONSE 

//Import EventsController
var eventsController = require('./eventsController');
  

    // Contact routes
router.route('/events')
.get(eventsController.index)
.post(eventsController.new);

router.route('/events/:events_id')
.get(eventsController.view)
.patch(eventsController.update)
.put(eventsController.update)
.delete(eventsController.delete);



router.get('/',function(req,res){
    res.json({
        status:'API ITS working',
        message:'Welcome to restHub crafted with lovesssss!'
    });
});


//export api routers
module.exports=router ;