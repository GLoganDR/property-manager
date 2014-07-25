/*jshint expr:true*/
/*global describe, it, before, beforeEach */
'use strict';

var expect = require('chai').expect;
var Room = require('../../app/models/room');
var Renter = require('../../app/models/property');
var connect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var Apartment;



describe('Apartment', function(){
  
  before(function(done){//forces it to connect to mongo before running the test//
    connect('property-management-test', function(){
      Apartment = require('../../app/models/apt');
    done();
    });
  })
  // clears out apartments before running test (keeps it from having more apartments than declared and failing test)//
  beforeEach(function(done){
    global.mongodb.collection('apartments').remove(function(){
  done();
    });
  });


  describe('constructor', function(){
    it('should create a new apartment object', function(){
       var a1 = new Apartment('A1');
         expect(a1).to.be.instanceof(Apartment);
         expect(a1.rooms.length).to.equal(0);
         expect(a1.renters.length).to.equal(0);
         expect(a1.name).to.equal('A1');
    });
  });
  

  describe('#area', function(){
    it('should display the total area of all rooms in a unit', function(){
      var a1 = new Apartment('A1');
        a1.rooms.push( new Room('bedroom', 10, 20), new Room('kitchen', 20, 20), new Room('bedroom', 20, 30), new Room('bathroom', 10, 10));
          expect(a1.area()).to.be.equal(1300);

     });
  });

  describe('#cost', function(){
    it('should display the total cost of a unit', function(){
      var a1 = new Apartment('A1');
        a1.rooms.push( new Room('bedroom', 10, 20), new Room('kitchen', 20, 20), new Room('bedroom', 20, 30), new Room('bathroom', 10, 10));
         expect(a1.cost()).to.be.equal(6500);

     });
  });


  describe('#bedrooms', function(){
    it('should count the number of bedrooms in an apartment', function(){
      var a1 = new Apartment('A1');
        a1.rooms.push( new Room('bedroom', 10, 20), new Room('kitchen', 20, 20), new Room('bedroom', 20, 30), new Room('bathroom', 10, 10));
          expect(a1.bedrooms()).to.be.equal(2);

    });
  });

  describe('#isAvailable', function(){
    it('should say apartment is available if one or more bedrooms is unoccupied', function(){
      var a1 = new Apartment('A1');
        a1.rooms.push( new Room('bedroom', 10, 20), new Room('kitchen', 20, 20), new Room('bedroom', 20, 30), new Room('bathroom', 10, 10));
        a1.renters.push( new Renter('Bob', 25, 'Male', 'Coder'), new Renter ('Jane', 25, 'Female', 'Coder'), new Renter('Scott', 73, 'Male', 'Movie Star'));
          expect(a1.isAvailable()).to.equal(false);

    });
  });

  describe('#purgeEvicted', function(){
    it('should purge evicted renters', function(){
      var a1 = new Apartment('A1');
        a1.rooms.push( new Room('bedroom', 10, 20), new Room('kitchen', 20, 20), new Room('bedroom', 20, 30), new Room('bathroom', 10, 10));
        a1.renters.push( new Renter('Bob', 25, 'Male', 'Coder'), new Renter ('Jane', 25, 'Female', 'Coder'), new Renter('Scott', 73, 'Male', 'Movie Star'));
          a1.renters[0]._isEvicted = true;
          a1.renters[2]._isEvicted = true;
          a1.purgeEvicted();
          
      expect(a1.renters.length).to.equal(1);

    });
  });

  describe('#collectRent', function(){
    it('should collect rent from renters', function(){
      var a1 = new Apartment('A1');
        a1.rooms.push( new Room('bedroom', 10, 20), new Room('kitchen', 20, 20), new Room('bedroom', 20, 30), new Room('bathroom', 10, 10));
        a1.renters.push( new Renter('Bob', 25, 'Male', 'Coder'), new Renter ('Jane', 25, 'Female', 'Coder'), new Renter('Scott', 73, 'Male', 'Movie Star'));
        a1.renters[0]._cash = 0;
        a1.renters[1]._cash = 40000;
        a1.renters[2]._cash = 40000;

        a1.collectRent();
        console.log(this.renters);

      expect(a1.renters.length).to.equal(2);
    });
  });
  describe('#save', function(){
    it('should save everything into database', function(done){
      var a1 = new Apartment('A1');
        a1.save(function(){
          expect(a1._id).to.be.instanceof(Mongo.ObjectID);
          done();
        });
    });
  });
  describe('.find', function(){
    it('should find all the apartments in the mongo database', function(done){
      var a1 = new Apartment('A1');
       a1.save(function(){
          Apartment.find({}, function(apartments){
            expect(apartments).to.have.length(1);
              done();
         });
       });
     });
   });
  describe('.findById', function(){
    it('should find specific apartments from the mongo database', function(done){
      var a1 = new Apartment('A1');
        var a2 = new Apartment('A2');
          var a3 = new Apartment('A3');

            a1.save(function(){
              a2.save(function(){
                a3.save(function(){
                  Apartment.findById({_id:a1._id}, function(apartments){
                    expect(a1._id.toString()).to.equal(apartments.toString());
                    done();
                  });
                });
              });
            });
    });
  });
});

