const validateFixtureStatus = require('./fixtureStatus.validator');

describe('validateFixtureStatus function', () => {
  test('returns false given an empty string', () => {
    expect(validateFixtureStatus('')).toBe(false);
  });

  test("returns false given string equal to 'Match Finished'", () => {
    expect(validateFixtureStatus('Match Finished')).toBe(false);
  });

  test("returns true given string not equal to 'Match Finished'", () => {
    expect(validateFixtureStatus('Not started')).toBe(true);
  });
});
