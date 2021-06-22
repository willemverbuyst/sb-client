import { IUsersWithScoreAndRoundId, IUserWithScore, IUserWithScoreAndPrediction } from '../../models/scores.models';
import { IFixture } from '../../models/toto.models';
import * as UTILS from '../../utils';
import { StoreState } from '../types';

export const selectFixture = (state: StoreState): IFixture | null => {
  if (state.scoresState.fixtureScores) {
    return state.scoresState.fixtureScores.fixture;
  } else {
    return null;
  }
};

export const selectScoresForFixtureSortedByName = (state: StoreState): IUserWithScoreAndPrediction[] | null => {
  if (
    state.scoresState.fixtureScores &&
    state.scoresState.fixtureScores.scores &&
    state.scoresState.fixtureScores.scores.length > 0
  ) {
    const scoresFixture = state.scoresState.fixtureScores.scores;
    const scoresFixtureSortedByName: IUserWithScoreAndPrediction[] = UTILS.sortArrayWithObjects<
      keyof IUserWithScoreAndPrediction,
      IUserWithScoreAndPrediction
    >('user')(scoresFixture);

    return scoresFixtureSortedByName;
  } else {
    return null;
  }
};

export const selectRound = (state: StoreState): IUsersWithScoreAndRoundId | null => state.scoresState.roundScores;

export const selectRoundId = (state: StoreState): number | null => {
  if (state.scoresState.roundScores) {
    return state.scoresState.roundScores.roundId;
  } else {
    return null;
  }
};

export const selectScoresTotalTotoSortedByName = (state: StoreState): IUserWithScore[] | null => {
  if (state.scoresState.totalTotoScores && state.scoresState.totalTotoScores.length > 0) {
    const scoresTotalToto = state.scoresState.totalTotoScores;
    const scoresTotalTotoSortedByName: IUserWithScore[] = UTILS.sortArrayWithObjects<
      keyof IUserWithScore,
      IUserWithScore
    >('user')(scoresTotalToto);

    return scoresTotalTotoSortedByName;
  } else {
    return null;
  }
};

export const selectScoresTotalTotoSortedByScore = (state: StoreState): IUserWithScore[] | null => {
  if (state.scoresState.totalTotoScores && state.scoresState.totalTotoScores.length > 0) {
    const scoresTotalToto = state.scoresState.totalTotoScores;
    const scoresTotalTotoSortedByScore: IUserWithScore[] = UTILS.sortArrayWithObjects<
      keyof IUserWithScore,
      IUserWithScore
    >('score')(scoresTotalToto);

    return scoresTotalTotoSortedByScore;
  } else {
    return null;
  }
};

export const selectScoresTotoRoundSortedByName = (state: StoreState): IUserWithScore[] | null => {
  if (state.scoresState.totoRoundScores) {
    const scoresTotoRound = state.scoresState.totoRoundScores.usersWithScores;

    const scoresTotoRoundSortedByName: IUserWithScore[] = UTILS.sortArrayWithObjects<
      keyof IUserWithScore,
      IUserWithScore
    >('user')(scoresTotoRound);

    return scoresTotoRoundSortedByName;
  } else {
    return null;
  }
};

export const selectScoresTotoRoundSortedByScore = (state: StoreState): IUserWithScore[] | null => {
  if (state.scoresState.totoRoundScores) {
    const scoresTotoRound = state.scoresState.totoRoundScores.usersWithScores;

    const scoresTotoRoundSortedByScore: IUserWithScore[] = UTILS.sortArrayWithObjects<
      keyof IUserWithScore,
      IUserWithScore
    >('score')(scoresTotoRound);

    return scoresTotoRoundSortedByScore;
  } else {
    return null;
  }
};

export const selectScoresRoundSortedByName = (state: StoreState): IUserWithScore[] | null => {
  if (state.scoresState.roundScores) {
    const scoresRound = state.scoresState.roundScores.usersWithScores;

    const scoresRoundSortedByName: IUserWithScore[] = UTILS.sortArrayWithObjects<keyof IUserWithScore, IUserWithScore>(
      'user',
    )(scoresRound);

    return scoresRoundSortedByName;
  } else {
    return null;
  }
};

export const selectScoresRoundSortedByScore = (state: StoreState): IUserWithScore[] | null => {
  if (state.scoresState.roundScores) {
    const scoresRound = state.scoresState.roundScores.usersWithScores;
    const scoresRoundSortedByScore: IUserWithScore[] = UTILS.sortArrayWithObjects<keyof IUserWithScore, IUserWithScore>(
      'score',
    )(scoresRound);

    return scoresRoundSortedByScore;
  } else {
    return null;
  }
};

export const selectTotoRoundId = (state: StoreState): number | null => {
  if (state.scoresState.totoRoundScores) {
    return state.scoresState.totoRoundScores.totoRoundId;
  } else {
    return null;
  }
};
