/**
 * Test dependencies.
 */

var hyper = require('../')
  , expect = require('expect.js');


/**
 * Test `doc` inputs.
 */

function doc(arg) {
  return function() {
    hyper.doc(arg);
  };
}

describe('hyper.doc()', function(){

  describe('should accept', function(){
    it('plain objects', function(){
      expect(hyper.doc({})).to.be.a(hyper.HyperDocument);
    });
    it('valid JSON strings of a single object', function(){
      expect(hyper.doc('{}')).to.be.a(hyper.HyperDocument);
    });
  });

  // Test variants of invalid inputs
  describe('should not accept', function(){
    it('numbers', function(){
      expect(doc(6)).to.throwException(/invalid input/i);
      expect(doc('6')).to.throwException(/invalid input/i);
    });
    it.skip('regex', function(){
      expect(doc(/bob/)).to.throwException(/invalid input/i);
      expect(doc('/bob/')).to.throwException(/invalid input/i);
    });
    it('undefined', function(){
      expect(doc(undefined)).to.throwException(/invalid input/i);
    });
    it('boolean', function(){
      expect(doc(true)).to.throwException(/invalid input/i);
      expect(doc('true')).to.throwException(/invalid input/i);
      expect(doc(false)).to.throwException(/invalid input/i);
      expect(doc('false')).to.throwException(/invalid input/i);
    });
    it('null', function(){
      expect(doc(null)).to.throwException(/invalid input/i);
      expect(doc('null')).to.throwException(/invalid input/i);
    });
    // Strings must be valid JSON
    it('invalid JSON strings', function(){
      expect(doc('I am not valid JSON.')).to.throwException(/invalid json/i);
    });
    it('empty strings', function(){
      expect(doc('')).to.throwException(/invalid json/i);
    });
    // JSON may only contain a single top-level object (really??)
    it('valid JSON strings with top-level arrays', function(){
      expect(doc([])).to.throwException(/array/i);
      expect(doc('[]')).to.throwException(/array/i);
    });
  });

});
