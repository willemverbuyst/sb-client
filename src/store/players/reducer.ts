import {
  ADD_NEW_PLAYER,
  ALL_PLAYERS_FETCHED,
  DELETE_PLAYER,
  PLAYER_PROFILE_FETCHED,
  PLAYER_SCORES_FETCHED,
  REMOVE_ALL_PLAYERS,
  UPDATE_ADMIN_STATUS,
  PlayersState,
  PlayersActionTypes,
} from './types';

const initialState: PlayersState = {
  players: null,
  playerProfile: null,
  scoresPlayer: null,
};

const playersReducer = (state = initialState, action: PlayersActionTypes) => {
  switch (action.type) {
    case ADD_NEW_PLAYER:
      if (state.players)
        return { ...state, players: [...state.players, action.player] };
      else return state;

    case ALL_PLAYERS_FETCHED:
      return { ...state, players: [...action.players] };

    case DELETE_PLAYER:
      return {
        ...state,
        players: state.players?.filter(
          (player) => player.id !== action.playerId
        ),
      };

    case PLAYER_PROFILE_FETCHED:
      return { ...state, playerProfile: action.playerProfile };

    case PLAYER_SCORES_FETCHED:
      return { ...state, scoresPlayer: action.scoresPlayer };

    case REMOVE_ALL_PLAYERS:
      return {
        players: null,
        playerProfile: null,
        scoresPlayer: null,
      };

    case UPDATE_ADMIN_STATUS:
      if (state.players) {
        return {
          ...state,
          players: [
            ...state.players.map((player) => {
              if (player.id === action.player.id) {
                return action.player;
              } else {
                return player;
              }
            }),
          ],
        };
      } else return state;

    default:
      return state;
  }
};

export default playersReducer;
