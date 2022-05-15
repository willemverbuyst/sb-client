const { isValidPasswordConfirm } = require('../../../src/utils/validators');

describe('isValidPasswordConfirm', () => {
  test('returns false given an empty string', () => {
    expect(isValidPasswordConfirm('')).toBe(false);
  });

  test('returns false given 1 string', () => {
    expect(isValidPasswordConfirm('password')).toBe(false);
  });

  test('returns false given 1 string and an empty string', () => {
    expect(isValidPasswordConfirm('password', '')).toBe(false);
  });

  test('returns false given a number and a string', () => {
    expect(isValidPasswordConfirm(123, 'password')).toBe(false);
  });

  test('returns false given a string and a number', () => {
    expect(isValidPasswordConfirm('email', 123)).toBe(false);
  });

  test('returns false given 2 numbers', () => {
    expect(isValidPasswordConfirm(123, 123)).toBe(false);
  });

  test('returns false given 2 strings that are not the same', () => {
    expect(isValidPasswordConfirm('firstPassword', 'secondPassword')).toBe(
      false,
    );
  });

  test('returns true given 2 strings that are the same', () => {
    expect(isValidPasswordConfirm('password', 'password')).toBe(true);
  });
});
