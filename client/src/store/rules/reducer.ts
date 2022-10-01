import { Rule } from '../../models/rules.models'
import { ActionType, TeamsActions } from './action-types'

export interface RulesState {
  rules: Rule[]
}

const initialState: RulesState = {
  rules: [],
}

const rulesReducer = (
  state = initialState,
  action: TeamsActions
): RulesState => {
  switch (action.type) {
    case ActionType.STORE_ALL_RULES:
      return { rules: action.payload.rules }

    default:
      return state
  }
}

export default rulesReducer
