import { ITeam } from '../../models/toto.models';
import { StoreState } from '../types';

export const selectTeams = (state: StoreState): ITeam[] | null => state.teamsState.teams;
