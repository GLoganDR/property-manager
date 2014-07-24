/*jshint expr:true*/
/*global describe, it*/
'use strict';

var expect = require('chai').expect;
var Apartment = require('../../app/models/apt');
var Room = require('../../app/models/room');
var Renter = require('../../app/models/property');


describe('Apartment', function(){
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
         expect(a1.isAvailable()).to.equal(0);
         });
         });







});









