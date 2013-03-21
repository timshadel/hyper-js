/**
 * Expose api via `obj#please`.
 *
 * @api public
 */

module.exports = function hyper(obj) {
  var dom = createDOM(obj);
  Object.keys(obj).forEach(function(key) {
    if (typeof obj[key] === 'object') {
      dom[key] = hyper(obj[key]);
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
  var dom = Object.create(obj);
  if (obj.href) {
    Object.keys(HyperLinkDOM.prototype).forEach(function(key) {
      dom[key] = HyperLinkDOM.prototype[key];
    });
    return dom;
  }
  if (obj.action) {
    HyperActionDOM.apply(dom);
    Object.keys(HyperActionDOM.prototype).forEach(function(key) {
      dom[key] = HyperActionDOM.prototype[key];
    });
    return dom;
  }
  return dom;
}

/**
 * Initialize a new `HyperLinkDOM` with the given _obj_.
 *
 * @param {Mixed} obj
 * @api private
 */

var HyperLinkDOM = exports.HyperLinkDOM = function HyperLinkDOM() {
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
    console.log('GET', this.href);
  }

};



/**
 * Initialize a new `HyperActionDOM` with the given _obj_.
 *
 * @param {Mixed} obj
 * @api private
 */

var HyperActionDOM = exports.HyperActionDOM = function HyperActionDOM() {
  Object.defineProperty(this, 'body', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: {}
  });

  var self = this;
  Object.keys(this.input).forEach(function(key) {
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
    var request = [this.method, this.action, 'HTTP/1.1'].join(' ');
    request = request + '\n\n' + JSON.stringify(this.body);
    console.log(request);
  }

};

