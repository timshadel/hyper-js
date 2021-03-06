# hyper-js — media type client for Hyper

`hyper-js` is a data browser for the [Hyper][hyper] media type and object
model in JavaScript. It can be used both as a [component][component] in a
web browser and as a [node][node] module.

[hyper]: https://github.com/timshadel/hyper
[component]: https://github.com/component/component
[node]: http://nodejs.org

At its core, hyper-js acts quite a bit like [should.js][should]. It lets you
parse the Hyper format as pure JSON, and then work with it very simply.

[should]: https://github.com/visionmedia/should.js

```javascript
var hyper = require('hyper');

var doc = {
  "name": "Bhavesh",
  "employer": { "href": "/employers/acme" }
};

hyper(doc).employer.open();


// Results in
//
// GET /employers/acme
```

You can also take actions, similar to HTML forms.

```javascript
var hyper = require('hyper');

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

// Results in
//
// POST /register HTTP/1.1
//
// {"name":"Sam","email":"samuel@example.com"}
```

The hyper objects are bound to a frozen clone of the original
JavaScript object, and will not change if the original is changed.
