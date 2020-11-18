import { StoreState } from '../types';

export const selectCurrentRound = (state: StoreState) =>
  state.voorspellingenState.currentRound;

export const selectFixtures = (state: StoreState) =>
  state.voorspellingenState.allFixtures;
