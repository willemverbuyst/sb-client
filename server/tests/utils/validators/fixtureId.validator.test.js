const { isValidFixtureId } = require('../../../src/utils/validators');

describe('isValidFixtureId', () => {
  test('returns false given not a number', () => {
    expect(isValidFixtureId()).toBe(false);
    expect(isValidFixtureId('test')).toBe(false);
    expect(isValidFixtureId('123test')).toBe(false);
    expect(isValidFixtureId({ test: 'test' })).toBe(false);
    expect(isValidFixtureId(['test'])).toBe(false);
    expect(isValidFixtureId(true)).toBe(false);
    expect(isValidFixtureId(false)).toBe(false);
  });
  test('returns false given a 0', () => {
    expect(isValidFixtureId(0)).toBe(false);
  });
  test('returns true given a number other than 0', () => {
    expect(isValidFixtureId(1)).toBe(true);
    expect(isValidFixtureId(123)).toBe(true);
  });
});
