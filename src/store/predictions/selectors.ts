import { ICurrentRound, TotoRound } from '../../models/toto.models';
import { StoreState } from '../types';

export const selectCurrentRound = (state: StoreState): ICurrentRound | null => state.predictionsState.currentRound;

export const selectFixtures = (state: StoreState): TotoRound[] | null => state.predictionsState.allFixtures;
