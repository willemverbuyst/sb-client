import { ITeam } from '../../models/toto.models';
import { ActionTypeTeams, TeamsActions } from './action-types';

export interface ITeamsState {
  teams: ITeam[] | null;
}

const initialState: ITeamsState = {
  teams: null,
};

const teamReducer = (state = initialState, action: TeamsActions): ITeamsState => {
  switch (action.type) {
    case ActionTypeTeams.FETCH_ALL_TEAMS:
      return { ...state, teams: action.payload };

    case ActionTypeTeams.RESET_ALL_TEAMS:
      return { teams: null };

    default:
      return state;
  }
};

export default teamReducer;
