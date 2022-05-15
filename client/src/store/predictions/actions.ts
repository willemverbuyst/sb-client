import {
  IPlayerWithPredictions,
  IPostedPrediction,
  IUpdatedPrediction,
} from '../../models/predictions.model'
import {
  ActionType,
  PostPrediction,
  ResetAllPredictions,
  StoreAllPredictions,
  UpdatePrediction,
} from './action-types'

export const storeAllPredictions = (
  allPredictions: IPlayerWithPredictions
): StoreAllPredictions => ({
  type: ActionType.STORE_ALL_PREDICTIONS,
  payload: allPredictions,
})

export const postPrediction = (
  prediction: IPostedPrediction
): PostPrediction => ({
  type: ActionType.POST_PREDICTION,
  payload: prediction,
})

export const resetAllPredictions = (): ResetAllPredictions => ({
  type: ActionType.RESET_ALL_PREDICTIONS,
})

export const updatePrediction = (
  prediction: IUpdatedPrediction
): UpdatePrediction => ({
  type: ActionType.UPDATE_PREDICTION,
  payload: prediction,
})
