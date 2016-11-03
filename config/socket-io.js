
module.exports =function (io) {

  GLOBAL.clients =[];

  io.on('connection',function (socket) {

    socket.on('disconnect', function () {
        for (var i = 0; i < GLOBAL.clients.length; i++) {
          if(GLOBAL.clients[i].clientId == socket.id){
            GLOBAL.clients.splice(i,1);
            console.log('all clients ',GLOBAL.clients);
            break;
          }
        }
    });

    socket.on('clientInfo',function (username) {
      var clientInfo = new Object();
           clientInfo.username = username;
           clientInfo.clientId = socket.id;
           GLOBAL.clients.push(clientInfo);
          console.log('all clients ',GLOBAL.clients);
    });

    socket.on('clientLogout',function () {
      for (var i = 0; i < GLOBAL.clients.length; i++) {
        if(GLOBAL.clients[i].clientId == socket.id){
          GLOBAL.clients.splice(i,1);
          console.log('all clients ',GLOBAL.clients);
          break;
        }
      }
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
    socket.on('error', function(err) {
        console.log('Socket io error',err);
    });

  })
}
