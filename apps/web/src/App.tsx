import { useEffect, useState } from 'react';
import type { MensajeChat } from '@chat2k/shared';
import { socket } from './socket';
import ChannelList from './components/ChannelList/ChannelList';
import MessageList from './components/MessageList/MessageList';
import MessageInput from './components/MessageInput/MessageInput';
import styles from './App.module.css';

const CANALES = ['#general', '#random'] as const;

export default function App() {
  const [canalActivo, setCanalActivo] = useState<string>(CANALES[0]);
  const [mensajes, setMensajes] = useState<MensajeChat[]>([]);
  const [nick, setNick] = useState<string>(() => `anon-${Math.floor(Math.random() * 1000)}`);

  useEffect(() => {
    const onMensaje = (datos: MensajeChat) => {
      setMensajes(prev => [...prev, datos]);
    };
    socket.on('mensaje_chat', onMensaje);
    return () => {
      socket.off('mensaje_chat', onMensaje);
    };
  }, []);

  const enviar = (texto: string) => {
    if (texto.trim() === '') return;
    socket.emit('mensaje_chat', { nick, texto });
  };

  return (
    <div className={styles.app}>
      <MessageList mensajes={mensajes} />
      <MessageInput onEnviar={enviar} nick={nick} onNickChange={setNick} />
      <ChannelList canales={CANALES} activo={canalActivo} onSelect={setCanalActivo} />
    </div>
  );
}