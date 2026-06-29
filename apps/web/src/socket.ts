import { io, type Socket } from 'socket.io-client';
import type { MensajeChat } from '@chat2k/shared';

export const socket: Socket = io({
  path: '/socket.io',
  autoConnect: true,
});

export type { MensajeChat };