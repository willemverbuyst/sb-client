import { IPlayer, IScoresPlayer } from '../../models/player.model';
import * as UTILS from '../../utils';
import { StoreState } from '../types';

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

export const selectPlayerScores = (state: StoreState): IScoresPlayer | null =>
  state.playersState.scoresPlayer;

export const selectUserNamePlayer = (state: StoreState): string | null => {
  if (state.playersState.playerProfile) {
    return state.playersState.playerProfile.userName;
  } else {
    return null;
  }
};
