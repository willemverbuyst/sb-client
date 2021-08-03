const validateUpdateProfileInput = require('./validateUpdateProfileInput');

test('returns false given an empty string', () => {
  expect(validateUpdateProfileInput('')).toBe(false);
});

test('returns false given a string', () => {
  expect(validateUpdateProfileInput('userName')).toBe(false);
});

test('returns false given one string and 6 empty strings', () => {
  expect(validateUpdateProfileInput('', '', '', '', '', '')).toBe(false);
});

test('returns false given six strings', () => {
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

test('returns false given six numbers', () => {
  expect(validateUpdateProfileInput(123, 123, 123, 123, 123, 123)).toBe(false);
});

test('returns false given an empty object', () => {
  expect(validateUpdateProfileInput({})).toBe(false);
});

test('returns false given an object and its keys having no values', () => {
  expect(
    validateUpdateProfileInput({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      teamId: '',
    }),
  ).toBe(false);
});

test('returns false given an object missing one of the properties', () => {
  expect(
    validateUpdateProfileInput({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      phoneNumber: 'phoneNumber',
      teamId: 123,
    }),
  ).toBe(false);
  expect(
    validateUpdateProfileInput({
      userName: 'userName',
      lastName: 'lastName',
      email: 'email',
      phoneNumber: 'phoneNumber',
      teamId: 123,
    }),
  ).toBe(false);
  expect(
    validateUpdateProfileInput({
      userName: 'userName',
      firstName: 'firstName',
      email: 'email',
      phoneNumber: 'phoneNumber',
      teamId: 123,
    }),
  ).toBe(false);
  expect(
    validateUpdateProfileInput({
      userName: 'userName',
      firstName: 'firstName',
      lastName: 'lastName',
      phoneNumber: 'phoneNumber',
      teamId: 123,
    }),
  ).toBe(false);
  expect(
    validateUpdateProfileInput({
      userName: 'userName',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      teamId: 123,
    }),
  ).toBe(false);
  expect(
    validateUpdateProfileInput({
      userName: 'userName',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      phoneNumber: 'phoneNumber',
    }),
  ).toBe(false);
});

test('returns false given an object and the values for userName, firstName, lastName, emai and phoneNumber are not strings', () => {
  expect(
    validateUpdateProfileInput({
      userName: 123,
      firstName: 123,
      lastName: 123,
      email: 123,
      phoneNumber: 123,
      teamId: 123,
    }),
  ).toBe(false);
});

test('returns false given an object and the value for teamId is not a number', () => {
  expect(
    validateUpdateProfileInput({
      userName: 'userName',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      phoneNumber: 'phoneNumber',
      teamId: 'teamId',
    }),
  ).toBe(false);
});

test('returns true given an object and its properties have the corresponding value types', () => {
  expect(
    validateUpdateProfileInput({
      userName: 'userName',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      phoneNumber: 'phoneNumber',
      teamId: 123,
    }),
  ).toBe(true);
});
