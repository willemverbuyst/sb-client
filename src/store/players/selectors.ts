import { StoreState } from '../types';

export const selectPlayers = (state: StoreState) => state.playersState.players;

export const selectPlayerProfile = (state: StoreState) =>
  state.playersState.playerProfile;

export const selectPlayerScores = (state: StoreState) =>
  state.playersState.scoresPlayer;
