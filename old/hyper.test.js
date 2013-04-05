var expect = require('expect.js');
var hyper = require('../lib/hyper');

describe('a hyper object', function () {

  it('should be able to open()', function () {
    var doc = {
      "name": "Bhavesh",
      "employer": { "href": "/employers/acme" }
    };
    var obj = hyper(doc).employer;
    expect(obj.open).to.be.a('function');
  });

});

describe('a hyper action', function () {

  it('should be able to submit()', function () {
    var doc = {
      "register": {
        "action": "/register",
        "method": "POST",
        "input": {
          "name": "text",
          "email": "text"
        }
      }
    };
    var obj = hyper(doc).register;
    expect(obj.submit).to.be.a('function');
  });

});

