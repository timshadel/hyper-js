var hyper = require('../')
  , HyperDocument = hyper.HyperDocument
  , expect = require('expect.js')
  , EventEmitter = require('events').EventEmitter;


describe('HyperDocument', function(){

  describe("with an 'href' key", function(){

    it('should be able to open()', function(done){
      var doc = new HyperDocument({ "href": "something" }, 'http://example.com/resource');
      expect(doc).to.be.ok();
      expect(doc.open).to.be.a('function');
      expect(doc.href).to.not.be.ok();
      expect(doc).to.be.an(EventEmitter);
      doc.on('open', function(href) {
        expect(href).to.equal('http://example.com/something');
        done();
      });
      doc.open();
    });

    it('valid JSON strings of a single object', function(){
      expect(hyper.doc('{}')).to.be.a(hyper.HyperDocument);
    });

  });

});