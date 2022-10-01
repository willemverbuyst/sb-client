import { Rule } from '../../models/rules.models'
import { ActionType, StoreAllRules } from './action-types'

export const storeAllRules = (rules: Rule[]): StoreAllRules => ({
  type: ActionType.STORE_ALL_RULES,
  payload: rules,
})
