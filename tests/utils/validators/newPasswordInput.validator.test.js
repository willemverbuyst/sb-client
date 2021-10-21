const { isValidNewPasswordInput } = require('../../../src/utils/validators');

describe('isValidNewPasswordInput', () => {
  test('returns false given an empty string', () => {
    expect(isValidNewPasswordInput('')).toBe(false);
  });

  test('returns false given one string', () => {
    expect(isValidNewPasswordInput('currentPassword')).toBe(false);
  });

  test('returns false given a string and an empty string', () => {
    expect(isValidNewPasswordInput('currentPassword', '')).toBe(false);
  });

  test('returns false given two strings', () => {
    expect(isValidNewPasswordInput('currentPassword', 'newPassword')).toBe(
      false,
    );
  });

  test('returns false given two strings and an empty string', () => {
    expect(isValidNewPasswordInput('currentPassword', 'newPassword', '')).toBe(
      false,
    );
  });

  test('returns false if not given strings', () => {
    expect(isValidNewPasswordInput(123, 123, 123)).toBe(false);
  });

  test('returns true if given three strings', () => {
    expect(
      isValidNewPasswordInput(
        'currentPassword',
        'newPassword',
        'confirmPassword',
      ),
    ).toBe(true);
  });
});
