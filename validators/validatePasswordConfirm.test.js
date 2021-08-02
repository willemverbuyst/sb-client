const validatePasswordConfirm = require('./validatePasswordConfirm');

test('returns false given an empty string', () => {
  expect(validatePasswordConfirm('')).toBe(false);
});

test('returns false given two empty strings', () => {
  expect(validatePasswordConfirm('', '')).toBe(false);
});

test('returns false given one string', () => {
  expect(validatePasswordConfirm('password')).toBe(false);
});

test('returns false given one string and an empty string', () => {
  expect(validatePasswordConfirm('password', '')).toBe(false);
  expect(validatePasswordConfirm('', 'passwordConfirm')).toBe(false);
});

test('returns false given a number and string', () => {
  expect(validatePasswordConfirm(123, 'password')).toBe(false);
});

test('returns false given a string and a number', () => {
  expect(validatePasswordConfirm('email', 123)).toBe(false);
});

test('returns false given two numbers', () => {
  expect(validatePasswordConfirm(123, 123)).toBe(false);
});

test('returns false given two strings that are not the same', () => {
  expect(validatePasswordConfirm('firstPassword', 'secondPassword')).toBe(
    false,
  );
});

test('returns true given two strings that are the same', () => {
  expect(validatePasswordConfirm('password', 'password')).toBe(true);
});
