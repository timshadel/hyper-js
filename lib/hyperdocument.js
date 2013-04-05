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
  Object.defineProperty(this, 'data', frozenClone(object));

  EventEmitter.call(this);
}
util.inherits(HyperDocument, EventEmitter);

function deepFreeze (o) {
  var prop, propKey;
  Object.freeze(o); // First freeze the object.
  for (propKey in o) {
    prop = o[propKey];
    if (o.hasOwnProperty(propKey) && (typeof prop === "object")) {
      deepFreeze(prop); // Recursively call deepFreeze.
    }
  }
  return o;
}

function deepClone(object) {
  return JSON.parse(JSON.stringify(object));
}

function readOnlyClone(data) {
  return { value: deepClone(data), enumerable: true };
}

function frozen(data) {
  return { value: deepFreeze(data), enumerable: true };
}

function frozenClone(data) {
  return { value: deepFreeze(deepClone(data)), enumerable: true };
}

/**
 * Follow the hyperlink.
 * @api public
 */
HyperDocument.prototype.open = function open() {
  this.emit('open', url.resolve(this.uri, this.data.href));
};

