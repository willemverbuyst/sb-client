const validateChangePasswordInput = require('./validateChangePasswordInput');

describe('validateChangePasswordInput function', () => {
  test('returns false given an empty string', () => {
    expect(validateChangePasswordInput('')).toBe(false);
  });

  test('returns false given one string', () => {
    expect(validateChangePasswordInput('currentPassword')).toBe(false);
  });

  test('returns false given a string and an empty string', () => {
    expect(validateChangePasswordInput('currentPassword', '')).toBe(false);
  });

  test('returns false given two strings', () => {
    expect(validateChangePasswordInput('currentPassword', 'newPassword')).toBe(
      false,
    );
  });

  test('returns false given two strings and an empty string', () => {
    expect(
      validateChangePasswordInput('currentPassword', 'newPassword', ''),
    ).toBe(false);
  });

  test('returns false if not given strings', () => {
    expect(validateChangePasswordInput(123, 123, 123)).toBe(false);
  });

  test('returns true if given three strings', () => {
    expect(
      validateChangePasswordInput(
        'currentPassword',
        'newPassword',
        'confirmPassword',
      ),
    ).toBe(true);
  });
});
