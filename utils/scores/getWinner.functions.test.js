const { getWinner } = require('.');

describe('getWinner function', () => {
  test('returns "draw" given no arguments', () => {
    expect(getWinner()).toBe('draw');
  });
  test('returns "draw" given one argument, being 0', () => {
    expect(getWinner()).toBe('draw');
  });
  test('returns "draw" given two arguments, being 0', () => {
    expect(getWinner(0, 0)).toBe('draw');
  });
  test('returns "draw" given two arguments, being equal', () => {
    expect(getWinner(3, 3)).toBe('draw');
  });
  test('returns "homeWins" given two arguments, 1st being greater than the 2nd', () => {
    expect(getWinner(4, 3)).toBe('homeWins');
    expect(getWinner(4, 0)).toBe('homeWins');
  });
  test('returns "awayWins" given two arguments, 1st being less than the 2nd', () => {
    expect(getWinner(1, 3)).toBe('awayWins');
    expect(getWinner(0, 3)).toBe('awayWins');
  });
});
