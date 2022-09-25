import { IAllTeams } from '../../models/toto.models'
import { Action, ActionWithPayload } from '../types'

export enum ActionType {
  RESET_ALL_TEAMS = 'RESET_ALL_TEAMS',
  STORE_ALL_TEAMS = 'STORE_ALL_TEAMS',
}

export type StoreAllTeams = ActionWithPayload<
  ActionType.STORE_ALL_TEAMS,
  IAllTeams
>

export type ResetAllTeams = Action<ActionType.RESET_ALL_TEAMS>

export type TeamsActions = ResetAllTeams | StoreAllTeams
