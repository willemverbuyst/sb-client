import { IAllPlayers, INewPlayer } from '../../models/player.model'
import { Action, ActionWithPayload } from '../types'

export enum ActionType {
  ADD_NEW_PLAYER = 'UPDATE_PREDICTION',
  DELETE_PLAYER = 'DELETE_PLAYER',
  RESET_PLAYERS = 'RESET_PLAYERS',
  STORE_ALL_PLAYERS = 'STORE_ALL_PLAYERS',
}

export type AddNewPlayer = ActionWithPayload<
  ActionType.ADD_NEW_PLAYER,
  INewPlayer
>

export type DeletePlayer = ActionWithPayload<ActionType.DELETE_PLAYER, string>

export type ResetPlayers = Action<ActionType.RESET_PLAYERS>

export type StoreAllPlayers = ActionWithPayload<
  ActionType.STORE_ALL_PLAYERS,
  IAllPlayers
>

export type PlayersActions =
  | AddNewPlayer
  | DeletePlayer
  | ResetPlayers
  | StoreAllPlayers
