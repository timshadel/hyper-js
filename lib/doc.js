
/*!
 * Hyper
 * Copyright(c) 2013 Tim Shadel
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var parse = require('url').parse
  , readOnly = require('./utils').readOnly
  , merge = require('./utils').merge
  , proto = require('./proto')
  , node = require('./node');

// expose createDocument() as the module

exports = module.exports = createDocument;

/**
 * Framework version.
 */

exports.version = '0.0.2';

/**
 * Create a new document.
 *
 * @return {Function}
 * @api public
 */

function createDocument(data, uri, referrer) {
  function doc(){ return doc.root; }
  merge(doc, proto);

  readOnly(doc, 'referrer', referrer || '');
  readOnly(doc, 'source', data);
  readOnly(doc, 'uri', uri || '');
  readOnly(doc, 'domain', parse(doc.uri).hostname || '');

  readOnly(doc, 'root', node(doc, data));

  return doc;
}
