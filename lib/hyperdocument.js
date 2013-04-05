/**
 * Module dependencies.
 */

var url = require('url')
  , util = require('util')
  , EventEmitter = require('events').EventEmitter;


/**
 * Expose constructor.
 */

exports = module.exports = HyperDocument;


/**
 * Initialize a new `HyperDocument` with the given `object`
 * and `uri`. If a `uri` is not provided, the source file
 * is used as the base URI for resolving references.
 *
 * @param {Object} object
 * @param {String} uri
 * @api private
 */

function HyperDocument(object, uri) {
  this.uri = uri || 'file://' + __filename;
  Object.defineProperty(this, 'data', readOnlyClone(object));

  EventEmitter.call(this);
}
util.inherits(HyperDocument, EventEmitter);


function deepClone(object) {
  return JSON.parse(JSON.stringify(object));
}

function readOnlyClone(data) {
  return { value: deepClone(data), enumerable: true };
}

/**
 * Follow the hyperlink.
 * @api public
 */
HyperDocument.prototype.open = function open() {
  this.emit('open', url.resolve(this.uri, this.data.href));
};

