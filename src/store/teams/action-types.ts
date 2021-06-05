import { ITeam } from '../../models/toto.models';

export enum ActionType {
  RESET_ALL_TEAMS = 'RESET_ALL_TEAMS',
  STORE_ALL_TEAMS = 'fSTORE_ALL_TEAMS',
}

export type StoreAllTeams = {
  type: ActionType.STORE_ALL_TEAMS;
  payload: ITeam[];
};

export type ResetAllTeams = {
  type: ActionType.RESET_ALL_TEAMS;
};

export type TeamsActions = ResetAllTeams | StoreAllTeams;
