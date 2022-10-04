import { Rule } from '../../models/rules.models'
import { ActionType, RulesActions } from './action-types'

export interface RulesState {
  rules: Rule[] | null
}

const initialState: RulesState = {
  rules: null,
}

const rulesReducer = (
  state = initialState,
  action: RulesActions
): RulesState => {
  switch (action.type) {
    case ActionType.STORE_ALL_RULES:
      return { rules: action.payload.rules }

    default:
      return state
  }
}

export default rulesReducer
