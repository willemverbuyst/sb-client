import { ITeam } from '../../models/toto.models';

export const ALL_TEAMS_FETCHED = 'ALL_TEAMS_FETCHED';
export const REMOVE_ALL_TEAMS = 'REMOVE_ALL_TEAMS';

export type TeamsState = {
  teams: ITeam[] | null;
};

export type AllTeamsFetched = {
  type: typeof ALL_TEAMS_FETCHED;
  teams: ITeam[];
};

export type RemoveAllTeams = {
  type: typeof REMOVE_ALL_TEAMS;
};

export type TeamsActionTypes = AllTeamsFetched | RemoveAllTeams;
