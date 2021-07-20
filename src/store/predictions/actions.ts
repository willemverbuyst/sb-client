import { IPrediction } from '../../models/predictions.model';
import { TotoRound } from '../../models/toto.models';
import {
  ActionType,
  PostPrediction,
  ResetAllPredictions,
  StoreAllPredictions,
  UpdatePrediction,
} from './action-types';

export const storeAllPredictions = (allPredictions: {
  fixtures: TotoRound[];
  player: string;
}): StoreAllPredictions => {
  return {
    type: ActionType.STORE_ALL_PREDICTIONS,
    payload: allPredictions,
  };
};

export const postPrediction = (prediction: IPrediction): PostPrediction => {
  return {
    type: ActionType.POST_PREDICTION,
    payload: prediction,
  };
};

export const resetAllPredictions = (): ResetAllPredictions => {
  return {
    type: ActionType.RESET_ALL_PREDICTIONS,
  };
};

export const updatePrediction = (prediction: IPrediction): UpdatePrediction => {
  return {
    type: ActionType.UPDATE_PREDICTION,
    payload: prediction,
  };
};
