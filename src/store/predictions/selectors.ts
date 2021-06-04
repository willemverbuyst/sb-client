import { ICurrentRound, IFixtureWithScoreAndPredictions, TotoRound } from '../../models/toto.models';
import { sortArrayWithObjects } from '../../utils/sortFunctions';
import { StoreState } from '../types';

export const selectCurrentRound = (state: StoreState): ICurrentRound | null => state.predictionsState.currentRound;

export const selectFixtures = (state: StoreState): TotoRound[] | null => state.predictionsState.allFixtures;

export const selectFixturesSortedByTime = (state: StoreState): TotoRound[] | null => {
  if (state.predictionsState.allFixtures) {
    const allFixtures = state.predictionsState.allFixtures;
    const fixturesSortedByTime = allFixtures.map((totoRound) =>
      totoRound.map((round) =>
        sortArrayWithObjects<keyof IFixtureWithScoreAndPredictions, IFixtureWithScoreAndPredictions>('eventTimeStamp')(
          round,
        ),
      ),
    );
    return fixturesSortedByTime;
  }
  return null;
};
