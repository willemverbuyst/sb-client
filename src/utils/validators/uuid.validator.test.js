const { v4: uuidv4 } = require('uuid');
const isValidUUID = require('./uuid.validator');

describe('isValidUUID', () => {
  test('returns false given no argument', () => {
    expect(isValidUUID()).toBe(false);
  });
  test('returns false given string not a uuid', () => {
    expect(isValidUUID('random-test-password-123')).toBe(false);
  });
  const testUUID = uuidv4();
  test('returns true given a valid uuid', () => {
    expect(isValidUUID(testUUID)).toBe(true);
  });
});
