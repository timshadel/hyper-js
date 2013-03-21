var hyper = require('..');

var doc = {
  "name": "Bhavesh",
  "employer": { "href": "/employers/acme" }
};

hyper(doc).employer.open();
console.log(hyper(doc));

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

hyper(reg).register
  .name("Sam")
  .email("samuel@example.com")
  .submit();

console.log(hyper(reg));