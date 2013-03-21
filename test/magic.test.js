var hyper = require('..');

var doc = {
  "name": "Bhavesh",
  "employer": { "href": "/employers/acme" }
};

hyper(doc);
doc.employer.please.open();

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

hyper(reg);
reg.register.please
  .name("Sam")
  .email("samuel@example.com")
  .submit();

