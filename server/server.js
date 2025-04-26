const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const rooms = require('./rooms');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('接続:', socket.id);

  socket.on('join_room', ({ roomId, userType }) => {
    rooms.joinRoom(roomId, socket, userType);
  });

  socket.on('update_snapshot', ({ roomId, image }) => {
    rooms.broadcastSnapshot(roomId, socket.id, image);
  });

  socket.on('disconnect', () => {
    rooms.leaveRoom(socket);
  });
});

app.use(express.static('scratch'));

server.listen(3000, () => {
  console.log('サーバー起動中 http://localhost:3000');
});
