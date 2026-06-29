import { Server, type Socket } from 'socket.io';
import { isValidMessage } from './validation.js';

export function attachChatHandlers(io: Server): void {
  io.on('connection', (socket: Socket) => {
    console.log('*** A user has connected ***');

    socket.on('mensaje_chat', (datos: unknown) => {
      if (!isValidMessage(datos)) {
        console.warn('mensaje_chat rejected: invalid payload', datos);
        return;
      }
      io.emit('mensaje_chat', datos);
    });

    socket.on('disconnect', () => {
      console.log('*** A user has disconnected ***');
    });
  });
}