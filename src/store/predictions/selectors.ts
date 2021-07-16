import {
  IFixtureWithScoreAndPredictions,
  TotoRound,
} from '../../models/toto.models';
import * as UTILS from '../../utils';
import { StoreState } from '../types';

export const selectCurrentRoundSortedByTime = (
  state: StoreState,
): IFixtureWithScoreAndPredictions[] | null => {
  if (
    state.predictionsState.currentRound &&
    state.predictionsState.currentRound.fixtures &&
    state.predictionsState.currentRound.fixtures.length > 0
  ) {
    const fixtures = state.predictionsState.currentRound.fixtures;

    const currentRoundSortedByTime = UTILS.sortArrayWithObjects<
      keyof IFixtureWithScoreAndPredictions,
      IFixtureWithScoreAndPredictions
    >('eventTimeStamp')(fixtures);

    return currentRoundSortedByTime;
  }
  return null;
};

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
