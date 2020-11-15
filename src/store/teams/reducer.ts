import {
  ALL_TEAMS_FETCHED,
  REMOVE_ALL_TEAMS,
  TeamState,
  TeamsActionTypes,
} from './types';

const initialState: TeamState = {
  teams: null,
};

const adminReducer = (state = initialState, action: TeamsActionTypes) => {
  switch (action.type) {
    case ALL_TEAMS_FETCHED:
      return { ...state, teams: action.teams };

    case REMOVE_ALL_TEAMS:
      return { ...state, teams: null };

    default:
      return state;
  }
};

export default adminReducer;
