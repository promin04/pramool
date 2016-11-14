module.exports = function (app) {
  var comment = require('../controllers/comment.controller.js');
  var following = require('../controllers/following.controller.js');
  app.route( '/comment/:_id' )
     .get( comment.getComment )
     .post( comment.postComment , following.setComment , following.notification );



}
