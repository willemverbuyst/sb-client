const bcrypt = require('bcrypt');
const validatePassword = require('./validatePassword');

describe('validatePassword function', () => {
  test('returns false given an empty string', () => {
    expect(validatePassword('')).toBe(false);
  });

  test('returns false given only a user', () => {
    const testUser = { password: 'password' };
    expect(validatePassword(testUser)).toBe(false);
  });

  test('returns false given a user and an empty string', () => {
    const testUser = { password: 'password' };
    expect(validatePassword(testUser, '')).toBe(false);
  });

  test('returns false given a user with no password property', () => {
    const testUser = { test: 'password' };
    expect(validatePassword(testUser, 'password')).toBe(false);
  });

  test("returns false if passwords don't match", () => {
    const testUser = { password: 'differentPassword' };
    expect(validatePassword(testUser, 'password')).toBe(false);
  });

  test('returns true if passwords match', () => {
    const testUser = {
      password: bcrypt.hashSync('password', Number(process.env.SALT_ROUNDS)),
    };
    expect(validatePassword(testUser, 'password')).toBe(true);
  });
});
