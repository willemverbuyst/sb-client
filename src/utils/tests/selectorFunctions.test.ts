import { TOTO_ROUNDS } from '../../constants/setupGame';
import { optionsRoundSelector } from '../selectorFunctions';

describe('if given a totoRound number', () => {
  test('returns an array with options', () => {
    expect(optionsRoundSelector(1)).toEqual(['Ronde 1', 'Ronde 2', 'Ronde 3']);
    expect(optionsRoundSelector(TOTO_ROUNDS)).toEqual(['Ronde 31', 'Ronde 32', 'Ronde 33', 'Ronde 34']);
  });
});
