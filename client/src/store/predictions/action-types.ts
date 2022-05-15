import {
  IPlayerWithPredictions,
  IPostedPrediction,
  IUpdatedPrediction,
} from '../../models/predictions.model'

export enum ActionType {
  STORE_CURRENT_ROUND = 'STORE_CURRENT_ROUND',
  STORE_ALL_PREDICTIONS = 'STORE_ALL_PREDICTIONS',
  POST_PREDICTION = 'POST_PREDICTION',
  RESET_ALL_PREDICTIONS = 'RESET_ALL_PREDICTIONS',
  UPDATE_PREDICTION = 'UPDATE_PREDICTION',
}

export type PostPrediction = {
  type: ActionType.POST_PREDICTION
  payload: IPostedPrediction
}

export type ResetAllPredictions = {
  type: ActionType.RESET_ALL_PREDICTIONS
}

export type StoreAllPredictions = {
  type: ActionType.STORE_ALL_PREDICTIONS
  payload: IPlayerWithPredictions
}

export type UpdatePrediction = {
  type: ActionType.UPDATE_PREDICTION
  payload: IUpdatedPrediction
}

export type PredictionActions =
  | PostPrediction
  | ResetAllPredictions
  | StoreAllPredictions
  | UpdatePrediction
