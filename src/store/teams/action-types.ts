import { ITeam } from '../../models/toto.models';

export enum ActionType {
  RESET_ALL_TEAMS = 'reset all teams',
  STORE_ALL_TEAMS = 'fetch all teams',
}

export type StoreAllTeams = {
  type: ActionType.STORE_ALL_TEAMS;
  payload: ITeam[];
};

export type ResetAllTeams = {
  type: ActionType.RESET_ALL_TEAMS;
};

export type TeamsActions = ResetAllTeams | StoreAllTeams;
