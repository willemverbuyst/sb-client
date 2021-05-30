import { ITeam } from '../../models/toto.models';

export enum ActionTypeTeams {
  FETCH_ALL_TEAMS = 'fetch all teams',
  RESET_ALL_TEAMS = 'reset all teams',
}

export type FetchAllTeams = {
  type: ActionTypeTeams.FETCH_ALL_TEAMS;
  payload: ITeam[];
};

export type ResetAllTeams = {
  type: ActionTypeTeams.RESET_ALL_TEAMS;
};

export type TeamsActions = FetchAllTeams | ResetAllTeams;
