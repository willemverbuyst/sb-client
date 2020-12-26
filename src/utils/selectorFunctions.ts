import { TOTO_ROUNDS } from '../constants/setupGame';

export const optionsRoundSelector = (totoRoundId: number): string[] =>
  totoRoundId !== TOTO_ROUNDS
    ? [...Array(3)].map((_u, i) => `Ronde ${(totoRoundId - 1) * 3 + i + 1}`)
    : [...Array(4)].map((_u, i) => `Ronde ${(totoRoundId - 1) * 3 + i + 1}`);
