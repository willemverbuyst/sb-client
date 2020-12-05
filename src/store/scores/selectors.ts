import { StoreState } from '../types';

export const selectFixture = (state: StoreState) =>
  state.scoresState.fixtureScores;

export const selectTotoRound = (state: StoreState) =>
  state.scoresState.totoRoundScores;
