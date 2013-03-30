
/*!
 * Hyper
 * Copyright(c) 2011 Tim Shadel
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var http = require('http')
  , parse = require('url').parse
  , utils = require('./utils')
  , url = require('url');

// prototype

var proto = module.exports = {};

proto.linked_objects = [];
proto.actions = [];
proto.external_resources = [];

proto.resolve = function resolve(href) {
  return url.resolve(this.uri, href);
};

/**

document.linked_objects = [];
document.actions = [];
document.external_resources = [];
document.referrer = null;
document.data = {};

document.uri = uri;
document.domain = url.parse(uri).hostname;

*/