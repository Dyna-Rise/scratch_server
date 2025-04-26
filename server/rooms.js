const rooms = {};

function joinRoom(roomId, socket, userType) {
  if (!rooms[roomId]) rooms[roomId] = { teacher: null, students: {} };

  if (userType === 'teacher') {
    rooms[roomId].teacher = socket;
  } else {
    rooms[roomId].students[socket.id] = socket;
  }
  socket.join(roomId);

  broadcastUsers(roomId);
}

function broadcastSnapshot(roomId, studentId, image) {
  const teacher = rooms[roomId]?.teacher;
  if (teacher) {
    teacher.emit('update_snapshot', { studentId, image });
  }
}

function broadcastUsers(roomId) {
  const room = rooms[roomId];
  if (room) {
    const userList = Object.keys(room.students);
    const teacher = room.teacher;
    if (teacher) teacher.emit('room_users', userList);
    userList.forEach(id => {
      room.students[id].emit('room_users', userList);
    });
  }
}

function leaveRoom(socket) {
  for (const roomId in rooms) {
    const room = rooms[roomId];
    if (room.teacher === socket) {
      delete rooms[roomId];
    } else if (room.students[socket.id]) {
      delete room.students[socket.id];
      broadcastUsers(roomId);
    }
  }
}

module.exports = { joinRoom, broadcastSnapshot, leaveRoom };
