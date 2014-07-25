'use strict';

//var = global.mongodb.collection('');
//var _ = require('lodash');

function Renter(name, age, gender, profession){
  this.name = name;
  this.age = parseInt(age);
  this.gender = gender;
  this._cash = Math.random() * 400 + 100;
  this.profession = profession;

  this._isEvicted = false;
  }

Renter.prototype.work = function(work){
  switch(this.profession){
    case 'Movie Star':
      this._cash += Math.floor(Math.random() * 7001) + 3000;
      break;
    case 'Coder':
      this._cash += Math.floor(Math.random() * 6001) + 1000;
      break;
    case 'Waiter':
      this._cash += Math.floor(Math.random() * 201) + 50;
      break;
    case 'Social Worker':
      this._cash += Math.floor(Math.random() * 601) + 150;
  }
};

Renter.prototype.payRent = function(amount){
      if(this._isEvicted){return;}

      amount = parseInt(amount);
      this._isEvicted = this._cash < amount;

      if(!this._isEvicted){
        this._cash -= amount;
      }
};

Renter.prototype.party = function(){
  if(this._isEvicted){return;}

  var volume = Math.floor(Math.random() * 10) + 1;
  this._isEvicted = volume > 8;
};





module.exports = Renter;




























