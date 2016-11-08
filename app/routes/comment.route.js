module.exports = function (app) {
  var comment = require('../controllers/comment.controller.js');

  app.route( '/comment/:_id' )
     .get( comment.getComment )
     .post( comment.postComment );



}
