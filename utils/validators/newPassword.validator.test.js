const bcrypt = require('bcrypt');
const validateNewPassword = require('./newPassword.validator');

describe('validateNewPassword function', () => {
  test('returns false given an empty string', () => {
    expect(validateNewPassword('')).toBe(false);
  });

  test('returns false given a string and an empty string', () => {
    expect(validateNewPassword('newPassword', '')).toBe(false);
  });

  test('returns false given arguments are not strings', () => {
    expect(validateNewPassword(123, 123)).toBe(false);
  });

  test('returns false given arguments are the same', () => {
    expect(
      validateNewPassword(
        'currentPassword',
        bcrypt.hashSync('currentPassword', Number(process.env.SALT_ROUNDS)),
      ),
    ).toBe(false);
  });

  test('returns true given arguments are not the same', () => {
    expect(
      validateNewPassword(
        'newPassword',
        bcrypt.hashSync('currentPassword', Number(process.env.SALT_ROUNDS)),
      ),
    ).toBe(true);
  });
});
