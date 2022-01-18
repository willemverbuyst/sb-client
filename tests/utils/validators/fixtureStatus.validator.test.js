const { isValidFixtureStatus } = require('../../../src/utils/validators');

describe('isValidFixtureStatus', () => {
  test('returns false given an empty string', () => {
    expect(isValidFixtureStatus('')).toBe(false);
  });

  test("returns false given string equal to 'Match Finished'", () => {
    expect(isValidFixtureStatus('Match Finished')).toBe(false);
  });

  test("returns true given string not equal to 'Match Finished'", () => {
    expect(isValidFixtureStatus('Not started')).toBe(true);
  });
});
