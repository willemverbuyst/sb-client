import {
  IPlayerWithPredictions,
  IPostedPrediction,
  IUpdatedPrediction,
} from '../../models/predictions.model'
import { Action, ActionWithPayload } from '../types'

export enum ActionType {
  STORE_CURRENT_ROUND = 'STORE_CURRENT_ROUND',
  STORE_ALL_PREDICTIONS = 'STORE_ALL_PREDICTIONS',
  POST_PREDICTION = 'POST_PREDICTION',
  RESET_ALL_PREDICTIONS = 'RESET_ALL_PREDICTIONS',
  UPDATE_PREDICTION = 'UPDATE_PREDICTION',
}

export type PostPrediction = ActionWithPayload<
  ActionType.POST_PREDICTION,
  IPostedPrediction
>

export type ResetAllPredictions = Action<ActionType.RESET_ALL_PREDICTIONS>

export type StoreAllPredictions = ActionWithPayload<
  ActionType.STORE_ALL_PREDICTIONS,
  IPlayerWithPredictions
>

export type UpdatePrediction = ActionWithPayload<
  ActionType.UPDATE_PREDICTION,
  IUpdatedPrediction
>

export type PredictionActions =
  | PostPrediction
  | ResetAllPredictions
  | StoreAllPredictions
  | UpdatePrediction
