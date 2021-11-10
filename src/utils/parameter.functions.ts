import { TOTAL_ROUNDS } from '../constants/setupGame'

export const roundByTotoRound = (totoRoundNumber: number): number =>
  totoRoundNumber * 3 - 2

export const totoRoundByRound = (roundNumber: number): number =>
  roundNumber !== TOTAL_ROUNDS
    ? Math.floor((roundNumber - 1) / 3) + 1
    : Math.floor((roundNumber - 2) / 3) + 1

export const calculateIndex = (roundNumber: number): number =>
  roundNumber !== TOTAL_ROUNDS ? (roundNumber + 2) % 3 : (roundNumber % 3) + 2
