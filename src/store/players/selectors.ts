import { IPlayer, IScoresPlayer } from '../../models/player.model';
import {
  IFixtureWithScoreAndPredictions,
  TotoRound,
} from '../../models/toto.models';
import * as UTILS from '../../utils';
import { StoreState } from '../types';

export const selectPlayers = (state: StoreState): IPlayer[] | null =>
  state.playersState.players;

export const selectPlayersSortedByName = (
  state: StoreState,
): IPlayer[] | null => {
  if (state.playersState.players && state.playersState.players.length > 0) {
    const players = state.playersState.players;
    const playersSortedByName = UTILS.sortArrayWithObjects<
      keyof IPlayer,
      IPlayer
    >('userName')(players);
    return playersSortedByName;
  }
  return null;
};

export const selectPastFixturesWithScoresSortedByTime = (
  state: StoreState,
): TotoRound[] | null => {
  if (
    state.playersState.playerProfile &&
    state.playersState.playerProfile.pastFixturesWithScores &&
    state.playersState.playerProfile.pastFixturesWithScores.length > 0
  ) {
    const pastFixturesWithScores =
      state.playersState.playerProfile.pastFixturesWithScores;

    const pastFixturesWithScoresSortedByTime = pastFixturesWithScores.map(
      (totoRound) =>
        totoRound.map((round) =>
          UTILS.sortArrayWithObjects<
            keyof IFixtureWithScoreAndPredictions,
            IFixtureWithScoreAndPredictions
          >('eventTimeStamp')(round),
        ),
    );
    return pastFixturesWithScoresSortedByTime;
  } else {
    return null;
  }
};

export const selectPlayerScores = (state: StoreState): IScoresPlayer | null =>
  state.playersState.scoresPlayer;

export const selectUserNamePlayer = (state: StoreState): string | null => {
  if (state.playersState.playerProfile) {
    return state.playersState.playerProfile.userName;
  } else {
    return null;
  }
};
