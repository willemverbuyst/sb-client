const isValidNewPassword = require('./newPassword.validator');

describe('isValidNewPassword', () => {
  test('returns false given an empty string', () => {
    expect(isValidNewPassword('')).toBe(false);
  });

  test('returns false given a string and an empty string', () => {
    expect(isValidNewPassword('newPassword', '')).toBe(false);
  });

  test('returns false given arguments are not strings', () => {
    expect(isValidNewPassword(123, 123)).toBe(false);
  });

  test('returns false given arguments are the same', () => {
    expect(isValidNewPassword('currentPassword', 'currentPassword')).toBe(
      false,
    );
  });

  test('returns true given arguments are not the same', () => {
    expect(isValidNewPassword('newPassword', 'currentPassword')).toBe(true);
  });
});
