'use strict';
var cApt = global.mongodb.collection('apartments');
var _ = require('lodash');
var ObjectId = require('mongodb').ObjectID;

function Apartment(name){
  this.name = name;
  this.rooms = [];
  this.renters = [];
}

Apartment.prototype.save = function(cb){
  cApt.save(this, function(err, obj){
  cb();
  });
};

Apartment.prototype.area = function(){
  var sum = 0;
  for(var i = 0; i < this.rooms.length; i++){
      sum += this.rooms[i].area();
     }
     return sum;
};

Apartment.prototype.cost = function(){
    var sum = 0;
    for(var i = 0; i < this.rooms.length; i++){
        sum += this.rooms[i].cost();
        }
        return sum;
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

Apartment.find = function(query, cb){
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
