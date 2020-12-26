import { StoreState } from '../types';

export const selectFixture = (state: StoreState) => state.scoresState.fixtureScores;

export const selectRound = (state: StoreState) => state.scoresState.roundScores;

export const selectTotalToto = (state: StoreState) => state.scoresState.totalTotoScores;

export const selectTotoRound = (state: StoreState) => state.scoresState.totoRoundScores;
