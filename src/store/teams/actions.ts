import { IAllTeams } from '../../models/toto.models'
import { ActionType, ResetAllTeams, StoreAllTeams } from './action-types'

export const storeAllTeams = (teams: IAllTeams): StoreAllTeams => ({
  type: ActionType.STORE_ALL_TEAMS,
  payload: teams,
})

export const resetAllTeams = (): ResetAllTeams => ({
  type: ActionType.RESET_ALL_TEAMS,
})
