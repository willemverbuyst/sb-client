import { IAllPlayers, INewPlayer } from '../../models/player.model'
import {
  ActionType,
  AddNewPlayer,
  DeletePlayer,
  ResetPlayers,
  StoreAllPlayers,
} from './action-types'

export const addNewPlayer = (player: INewPlayer): AddNewPlayer => ({
  type: ActionType.ADD_NEW_PLAYER,
  payload: player,
})

export const storeAllPlayers = (players: IAllPlayers): StoreAllPlayers => ({
  type: ActionType.STORE_ALL_PLAYERS,
  payload: players,
})

export const deletePlayer = (playerId: string): DeletePlayer => ({
  type: ActionType.DELETE_PLAYER,
  payload: playerId,
})

export const resetPlayers = (): ResetPlayers => ({
  type: ActionType.RESET_PLAYERS,
})
