const validatePredictionInput = require('./predictionInput.validator');

// TODO test for negative numbers

describe('validatePredictionInput function', () => {
  test('returns false given an empty string', () => {
    expect(validatePredictionInput('')).toBe(false);
  });

  test('returns false given 1 string and 2 empty strings', () => {
    expect(validatePredictionInput('pgoalsHomeTeam', '', '')).toBe(false);
  });

  test('returns false given 2 strings and 1 empty string', () => {
    expect(
      validatePredictionInput('pGoalsHomeTeam', 'pGoalsAwayTeam', ''),
    ).toBe(false);
  });

  test('returns false given 3 strings', () => {
    expect(
      validatePredictionInput('pGoalsHomeTeam', 'pGoalsAwayTeam', 'fixtureId'),
    ).toBe(false);
  });

  test('returns false given 1 number and 2 strings', () => {
    expect(validatePredictionInput(1, 'pGoalsAwayTeam', 'fixtureId')).toBe(
      false,
    );
  });

  test('returns false given 2 numbers and an empty string', () => {
    expect(validatePredictionInput(1, 1, '')).toBe(false);
  });

  test('returns false given 3 numbers', () => {
    expect(validatePredictionInput(1, 1, 123)).toBe(false);
  });

  test('returns true given 2 numbers and a string', () => {
    expect(validatePredictionInput(1, 1, 'fixtureId')).toBe(true);
    expect(validatePredictionInput(0, 0, 'fixtureId')).toBe(true);
    expect(validatePredictionInput(1, 0, 'fixtureId')).toBe(true);
    expect(validatePredictionInput(0, 1, 'fixtureId')).toBe(true);
  });
});
