// index.js
const controller = require('./controller.js');
const requests = require("./requests.js")
const cms = {
  controller,
  requests
};

module.exports = cms;

