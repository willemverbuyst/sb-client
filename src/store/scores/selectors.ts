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
    const scoresFixture = state.scoresState.fixtureScores.scores;
    const scoresFixtureSortedByName: IPredictionWithScorePerUser[] = sortArrayWithObjects<
      keyof IPredictionWithScorePerUser,
      IPredictionWithScorePerUser
    >('user')(scoresFixture);

    return scoresFixtureSortedByName;
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
    const scoresTotalTotoSortedByName: IUserWithScore[] = sortArrayWithObjects<keyof IUserWithScore, IUserWithScore>(
      'user',
    )(scoresTotalToto);

    return scoresTotalTotoSortedByName;
  } else {
    return null;
  }
};

export const selectScoresTotoRoundSortedByName = (state: StoreState): IUserWithScore[] | null => {
  if (state.scoresState.totoRoundScores) {
    const scoresTotoRound = state.scoresState.totoRoundScores.usersWithScores;

    const scoresTotoRoundSortedByName: IUserWithScore[] = sortArrayWithObjects<keyof IUserWithScore, IUserWithScore>(
      'user',
    )(scoresTotoRound);

    return scoresTotoRoundSortedByName;
  } else {
    return null;
  }
};

export const selectScoresRoundSortedByName = (state: StoreState): IUserWithScore[] | null => {
  if (state.scoresState.roundScores) {
    const scoresRound = state.scoresState.roundScores.usersWithScores;
    const scoresRoundSortedByName: IUserWithScore[] = sortArrayWithObjects<keyof IUserWithScore, IUserWithScore>(
      'user',
    )(scoresRound);

    return scoresRoundSortedByName;
  } else {
    return null;
  }
};

export const selectTotoRoundId = (state: StoreState): number | null => {
  if (state.scoresState.totoRoundScores) {
    return state.scoresState.totoRoundScores.id;
  } else {
    return null;
  }
};
