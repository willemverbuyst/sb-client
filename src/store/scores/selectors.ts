import {
  IPlayerWithScore,
  IPlayerWithScoreAndPrediction,
  IScoresPlayer,
} from '../../models/player.model';
import { IRoundWithPlayersWithScore } from '../../models/scores.models';
import { IFixture } from '../../models/toto.models';
import * as UTILS from '../../utils';
import { StoreState } from '../types';

export const selectFixture = (state: StoreState): IFixture | null => {
  if (state.scoresState.fixtureWithScores) {
    return state.scoresState.fixtureWithScores.fixture;
  } else {
    return null;
  }
};

export const selectScoresForFixtureSortedByName = (
  state: StoreState,
): IPlayerWithScoreAndPrediction[] | null => {
  if (
    state.scoresState.fixtureWithScores &&
    state.scoresState.fixtureWithScores.scores &&
    state.scoresState.fixtureWithScores.scores.length > 0
  ) {
    const scoresFixture = state.scoresState.fixtureWithScores.scores;
    const scoresFixtureSortedByName: IPlayerWithScoreAndPrediction[] = UTILS.sortArrayWithObjects<
      keyof IPlayerWithScoreAndPrediction,
      IPlayerWithScoreAndPrediction
    >('name')('ascending')(scoresFixture);

    return scoresFixtureSortedByName;
  } else {
    return null;
  }
};

export const selectScoresForFixtureSortedByScore = (
  state: StoreState,
): IPlayerWithScoreAndPrediction[] | null => {
  if (
    state.scoresState.fixtureWithScores &&
    state.scoresState.fixtureWithScores.scores &&
    state.scoresState.fixtureWithScores.scores.length > 0
  ) {
    const scoresFixture = state.scoresState.fixtureWithScores.scores;
    const scoresFixtureSortedByScore: IPlayerWithScoreAndPrediction[] = UTILS.sortArrayWithObjects<
      keyof IPlayerWithScoreAndPrediction,
      IPlayerWithScoreAndPrediction
    >('score')('descending')(scoresFixture);

    console.log(scoresFixtureSortedByScore.map((score) => score.score));

    return scoresFixtureSortedByScore;
  } else {
    return null;
  }
};

export const selectRound = (
  state: StoreState,
): IRoundWithPlayersWithScore | null => state.scoresState.roundScores;

export const selectRoundId = (state: StoreState): number | null => {
  if (state.scoresState.roundScores) {
    return state.scoresState.roundScores.roundId;
  } else {
    return null;
  }
};

export const selectScoresTotalTotoSortedByName = (
  state: StoreState,
): IPlayerWithScore[] | null => {
  if (
    state.scoresState.totalTotoScores &&
    state.scoresState.totalTotoScores.scores &&
    state.scoresState.totalTotoScores.scores.length > 0
  ) {
    const scoresTotalToto = state.scoresState.totalTotoScores.scores;
    const scoresTotalTotoSortedByName: IPlayerWithScore[] = UTILS.sortArrayWithObjects<
      keyof IPlayerWithScore,
      IPlayerWithScore
    >('name')('ascending')(scoresTotalToto);

    return scoresTotalTotoSortedByName;
  } else {
    return null;
  }
};

export const selectScoresTotalTotoSortedByScore = (
  state: StoreState,
): IPlayerWithScore[] | null => {
  if (
    state.scoresState.totalTotoScores &&
    state.scoresState.totalTotoScores.scores &&
    state.scoresState.totalTotoScores.scores.length > 0
  ) {
    const scoresTotalToto = state.scoresState.totalTotoScores.scores;
    const scoresTotalTotoSortedByScore: IPlayerWithScore[] = UTILS.sortArrayWithObjects<
      keyof IPlayerWithScore,
      IPlayerWithScore
    >('score')('descending')(scoresTotalToto);

    return scoresTotalTotoSortedByScore;
  } else {
    return null;
  }
};

export const selectScoresTotoRoundSortedByName = (
  state: StoreState,
): IPlayerWithScore[] | null => {
  if (state.scoresState.totoRoundScores) {
    const scoresTotoRound = state.scoresState.totoRoundScores.scores;

    const scoresTotoRoundSortedByName: IPlayerWithScore[] = UTILS.sortArrayWithObjects<
      keyof IPlayerWithScore,
      IPlayerWithScore
    >('name')('ascending')(scoresTotoRound);

    return scoresTotoRoundSortedByName;
  } else {
    return null;
  }
};

export const selectScoresTotoRoundSortedByScore = (
  state: StoreState,
): IPlayerWithScore[] | null => {
  if (state.scoresState.totoRoundScores) {
    const scoresTotoRound = state.scoresState.totoRoundScores.scores;

    const scoresTotoRoundSortedByScore: IPlayerWithScore[] = UTILS.sortArrayWithObjects<
      keyof IPlayerWithScore,
      IPlayerWithScore
    >('score')('descending')(scoresTotoRound);

    return scoresTotoRoundSortedByScore;
  } else {
    return null;
  }
};

export const selectScoresRoundSortedByName = (
  state: StoreState,
): IPlayerWithScore[] | null => {
  if (state.scoresState.roundScores) {
    const scoresRound = state.scoresState.roundScores.scores;

    const scoresRoundSortedByName: IPlayerWithScore[] = UTILS.sortArrayWithObjects<
      keyof IPlayerWithScore,
      IPlayerWithScore
    >('name')('ascending')(scoresRound);

    return scoresRoundSortedByName;
  } else {
    return null;
  }
};

export const selectScoresRoundSortedByScore = (
  state: StoreState,
): IPlayerWithScore[] | null => {
  if (state.scoresState.roundScores) {
    const scoresRound = state.scoresState.roundScores.scores;
    const scoresRoundSortedByScore: IPlayerWithScore[] = UTILS.sortArrayWithObjects<
      keyof IPlayerWithScore,
      IPlayerWithScore
    >('score')('descending')(scoresRound);

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

export const selectPlayerScores = (state: StoreState): IScoresPlayer | null =>
  state.scoresState.scoresPlayer;
