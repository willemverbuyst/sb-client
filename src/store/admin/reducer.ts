import { ALL_PLAYERS_FETCHED, AdminState, AdminActionTypes } from './types';

const initialState: AdminState = {
  players: null,
};

const adminReducer = (state = initialState, action: AdminActionTypes) => {
  switch (action.type) {
    case ALL_PLAYERS_FETCHED:
      return { ...state, players: action.players };

    default:
      return state;
  }
};

export default adminReducer;
