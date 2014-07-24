/*global describe, it */
/* jshint camelcase:false */
'use strict';

var expect = require('chai').expect;
//var connect = require('../../app/lib/mongodb');
//var Mongo = require('mongodb');
var Room = require('../../app/models/room');

describe('Room', function(){
  describe('constructor', function(){
    it('should create a new room', function(){
      var living = new Room('Living Room', 20, 15);

      expect(living).to.be.instanceof(Room);
      expect(living.name).to.equal('Living Room');
      expect(living.length).to.equal(20);
      expect(living.width).to.equal(15);
    });
  });
  describe('#area', function(){
    it('should find the area of a room', function(){
      var living = new Room('Living Room', 20, 15);

      expect(living.area()).to.equal(300);
    });
  });

  describe('#cost', function(){
    it('should find the cost of a room', function(){
      var living = new Room('Living Room', 20, 15);

      expect(living.cost()).to.equal(1500);
    });
  });
});
