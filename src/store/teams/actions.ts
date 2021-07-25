import { IAllTeams } from '../../models/toto.models';
import { ActionType, ResetAllTeams, StoreAllTeams } from './action-types';

export const storeAllTeams = (teams: IAllTeams): StoreAllTeams => {
  return {
    type: ActionType.STORE_ALL_TEAMS,
    payload: teams,
  };
};

export const resetAllTeams = (): ResetAllTeams => {
  return {
    type: ActionType.RESET_ALL_TEAMS,
  };
};
