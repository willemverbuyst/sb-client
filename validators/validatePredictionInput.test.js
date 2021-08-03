const validatePredictionInput = require('./validatePredictionInput');

describe('validatePredictionInput function', () => {
  test('returns false given an empty string', () => {
    expect(validatePredictionInput('')).toBe(false);
  });

  test('returns false given two empty strings', () => {
    expect(validatePredictionInput('', '')).toBe(false);
  });

  test('returns false given three empty strings', () => {
    expect(validatePredictionInput('', '', '')).toBe(false);
  });

  test('returns false given one string and two empty strings', () => {
    expect(validatePredictionInput('pgoalsHomeTeam', '', '')).toBe(false);
  });

  test('returns false given two strings and one empty string', () => {
    expect(
      validatePredictionInput('pGoalsHomeTeam', 'pGoalsAwayTeam', ''),
    ).toBe(false);
  });

  test('returns false given three strings', () => {
    expect(
      validatePredictionInput('pGoalsHomeTeam', 'pGoalsAwayTeam', 'fixtureId'),
    ).toBe(false);
  });

  test('returns false given a number and two strings', () => {
    expect(validatePredictionInput(1, 'pGoalsAwayTeam', 'fixtureId')).toBe(
      false,
    );
  });

  test('returns false given three numbers', () => {
    expect(validatePredictionInput(1, 1, 123)).toBe(false);
  });

  test('returns false given two numbers and an empty string', () => {
    expect(validatePredictionInput(1, 1, '')).toBe(false);
  });

  test('returns true given two numbers and a string', () => {
    expect(validatePredictionInput(1, 1, 'fixtureId')).toBe(true);
    expect(validatePredictionInput(0, 0, 'fixtureId')).toBe(true);
    expect(validatePredictionInput(1, 0, 'fixtureId')).toBe(true);
    expect(validatePredictionInput(0, 1, 'fixtureId')).toBe(true);
  });
});
