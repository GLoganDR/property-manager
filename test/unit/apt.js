/*global describe, it */
/* jshint camelcase:false */
'use strict';

var expect = require('chai').expect;
var Apartment = require('../../app/models/apt');

describe('Apartment', function(){
  describe('constructor', function(){
    it('should create a new Apartment', function(){
      var a1 = new Apartment('A1');

        expect(a1).to.be.instanceof(Apartment);
        expect(a1.unit).to.equal('A1');
    });
  });
});
