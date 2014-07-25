'use strict';


function Apartment(name){
  this.name = name;
  this.rooms = [];
  this.renters = [];
}

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
  var roomCount = 0;
  for(var i = 0; i < this.renters.length; i++){
  //  if(this.rooms[i].name === 'bedroom'){
   //   roomCount += 1;
     if(this.bedrooms > this.renters.length){
       this.isAvailable = true;
     }else{
       this.isAvailable = false;
     }
    }
  
      return roomCount;
  };














module.exports = Apartment;
