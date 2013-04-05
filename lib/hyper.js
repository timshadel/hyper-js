/**
 * Module dependencies.
 */

var HyperDocument = require('./doc');


/**
 * Expose `createDocument()`.
 */

exports = module.exports = createDocument;

/**
 * Expose constructors.
 */

exports.HyperDocument = HyperDocument;

/**
 * Create a hyper document.
 *
 * 
 * @return {Object}
 * @api public
 */

function createDocument(input) {
  var raw = input;
  if (typeof input === 'string') {
    try {
      raw = JSON.parse(input);
    } catch (e) {
      throw new Error("Invalid JSON. Hyper documents are foremost valid JSON.", e);
    }
  }

  if (Array.isArray(raw)) {
    throw new Error("Invalid hyper document: Hyper documents must not be Arrays.");
  } else if (typeof raw !== 'object' || !raw) {
    throw new Error("Invalid input.");
  }

  return new HyperDocument(raw);
}
