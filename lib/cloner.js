/**
 * Module dependencies.
 */


/**
 * Freeze an object, all the way down. You shouldn't ever
 * call this, or else strange things may happen at the Circle K.
 *
 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/freeze
 *
 * @param {Object} object
 * @api private
 */

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

exports.frozen = function(data) {
  return deepFreeze(deepClone(data));
};
exports.freeze = exports.frozen;

exports.frozen.property = function(data) {
  return { value: exports.frozen(data), enumerable: true };
};

exports.thawed = function(data) {
  return deepClone(data);
};
exports.clone = exports.thawed;

exports.thawed.property = function(data) {
  return { value: exports.thawed(data), enumerable: true, writable: true, configurable: true };
};
