import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { io as ioClient, type Socket } from 'socket.io-client';
import { createServer, type Server as HttpServer } from 'http';
import { Server as IoServer } from 'socket.io';
import { attachChatHandlers } from './chat.js';

let httpServer: HttpServer;
let io: IoServer;
let url: string;

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const connect = (target: string): Promise<Socket> =>
  new Promise<Socket>((resolve) => {
    const client = ioClient(target, { transports: ['websocket'] });
    client.on('connect', () => resolve(client));
  });

beforeAll(async () => {
  await new Promise<void>((resolve) => {
    httpServer = createServer();
    io = new IoServer(httpServer);
    attachChatHandlers(io);
    httpServer.listen(0, () => {
      const addr = httpServer.address();
      if (typeof addr === 'object' && addr !== null) {
        url = `http://localhost:${addr.port}`;
        resolve();
      }
    });
  });
});

afterAll(async () => {
  io.close();
  await new Promise<void>((resolve) => httpServer.close(() => resolve()));
});

describe('chat handler', () => {
  it('does not broadcast invalid messages', async () => {
    const sender = await connect(url);
    const receiver = await connect(url);

    const received: unknown[] = [];
    receiver.on('mensaje_chat', (msg) => received.push(msg));

    sender.emit('mensaje_chat', { nick: '', texto: '' });
    sender.emit('mensaje_chat', { notNick: 'a', notTexto: 'b' });
    sender.emit('mensaje_chat', null);

    await wait(200);

    expect(received.length).toBe(0);

    sender.disconnect();
    receiver.disconnect();
  });

  it('broadcasts a valid message to all other clients', async () => {
    const sender = await connect(url);
    const receiver = await connect(url);

    const received: unknown[] = [];
    receiver.on('mensaje_chat', (msg) => received.push(msg));

    sender.emit('mensaje_chat', { nick: 'a', texto: 'hi' });

    await wait(200);

    expect(received.length).toBe(1);
    expect(received[0]).toEqual({ nick: 'a', texto: 'hi' });

    sender.disconnect();
    receiver.disconnect();
  });
});