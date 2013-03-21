/**
 * Expose api via `obj#please`.
 *
 * @api public
 */

module.exports = function hyper(obj) {
  var dom = JSON.parse(JSON.stringify(obj));
  Object.keys(dom).forEach(function(key) {
    if (typeof dom[key] === 'object') {
      dom[key] = hyper(dom[key]);
    }
  });
  Object.defineProperty(dom, 'please', {
    set: function(){},
    get: function(){
      return createDOM(this.valueOf() == this ? this.valueOf() : this);
    },
    configurable: true
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

