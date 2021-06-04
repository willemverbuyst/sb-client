import { IPlayer, IScoresPlayer } from '../../models/player.model';
import { TotoRound } from '../../models/toto.models';
import { sortArrayWithObjects } from '../../utils/sortFunctions';
import { StoreState } from '../types';

export const selectPlayers = (state: StoreState): IPlayer[] | null => state.playersState.players;

export const selectPlayersSortedByName = (state: StoreState): IPlayer[] | null => {
  if (state.playersState.players) {
    const players = state.playersState.players;
    const playersSortedByName = sortArrayWithObjects<keyof IPlayer, IPlayer>('userName')(players);
    return playersSortedByName;
  }
  return null;
};

export const selectPastFixturesWithScoresPlayer = (state: StoreState): TotoRound[] | null => {
  if (state.playersState.playerProfile) {
    return state.playersState.playerProfile.pastFixturesWithScores;
  } else {
    return null;
  }
};

export const selectPlayerScores = (state: StoreState): IScoresPlayer | null => state.playersState.scoresPlayer;

export const selectUserNamePlayer = (state: StoreState): string | null => {
  if (state.playersState.playerProfile) {
    return state.playersState.playerProfile.userName;
  } else {
    return null;
  }
};
