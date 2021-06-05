import { IPrediction } from '../../models/predictions.model';
import { ICurrentRound, TotoRound } from '../../models/toto.models';

export enum ActionType {
  STORE_CURRENT_ROUND = 'STORE_CURRENT_ROUND',
  STORE_ALL_FIXTURES = 'STORE_ALL_FIXTURES',
  POST_PREDICTION = 'POST_PREDICTION',
  RESET_ALL_FIXTURES = 'RESET_ALL_FIXTURES',
  UPDATE_PREDICTION = 'UPDATE_PREDICTION',
}

export type PostPrediction = {
  type: ActionType.POST_PREDICTION;
  payload: IPrediction;
};

export type ResetAllFixtures = {
  type: ActionType.RESET_ALL_FIXTURES;
};

export type StoreAllFixtures = {
  type: ActionType.STORE_ALL_FIXTURES;
  payload: TotoRound[];
};

export type StoreCurrentRound = {
  type: ActionType.STORE_CURRENT_ROUND;
  payload: ICurrentRound;
};

export type UpdatePrediction = {
  type: ActionType.UPDATE_PREDICTION;
  payload: IPrediction;
};

export type PredictionActions =
  | PostPrediction
  | ResetAllFixtures
  | StoreAllFixtures
  | StoreCurrentRound
  | UpdatePrediction;
