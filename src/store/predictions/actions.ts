import { IPrediction } from '../../models/predictions.model';
import { TotoRound } from '../../models/toto.models';
import {
  ActionType,
  PostPrediction,
  ResetAllFixtures,
  ResetAllPredictions,
  StoreAllFixtures,
  StoreAllPredictions,
  UpdatePrediction,
} from './action-types';

export const storeAllFixtures = (
  allFixtures: TotoRound[],
): StoreAllFixtures => {
  return {
    type: ActionType.STORE_ALL_FIXTURES,
    payload: allFixtures,
  };
};

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

export const resetAllFixtures = (): ResetAllFixtures => {
  return {
    type: ActionType.RESET_ALL_FIXTURES,
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
