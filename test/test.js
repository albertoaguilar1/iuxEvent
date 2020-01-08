"use strict"



var assert = require("assert");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server=require("../app");
let should = chai.should();
const expect = require('chai').expect;
 var request2 = require('supertest');
 var request = require('supertest')
chai.use(chaiHttp);
var request = request("http://localhost:8082")
var request2 = request2("http://localhost:8080")

 describe('events', function() {    
      describe('POST', function(){
    
        let email = "testService@mia.com";
        let password= "mia123";
        let token = "";

        it('Should  login', function(done){
            request2.post('/api/login')
            .send({EmailUser: email,  PasswordUser:password} )    
            .expect('Content-Type', /json/)
                .end( function(err,res){
                    console.log(res.body.token)
                  token=res.body.token   
                  expect(res).to.have.status(200);                
                 done();
                });  
            });
   


            it('Should  insert json events', function(done){
                request.post('/api/events')
                .set('Authorization', token)
                .send({
                NameEvent:"test",
                DescriptEvent:"test",
                DateBeginEvent:"",
                DateEndEvent:"2019-10-25T05:00:00.000Z",
                OffertEvent:"GRATIS ",
                ImgEvent:"C:/PATH",
                StatusEvent:true})
                
                    .expect('Content-Type', /json/)
                    .end( function(err,res){   
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equals("success");
                    expect(res.body.message).to.equals("New event created!");
                    done();
            });
    
     });


     it('Should  insert json events', function(done){
        request.post('/api/events')
        .set('Authorization', token)
        .send({
     
        DescriptEvent:"test",
        DateBeginEvent:"",
        DateEndEvent:"2019-10-25T05:00:00.000Z",
        OffertEvent:"GRATIS ",
        ImgEvent:"C:/PATH",
        StatusEvent:true})
        
            .expect('Content-Type', /json/)
            .end( function(err,res){   
             expect(res.body.data._message).to.equal("Events validation failed")
            expect(res).to.have.status(500);
            done();
    });

});

it('Should  insert json events', function(done){
    request.post('/api/events')
    .set('Authorization', token)
    .send({
 })
    
        .expect('Content-Type', /json/)
        .end( function(err,res){   
         expect(res.body.data._message).to.equal("Events validation failed")
        expect(res).to.have.status(500);
        done();
});





});

        });//end post 

        describe('GET', function(){
            let email = "testService@mia.com";
            let password= "mia123";
            let token = "";
            let id ="";
    
            it('Should  login', function(done){
                request2.post('/api/login')
                .send({EmailUser: email,  PasswordUser:password} )    
                .expect('Content-Type', /json/)
                    .end( function(err,res){
                      token=res.body.token   
                      expect(res).to.have.status(200);                
                     done();
                    });  
                });
     
            it('Should return json as default data format', function(done){
                request.get('/api/events')
                .set('Authorization', token)
                .expect('Content-Type', /json/)
                .end( function(err,res){   
                expect(res).to.have.status(200);
                done();
            });
        });
   
                    it("should get a single  record name", (done) => {                      
                         request.get('/api/events/name/test')
                         .set('Authorization', token)
                            .expect('Content-Type', /json/)
                            .end( function(err,res){   
                           
                              
                                id =res.body.data._id
                            expect(res).to.have.status(200);
                            done();
                             });          
                          });  

                          it("should get a single  record id", (done) => {                      
                            request.get('/api/events'+`/${id}`)
                            .set('Authorization', token)
                               .expect('Content-Type', /json/)
                               .end( function(err,res){   
                               expect(res).to.have.status(200);
                               done();
                                });          
                             });  

                             it("should not get a single  record id no exist", (done) => {                      
                                request.get('/api/events/4')
                                .set('Authorization', token)
                                   .expect('Content-Type', /json/)
                                   .end( function(err,res){   
                                   expect(res).to.have.status(404);
                  
                                   
                                   done();
                                    });          
                                 });  
    });   //END GET

    describe('PUT', function(){
        let email = "testService@mia.com";
        let password= "mia123";
        let token = "";
        let id ="";

        it('Should  login', function(done){
            request2.post('/api/login')
            .send({EmailUser: email,  PasswordUser:password} )    
            .expect('Content-Type', /json/)
                .end( function(err,res){
                  token=res.body.token   
                  expect(res).to.have.status(200);                
                 done();
                });  
            });


         it("should get a single  record name", (done) => {                      
                         request.get('/api/events/name/test')
                         .set('Authorization', token)
                            .expect('Content-Type', /json/)
                            .end( function(err,res){   
                                id =res.body.data._id
                            expect(res).to.have.status(200);
                            done();
                             });          
                          });  


     
         it('Should  update json events', function(done){
             console .log('/api/events'+`/${id}`);
             request.put('/api/events'+`/${id}`)
             .set('Authorization', token)
             .send({NameEvent:"test",
             DescriptEvent:"test2",
             DateEndEvent:"2019-10-25T05:00:00.000Z",
             DateBeginEvent:"",
             OffertEvent:"GRATIS ",
             ImgEvent:"C:/PATH",
             StatusEvent:true})
             .expect('Content-Type', /json/)
             .end( function(err,res){             
                expect(res).to.have.status(200);
                done();
         });
        });
     
         it('Should  update json events', function(done){
             request.put('/api/events'+`/${id}`)
             .set('Authorization', token)
             .send({
                 NameEvent:"",
                 DescriptEvent:"",
                 DateBeginEvent:"2019-10-22T05:00:00.000Z",
                 DateEndEvent:"2019-10-25T05:00:00.000Z",
                 OffertEvent:"GRATIS ",
                 ImgEvent:"C:/PATH",
                 StatusEvent:true})
             .expect('Content-Type', /json/)
             .end( function(err,res){             
                expect(res).to.have.status(500);
                done();
         });
     
     });
    });
     




    describe('DELETE', function(){
        let email = "testService@mia.com";
        let password= "mia123";
        let token = "";
        let id ="";

        it('Should  login', function(done){
            request2.post('/api/login')
            .send({EmailUser: email,  PasswordUser:password} )    
            .expect('Content-Type', /json/)
                .end( function(err,res){
                  token=res.body.token   
                  expect(res).to.have.status(200);                
                 done();
                });  
            });


         it("should get a single  record name", (done) => {                      
                         request.get('/api/events/name/test')
                         .set('Authorization', token)
                            .expect('Content-Type', /json/)
                            .end( function(err,res){   
                                id =res.body.data._id
                            expect(res).to.have.status(200);
                            done();
                             });          
                          });  
    
    
        it('Should  remove json events', function(done){     
          request.delete('/api/events'+`/${id}`)
          .set('Authorization', token)
          .expect('Content-Type', /json/)
                .expect(200, done);
        });
    
        it('Should  remove json events', function(done){
            request.delete('/api/events'+`/${id}`)
            .set('Authorization', token)
            .expect('Content-Type', /json/)
                  .expect(500, done);
          });

});

});
