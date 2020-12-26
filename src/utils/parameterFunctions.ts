import { TOTAL_ROUNDS } from '../constants/setupGame';

export const roundByTotoRound = (totoRoundNumber: number) => {
  return totoRoundNumber * 3 - 2;
};

export const totoRoundByRound = (roundNumber: number) => {
  return roundNumber !== TOTAL_ROUNDS
    ? Math.floor((roundNumber - 1) / 3) + 1
    : Math.floor((roundNumber - 2) / 3) + 1;
};
