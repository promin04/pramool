
module.exports =function (server) {
  var io = require('socket.io')(server);
  io.on('connection',function (socket) {
    socket.on('offer',function (offer) {
      console.log(offer,'offer');
      io.to(offer.product_id).emit('offer',offer);
      io.to('store').emit('offer',offer);
    });

    socket.on('join',function (name_room) {
        socket.join(name_room);
        console.log('welcome to this room',name_room);
        console.log('rooms list',socket.rooms);
    });

    socket.on('joinAll',function (array_room) {
      for(var i = 0 ; i < array_room.length ; i++){
        console.log('welcome to this room',array_room[i]);
        socket.join(array_room[i]);
      }
      console.log('rooms list',socket.rooms);
    });

    socket.on('leave',function (name_room) {
        socket.leave(name_room);
        console.log('leave to',name_room);

    });

    socket.on('leaveAll',function (array_room) {
      for(var i = 0 ; i < array_room.length ; i++){
        console.log('leave to this room',array_room[i]);
        socket.leave(array_room[i]);
      }
      console.log('rooms list',socket.rooms);
    });

    socket.on('create',function (product) {
      socket.broadcast.emit('create',product);
      console.log('product update ',product);
    });
  })
}
