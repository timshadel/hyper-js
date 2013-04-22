/**
 * Test dependencies.
 */

var hyper = require('../')
  , expect = require('expect.js');


/**
 * Fake `doc` inputs.
 */

function fakeDocLoad(browser, fakeDocs) {
  browser.on('request', function(uri, doc){
    var raw = fakeDocs[uri] || {};
    doc(new hyper.HyperDocument(raw, uri));
  });
}

describe('hyper.browser()', function(){
  it('should follow links', function(done){
    var browser = new hyper.HyperBrowser();
    fakeDocLoad(browser, {
      'http://example.com/person': { href: 'person', name: 'Bob Jones', employer: { href: 'employer' } },
      'http://example.com/employer': { href: 'employer', name: 'Awesome Company, Inc.' }
    });

    browser.once('ready', function(){
      expect(browser.doc.uri).to.equal('http://example.com/person');
      expect(browser.doc.employer.data.href).to.equal('employer');
      
      browser.once('ready', function() {
        expect(browser.doc.uri).to.equal('http://example.com/employer');
        expect(browser.doc.data.name).to.equal('Awesome Company, Inc.');
        done();
      });

      // Open the hyperlink
      browser.doc.employer.open();
    })

    browser.load('http://example.com/person');
  });
});
