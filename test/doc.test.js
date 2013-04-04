
var hyper = require('../')
  , expect = require('expect.js');

describe('hyper.doc', function(){
  describe('should throw an exception', function(){
    it('on numbers', function(done){
      expect(function(){ hyper.doc(6); }).to.throwException(/invalid/i);
      done();
    });
    it('on regex', function(done){
      expect(function(){ hyper.doc(/bob/); }).to.throwException(/invalid/i);
      done();
    });
    it('on undefined', function(done){
      expect(function(){ hyper.doc(undefined); }).to.throwException(/invalid/i);
      done();
    });
    it('on boolean', function(done){
      expect(function(){ hyper.doc(true); }).to.throwException(/invalid/i);
      done();
    });
    it('on null', function(done){
      expect(function(){ hyper.doc(null); }).to.throwException(/invalid/i);
      done();
    });
    // Strings must be valid JSON
    it('on invalid JSON strings', function(done){
      expect(function(){ hyper.doc('I am not valid JSON.'); }).to.throwException(/valid json/i);
      done();
    });
    it('on empty strings', function(done){
      expect(function(){ hyper.doc(''); }).to.throwException(/invalid/i);
      done();
    });
    // JSON may only contain a single top-level object (really??)
    it('on valid JSON strings with top-level arrays', function(done){
      expect(function(){ hyper.doc([]); }).to.throwException(/array/i);
      done();
    });
  });

  describe('given a valid object', function(){
    describe('which has no hyper features', function(){
      it('should return a hyper doc', function(done){
        var doc = hyper.doc('{}');
        expect(doc).to.be.a(hyper.HyperDocument);
        done();
      });
    });
  });

});
