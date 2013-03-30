
/*!
 * Hyper - Link
 * Copyright(c) 2013 Tim Shadel
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var resolve = require('url').resolve;

// prototype

var link = module.exports = {};

/**
 * @emit 'open', {String} url to which we should navigate
 * @api public
 */
link.open = function() {
  this.emit('open', this.document.resolve(this().href));
};

