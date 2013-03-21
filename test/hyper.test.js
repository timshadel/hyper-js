var hyper = require('..');

var doc = {
  "name": "Bhavesh",
  "employer": { "href": "/employers/acme" }
};

hyper(doc).employer.open();

var reg = {
  "register": {
    "action": "/register",
    "method": "POST",
    "input": {
      "name": "text",
      "email": "text"
    }
  }
};

hyper(reg)
  .register
  .name("Sam")
  .email("samuel@example.com")
  .submit();

var form = hyper(reg)
  .register
  .name("Sam")
  .email("samuel@example.com");

reg.register.action = '/update';
form.submit();