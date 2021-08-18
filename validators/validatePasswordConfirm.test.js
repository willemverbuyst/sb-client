const validatePasswordConfirm = require('./validatePasswordConfirm');

describe('validatePasswordConfirm function', () => {
  test('returns false given an empty string', () => {
    expect(validatePasswordConfirm('')).toBe(false);
  });

  test('returns false given 1 string', () => {
    expect(validatePasswordConfirm('password')).toBe(false);
  });

  test('returns false given 1 string and an empty string', () => {
    expect(validatePasswordConfirm('password', '')).toBe(false);
  });

  test('returns false given a number and a string', () => {
    expect(validatePasswordConfirm(123, 'password')).toBe(false);
  });

  test('returns false given a string and a number', () => {
    expect(validatePasswordConfirm('email', 123)).toBe(false);
  });

  test('returns false given 2 numbers', () => {
    expect(validatePasswordConfirm(123, 123)).toBe(false);
  });

  test('returns false given 2 strings that are not the same', () => {
    expect(validatePasswordConfirm('firstPassword', 'secondPassword')).toBe(
      false,
    );
  });

  test('returns true given 2 strings that are the same', () => {
    expect(validatePasswordConfirm('password', 'password')).toBe(true);
  });
});
