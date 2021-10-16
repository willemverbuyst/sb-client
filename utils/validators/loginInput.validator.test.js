const validateLoginInput = require('./loginInput.validator');

describe('validateLoginInput function', () => {
  test('returns false given an empty string', () => {
    expect(validateLoginInput('')).toBe(false);
  });

  test('returns false given 1 string', () => {
    expect(validateLoginInput('email')).toBe(false);
  });

  test('returns false given 1 string and an empty string', () => {
    expect(validateLoginInput('email', '')).toBe(false);
  });

  test('returns false given a number and string', () => {
    expect(validateLoginInput(123, 'password')).toBe(false);
  });

  test('returns false given a string and a number', () => {
    expect(validateLoginInput('email', 123)).toBe(false);
  });

  test('returns false given 2 numbers', () => {
    expect(validateLoginInput(123, 123)).toBe(false);
  });

  test('returns true given 2 strings', () => {
    expect(validateLoginInput('email', 'password')).toBe(true);
  });
});
