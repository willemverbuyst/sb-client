import {
  IPlayer,
  IPlayerProfile,
  IScoresPlayer,
} from '../../models/player.model';
import { ActionType, PlayersActions } from './action-types';

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

const playersReducer = (
  state = initialState,
  action: PlayersActions,
): IPlayersState => {
  switch (action.type) {
    case ActionType.ADD_NEW_PLAYER:
      return {
        ...state,
        players: state.players ? [...state.players, action.payload] : null,
      };

    case ActionType.DELETE_PLAYER:
      return {
        ...state,
        players: state.players
          ? state.players.filter((player) => player.id !== action.payload)
          : null,
      };

    case ActionType.RESET_PLAYERS:
      return {
        ...state,
        players: null,
        playerProfile: null,
        scoresPlayer: null,
      };

    case ActionType.STORE_ALL_PLAYERS:
      return { ...state, players: [...action.payload] };

    case ActionType.STORE_PLAYER_SCORES:
      return { ...state, scoresPlayer: action.payload };

    default:
      return state;
  }
};

export default playersReducer;
