const { isValidPredictionInput } = require('../../../src/utils/validators');

// TODO test for negative numbers

describe('isValidPredictionInput', () => {
  test('returns false given an empty string', () => {
    expect(isValidPredictionInput('')).toBe(false);
  });

  test('returns false given 1 string and 1 empty string', () => {
    expect(isValidPredictionInput('pgoalsHomeTeam', '')).toBe(false);
  });

  test('returns false given 2 strings', () => {
    expect(isValidPredictionInput('pGoalsHomeTeam', 'pGoalsAwayTeam')).toBe(
      false,
    );
  });

  test('returns false given 1 number and 1 string', () => {
    expect(isValidPredictionInput(1, 'pGoalsAwayTeam')).toBe(false);
  });

  test('returns false given 2 negative numbers', () => {
    expect(isValidPredictionInput(-1, -1)).toBe(false);
    expect(isValidPredictionInput(-1, 0)).toBe(false);
    expect(isValidPredictionInput(0, -1)).toBe(false);
  });

  test('returns true given 2 positive numbers', () => {
    expect(isValidPredictionInput(1, 1)).toBe(true);
    expect(isValidPredictionInput(0, 0)).toBe(true);
    expect(isValidPredictionInput(1, 0)).toBe(true);
    expect(isValidPredictionInput(0, 1)).toBe(true);
  });
});
