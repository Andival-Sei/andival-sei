import { describe, it, expect } from 'vitest';
import classNames from './classNames';

describe('classNames', () => {
  it('объединяет строки', () => {
    expect(classNames('foo', 'bar')).toBe('foo bar');
  });

  it('игнорирует falsy значения', () => {
    expect(classNames('foo', null, undefined, false, 'bar')).toBe('foo bar');
  });

  it('обрабатывает объекты с условиями', () => {
    expect(classNames({ foo: true, bar: false, baz: true })).toBe('foo baz');
  });

  it('комбинирует строки и объекты', () => {
    expect(classNames('foo', { bar: true, baz: false }, 'qux')).toBe('foo bar qux');
  });

  it('возвращает пустую строку для пустых аргументов', () => {
    expect(classNames()).toBe('');
    expect(classNames(null, undefined, false)).toBe('');
  });
});
