import { IUser } from '../../models/player.model';
import { IFixtureWithScoreAndPredictions } from '../../models/toto.models';
import { sortArrayWithObjects } from '../../utils/sortFunctions';
import { StoreState } from '../types';

export const selectToken = (state: StoreState): string | null => state.userState.token;

export const selectUser = (state: StoreState): IUser | null => state.userState.user;

export const selectCurrentRoundSortedByTime = (state: StoreState): IFixtureWithScoreAndPredictions[] | null => {
  if (
    state.userState.user &&
    state.userState.user.currentRound &&
    state.userState.user.currentRound.fixtures &&
    state.userState.user.currentRound.fixtures.length > 0
  ) {
    const fixtures = state.userState.user.currentRound.fixtures;

    const currentRoundSortedByTime = sortArrayWithObjects<
      keyof IFixtureWithScoreAndPredictions,
      IFixtureWithScoreAndPredictions
    >('eventTimeStamp')(fixtures);

    return currentRoundSortedByTime;
  }
  return null;
};
