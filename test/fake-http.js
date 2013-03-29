var http = {

  responses: [
    {
      "name": "Bhavesh",
      "employer": { "href": "/employers/acme" }
    },
    {
      "register": {
        "action": "/register",
        "method": "POST",
        "input": {
          "name": "text",
          "email": "text"
        }
      }
    }
  ],

  get: function(index) {
    return this.responses[index];
  }
};


module.exports = http;
