const validateSignupInput = require('./validateSignupInput');

describe('validateSignupInput function', () => {
  test('returns false given an empty string', () => {
    expect(validateSignupInput('')).toBe(false);
  });

  test('returns false given a string', () => {
    expect(validateSignupInput('userName')).toBe(false);
  });

  test('returns false given one string and 7 empty strings', () => {
    expect(validateSignupInput('', '', '', '', '', '', '')).toBe(false);
  });

  test('returns false given six strings', () => {
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

  test('returns false given an empty object', () => {
    expect(validateSignupInput({})).toBe(false);
  });

  test('returns false given an object and its keys having no values', () => {
    expect(
      validateSignupInput({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        teamId: '',
      }),
    ).toBe(false);
  });

  test('returns false given an object missing one of the properties', () => {
    expect(
      validateSignupInput({
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
        phoneNumber: 'phoneNumber',
        teamId: 123,
      }),
    ).toBe(false);
    expect(
      validateSignupInput({
        userName: 'userName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
        phoneNumber: 'phoneNumber',
        teamId: 123,
      }),
    ).toBe(false);
    expect(
      validateSignupInput({
        userName: 'userName',
        firstName: 'firstName',
        email: 'email',
        password: 'password',
        phoneNumber: 'phoneNumber',
        teamId: 123,
      }),
    ).toBe(false);
    expect(
      validateSignupInput({
        userName: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        password: 'password',
        phoneNumber: 'phoneNumber',
        teamId: 123,
      }),
    ).toBe(false);
    expect(
      validateSignupInput({
        userName: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        phoneNumber: 'phoneNumber',
        teamId: 123,
      }),
    ).toBe(false);
    expect(
      validateSignupInput({
        userName: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
        teamId: 123,
      }),
    ).toBe(false);
    expect(
      validateSignupInput({
        userName: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
        phoneNumber: 'phoneNumber',
      }),
    ).toBe(false);
  });

  test('returns false given an object and incorrect value types', () => {
    expect(
      validateSignupInput({
        userName: 123,
        firstName: 123,
        lastName: 123,
        email: 123,
        password: 123,
        phoneNumber: 123,
        teamId: 123,
      }),
    ).toBe(false);
    expect(
      validateSignupInput({
        userName: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
        phoneNumber: 'phoneNumber',
        teamId: 'teamId',
      }),
    ).toBe(false);
  });

  test('returns true given an object and its properties have the correct value types', () => {
    expect(
      validateSignupInput({
        userName: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        password: 'password',
        phoneNumber: 'phoneNumber',
        teamId: 123,
      }),
    ).toBe(true);
  });
});
