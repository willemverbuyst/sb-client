const validateSignupInput = require('./validateSignupInput');

describe('validateSignupInput function', () => {
  test('returns false given an empty string', () => {
    expect(validateSignupInput('')).toBe(false);
  });

  test('returns false given a string', () => {
    expect(validateSignupInput('userName')).toBe(false);
  });

  test('returns false given 1 string and 6 empty strings', () => {
    expect(validateSignupInput('username', '', '', '', '', '', '')).toBe(false);
  });

  test('returns false given 2 strings', () => {
    expect(validateSignupInput('userName', 'firstName')).toBe(false);
  });

  test('returns false given 3 strings', () => {
    expect(validateSignupInput('userName', 'firstName', 'lastName')).toBe(
      false,
    );
  });

  test('returns false given 4 strings', () => {
    expect(
      validateSignupInput('userName', 'firstName', 'lastName', 'email'),
    ).toBe(false);
  });

  test('returns false given 5 strings', () => {
    expect(
      validateSignupInput(
        'userName',
        'firstName',
        'lastName',
        'email',
        'password',
      ),
    ).toBe(false);
  });

  test('returns false given 6 strings', () => {
    expect(
      validateSignupInput(
        'userName',
        'firstName',
        'lastName',
        'email',
        'password',
        'phoneNumber',
      ),
    ).toBe(false);
  });

  test('returns false given 7 strings', () => {
    expect(
      validateSignupInput(
        'userName',
        'firstName',
        'lastName',
        'email',
        'password',
        'phoneNumber',
        'teamId',
      ),
    ).toBe(false);
  });

  test('returns false given 7 numbers', () => {
    expect(validateSignupInput(123, 123, 123, 123, 123, 123, 123)).toBe(false);
  });

  test('returns true given 6 strings and 1 number', () => {
    expect(
      validateSignupInput(
        'userName',
        'firstName',
        'lastName',
        'email',
        'password',
        'phoneNumber',
        123,
      ),
    ).toBe(true);
  });
});
