const { NUMBER_OF_TOTO_ROUNDS } = require('../../../src/constants/set-up-game');
const { isValidTotoRoundNumber } = require('../../../src/utils/validators');

describe('isValidRoundNUmber', () => {
  test('returns false given no argument', () => {
    expect(isValidTotoRoundNumber()).toBe(false);
  });
  test('returns false given a string', () => {
    expect(isValidTotoRoundNumber('test')).toBe(false);
  });
  test('returns false given a boolean', () => {
    expect(isValidTotoRoundNumber(true)).toBe(false);
  });
  test('returns false given 0', () => {
    expect(isValidTotoRoundNumber(0)).toBe(false);
  });
  test('returns false given negative number', () => {
    expect(isValidTotoRoundNumber(-1)).toBe(false);
  });
  test('returns false given a number higer than the number of rounds', () => {
    expect(isValidTotoRoundNumber(NUMBER_OF_TOTO_ROUNDS + 1)).toBe(false);
  });
  test('returns true for a number 1 to number of rounds', () => {
    for (let i = 1; i <= NUMBER_OF_TOTO_ROUNDS; i += 1) {
      expect(isValidTotoRoundNumber(i)).toBe(true);
    }
  });
});
