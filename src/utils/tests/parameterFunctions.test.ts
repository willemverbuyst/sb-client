import { roundByTotoRound } from '../parameterFunctions';

describe('if given a totoRound number', () => {
  test('returns the first round of that toto round', () => {
    expect(roundByTotoRound(1)).toEqual(1);
    expect(roundByTotoRound(3)).toEqual(7);
    expect(roundByTotoRound(11)).toEqual(31);
  });
});
