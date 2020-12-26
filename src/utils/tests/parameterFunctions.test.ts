import { TOTAL_ROUNDS } from '../../constants/setupGame';
import { roundByTotoRound, totoRoundByRound } from '../parameterFunctions';

describe('if given a totoRound number', () => {
  test('returns the first round of that toto round', () => {
    expect(roundByTotoRound(1)).toBe(1);
    expect(roundByTotoRound(3)).toBe(7);
    expect(roundByTotoRound(11)).toBe(31);
  });
});

describe('if given a ound number', () => {
  test('returns the toto round number of that round', () => {
    expect(totoRoundByRound(1)).toBe(1);
    expect(totoRoundByRound(13)).toBe(5);
    expect(totoRoundByRound(8)).toBe(3);
    expect(totoRoundByRound(TOTAL_ROUNDS)).toBe(11);
  });
});
