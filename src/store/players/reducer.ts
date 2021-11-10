import { IPlayer } from '../../models/player.model'
import { ActionType, PlayersActions } from './action-types'

export interface IPlayersState {
  players: IPlayer[] | null
}

const initialState: IPlayersState = {
  players: null,
}

const playersReducer = (
  state = initialState,
  action: PlayersActions
): IPlayersState => {
  switch (action.type) {
    case ActionType.ADD_NEW_PLAYER:
      return {
        ...state,
        players: state.players
          ? [...state.players, action.payload.player]
          : null,
      }

    case ActionType.DELETE_PLAYER:
      return {
        ...state,
        players: state.players
          ? state.players.filter((player) => player.id !== action.payload)
          : null,
      }

    case ActionType.RESET_PLAYERS:
      return {
        players: null,
      }

    case ActionType.STORE_ALL_PLAYERS:
      return { ...state, players: action.payload.players }

    default:
      return state
  }
}

export default playersReducer
