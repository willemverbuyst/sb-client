import { StoreState } from '../types';

export const selectTeams = (state: StoreState) => state.teamsState.teams;
