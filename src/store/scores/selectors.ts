import { IPredictionWithScorePerUser, IScores, IUserWithScore } from '../../models/scores.models';
import { IFixture } from '../../models/toto.models';
import { sortArrayWithObjects } from '../../utils/sortFunctions';
import { StoreState } from '../types';

export const selectFixture = (state: StoreState): IFixture | null => {
  if (state.scoresState.fixtureScores) {
    return state.scoresState.fixtureScores.fixture;
  } else {
    return null;
  }
};

export const selectScoresForFixtureSortedByName = (state: StoreState): IPredictionWithScorePerUser[] | null => {
  if (
    state.scoresState.fixtureScores &&
    state.scoresState.fixtureScores.scores &&
    state.scoresState.fixtureScores.scores.length > 0
  ) {
    const fixtureWithScores = state.scoresState.fixtureScores.scores;
    const scoresSortedByName: IPredictionWithScorePerUser[] = sortArrayWithObjects<
      keyof IPredictionWithScorePerUser,
      IPredictionWithScorePerUser
    >('user')(fixtureWithScores);

    return scoresSortedByName;
  } else {
    return null;
  }
};

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
