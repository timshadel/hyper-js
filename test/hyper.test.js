var hyper = require('..')
  , http = require('./fake-http')
  , doc = http.get(0)
  , reg = http.get(1);

hyper(doc).employer.open();

hyper(reg)
  .register
  .name("Sam")
  .email("samuel@example.com")
  .submit();

var form = hyper(reg)
  .register
  .name("Sam")
  .email("samuel@example.com");

// TODO
// form.data.register.action = '/update';
// form.rewire();
// form.submit();

