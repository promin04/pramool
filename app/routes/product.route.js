
module.exports = function (app) {
  var product = require('../controllers/product.controller.js');
  app.route('/product')
     .post(product.create)
     .get(product.read)
     .delete(product.delete);

  app.route('/completed')
      .get(product.completed);

};
