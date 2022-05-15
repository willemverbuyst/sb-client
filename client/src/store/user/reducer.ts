import { IPlayer } from '../../models/player.model'
import { ICurrentRound } from '../../models/toto.models'
import { ActionType, UserActions } from './action-types'

export interface IUserState {
  token: string | null
  user: {
    profile: IPlayer
    currentRound?: ICurrentRound
  } | null
}

const token = localStorage.getItem('user_token')

const initialState: IUserState = {
  token,
  user: null,
}

const userReducer = (state = initialState, action: UserActions): IUserState => {
  switch (action.type) {
    case ActionType.LOG_IN_SUCCESS_USER:
      localStorage.setItem('user_token', action.payload.token)
      return {
        user: action.payload.data.user,
        token: action.payload.token,
      }

    case ActionType.LOG_OUT_USER:
      localStorage.removeItem('user_token')
      return { token: null, user: null }

    case ActionType.TOKEN_STILL_VALID_USER:
      localStorage.setItem('user_token', action.payload.token)
      return {
        user: action.payload.data.user,
        token: action.payload.token,
      }

    case ActionType.UPDATE_USER_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          profile: action.payload.user.profile,
        },
      }

    case ActionType.UPDATE_USER_CURRENT_ROUND:
      if (state.user && state.user.currentRound) {
        return {
          ...state,
          user: {
            ...state.user,
            currentRound: {
              ...state.user.currentRound,
              fixtures: state.user.currentRound.fixtures.map((fixture) =>
                fixture.id === action.payload.prediction.fixtureId
                  ? {
                      ...fixture,
                      predictions: {
                        pGoalsHomeTeam:
                          action.payload.prediction.pGoalsHomeTeam,
                        pGoalsAwayTeam:
                          action.payload.prediction.pGoalsAwayTeam,
                      },
                    }
                  : fixture
              ),
            },
          },
        }
      }
      return state

    default:
      return state
  }
}

export default userReducer
