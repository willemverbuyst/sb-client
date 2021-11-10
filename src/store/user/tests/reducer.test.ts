import { IPlayer } from '../../../models/player.model'
import {
  ICurrentRound,
  IFixtureWithScoreAndPredictions,
  ITeam,
} from '../../../models/toto.models'
import { IApiResponseUser, IUpdatedUser } from '../../../models/user.models'
import {
  ActionType,
  LogInSuccessUser,
  LogOutUser,
  TokenUserStillValid,
  UpdateUserProfile,
} from '../action-types'
import reducer, { IUserState } from '../reducer'

describe('#userReducer', () => {
  describe('with initial state and LOG_IN_SUCCESS_USER action', () => {
    const initialState: IUserState = {
      token: null,
      user: null,
    }
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    }
    const fixture: IFixtureWithScoreAndPredictions = {
      awayTeamId: 1,
      awayTeamLogo: 'test',
      awayTeamName: 'test',
      createdAt: 'test',
      eventTimeStamp: 1,
      goalsAwayTeam: null,
      goalsHomeTeam: null,
      homeTeamId: 1,
      homeTeamLogo: 'test',
      homeTeamName: 'test',
      id: 1,
      round: 'test',
      status: 'test',
      updatedAt: 'test',
      score: 'scores',
      predictions: {
        pGoalsAwayTeam: null,
        pGoalsHomeTeam: null,
      },
    }
    const currentRound: ICurrentRound = {
      roundNumber: 1,
      totoRoundNumber: 1,
      fixtures: [fixture],
    }
    const profile: IPlayer = {
      admin: true,
      email: 'test@test.com',
      firstName: 'test',
      id: 1,
      lastName: 'test',
      phoneNumber: 'test',
      team,
      totaalToto: true,
      userName: 'test',
    }
    const user = {
      profile,
      currentRound,
    }
    const token = 'token'
    const status = 'success'
    const apiResponse: IApiResponseUser = {
      status,
      data: { user },
      token,
    }
    const action: LogInSuccessUser = {
      type: ActionType.LOG_IN_SUCCESS_USER,
      payload: apiResponse,
    }
    const newState: IUserState = reducer(initialState, action)

    test('returns the new state with user', () => {
      expect(newState.token).not.toBeNull()
      expect(newState.token).not.toBe(initialState.token)
      expect(newState.token).toBe(token)
      expect(newState).toEqual({ user, token })
      expect(newState).not.toEqual(initialState)
    })
  })

  describe('with given state and LOG_OUT_USER action', () => {
    const initialState: IUserState = {
      token: null,
      user: null,
    }
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    }
    const fixture: IFixtureWithScoreAndPredictions = {
      awayTeamId: 1,
      awayTeamLogo: 'test',
      awayTeamName: 'test',
      createdAt: 'test',
      eventTimeStamp: 1,
      goalsAwayTeam: null,
      goalsHomeTeam: null,
      homeTeamId: 1,
      homeTeamLogo: 'test',
      homeTeamName: 'test',
      id: 1,
      round: 'test',
      status: 'test',
      updatedAt: 'test',
      score: 'scores',
      predictions: {
        pGoalsAwayTeam: null,
        pGoalsHomeTeam: null,
      },
    }
    const currentRound: ICurrentRound = {
      roundNumber: 1,
      totoRoundNumber: 1,
      fixtures: [fixture],
    }
    const profile: IPlayer = {
      admin: true,
      email: 'test@test.com',
      firstName: 'test',
      id: 1,
      lastName: 'test',
      phoneNumber: 'test',
      team,
      totaalToto: true,
      userName: 'test',
    }
    const user = {
      profile,
      currentRound,
    }
    const token = 'token'
    const action: LogOutUser = {
      type: ActionType.LOG_OUT_USER,
    }
    const state: IUserState = { user, token }
    const newState: IUserState = reducer(state, action)

    test('returns the initial state', () => {
      expect(newState).toEqual(initialState)
      expect(newState.token).toBeNull()
      expect(newState.user).toBeNull()
    })
  })

  describe('on TOKEN_STILL_VALID_STUDENT action', () => {
    const initialState: IUserState = {
      token: null,
      user: null,
    }
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    }
    const fixture: IFixtureWithScoreAndPredictions = {
      awayTeamId: 1,
      awayTeamLogo: 'test',
      awayTeamName: 'test',
      createdAt: 'test',
      eventTimeStamp: 1,
      goalsAwayTeam: null,
      goalsHomeTeam: null,
      homeTeamId: 1,
      homeTeamLogo: 'test',
      homeTeamName: 'test',
      id: 1,
      round: 'test',
      status: 'test',
      updatedAt: 'test',
      score: 'scores',
      predictions: {
        pGoalsAwayTeam: null,
        pGoalsHomeTeam: null,
      },
    }
    const currentRound: ICurrentRound = {
      roundNumber: 1,
      totoRoundNumber: 1,
      fixtures: [fixture],
    }
    const profile: IPlayer = {
      admin: true,
      email: 'test@test.com',
      firstName: 'test',
      id: 1,
      lastName: 'test',
      phoneNumber: 'test',
      team,
      totaalToto: true,
      userName: 'test',
    }
    const user = {
      profile,
      currentRound,
    }
    const token = 'token'
    const status = 'success'
    const apiResponse: IApiResponseUser = {
      status,
      data: { user },
      token,
    }
    const state: IUserState = { user, token }
    const action: TokenUserStillValid = {
      type: ActionType.TOKEN_STILL_VALID_USER,
      payload: apiResponse,
    }
    const newState: IUserState = reducer(state, action)

    test('returns the new state with student', () => {
      expect(newState.token).not.toBeNull()
      expect(newState.token).not.toBe(initialState.token)
      expect(newState.token).toBe(token)
      expect(newState).not.toEqual(initialState)
    })
  })
  describe('on UPDATE_USER_PROFILE action', () => {
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    }
    const fixture: IFixtureWithScoreAndPredictions = {
      awayTeamId: 1,
      awayTeamLogo: 'test',
      awayTeamName: 'test',
      createdAt: 'test',
      eventTimeStamp: 1,
      goalsAwayTeam: null,
      goalsHomeTeam: null,
      homeTeamId: 1,
      homeTeamLogo: 'test',
      homeTeamName: 'test',
      id: 1,
      round: 'test',
      status: 'test',
      updatedAt: 'test',
      score: 'scores',
      predictions: {
        pGoalsAwayTeam: null,
        pGoalsHomeTeam: null,
      },
    }
    const currentRound: ICurrentRound = {
      roundNumber: 1,
      totoRoundNumber: 1,
      fixtures: [fixture],
    }
    const profile: IPlayer = {
      admin: true,
      email: 'test@test.com',
      firstName: 'test',
      id: 1,
      lastName: 'test',
      phoneNumber: 'test',
      team,
      totaalToto: true,
      userName: 'test',
    }
    const user = {
      profile,
      currentRound,
    }
    const token = 'token'
    const updatedProfile: IPlayer = {
      admin: true,
      email: 'test2@test2.com',
      firstName: 'test2',
      id: 1,
      lastName: 'test2',
      phoneNumber: 'test2',
      team,
      totaalToto: true,
      userName: 'test2',
    }
    const apiResponse: IUpdatedUser = {
      user: { profile: updatedProfile },
    }
    const state: IUserState = { user, token }
    const action: UpdateUserProfile = {
      type: ActionType.UPDATE_USER_PROFILE,
      payload: apiResponse,
    }
    const newState: IUserState = reducer(state, action)

    test('returns the new state with student', () => {
      expect(newState.token).not.toBeNull()
      expect(newState.token).toBe(token)
      expect(newState).toEqual({
        user: { profile: updatedProfile, currentRound },
        token,
      })
      expect(newState).not.toEqual(state)
      expect(newState.user?.profile.firstName).toBe('test2')
    })
  })
})
