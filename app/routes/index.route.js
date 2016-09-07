"use strict"
var index = require('../controllers/index.controller.js');
module.exports = function (app) {
  //require controllers

  app.get('/',index.render);
};
