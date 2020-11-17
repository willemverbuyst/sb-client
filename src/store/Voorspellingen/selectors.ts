import { StoreState } from '../types';

export const selectCurrentRound = (state: StoreState) =>
  state.voorspellingenState.currentRound;
