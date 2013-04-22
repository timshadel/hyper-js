/**
 * Module dependencies.
 */

var util = require('util')
  , url = require('url')
  , cloner = require('./cloner');


/**
 * Expose constructor.
 */

exports = module.exports = HyperNode;


/**
 * Initialize a new `HyperNode` with the given `object`.
 * The node will walk `object` to make sub nodes.
 *
 * @param {Object} object
 * @api private
 */

function HyperNode(object, document) {
  this.document = document;
  var data = {};
  var keys = Object.keys(object);
  for (var i = 0; i < keys.length; i++) {
    if (typeof object[keys[i]] === 'object') {
      this[keys[i]] = new HyperNode(object[keys[i]], document);
    } else {
      data[keys[i]] = object[keys[i]];
    }
  };
  Object.defineProperty(this, 'data', cloner.frozen.property(data));
  if (this.data.href) {
    this.open = open;
    this.document.links = this.document.links || [];
    this.document.links.push(this);
  }
}


/**
 * Follow the hyperlink. Added only if this.data.href exists.
 * @api public
 */
function open() {
  this.document.emit('open', url.resolve(this.document.uri, this.data.href));
};
