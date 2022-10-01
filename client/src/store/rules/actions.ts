import { Rules } from '../../models/rules.models'
import { ActionType, StoreAllRules } from './action-types'

export const storeAllRules = (rules: Rules): StoreAllRules => ({
  type: ActionType.STORE_ALL_RULES,
  payload: rules,
})
