import { IFixtureWithScores, IScores, IUserWithScore } from '../../models/scores.models';
import { sortArrayWithObjects } from '../../utils/sortFunctions';
import { StoreState } from '../types';

export const selectFixture = (state: StoreState): IFixtureWithScores | null => state.scoresState.fixtureScores;

export const selectRound = (state: StoreState): IScores | null => state.scoresState.roundScores;

export const selectRoundId = (state: StoreState): number | null => {
  if (state.scoresState.roundScores) {
    return state.scoresState.roundScores.id;
  } else {
    return null;
  }
};

export const selectTotalToto = (state: StoreState): IUserWithScore[] | null => state.scoresState.totalTotoScores;

export const selectTotoRound = (state: StoreState): IScores | null => state.scoresState.totoRoundScores;

export const selectSortedUsersWithScores = (state: StoreState): IUserWithScore[] | null => {
  if (state.scoresState.roundScores) {
    const usersWithScores = state.scoresState.roundScores.usersWithScores;
    const roundSortedByName: IUserWithScore[] = sortArrayWithObjects<keyof IUserWithScore, IUserWithScore>('user')(
      usersWithScores,
    );

    return roundSortedByName;
  } else {
    return null;
  }
};
