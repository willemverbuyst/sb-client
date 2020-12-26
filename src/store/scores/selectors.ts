import { StoreState } from '../types';
import { FixtureWithScores, Scores, UserWithScore } from './types';

export const selectFixture = (state: StoreState): FixtureWithScores | null => state.scoresState.fixtureScores;

export const selectRound = (state: StoreState): Scores | null => state.scoresState.roundScores;

export const selectTotalToto = (state: StoreState): UserWithScore[] | null => state.scoresState.totalTotoScores;

export const selectTotoRound = (state: StoreState): Scores | null => state.scoresState.totoRoundScores;
