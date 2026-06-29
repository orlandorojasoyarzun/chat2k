import { useState, type FormEvent } from 'react';
import styles from './MessageInput.module.css';

interface MessageInputProps {
  onEnviar: (texto: string) => void;
  nick: string;
  onNickChange: (nick: string) => void;
}

export default function MessageInput({ onEnviar, nick, onNickChange }: MessageInputProps) {
  const [texto, setTexto] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onEnviar(texto);
    setTexto('');
  };

  return (
    <form className={`message-input ${styles.wrapper}`} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.nickInput}
        value={nick}
        onChange={e => onNickChange(e.target.value)}
        placeholder="nick"
        maxLength={20}
      />
      <input
        type="text"
        className={styles.textoInput}
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Escribe un mensaje..."
        autoFocus
      />
      <button type="submit" className={styles.boton}>Enviar</button>
    </form>
  );
}