import { describe, it, expect } from 'vitest';
import { isValidMessage } from './validation.js';

describe('isValidMessage', () => {
  it('rejects when payload is not an object', () => {
    expect(isValidMessage(null)).toBe(false);
    expect(isValidMessage('hello')).toBe(false);
    expect(isValidMessage(42)).toBe(false);
    expect(isValidMessage([])).toBe(false);
  });

  it('rejects when nick is missing', () => {
    expect(isValidMessage({ texto: 'hi' })).toBe(false);
  });

  it('rejects when texto is missing', () => {
    expect(isValidMessage({ nick: 'a' })).toBe(false);
  });

  it('rejects whitespace-only texto', () => {
    expect(isValidMessage({ nick: 'a', texto: '   ' })).toBe(false);
    expect(isValidMessage({ nick: 'a', texto: '\t\n' })).toBe(false);
  });

  it('rejects when nick or texto are not strings', () => {
    expect(isValidMessage({ nick: 123, texto: 'hi' })).toBe(false);
    expect(isValidMessage({ nick: 'a', texto: 123 })).toBe(false);
  });

  it('accepts a well-formed message', () => {
    expect(isValidMessage({ nick: 'a', texto: 'hi' })).toBe(true);
  });
});