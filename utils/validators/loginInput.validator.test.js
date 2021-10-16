const isValidLoginInput = require('./loginInput.validator');

describe('isValidLoginInput', () => {
  test('returns false given an empty string', () => {
    expect(isValidLoginInput('')).toBe(false);
  });

  test('returns false given 1 string', () => {
    expect(isValidLoginInput('email')).toBe(false);
  });

  test('returns false given 1 string and an empty string', () => {
    expect(isValidLoginInput('email', '')).toBe(false);
  });

  test('returns false given a number and string', () => {
    expect(isValidLoginInput(123, 'password')).toBe(false);
  });

  test('returns false given a string and a number', () => {
    expect(isValidLoginInput('email', 123)).toBe(false);
  });

  test('returns false given 2 numbers', () => {
    expect(isValidLoginInput(123, 123)).toBe(false);
  });

  test('returns true given 2 strings', () => {
    expect(isValidLoginInput('email', 'password')).toBe(true);
  });
});
