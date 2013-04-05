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
  var frozen = deepFreeze(deepClone(data));
  return frozen;
};

exports.frozen.property = function(data) {
  return { value: exports.frozen(data), enumerable: true };
};

exports.thawed = function(data) {
  var thawed = deepClone(data);
  thawed.property = { value: thawed, enumerable: true, writable: true, configurable: true };
  return thawed;
};
