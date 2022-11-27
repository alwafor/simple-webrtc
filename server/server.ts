import express from 'express';
import { createServer } from 'http';
import { SocketAddress } from 'net';
import socketIo from 'socket.io';
import { Server } from 'socket.io';
import { ACTIONS } from './socket/actions';

const server = createServer();
const io = new Server(server);

const app = express();
const PORT = 5000;

function getClientRooms() {
  const { rooms } = io.sockets.adapter;
  return rooms;
}

server.listen(PORT, () => {
  console.log('Server listens on port ', PORT);
});

function shareRoomsInfo() {
  io.emit(ACTIONS.SHARE_ROOMS, {
    rooms: getClientRooms(),
  });
}

io.on('connection', (socket) => {
  shareRoomsInfo();

  socket.on(ACTIONS.JOIN, (config) => {
    const { room: roomId } = config;
    const { rooms: joinedRooms } = socket;

    if (Array.from(joinedRooms).includes(roomId)) {
      return console.warn(`Already joined to ${roomId}`);
    }

    const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);
    clients.forEach((clientId) => {
      io.to(clientId).emit(ACTIONS.ADD_PEER, {
        peerId: socket.id,
        createOffer: false,
      });

      socket.emit(ACTIONS.ADD_PEER, {
        peerId: clientId,
        createOffer: true,
      });
    });

    socket.join(roomId);
    shareRoomsInfo();
  });

  function leaveRoom() {
    const { rooms } = socket;
    Array.from(rooms).forEach((roomId) => {
      const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []);

      clients.forEach((clientId) => {
        io.to(clientId).emit(ACTIONS.REMOVE_PEER, {
          peerId: socket.id,
        });

        socket.emit(ACTIONS.REMOVE_PEER, {
          peerId: clientId,
        });
      });

      socket.leave(roomId);
    });

    shareRoomsInfo();
  }

  socket.on(ACTIONS.LEAVE, leaveRoom);
  socket.on('disconnecting', leaveRoom);
});
