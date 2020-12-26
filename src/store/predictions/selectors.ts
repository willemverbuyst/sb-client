import { StoreState } from '../types';

export const selectCurrentRound = (state: StoreState) => state.predictionsState.currentRound;

export const selectFixtures = (state: StoreState) => state.predictionsState.allFixtures;
