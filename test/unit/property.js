/*global describe, it */
/* jshint camelcase:false */
'use strict';

var expect = require('chai').expect;
//var connect = require('../../app/lib/mongodb');
//var Mongo = require('mongodb');
var Renter = require('../../app/models/property');

describe ('Renter', function(){
  describe ('constructor', function(){
    it('should create a new renter', function(){
      var spanky = new Renter('Spanky', 30, 'Male', 'Coder');

      expect(spanky.name).to.equal('Spanky');
      expect(spanky.age).to.equal(30);
      expect(spanky.gender).to.equal('Male');
      expect(spanky).to.be.instanceof(Renter);
      expect(spanky.profession).to.equal('Coder');
      expect(spanky._cash).to.be.within(100, 5000);
    });
  });
  describe('#work', function(){
    it('should make money for rent',function(){
      var spanky = new Renter('Spanky', 30, 'Male', 'Coder');
      spanky._cash = 0;
      spanky.work();

      expect(spanky._cash).to.be.within(1000, 7000);
    });
  });
  describe('#payRent', function(){
    it('should pay rent from cash',function(){
      var spanky = new Renter('Spanky', 30, 'Male', 'Coder');
        spanky._cash = 1000;
        spanky.payRent('750');

      expect(spanky._cash).to.equal(250);
      expect(spanky._isEvicted).to.equal(false);
    });
  });
  describe('#payRent', function(){
    it('Should not pay rent, should evict Spanky',function(){
      var spanky = new Renter('Spanky', 30, 'Male', 'Coder');
        spanky._cash = 50; 
        spanky.payRent('750');
      
      expect(spanky._cash).to.equal(50);
      expect(spanky._isEvicted).to.equal(true);
    });
  });
describe('#party', function(){
  it('should evict renter if party volume is greater than 8', function(){
    var spanky;
      while(true){
        spanky = new Renter('Spanky', '35', 'm', 'social worker');
        spanky.party();

        if(spanky._isEvicted){
          break;
        }
      }
        expect(spanky._isEvicted).to.equal(true);
  });
  it('should not evict renter if party volume is less than 8', function(){
    var spanky;
      while(true){
        spanky = new Renter('Spanky', '35', 'm', 'social worker');
        spanky.party();

        if(!spanky._isEvicted){
          break;
        }
      }
        expect(spanky._isEvicted).to.equal(false);
    });
  });
});
