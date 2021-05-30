import { sortArrayWithObjects } from '../../utils/sortFunctions';
import { StoreState } from '../types';
import { FixtureWithScores, Scores, UserWithScore } from './types';

export const selectFixture = (state: StoreState): FixtureWithScores | null => state.scoresState.fixtureScores;

export const selectRound = (state: StoreState): Scores | null => state.scoresState.roundScores;

export const selectRoundId = (state: StoreState): number | null => {
  if (state.scoresState.roundScores) {
    return state.scoresState.roundScores.id;
  } else {
    return null;
  }
};

export const selectTotalToto = (state: StoreState): UserWithScore[] | null => state.scoresState.totalTotoScores;

export const selectTotoRound = (state: StoreState): Scores | null => state.scoresState.totoRoundScores;

export const selectSortedUsersWithScores = (state: StoreState): UserWithScore[] | null => {
  if (state.scoresState.roundScores) {
    const usersWithScores = state.scoresState.roundScores.usersWithScores;
    const roundSortedByName: UserWithScore[] = sortArrayWithObjects<keyof UserWithScore, UserWithScore>('user')(
      usersWithScores,
    );

    return roundSortedByName;
  } else {
    return null;
  }
};
