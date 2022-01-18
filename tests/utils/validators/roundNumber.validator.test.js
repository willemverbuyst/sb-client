const { NUMBER_OF_ROUNDS } = require('../../../src/constants/set-up-game');
const { isValidRoundNumber } = require('../../../src/utils/validators');

describe('isValidRoundNUmber', () => {
  test('returns false given no argument', () => {
    expect(isValidRoundNumber()).toBe(false);
  });
  test('returns false given a string', () => {
    expect(isValidRoundNumber('test')).toBe(false);
  });
  test('returns false given a boolean', () => {
    expect(isValidRoundNumber(true)).toBe(false);
  });
  test('returns false given 0', () => {
    expect(isValidRoundNumber(0)).toBe(false);
  });
  test('returns false given negative number', () => {
    expect(isValidRoundNumber(-1)).toBe(false);
  });
  test('returns false given a number higer than the number of rounds', () => {
    expect(isValidRoundNumber(NUMBER_OF_ROUNDS + 1)).toBe(false);
  });
  test('returns true for a number 1 to number of rounds', () => {
    for (let i = 1; i <= NUMBER_OF_ROUNDS; i += 1) {
      expect(isValidRoundNumber(i)).toBe(true);
    }
  });
});
