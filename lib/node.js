
/*!
 * Hyper.js - Node
 * Copyright(c) 2013 Tim Shadel
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var parse = require('url').parse
  , readOnly = require('./utils').readOnly
  , hidden = require('./utils').hidden
  , merge = require('./utils').merge
  , resolve = require('url').resolve
  , EventEmitter = require('events').EventEmitter;

// expose createNode() as the module

exports = module.exports = createNode;

/**
 * Create a new node.
 *
 * @return {Function}
 * @api public
 */

function createNode(document, data, parent) {
  function node(){ if(data.action) return node.form; else return data; }
  merge(node, EventEmitter.prototype);
  readOnly(node, 'parent', parent);
  hidden(node, 'document', document);
  if (node.href) utils.merge(node, require('./link'));
  if (node.action) utils.merge(node, require('./action'));

  Object.keys(data).forEach(function(key) {
    if (typeof data[key] === 'object') {
      node[key] = createNode(document, data[key], node);
    }
  });
  return node;
}

/**
function linkObject(document, data, node) {
  if (data.href) {
    
  }
}


    if (data[key].action) {
      hidden(node[key], 'form', {});
      hidden(node[key], 'formData', {});
      node[key].submit = function() {
        var destination = parse(resolve(document.uri, data[key].action));
        var path = destination.path;
        var request = [data[key].method, path, 'HTTP/1.1'].join(' ');
        request = request + '\n\n' + JSON.stringify(node[key].formData);
        console.log('connecting to', destination.hostname, '...');
        console.log(request);
      };
    }
    if (data[key].input) {
      Object.keys(data[key].input).forEach(function(name) {
        node[key].form[name] = function() {
          if (arguments.length === 0) return node[key].formData[name];
          node[key].formData[name] = arguments[0];
        };
      });
    }

*/