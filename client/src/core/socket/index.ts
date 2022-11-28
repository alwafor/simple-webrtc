import { io, ManagerOptions, SocketOptions } from 'socket.io-client';

const options: Partial<ManagerOptions & SocketOptions> = {
  forceNew: true,
  reconnectionAttempts: Infinity,
  timeout: 10000,
  transports: ['websocket'],
};

const socket = io('http://localhost:5000', options);

export default socket;
