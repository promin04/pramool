
module.exports = function (app) {
  var product = require('../controllers/product.controller.js');
  app.route('/product')
     .post(product.create)
     .get(product.list)
     .delete(product.delete);

  app.route('/product/:id')
     .get(product.read)
     .post(product.offer);
  app.param('id',product.detail);

  app.route('/completed')
      .get(product.completed);

};
