import { IFixtureWithScores, IScores, IUserWithScore } from '../../models/scores.models';
import {
  ActionType,
  ResetAllScores,
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

export const storeScoresFixture = (fixture: IFixtureWithScores): StoreScoresFixture => {
  return {
    type: ActionType.STORE_SCORES_FIXTURE,
    payload: fixture,
  };
};

export const storeScoresRound = (round: IScores): StoreScoresRound => {
  return {
    type: ActionType.STORE_SCORES_ROUND,
    payload: round,
  };
};

export const storeScoresTotalToto = (totalToto: IUserWithScore[]): StoreScoresTotalToto => {
  return {
    type: ActionType.STORE_SCORES_TOTAL_TOTO,
    payload: totalToto,
  };
};

export const storeScoresTotoRound = (totoRound: IScores): StoreScoresTotoRound => {
  return {
    type: ActionType.STORE_SCORES_TOTO_ROUND,
    payload: totoRound,
  };
};
