//inicializa express router
var router = require('express').Router();

//set deafuilt API RESPONSE 
//cargamos la utilidad para verificar token
var authenticated = require('../middlewares/authenticated');

//Import EventsController
var eventsController = require('../controllers/eventsController');
  

    // Contact routes
router.route('/events')
.get(authenticated,eventsController.index)
.post(authenticated,eventsController.new);

router.route('/events/:events_id')
.get(authenticated,eventsController.view)
.patch(authenticated,eventsController.update)
.put(authenticated,eventsController.update)
.delete(authenticated,eventsController.delete);

router.route('/events/name/:NameEvent')
.get(authenticated,eventsController.viewNameEvent)

router.get('/',function(req,res){
    res.json({
        status:'API Event WORKING',
        message:'Bienvenido a la raiz del servicio'
    });
});



//export api routers
module.exports=router ;