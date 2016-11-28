"use strict"
var index = require('../controllers/index.controller.js');
module.exports = function (app) {
  //require controllers

  app.get('/',index.render);
  app.get('/completed',index.render);
  app.get('/product/*',index.render);
  app.get('/new-product',index.render);
  app.get('/404',index.render);
};
