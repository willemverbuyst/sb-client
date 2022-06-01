const isValidEmail = require('./email.validator');

describe('isValidUUID', () => {
  test('returns false given no argument', () => {
    expect(isValidEmail()).toBe(false);
  });
  test('returns false given argument not a valid email address', () => {
    expect(isValidEmail('random-test-email-123')).toBe(false);
    expect(isValidEmail('test@test')).toBe(false);
    expect(isValidEmail('1@1.1')).toBe(false);
    expect(isValidEmail('test.com')).toBe(false);
  });
  test('returns true given a valid email address', () => {
    expect(isValidEmail('test@test.com')).toBe(true);
  });
});
