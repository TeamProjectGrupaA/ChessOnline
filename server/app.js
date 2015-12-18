var express = require('express');
var app = express();
app.use(express.static('../'));
var http = require('http').Server(app);
var port = 3000;
var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('New connection');

  socket.on('move', function(msg) {
    console.log(msg);
    socket.broadcast.emit('move', msg);
  });
});


http.listen(port, function() {
  console.log('listening on *: ' + port);
});
