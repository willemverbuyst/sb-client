const { isValidSignupInput } = require('../../../src/utils/validators');

describe('isValidSignupInput', () => {
  test('returns false given an empty string', () => {
    expect(isValidSignupInput('')).toBe(false);
  });

  test('returns false given a string', () => {
    expect(isValidSignupInput('userName')).toBe(false);
  });

  test('returns false given 1 string and 6 empty strings', () => {
    expect(isValidSignupInput('username', '', '', '', '', '', '')).toBe(false);
  });

  test('returns false given 2 strings', () => {
    expect(isValidSignupInput('userName', 'firstName')).toBe(false);
  });

  test('returns false given 3 strings', () => {
    expect(isValidSignupInput('userName', 'firstName', 'lastName')).toBe(false);
  });

  test('returns false given 4 strings', () => {
    expect(
      isValidSignupInput('userName', 'firstName', 'lastName', 'email'),
    ).toBe(false);
  });

  test('returns false given 5 strings', () => {
    expect(
      isValidSignupInput(
        'userName',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
      ),
    ).toBe(false);
  });

  test('returns false given 6 strings', () => {
    expect(
      isValidSignupInput(
        'userName',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'teamId',
      ),
    ).toBe(false);
  });

  test('returns false given 6 numbers', () => {
    expect(isValidSignupInput(123, 123, 123, 123, 123, 123)).toBe(false);
  });

  test('returns false given 6 strings and 1 number', () => {
    expect(
      isValidSignupInput(
        'userName',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'true',
        123,
      ),
    ).toBe(false);
  });
  test('returns true given 5 strings, a boolean and 1 number', () => {
    expect(
      isValidSignupInput(
        'userName',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        true,
        123,
      ),
    ).toBe(true);
  });
});
