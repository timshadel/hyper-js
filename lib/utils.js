
/*!
 * Hyper - utils
 * Copyright(c) 2013 Tim Shadel
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

/**
 * Create an enumerable, read-only property on _obj_
 * with the given value.
 *
 * @param  {Object} obj
 * @param  {String} name
 * @param  {Object} value
 * @api private
 */

exports.readOnly = function(obj, name, value) {
  Object.defineProperty(obj, name, {
    configurable: false,
    enumerable: true,
    writable: false,
    value: value
  });
};

/**
 * Create an non-enumerable, read-only property on _obj_
 * with the given value.
 *
 * @param  {Object} obj
 * @param  {String} name
 * @param  {Object} value
 * @api private
 */

exports.hidden = function(obj, name, value) {
  Object.defineProperty(obj, name, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: value
  });
};


/**
 * Merge object b with object a.
 *
 *     var a = { foo: 'bar' }
 *       , b = { bar: 'baz' };
 *     
 *     utils.merge(a, b);
 *     // => { foo: 'bar', bar: 'baz' }
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 * @api private
 */

exports.merge = function(a, b){
  if (a && b) {
    for (var key in b) {
      a[key] = b[key];
    }
  }
  return a;
};
