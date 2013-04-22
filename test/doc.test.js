/**
 * Module dependencies.
 */

var HyperDocument = require('../').HyperDocument
  , HyperNode = require('../').HyperNode
  , expect = require('expect.js')
  , EventEmitter = require('events').EventEmitter;


/**
 * Test those docs!
 */

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

    it('should expose the original data under the `data` key', function(){
      var raw = { "href": "something" };
      var equivalent = { "href": "something" };
      var doc = new HyperDocument(raw, 'http://example.com/resource');
      expect(doc.data).to.not.be(raw);
      expect(doc.data).to.not.be(equivalent);
      expect(doc.data).to.eql(raw);
      expect(doc.data).to.eql(equivalent);
    });

    it('should freeze `data`', function(){
      var raw = { "href": "something" };
      var blank = {};
      var doc = new HyperDocument(raw, 'http://example.com/resource');
      doc.data = blank;
      expect(doc.data).to.not.eql(blank);
      expect(doc.data).to.eql(raw);
    });

    it('should not change if the raw object is changed', function(done){
      var raw = { "href": "something" };
      var doc = new HyperDocument(raw, 'http://example.com/resource');
      doc.on('open', function(href) {
        expect(href).to.equal('http://example.com/something');
        raw.href = "another-item";
        doc.removeAllListeners('open');
        doc.on('open', function(newref) {
          expect(newref).to.equal('http://example.com/something');
          done();
        });
        doc.open();
      });
      doc.open();
    });

  });


  describe("with subdocument", function(){

    it('should be able to open()', function(done){
      var doc = new HyperDocument({ "href": "something", "employer": { "href": "employer" } }, 'http://example.com/individual');
      expect(doc.employer).to.be.ok();
      expect(doc.employer.open).to.be.a('function');
      expect(doc.employer).not.to.be.an(EventEmitter);
      expect(doc.employer).to.be.a(HyperNode);
      doc.on('open', function(href) {
        expect(href).to.equal('http://example.com/employer');
        done();
      });
      doc.employer.open();
    });

    it('should be collect all links', function(){
      var doc = new HyperDocument({ "href": "something", "employer": { "href": "employer", "stock": { "href": "stock" } } }, 'http://example.com/individual');
      expect(doc.links).to.be.ok();
      expect(doc.links.length).to.be(3);
    });

  });

});
