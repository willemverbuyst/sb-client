import { IPlayer, IPlayerProfile, IScoresPlayer } from '../../models/player.model';
import { ActionTypePlayers } from './action-types';
import { PlayersActions } from './actions';

export interface IPlayersState {
  players: IPlayer[] | null;
  playerProfile: IPlayerProfile | null;
  scoresPlayer: IScoresPlayer | null;
}

const initialState: IPlayersState = {
  players: null,
  playerProfile: null,
  scoresPlayer: null,
};

const playersReducer = (state = initialState, action: PlayersActions): IPlayersState => {
  switch (action.type) {
    case ActionTypePlayers.ADD_NEW_PLAYER:
      return {
        ...state,
        players: state.players ? [...state.players, action.payload] : null,
      };

    case ActionTypePlayers.FETCH_ALL_PLAYERS:
      return { ...state, players: [...action.payload] };

    case ActionTypePlayers.RESET_PLAYERS:
      return {
        ...state,
        players: null,
      };

    case ActionTypePlayers.DELETE_PLAYER:
      return {
        ...state,
        players: state.players ? state.players.filter((player) => player.id !== action.payload) : null,
      };

    case ActionTypePlayers.FETCH_PLAYER_PROFILE:
      return { ...state, playerProfile: action.payload };

    case ActionTypePlayers.FETCH_PLAYER_SCORES:
      return { ...state, scoresPlayer: action.payload };

    case ActionTypePlayers.UPDATE_ADMIN_STATUS:
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
