export const ALL_TEAMS_FETCHED = 'ALL_TEAMS_FETCHED';
export const REMOVE_ALL_TEAMS = 'REMOVE_ALL_TEAMS';

export type TeamState = {
  players: Team[] | null;
};

export type Team = {
  id: number;
  name: string;
  logo: string;
};

export type AllTeamsFetched = {
  type: typeof ALL_TEAMS_FETCHED;
  teams: Team[];
};

export type RemoveAllTeams = {
  type: typeof REMOVE_ALL_TEAMS;
};

export type TeamsActionTypes = AllTeamsFetched | RemoveAllTeams;
