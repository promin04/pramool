
module.exports =function (server) {
  var io = require('socket.io')(server);
  io.on('connection',function (socket) {
    socket.on('offer',function (offer) {
      console.log(offer,'offer');
      io.to(offer.product_id).emit('offer',offer);
      io.to('store').emit('offer',offer);
    });

    socket.on('join',function (product_id) {
        socket.join(product_id);
        console.log('welcome to this room',product_id);
    });

    socket.on('leave',function () {
    //leave all rooms
    var count = 1;
    for (var room in socket.rooms) {
      if (count>1) {
        socket.leave(room);
      } else {
        count++;
      }
    }
    });

    socket.on('create',function (product) {
      socket.broadcast.emit('create',product);
      console.log('product update ',product);
    });
  })
}
