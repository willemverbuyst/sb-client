import {
  IFixtureWithScoreAndPredictions,
  TotoRound,
} from '../../models/toto.models';
import * as UTILS from '../../utils';
import { StoreState } from '../types';

export const selectFixtures = (state: StoreState): TotoRound[] | null =>
  state.predictionsState.allFixtures;

export const selectFixturesSortedByTime = (
  state: StoreState,
): TotoRound[] | null => {
  if (
    state.predictionsState.allFixtures &&
    state.predictionsState.allFixtures.length > 0
  ) {
    const allFixtures = state.predictionsState.allFixtures;
    const fixturesSortedByTime = allFixtures.map((totoRound) =>
      totoRound.map((round) =>
        UTILS.sortArrayWithObjects<
          keyof IFixtureWithScoreAndPredictions,
          IFixtureWithScoreAndPredictions
        >('eventTimeStamp')(round),
      ),
    );
    return fixturesSortedByTime;
  }
  return null;
};

export const selectAllPredictions = (state: StoreState): TotoRound[] | null =>
  state.predictionsState.allPredictions;

export const selectAllPredictionsSortedByTime = (
  state: StoreState,
): TotoRound[] | null => {
  if (
    state.predictionsState.allPredictions &&
    state.predictionsState.allPredictions.length > 0
  ) {
    const allPredictions = state.predictionsState.allPredictions;
    const fixturesSortedByTime = allPredictions.map((totoRound) =>
      totoRound.map((round) =>
        UTILS.sortArrayWithObjects<
          keyof IFixtureWithScoreAndPredictions,
          IFixtureWithScoreAndPredictions
        >('eventTimeStamp')(round),
      ),
    );
    return fixturesSortedByTime;
  }
  return null;
};
