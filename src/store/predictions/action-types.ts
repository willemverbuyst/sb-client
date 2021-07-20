import { IPrediction } from '../../models/predictions.model';
import { TotoRound } from '../../models/toto.models';

export enum ActionType {
  STORE_CURRENT_ROUND = 'STORE_CURRENT_ROUND',
  STORE_ALL_FIXTURES = 'STORE_ALL_FIXTURES',
  STORE_ALL_PREDICTIONS = 'STORE_ALL_PREDICTIONS',
  POST_PREDICTION = 'POST_PREDICTION',
  RESET_ALL_FIXTURES = 'RESET_ALL_FIXTURES',
  RESET_ALL_PREDICTIONS = 'RESET_ALL_PREDICTIONS',
  UPDATE_PREDICTION = 'UPDATE_PREDICTION',
}

export type PostPrediction = {
  type: ActionType.POST_PREDICTION;
  payload: IPrediction;
};

export type ResetAllFixtures = {
  type: ActionType.RESET_ALL_FIXTURES;
};

export type ResetAllPredictions = {
  type: ActionType.RESET_ALL_PREDICTIONS;
};

export type StoreAllFixtures = {
  type: ActionType.STORE_ALL_FIXTURES;
  payload: TotoRound[];
};

export type StoreAllPredictions = {
  type: ActionType.STORE_ALL_PREDICTIONS;
  payload: { fixtures: TotoRound[]; player: string };
};

export type UpdatePrediction = {
  type: ActionType.UPDATE_PREDICTION;
  payload: IPrediction;
};

export type PredictionActions =
  | PostPrediction
  | ResetAllFixtures
  | ResetAllPredictions
  | StoreAllFixtures
  | StoreAllPredictions
  | UpdatePrediction;
