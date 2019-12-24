"use strict"

 var assert = require('assert');
 var request = require('supertest')
 var app = require('../app.js')

 var request = request("http://localhost:8082")


 describe('events', function() {    
      describe('POST', function(){
    it('Should  insert json events', function(done){
        request.post('/api/events')
        .send({
        NameEvent:"test",
        DescriptEvent:"test",
        DateBeginEvent:"2019-10-22T05:00:00.000Z",
        DateEndEvent:"2019-10-25T05:00:00.000Z",
        OffertEvent:"GRATIS ",
        ImgEvent:"C:/PATH",
        StatusEvent:true})
        
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Should  not insert json events why NameEvent is empty', function(done){
        request.post('/api/events')
        .send({NameEvent:"",DescriptEvent:"test",DateBeginEvent:"2019-10-22T05:00:00.000Z",DateEndEvent:"2019-10-25T05:00:00.000Z",OffertEvent:"GRATIS ",ImgEvent:"C:/PATH",StatusEvent:true})
            .expect('Content-Type', /json/)
            .expect(500, done);
    });

    it('Should  not insert the user why reques json events  is empty', function(done){
        request.post('/api/events')  
            .expect('Content-Type', /json/)
            .expect(500, done);
    });
});



     describe('GET', function(){
         var id ="";
         it('Should return json as default data format', function(done){
             request.get('/api/events')
                 .expect('Content-Type', /json/)
                 .expect(200, done);
         });

                 it("should get a single name record", (done) => {                      
                      request.get('/api/events/name/test')
                       .expect('Content-Type', /json/)
                       .end( function(err,res){
                           id=res.body.data._id
                           console.log("el valor "+ id)
                           done();
                          });          
                       });  

                 it("should get a single events record", (done) => { 
                    request.get('/api/events'+`/${id}`)
                    .expect('Content-Type', /json/)
                    .expect(200, done);
                         });      
                         
                         
                         it("should not get a single events record", (done) => {        
                            request.get('/api/events/123')
                            .expect('Content-Type', /json/)
                            .expect(404, done);
                                 });
     
     });





 describe('put', function(){
   let id="";
    it("should get a single user_email record", (done) => {                      
        //  request.get('api/users/email'+`/${valor}`) 
          request.get('/api/events/name/test')
           .expect('Content-Type', /json/)
           .end( function(err,res){
               id=res.body.data._id
               console.log("el valor "+ id)
               done();
              });          
           }); 

    it('Should  insert json events', function(done){
        request.put('/api/events'+`/${id}`)
        .send({NameEvent:"test",DescriptEvent:"test",DateBeginEvent:"2019-10-22T05:00:00.000Z",DateEndEvent:"2019-10-25T05:00:00.000Z",OffertEvent:"GRATIS ",ImgEvent:"C:/PATH",StatusEvent:true})
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Should  insert json events', function(done){
        request.put('/api/events'+`/${id}`)
        .send({NameEvent:"",DescriptEvent:"",DateBeginEvent:"2019-10-22T05:00:00.000Z",DateEndEvent:"2019-10-25T05:00:00.000Z",OffertEvent:"GRATIS ",ImgEvent:"C:/PATH",StatusEvent:true})
            .expect(500, done);
    });

});


describe('delete', function(){
    let id="";
    it("should get a single user_email record", (done) => {                      
        //  request.get('api/users/email'+`/${valor}`) 
          request.get('/api/events/name/test')
           .expect('Content-Type', /json/)
           .end( function(err,res){
               id=res.body.data._id
               console.log("el valor "+ id)
               done();
              });          
           });  


    it('Should  remove json events', function(done){     
      request.delete('/api/events'+`/${id}`)
      .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Should  remove json events', function(done){
        request.delete('/api/events'+`/${id}`)
        .expect('Content-Type', /json/)
              .expect(500, done);
      });
});

//la funcion events
});