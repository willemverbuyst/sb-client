import { Rule } from '../../models/rules.models'
import { StoreState } from '../types'

export const selectRules = (state: StoreState): Rule[] => {
  if (state.rulesState.rules) {
    const { rules } = state.rulesState
    return rules
  }
  return []
}
