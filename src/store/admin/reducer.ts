import {
  ADD_NEW_PLAYER,
  ALL_PLAYERS_FETCHED,
  REMOVE_ALL_PLAYERS,
  AdminState,
  AdminActionTypes,
} from './types';

const initialState: AdminState = {
  players: null,
};

const adminReducer = (state = initialState, action: AdminActionTypes) => {
  switch (action.type) {
    case ADD_NEW_PLAYER:
      if (state.players)
        return { ...state, players: [...state.players, action.player] };
      else return state;

    case ALL_PLAYERS_FETCHED:
      return { ...state, players: action.players };

    case REMOVE_ALL_PLAYERS:
      return { ...state, players: null };

    default:
      return state;
  }
};

export default adminReducer;
