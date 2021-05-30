import { ITeam } from '../../models/toto.models';
import { ActionTypeTeams, FetchAllTeams, ResetAllTeams } from './action-types';

export const allTeamsFetched = (teams: ITeam[]): FetchAllTeams => {
  return {
    type: ActionTypeTeams.FETCH_ALL_TEAMS,
    payload: teams,
  };
};

export const resetAllTeams = (): ResetAllTeams => {
  return {
    type: ActionTypeTeams.RESET_ALL_TEAMS,
  };
};
