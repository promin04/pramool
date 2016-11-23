
module.exports = function (app) {
  var product = require('../controllers/product.controller.js');
  var following = require('../controllers/following.controller.js');
  var comment = require('../controllers/comment.controller.js');
  app.route( '/product' )
     .post( comment.create , product.create  , comment.update , following.setCreatorFollow , following.notification , product.send )
     .get( product.list );


  app.route( '/product/:id' )
     .get( product.read )
     .post( product.offer , following.setBiderFollow ,  product.followProduct , following.notification , product.send )
     .delete( product.delete , comment.delete , following.setPreDelete , following.notification , product.end);
  app.param( 'id', product.detail );

  app.route( '/completed' )
      .get( product.completed );

  app.route( '/following' )
      .get( product.getFollowing )
      .post( product.followProduct , following.setPreFollow , following.send );

  app.route('/search')
      .get( product.search , product.read , product.send );

};
