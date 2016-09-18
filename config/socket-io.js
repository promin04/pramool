
module.exports =function (server) {
  var io = require('socket.io')(server);
  io.on('connection',function (socket) {
    socket.on('offer',function (offer) {
      console.log(offer,'offer');
      io.to(offer.name).emit('offer',offer);
      io.to('store').emit('offer',offer);
    });

    socket.on('join',function (nameRoom) {
        socket.join(nameRoom);
        console.log('welcome to this room',nameRoom);
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
