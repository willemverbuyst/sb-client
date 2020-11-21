import { StoreState } from '../types';

export const selectPlayers = (state: StoreState) => state.playersState.players;

export const selectPlayersProfile = (state: StoreState) =>
  state.playersState.playerProfile;
