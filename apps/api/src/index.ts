import express from 'express';
import { createServer } from 'http';
import { Server, type Socket } from 'socket.io'; // 'type' es obligatorio por verbatimModuleSyntax
import path from 'path';
import { fileURLToPath } from 'url';

// Al usar "module": "nodenext", __dirname no existe por defecto. Lo creamos así:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Definimos la estructura del mensaje
interface MensajeChat {
    nick: string;
    texto: string;
}

// Servir la carpeta pública
app.use(express.static(path.join(process.cwd(), 'public')));

io.on('connection', (socket: Socket) => {
    console.log('*** Un usuario se ha conectado al mIRC ***');

    socket.on('mensaje_chat', (datos: MensajeChat) => {
        io.emit('mensaje_chat', datos);
    });

    socket.on('disconnect', () => {
        console.log('*** Un usuario se ha desconectado ***');
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Servidor mIRC corriendo en http://localhost:${PORT}`);
});
