import { IAllPlayers, INewPlayer } from '../../models/player.model'

export enum ActionType {
  ADD_NEW_PLAYER = 'UPDATE_PREDICTION',
  DELETE_PLAYER = 'DELETE_PLAYER',
  RESET_PLAYERS = 'RESET_PLAYERS',
  STORE_ALL_PLAYERS = 'STORE_ALL_PLAYERS',
}

export type AddNewPlayer = {
  type: ActionType.ADD_NEW_PLAYER
  payload: INewPlayer
}

export type DeletePlayer = {
  type: ActionType.DELETE_PLAYER
  payload: string
}

export type ResetPlayers = {
  type: ActionType.RESET_PLAYERS
}

export type StoreAllPlayers = {
  type: ActionType.STORE_ALL_PLAYERS
  payload: IAllPlayers
}

export type PlayersActions =
  | AddNewPlayer
  | DeletePlayer
  | ResetPlayers
  | StoreAllPlayers
