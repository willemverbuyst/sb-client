import { StoreState } from '../types';

export const selectFixture = (state: StoreState) => state.scoresState.fixture;
