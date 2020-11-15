import { StoreState } from '../types';

export const selectPlayers = (state: StoreState) => state.teamsState.teams;
