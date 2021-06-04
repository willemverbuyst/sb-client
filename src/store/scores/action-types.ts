import { IFixtureWithScores, IScores, IUserWithScore } from '../../models/scores.models';

export enum ActionType {
  RESET_ALL_SCORES = 'RESET_ALL_SCORES ',
  STORE_SCORES_FIXTURE = 'STORE_SCORES_FIXTURE',
  STORE_SCORES_ROUND = 'STORE_SCORES_ROUND',
  STORE_SCORES_TOTAL_TOTO = 'STORE_SCORES_TOTAL_TOTO',
  STORE_SCORES_TOTO_ROUND = 'STORE_SCORES_TOTO_ROUND',
}

export type ResetAllScores = {
  type: ActionType.RESET_ALL_SCORES;
};

export type StoreScoresFixture = {
  type: ActionType.STORE_SCORES_FIXTURE;
  payload: IFixtureWithScores;
};

export type StoreScoresRound = {
  type: ActionType.STORE_SCORES_ROUND;
  payload: IScores;
};

export type StoreScoresTotalToto = {
  type: ActionType.STORE_SCORES_TOTAL_TOTO;
  payload: IUserWithScore[];
};

export type StoreScoresTotoRound = {
  type: ActionType.STORE_SCORES_TOTO_ROUND;
  payload: IScores;
};

export type ScoresActions =
  | ResetAllScores
  | StoreScoresFixture
  | StoreScoresRound
  | StoreScoresTotalToto
  | StoreScoresTotoRound;