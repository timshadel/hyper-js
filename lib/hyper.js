/**
 * Expose api via `obj#please`.
 *
 * @api public
 */

module.exports = function hyper(obj) {
  var dom = createDOM(obj); //JSON.parse(JSON.stringify(obj));
  Object.keys(obj).forEach(function(key) {
    if (typeof obj[key] === 'object') {
      dom[key] = hyper(obj[key]);
    } else {
      Object.defineProperty(dom, key, {
        set: function(val) { obj[key] = val; },
        get: function() { return obj[key]; },
        configurable: true
      });
    }
  });
  return dom;
};

/**
 * Select the appropriate DOM factory based on _obj_.
 *
 * @param {Mixed} obj
 * @api private
 */

function createDOM(obj) {
  if (obj.href) {
    return new HyperLinkDOM(obj);
  }
  if (obj.action) {
    return new HyperActionDOM(obj);
  }
  return {};
}

/**
 * Initialize a new `HyperLinkDOM` with the given _obj_.
 *
 * @param {Mixed} obj
 * @api private
 */

var HyperLinkDOM = exports.HyperLinkDOM = function HyperLinkDOM(obj) {
  this.obj = obj;
};

/**
 * Prototype.
 */

HyperLinkDOM.prototype = {

  /**
   * Follow the hyperlink.
   * @api public
   */
  open: function open() {
    console.log('GET', this.obj.href);
  }

};



/**
 * Initialize a new `HyperActionDOM` with the given _obj_.
 *
 * @param {Mixed} obj
 * @api private
 */

var HyperActionDOM = exports.HyperActionDOM = function HyperActionDOM(obj) {
  this.obj = obj;
  this.body = {};

  var self = this;
  Object.keys(this.obj.input).forEach(function(key) {
    self[key] = function(value) { self.body[key] = value; return self; };
  });

};

/**
 * Prototype.
 */

HyperActionDOM.prototype = {

  /**
   * Take the action that's been configured.
   * @api public
   */
  submit: function submit() {
    var request = [this.obj.method, this.obj.action, 'HTTP/1.1'].join(' ');
    request = request + '\n\n' + JSON.stringify(this.body);
    console.log(request);
  }

};

