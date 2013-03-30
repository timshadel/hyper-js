var Context = require('../lib/context');

var ctx = new Context();
ctx.on('load', function(document) {
  for (var i = 0; i < document.linked_objects.length; i++) {
    console.log('' + i + '. ' + document.linked_objects[i].href);
  }
});

ctx.open('http://facebook.com/bhavesh');
