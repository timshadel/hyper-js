
/*!
 * Hyper - Action
 * Copyright(c) 2013 Tim Shadel
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var resolve = require('url').resolve;

// prototype

var action = module.exports = {};

action.data = {};

/**
 * @emit 'open', {String} url to which we should navigate
 * @api public
 */
action.submit = function() {
  var destination = parse(this.document.resolve(this().href));
  var path = destination.path;
  var request = [this().method, path, 'HTTP/1.1'].join(' ');
  request = request + '\n\n' + JSON.stringify(this.data);
  console.log('connecting to', destination.hostname, '...');
  console.log(request);
};

action.destination = function() {
  return this.document.resolve(this().action);
};
