const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public'));

io.on('connection', socket => {
  let username = 'Guest';

  socket.on('set username', name => {
    username = name || 'Guest';
  });

  socket.on('chat message', msg => {
    const time = new Date().toLocaleTimeString();
    io.emit('chat message', {
      user: username,
      msg,
      time
    });
  });
});

server.listen(3000, () => {
  console.log('✅ Server running at http://localhost:3000');
});
