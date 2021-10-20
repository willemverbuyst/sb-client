const bcrypt = require('bcrypt');
const isValidPassword = require('./password.validator');

describe('isValidPassword', () => {
  test('returns false given an empty string', () => {
    expect(isValidPassword('')).toBe(false);
  });

  test('returns false given only a user', () => {
    const testUser = { password: 'password' };
    expect(isValidPassword(testUser)).toBe(false);
  });

  test('returns false given a user and an empty string', () => {
    const testUser = { password: 'password' };
    expect(isValidPassword(testUser, '')).toBe(false);
  });

  test('returns false given a user with no password property', () => {
    const testUser = { test: 'password' };
    expect(isValidPassword(testUser, 'password')).toBe(false);
  });

  test("returns false if passwords don't match", () => {
    const testUser = { password: 'differentPassword' };
    expect(isValidPassword(testUser, 'password')).toBe(false);
  });

  test('returns true if passwords match', () => {
    const testUser = {
      password: bcrypt.hashSync('password', Number(process.env.SALT_ROUNDS)),
    };
    expect(isValidPassword(testUser, 'password')).toBe(true);
  });
});
