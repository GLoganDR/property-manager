'use strict';
var cApt = global.mongodb.collection('apartments');
var _ = require('lodash');
var ObjectId = require('mongodb').ObjectID;

function Apartment(name){
  this.name = name;
  this.rooms = [];
  this.renters = [];
}

//how to create a "getter"//
//Object.defineProperty(Apartment, 'collection', {
//  get: function(){
//    return global.mongodb.collection('apartments');
//  }
//});

Apartment.prototype.save = function(cb){
  cApt.save(this, cb);
};

Apartment.prototype.area = function(){
  var area = 0;
  for(var i = 0; i < this.rooms.length; i++){
      area += this.rooms[i].area();
     }
     return area;
};

Apartment.prototype.cost = function(){
    var cost= 0;
    for(var i = 0; i < this.rooms.length; i++){
        cost += this.rooms[i].cost();
        }
        return cost;
};

Apartment.prototype.bedrooms = function(){
  var roomCount = 0;
  for(var i = 0; i < this.rooms.length; i++){
    if(this.rooms[i].name === 'bedroom'){
      roomCount += 1;
    }
  }
      return roomCount;
};

Apartment.prototype.isAvailable = function(){
  if(this.bedrooms() > this.renters.length){
    return true;
  }else{
    return false;
  }
};

Apartment.prototype.purgeEvicted = function(){
  for(var i = this.renters.length - 1; i >= 0; i--){
    if(this.renters[i]._isEvicted){
      this.renters.splice(i, 1);
    }
  }
};

Apartment.prototype.collectRent = function(){
  for(var i = 0; i < this.renters.length; i++){
    this.renters[i].payRent(this.cost() / this.renters.length);
  }
  this.purgeEvicted();
};

Apartment.find = function(query, cb){// query is an object, cb is a function//
  cApt.find(query).toArray(function(err, apartments){
    cb(apartments);
  });
};

Apartment.findById = function(query, cb){
  cApt.findOne(query, function(err, apartments){
    cb(apartments._id);
  });
};


module.exports = Apartment;
