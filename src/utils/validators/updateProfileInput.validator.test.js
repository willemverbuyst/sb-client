const isValidUpdateProfileInput = require('./updateProfileInput.validator');

describe('isValidUpdateProfileInput', () => {
  test('returns false given an empty string', () => {
    expect(isValidUpdateProfileInput('')).toBe(false);
  });

  test('returns false given a string', () => {
    expect(isValidUpdateProfileInput('userName')).toBe(false);
  });

  test('returns false given 1 string and 6 empty strings', () => {
    expect(isValidUpdateProfileInput('userName', '', '', '', '', '', '')).toBe(
      false,
    );
  });

  test('returns false given 2 strings', () => {
    expect(isValidUpdateProfileInput('userName', 'firstName')).toBe(false);
  });

  test('returns false given 3 strings', () => {
    expect(isValidUpdateProfileInput('userName', 'firstName', 'lastName')).toBe(
      false,
    );
  });

  test('returns false given 4 strings', () => {
    expect(
      isValidUpdateProfileInput('userName', 'firstName', 'lastName', 'email'),
    ).toBe(false);
  });

  test('returns false given 5 strings', () => {
    expect(
      isValidUpdateProfileInput(
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
      isValidUpdateProfileInput(
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
    expect(isValidUpdateProfileInput(123, 123, 123, 123, 123, 123)).toBe(false);
  });

  test('returns false given 6 strings and 1 number', () => {
    expect(
      isValidUpdateProfileInput(
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

  test('returns false given 5 strings, a boolean and 1 number', () => {
    expect(
      isValidUpdateProfileInput(
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
