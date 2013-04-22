/**
 * Module dependencies.
 */

var util = require('util')
  , url = require('url')
  , EventEmitter = require('events').EventEmitter
  , HyperNode = require('./node')
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
  EventEmitter.call(this);
  HyperNode.call(this, object, this);
}
util.inherits(HyperDocument, EventEmitter);


/**
 * Follow the hyperlink.
 * @api public
 */
HyperDocument.prototype.open = function open() {
  this.emit('open', url.resolve(this.uri, this.data.href));
};
