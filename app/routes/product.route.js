
module.exports = function (app) {
  var product = require('../controllers/product.controller.js');
  var following = require('../controllers/following.controller.js');
  var comment = require('../controllers/comment.controller.js');
  app.route( '/api/product' )
     .post( comment.create , product.create_product  , comment.update , following.setCreatorFollow , following.notification , product.send )
     .get( product.list_product );

  app.route( '/api/product/:id' )
     .get( product.detail , product.read )
     .post( product.offer , following.setBiderFollow ,  product.followProduct , following.notification , product.send )
     .delete( product.delete_product , comment.delete_comment , following.setPreDelete , following.notification , product.end );

 app.route( '/api/edit/:id' )
    .get( product.detail , product.checkOwner , product.send )
    .post( product.checkOwner , product.edit );

  app.route( '/api/completed' )
      .get( product.completed );

  app.route( '/api/following' )
      .get( product.getFollowing )
      .post( product.followProduct , following.setPreFollow , following.send );

  app.route('/api/search')
      .get( product.search , product.read , product.send );



};
