import styles from './ChannelList.module.css';

interface ChannelListProps {
  canales: readonly string[];
  activo: string;
  onSelect: (canal: string) => void;
}

export default function ChannelList({ canales, activo, onSelect }: ChannelListProps) {
  return (
    <aside className={`channel-list ${styles.canales}`}>
      <div className={styles.titulo}>CANALES</div>
      <ul className={styles.lista}>
        {canales.map(canal => (
          <li
            key={canal}
            className={`${styles.item} ${canal === activo ? styles.activo : ''}`}
            onClick={() => onSelect(canal)}
          >
            {canal}
          </li>
        ))}
      </ul>
    </aside>
  );
}