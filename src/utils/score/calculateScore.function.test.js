const calculateScore = require('./calculateScore.function');

describe('getWinner function', () => {
  test('returns 0 when missing arguments(4)', () => {
    expect(calculateScore()).toBe(0);
    expect(calculateScore(1)).toBe(0);
    expect(calculateScore(1, 2)).toBe(0);
    expect(calculateScore(1, 2, 3)).toBe(0);
  });
  test('returns 10 when arguments are all equal', () => {
    expect(calculateScore(0, 0, 0, 0)).toBe(10);
    expect(calculateScore(1, 1, 1, 1)).toBe(10);
  });
  test('returns 10 when 1st pair of arguments are equal to 2nd pair', () => {
    expect(calculateScore(1, 2, 1, 2)).toBe(10);
    expect(calculateScore(3, 2, 3, 2)).toBe(10);
    expect(calculateScore(1, 0, 1, 0)).toBe(10);
    expect(calculateScore(0, 2, 0, 2)).toBe(10);
  });
  test('returns 5 when the right winner is predicted, not the goals', () => {
    expect(calculateScore(1, 2, 1, 2)).not.toBe(5);
    expect(calculateScore(1, 1, 1, 1)).not.toBe(5);
    expect(calculateScore(1, 3, 0, 2)).toBe(5);
    expect(calculateScore(3, 1, 2, 0)).toBe(5);
    expect(calculateScore(1, 1, 2, 2)).toBe(5);
  });
  test('returns 7 when the right winner is predicted, and the goals for 1 team', () => {
    expect(calculateScore(1, 2, 1, 2)).not.toBe(7);
    expect(calculateScore(1, 1, 1, 1)).not.toBe(7);
    expect(calculateScore(1, 3, 0, 3)).toBe(7);
    expect(calculateScore(3, 1, 3, 0)).toBe(7);
    expect(calculateScore(1, 3, 2, 3)).toBe(7);
  });
});
