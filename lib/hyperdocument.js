/**
 * Module dependencies.
 */

var url = require('url')
  , util = require('util')
  , EventEmitter = require('events').EventEmitter
  , cloner = require('./cloner');


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
  Object.defineProperty(this, 'data', cloner.frozen.property(object));

  EventEmitter.call(this);
}
util.inherits(HyperDocument, EventEmitter);


/**
 * Follow the hyperlink.
 * @api public
 */
HyperDocument.prototype.open = function open() {
  this.emit('open', url.resolve(this.uri, this.data.href));
};
