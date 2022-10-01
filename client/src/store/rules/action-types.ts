import { Rules } from '../../models/rules.models'
import { ActionWithPayload } from '../types'

export enum ActionType {
  STORE_ALL_RULES = 'STORE_ALL_RULES',
}

export type StoreAllRules = ActionWithPayload<ActionType.STORE_ALL_RULES, Rules>

export type RulesActions = StoreAllRules
