import { IPrediction } from '../../models/predictions.model';
import { ICurrentRound, TotoRound } from '../../models/toto.models';
import {
  ActionType,
  PostPrediction,
  ResetAllFixtures,
  StoreAllFixtures,
  StoreCurrentRound,
  UpdatePrediction,
} from './action-types';

export const storeAllFixtures = (allFixtures: TotoRound[]): StoreAllFixtures => {
  return {
    type: ActionType.STORE_ALL_FIXTURES,
    payload: allFixtures,
  };
};

export const storeCurrentRound = (currentRound: ICurrentRound): StoreCurrentRound => {
  return {
    type: ActionType.STORE_CURRENT_ROUND,
    payload: currentRound,
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

export const updatePrediction = (prediction: IPrediction): UpdatePrediction => {
  return {
    type: ActionType.UPDATE_PREDICTION,
    payload: prediction,
  };
};
