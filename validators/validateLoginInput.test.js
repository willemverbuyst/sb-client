const validateLoginInput = require('./validateLoginInput');

describe('validateLoginInput function', () => {
  test('returns false given an empty string', () => {
    expect(validateLoginInput('')).toBe(false);
  });

  test('returns false given two empty strings', () => {
    expect(validateLoginInput('', '')).toBe(false);
  });

  test('returns false given one string', () => {
    expect(validateLoginInput('email')).toBe(false);
  });

  test('returns false given one string and an empty string', () => {
    expect(validateLoginInput('email', '')).toBe(false);
    expect(validateLoginInput('', 'password')).toBe(false);
  });

  test('returns false given a number and string', () => {
    expect(validateLoginInput(123, 'password')).toBe(false);
  });

  test('returns false given a string and a number', () => {
    expect(validateLoginInput('email', 123)).toBe(false);
  });

  test('returns false given two numbers', () => {
    expect(validateLoginInput(123, 123)).toBe(false);
  });

  test('returns true given two strings', () => {
    expect(validateLoginInput('email', 'password')).toBe(true);
  });
});
