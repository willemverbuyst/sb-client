const isValidPredictionInput = require('./predictionInput.validator');

// TODO test for negative numbers

describe('isValidPredictionInput', () => {
  test('returns false given an empty string', () => {
    expect(isValidPredictionInput('')).toBe(false);
  });

  test('returns false given 1 string and 2 empty strings', () => {
    expect(isValidPredictionInput('pgoalsHomeTeam', '', '')).toBe(false);
  });

  test('returns false given 2 strings and 1 empty string', () => {
    expect(isValidPredictionInput('pGoalsHomeTeam', 'pGoalsAwayTeam', '')).toBe(
      false,
    );
  });

  test('returns false given 3 strings', () => {
    expect(
      isValidPredictionInput('pGoalsHomeTeam', 'pGoalsAwayTeam', 'fixtureId'),
    ).toBe(false);
  });

  test('returns false given 1 number and 2 strings', () => {
    expect(isValidPredictionInput(1, 'pGoalsAwayTeam', 'fixtureId')).toBe(
      false,
    );
  });

  test('returns false given 2 numbers and an empty string', () => {
    expect(isValidPredictionInput(1, 1, '')).toBe(false);
  });

  test('returns false given 3 numbers', () => {
    expect(isValidPredictionInput(1, 1, 123)).toBe(false);
  });

  test('returns true given 2 numbers and a string', () => {
    expect(isValidPredictionInput(1, 1, 'fixtureId')).toBe(true);
    expect(isValidPredictionInput(0, 0, 'fixtureId')).toBe(true);
    expect(isValidPredictionInput(1, 0, 'fixtureId')).toBe(true);
    expect(isValidPredictionInput(0, 1, 'fixtureId')).toBe(true);
  });
});
