"use strict"
module.exports = function (app) {
  //require controllers
  var index = require('../controllers/index.controller.js');
  app.get('/',index.render);
};
