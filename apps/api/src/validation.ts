import type { MensajeChat } from '@chat2k/shared';

export function isValidMessage(payload: unknown): payload is MensajeChat {
  if (typeof payload !== 'object' || payload === null) return false;
  const { nick, texto } = payload as Record<string, unknown>;
  if (typeof nick !== 'string') return false;
  if (typeof texto !== 'string') return false;
  if (texto.trim() === '') return false;
  return true;
}