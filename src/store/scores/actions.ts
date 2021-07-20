import { IScoresPlayer } from '../../models/player.model';
import {
  IFixtureWithUsersWithScoreAndPrediction,
  IUsersWithScoreAndRoundId,
  IUsersWithScoreAndTotoRoundId,
  IUserWithScore,
} from '../../models/scores.models';
import {
  ActionType,
  ResetAllScores,
  StorePlayerScores,
  StoreScoresFixture,
  StoreScoresRound,
  StoreScoresTotalToto,
  StoreScoresTotoRound,
} from './action-types';

export const resetAllScores = (): ResetAllScores => {
  return {
    type: ActionType.RESET_ALL_SCORES,
  };
};

export const storeScoresFixture = (
  fixtureWithScores: IFixtureWithUsersWithScoreAndPrediction,
): StoreScoresFixture => {
  return {
    type: ActionType.STORE_SCORES_FIXTURE,
    payload: fixtureWithScores,
  };
};

export const storeScoresRound = (
  round: IUsersWithScoreAndRoundId,
): StoreScoresRound => {
  return {
    type: ActionType.STORE_SCORES_ROUND,
    payload: round,
  };
};

export const storeScoresTotalToto = (
  totalToto: IUserWithScore[],
): StoreScoresTotalToto => {
  return {
    type: ActionType.STORE_SCORES_TOTAL_TOTO,
    payload: totalToto,
  };
};

export const storeScoresTotoRound = (
  totoRound: IUsersWithScoreAndTotoRoundId,
): StoreScoresTotoRound => {
  return {
    type: ActionType.STORE_SCORES_TOTO_ROUND,
    payload: totoRound,
  };
};

export const storePlayerScores = (
  scoresPlayer: IScoresPlayer,
): StorePlayerScores => ({
  type: ActionType.STORE_PLAYER_SCORES,
  payload: scoresPlayer,
});
