import { useEffect, useRef } from 'react';
import type { MensajeChat } from '@chat2k/shared';
import styles from './MessageList.module.css';

interface MessageListProps {
  mensajes: MensajeChat[];
}

export default function MessageList({ mensajes }: MessageListProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [mensajes]);

  return (
    <div ref={ref} className={`message-list ${styles.lista}`}>
      {mensajes.length === 0 && (
        <div className={styles.vacio}>No hay mensajes todavía. Escribe algo abajo.</div>
      )}
      {mensajes.map((m, i) => (
        <div key={i} className={styles.mensaje}>
          <span className={styles.nick}>&lt;{m.nick}&gt;</span>
          <span className={styles.texto}>{m.texto}</span>
        </div>
      ))}
    </div>
  );
}