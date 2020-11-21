import {
  ADD_NEW_PLAYER,
  ALL_PLAYERS_FETCHED,
  REMOVE_ALL_PLAYERS,
  PlayersState,
  PlayersActionTypes,
} from './types';

const initialState: PlayersState = {
  players: null,
};

const playersReducer = (state = initialState, action: PlayersActionTypes) => {
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

export default playersReducer;
