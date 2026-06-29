import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { attachChatHandlers } from './chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(process.cwd(), 'public')));

attachChatHandlers(io);

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`chat2k api running at http://localhost:${PORT}`);
});