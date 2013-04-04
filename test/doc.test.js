/**
 * Test dependencies.
 */

var hyper = require('../')
  , expect = require('expect.js');


/**
 * Test `doc` inputs.
 */

function docWith(arg) {
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
      expect(docWith(6)).to.throwException(/invalid/i);
      expect(docWith('6')).to.throwException(/invalid/i);
    });
    it.skip('regex', function(){
      expect(docWith(/bob/)).to.throwException(/invalid/i);
      expect(docWith('/bob/')).to.throwException(/invalid/i);
    });
    it('undefined', function(){
      expect(docWith(undefined)).to.throwException(/invalid/i);
      expect(docWith('undefined')).to.throwException(/invalid/i);
    });
    it('boolean', function(){
      expect(docWith(true)).to.throwException(/invalid/i);
      expect(docWith('true')).to.throwException(/invalid/i);
      expect(docWith(false)).to.throwException(/invalid/i);
      expect(docWith('false')).to.throwException(/invalid/i);
    });
    it('null', function(){
      expect(docWith(null)).to.throwException(/invalid/i);
      expect(docWith('null')).to.throwException(/invalid/i);
    });
    // Strings must be valid JSON
    it('invalid JSON strings', function(){
      expect(docWith('I am not valid JSON.')).to.throwException(/valid json/i);
    });
    it('empty strings', function(){
      expect(docWith('')).to.throwException(/invalid/i);
    });
    // JSON may only contain a single top-level object (really??)
    it('valid JSON strings with top-level arrays', function(){
      expect(docWith([])).to.throwException(/array/i);
      expect(docWith('[]')).to.throwException(/array/i);
    });
  });

});
