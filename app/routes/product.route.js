
module.exports = function (app) {
  var product = require('../controllers/product.controller.js');
  app.route('/product/')
     .post(product.create)
     .get(product.list)


  app.route('/product/:id')
     .get(product.read)
     .post(product.offer)
     .delete(product.delete);
  app.param('id',product.detail);

  app.route('/completed')
      .get(product.completed);

  app.route('/myProduct')
      .get(product.myProduct);

  app.route('/following')
      .get(product.following);
};
