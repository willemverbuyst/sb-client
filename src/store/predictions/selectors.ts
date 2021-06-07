import { IFixtureWithScoreAndPredictions, TotoRound } from '../../models/toto.models';
import { sortArrayWithObjects } from '../../utils/sortFunctions';
import { StoreState } from '../types';

export const selectCurrentRoundSortedByTime = (state: StoreState): IFixtureWithScoreAndPredictions[] | null => {
  if (
    state.predictionsState.currentRound &&
    state.predictionsState.currentRound.fixtures &&
    state.predictionsState.currentRound.fixtures.length > 0
  ) {
    const fixtures = state.predictionsState.currentRound.fixtures;

    const currentRoundSortedByTime = sortArrayWithObjects<
      keyof IFixtureWithScoreAndPredictions,
      IFixtureWithScoreAndPredictions
    >('eventTimeStamp')(fixtures);

    return currentRoundSortedByTime;
  }
  return null;
};

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

export const selectRoundAndTotoRoundNumber = (state: StoreState): Array<number> => {
  if (state.predictionsState.currentRound) {
    const roundNumber = state.predictionsState.currentRound.roundNumber;
    const totoRoundNumber = state.predictionsState.currentRound.totoRoundNumber;

    return [roundNumber, totoRoundNumber];
  } else {
    return [1, 1];
  }
};
