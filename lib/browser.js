/**
 * Module dependencies.
 */

var util = require('util')
  , EventEmitter = require('events').EventEmitter;


/**
 * Expose constructor.
 */

exports = module.exports = HyperBrowser;


/**
 * Initialize a new `HyperDocument` with the given `object`
 * and `uri`. If a `uri` is not provided, the source file
 * is used as the base URI for resolving references.
 *
 * @param {Object} object
 * @param {String} uri
 * @api private
 */

function HyperBrowser() {
  EventEmitter.call(this);
}
util.inherits(HyperBrowser, EventEmitter);


HyperBrowser.prototype.load = function(uri) {
	this.emit('request', uri, this.assignDoc);
};

HyperBrowser.prototype.assignDoc = function(doc) {
  // this.doc = doc;
  doc.on('open', function(href) {
  	console.log('Browser opening', href);
  });
};