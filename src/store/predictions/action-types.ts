import { IPrediction } from '../../models/predictions.model';
import { TotoRound } from '../../models/toto.models';

export enum ActionType {
  STORE_CURRENT_ROUND = 'STORE_CURRENT_ROUND',
  STORE_ALL_PREDICTIONS = 'STORE_ALL_PREDICTIONS',
  POST_PREDICTION = 'POST_PREDICTION',
  RESET_ALL_PREDICTIONS = 'RESET_ALL_PREDICTIONS',
  UPDATE_PREDICTION = 'UPDATE_PREDICTION',
}

export type PostPrediction = {
  type: ActionType.POST_PREDICTION;
  payload: IPrediction;
};

export type ResetAllPredictions = {
  type: ActionType.RESET_ALL_PREDICTIONS;
};

export type StoreAllPredictions = {
  type: ActionType.STORE_ALL_PREDICTIONS;
  payload: { player: string; fixtures: TotoRound[] };
};

export type UpdatePrediction = {
  type: ActionType.UPDATE_PREDICTION;
  payload: IPrediction;
};

export type PredictionActions =
  | PostPrediction
  | ResetAllPredictions
  | StoreAllPredictions
  | UpdatePrediction;
