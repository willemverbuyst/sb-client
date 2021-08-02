const validatePassword = require('./validatePassword');

test('returns false given an empty string', () => {
  expect(validatePassword('')).toBe(false);
});

test('returns false given two empty strings', () => {
  expect(validatePassword('', '')).toBe(false);
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

test("returns false given if passwords don't match", () => {
  const testUser = { password: 'differentPassword' };
  expect(validatePassword(testUser, 'password')).toBe(false);
});
