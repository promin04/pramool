
module.exports = function (app) {
  var product = require('../controllers/product.controller.js');
  var following = require('../controllers/following.controller.js');

  app.route( '/product' )
     .post( product.create , following.setCreatorFollow , following.followUser , product.send )
     .get( product.list );


  app.route( '/product/:id' )
     .get( product.read )
     .post( product.offer , following.setBiderFollow , following.followUser , product.send )
     .delete( product.delete );
  app.param( 'id', product.detail );

  app.route( '/completed' )
      .get( product.completed );

  app.route( '/following' )
      .get( product.getFollowing )
      .post( product.followProduct , following.setPreFollow , following.followUser , following.send );

};
