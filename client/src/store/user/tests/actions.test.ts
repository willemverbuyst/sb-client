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
import {
  logInSuccessUser,
  logOutUser,
  tokenUserStillValid,
  updateUserProfile,
} from '../actions'

describe('#userState', () => {
  describe('#logInSuccessUser w/ user', () => {
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
    const expected: LogInSuccessUser = {
      type: ActionType.LOG_IN_SUCCESS_USER,
      payload: apiResponse,
    }

    test('returns an action w/ type LOG_IN_SUCCESS_USER and user as payload', () => {
      expect(logInSuccessUser(apiResponse)).toEqual(expected)
      expect(logInSuccessUser(apiResponse).payload).toEqual(apiResponse)
      expect(logInSuccessUser(apiResponse).type).toEqual(
        ActionType.LOG_IN_SUCCESS_USER
      )
    })
  })

  describe('#logOutUser', () => {
    const expected: LogOutUser = {
      type: ActionType.LOG_OUT_USER,
    }

    test('should return an object containing type LOG_OUT_STUDENT and no payload', () => {
      expect(logOutUser()).toEqual(expected)
      expect(logOutUser()).not.toHaveProperty('payload')
      expect(logOutUser().type).toBe(ActionType.LOG_OUT_USER)
    })
  })

  describe('#tokenUserStillValid', () => {
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
    const expected: TokenUserStillValid = {
      type: ActionType.TOKEN_STILL_VALID_USER,
      payload: apiResponse,
    }

    test('returns an action w/ type TOKEN_STILL_VALID_USER and user as payload', () => {
      expect(tokenUserStillValid(apiResponse)).toEqual(expected)
      expect(tokenUserStillValid(apiResponse).payload).toEqual(apiResponse)
      expect(tokenUserStillValid(apiResponse).type).toEqual(
        ActionType.TOKEN_STILL_VALID_USER
      )
    })
  })

  describe('#updateUserProfile', () => {
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
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

    const apiResponse: IUpdatedUser = {
      user: { profile },
    }
    const action: UpdateUserProfile = {
      type: ActionType.UPDATE_USER_PROFILE,
      payload: apiResponse,
    }

    test('returns an action w/ type UPDATE_USER_PROFILE and user as payload', () => {
      expect(updateUserProfile(apiResponse)).toEqual(action)
      expect(updateUserProfile(apiResponse).payload).toEqual(apiResponse)
      expect(updateUserProfile(apiResponse).type).toEqual(
        ActionType.UPDATE_USER_PROFILE
      )
    })
  })
})
