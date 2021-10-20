const isValidSiisvalidUpdateProfileInputgnupInput = require('./updateProfileInput.validator');

describe('isValidSiisvalidUpdateProfileInputgnupInput', () => {
  test('returns false given an empty string', () => {
    expect(isValidSiisvalidUpdateProfileInputgnupInput('')).toBe(false);
  });

  test('returns false given a string', () => {
    expect(isValidSiisvalidUpdateProfileInputgnupInput('userName')).toBe(false);
  });

  test('returns false given 1 string and 5 empty strings', () => {
    expect(
      isValidSiisvalidUpdateProfileInputgnupInput(
        'userName',
        '',
        '',
        '',
        '',
        '',
      ),
    ).toBe(false);
  });

  test('returns false given 2 strings', () => {
    expect(
      isValidSiisvalidUpdateProfileInputgnupInput('userName', 'firstName'),
    ).toBe(false);
  });

  test('returns false given 3 strings', () => {
    expect(
      isValidSiisvalidUpdateProfileInputgnupInput(
        'userName',
        'firstName',
        'lastName',
      ),
    ).toBe(false);
  });

  test('returns false given 4 strings', () => {
    expect(
      isValidSiisvalidUpdateProfileInputgnupInput(
        'userName',
        'firstName',
        'lastName',
        'email',
      ),
    ).toBe(false);
  });

  test('returns false given 5 strings', () => {
    expect(
      isValidSiisvalidUpdateProfileInputgnupInput(
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
      isValidSiisvalidUpdateProfileInputgnupInput(
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
    expect(
      isValidSiisvalidUpdateProfileInputgnupInput(123, 123, 123, 123, 123, 123),
    ).toBe(false);
  });

  test('returns true given 5 strings and 1 number', () => {
    expect(
      isValidSiisvalidUpdateProfileInputgnupInput(
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
