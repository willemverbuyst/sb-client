const validateUpdateProfileInput = require('./validateUpdateProfileInput');

describe('validateUpdateProfileInput function', () => {
  test('returns false given an empty string', () => {
    expect(validateUpdateProfileInput('')).toBe(false);
  });

  test('returns false given a string', () => {
    expect(validateUpdateProfileInput('userName')).toBe(false);
  });

  test('returns false given 1 string and 5 empty strings', () => {
    expect(validateUpdateProfileInput('userName', '', '', '', '', '')).toBe(
      false,
    );
  });

  test('returns false given 2 strings', () => {
    expect(validateUpdateProfileInput('userName', 'firstName')).toBe(false);
  });

  test('returns false given 3 strings', () => {
    expect(
      validateUpdateProfileInput('userName', 'firstName', 'lastName'),
    ).toBe(false);
  });

  test('returns false given 4 strings', () => {
    expect(
      validateUpdateProfileInput('userName', 'firstName', 'lastName', 'email'),
    ).toBe(false);
  });

  test('returns false given 5 strings', () => {
    expect(
      validateUpdateProfileInput(
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
      validateUpdateProfileInput(
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
    expect(validateUpdateProfileInput(123, 123, 123, 123, 123, 123)).toBe(
      false,
    );
  });

  test('returns true given 5 strings and 1 number', () => {
    expect(
      validateUpdateProfileInput(
        'userName',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        123,
      ),
    ).toBe(true);
  });
});
