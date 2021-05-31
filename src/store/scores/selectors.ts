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

export const selectScoresTotalTotoSortedByName = (state: StoreState): IUserWithScore[] | null => {
  if (state.scoresState.totalTotoScores && state.scoresState.totalTotoScores.length > 0) {
    const scoresTotalToto = state.scoresState.totalTotoScores;
    const scoresTotalTotoSortedByName: IUserWithScore[] = [...scoresTotalToto].sort((name1, name2) =>
      name1.user.toLowerCase().localeCompare(name2.user.toLowerCase()),
    );
    return scoresTotalTotoSortedByName;
  } else {
    return null;
  }
};

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
