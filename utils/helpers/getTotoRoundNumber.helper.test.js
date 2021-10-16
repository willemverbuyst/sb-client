const getTotoRoundNumber = require('./getTotoRoundNumber.helper');
const {
  ROUNDS_PER_TOTO_ROUND,
  NUMBER_OF_TOTO_ROUNDS,
} = require('../../constants/set-up-game');

describe('getTotoRoundNumber', () => {
  test('should return 1 if no argument provided', () => {
    expect(getTotoRoundNumber()).toBe(1);
  });
  test('should return totoround', () => {
    for (
      let r = 1;
      r <= ROUNDS_PER_TOTO_ROUND * NUMBER_OF_TOTO_ROUNDS;
      r += 1
    ) {
      expect(getTotoRoundNumber(r)).toBe(Math.ceil(r / ROUNDS_PER_TOTO_ROUND));
    }
  });
  test('should return last totoround, if argument > rounds per toto  * totorounds', () => {
    for (let i = 0; i < 10; i += 1) {
      expect(
        getTotoRoundNumber(ROUNDS_PER_TOTO_ROUND * NUMBER_OF_TOTO_ROUNDS + i),
      ).toBe(NUMBER_OF_TOTO_ROUNDS);
    }
  });
});
