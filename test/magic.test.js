require('../lib/magic');

var doc = {
  "name": "Bhavesh",
  "employer": { "href": "/employers/acme" }
};

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

reg.register.please
  .name("Sam")
  .email("samuel@example.com")
  .submit();

