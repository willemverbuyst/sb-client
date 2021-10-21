const { getTotoRoundNumberHelper } = require('../../../src/utils/helpers');
const {
  ROUNDS_PER_TOTO_ROUND,
  NUMBER_OF_TOTO_ROUNDS,
} = require('../../../src/constants/set-up-game');

describe('getTotoRoundNumberHelper', () => {
  test('should return 1 if no argument provided', () => {
    expect(getTotoRoundNumberHelper()).toBe(1);
  });
  test('should return totoround', () => {
    for (
      let r = 1;
      r <= ROUNDS_PER_TOTO_ROUND * NUMBER_OF_TOTO_ROUNDS;
      r += 1
    ) {
      expect(getTotoRoundNumberHelper(r)).toBe(
        Math.ceil(r / ROUNDS_PER_TOTO_ROUND),
      );
    }
  });
  test('should return last totoround, if argument > rounds per toto  * totorounds', () => {
    for (let i = 0; i < 10; i += 1) {
      expect(
        getTotoRoundNumberHelper(
          ROUNDS_PER_TOTO_ROUND * NUMBER_OF_TOTO_ROUNDS + i,
        ),
      ).toBe(NUMBER_OF_TOTO_ROUNDS);
    }
  });
});
