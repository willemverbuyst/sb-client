import { ITeam } from '../../models/toto.models'
import { ActionType, TeamsActions } from './action-types'

export interface ITeamsState {
  teams: ITeam[] | null
}

const initialState: ITeamsState = {
  teams: null,
}

const teamReducer = (
  state = initialState,
  action: TeamsActions
): ITeamsState => {
  switch (action.type) {
    case ActionType.STORE_ALL_TEAMS:
      return { ...state, teams: action.payload.teams }

    case ActionType.RESET_ALL_TEAMS:
      return { teams: null }

    default:
      return state
  }
}

export default teamReducer
