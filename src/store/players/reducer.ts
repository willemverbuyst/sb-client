import { IPlayer, IPlayerProfile, IScoresPlayer } from '../../models/player.model';
import { ActionType } from './action-types';
import { PlayersActionTypes } from './actions';

interface IPlayersState {
  players: IPlayer[] | null;
  playerProfile: IPlayerProfile | null;
  scoresPlayer: IScoresPlayer | null;
}

const initialState: IPlayersState = {
  players: null,
  playerProfile: null,
  scoresPlayer: null,
};

const playersReducer = (state = initialState, action: PlayersActionTypes): IPlayersState => {
  switch (action.type) {
    case ActionType.ADD_NEW_PLAYER:
      return {
        ...state,
        players: state.players ? [...state.players, action.payload] : null,
      };

    case ActionType.FETCH_ALL_PLAYERS:
      return { ...state, players: [...action.payload] };

    case ActionType.DELETE_PLAYER:
      return {
        ...state,
        players: state.players ? state.players.filter((player) => player.id !== action.payload) : null,
      };

    case ActionType.FETCH_PLAYER_PROFILE:
      return { ...state, playerProfile: action.payload };

    case ActionType.FETCH_PLAYER_SCORES:
      return { ...state, scoresPlayer: action.payload };

    case ActionType.UPDATE_ADMIN_STATUS:
      return {
        ...state,
        players: state.players
          ? [
              ...state.players.map((player) => {
                if (player.id === action.payload.id) {
                  return action.payload;
                } else {
                  return player;
                }
              }),
            ]
          : null,
      };

    default:
      return state;
  }
};

export default playersReducer;
