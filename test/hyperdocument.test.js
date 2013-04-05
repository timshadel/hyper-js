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
      expect(doc).to.be.an(EventEmitter);
      doc.on('open', function(href) {
        expect(href).to.equal('http://example.com/something');
        done();
      });
      doc.open();
    });

    it('should make the original object under the `data` key', function(){
      var raw = { "href": "something" };
      var equivalent = { "href": "something" };
      var doc = new HyperDocument(raw, 'http://example.com/resource');
      expect(doc.data).to.be(raw);
      expect(doc.data).to.not.be(equivalent);
      expect(doc.data).to.eql(equivalent);
    });

    it('should change if the raw object is changed', function(done){
      var raw = { "href": "something" };
      var doc = new HyperDocument(raw, 'http://example.com/resource');
      doc.on('open', function(href) {
        expect(href).to.equal('http://example.com/something');
        raw.href = "another-item";
        doc.removeAllListeners('open');
        doc.on('open', function(newref) {
          expect(newref).to.equal('http://example.com/another-item');
          done();
        });
        doc.open();
      });
      doc.open();
    });

    it('valid JSON strings of a single object', function(){
      expect(hyper.doc('{}')).to.be.a(hyper.HyperDocument);
    });

  });

});
