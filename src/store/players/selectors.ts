import { IPlayer, IScoresPlayer } from '../../models/player.model';
import { TotoRound } from '../../models/toto.models';
import { StoreState } from '../types';

export const selectPlayers = (state: StoreState): IPlayer[] | null => state.playersState.players;

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
