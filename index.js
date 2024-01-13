// index.js
const controller = require('./controller.js');
const requests = require("./requests.js");
const { gok, gov } = require("./objects.js");
const cms = {
  controller,
  requests,
  gok,
  gov
};

module.exports = cms;

