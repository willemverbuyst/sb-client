import axios from 'axios'

import { Severity } from '../../../models/app.models'
import {
  ILogInCredentials,
  IProfileDetails,
} from '../../../models/credentials.model'
import { IPlayer } from '../../../models/player.model'
import {
  ICurrentRound,
  IFixtureWithScoreAndPredictions,
  ITeam,
} from '../../../models/toto.models'
import { appDoneLoading, appLoading, setMessage } from '../../appState/actions'
import { resetPlayers } from '../../players/actions'
import { resetAllPredictions } from '../../predictions/actions'
import { resetAllScores } from '../../scores/actions'
import { resetAllTeams } from '../../teams/actions'
import {
  changePassword,
  editUserProfile,
  userLogIn,
  userLogOut,
} from '../action-creators'
import { logInSuccessUser, logOutUser, updateUserProfile } from '../actions'

const mockAxios = axios as jest.Mocked<typeof axios>

beforeEach(() => {
  jest.resetAllMocks()
})

describe('#changePassword', () => {
  it('returns a succes message', async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response: {
      data: {
        status: Severity
        message: string
      }
    } = { data: { status: 'success', message: 'ok' } }

    mockAxios.patch.mockImplementationOnce(() => Promise.resolve(response))

    await changePassword('currentPassword', 'newPassword', 'confirmPasword')(
      dispatch,
      getState,
      extraArg
    )

    expect(mockAxios.patch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(
      setMessage(response.data.status, response.data.message)
    )
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(3)
  })
})

describe('#editUserProfile', () => {
  it('returns a user and a succes message', async () => {
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
      id: 'id_1',
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
    const input: IProfileDetails = {
      userName: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      phoneNumber: 'test',
      totaalToto: true,
      teamId: 1,
    }
    const token = 'token'
    const status: Severity = 'success'

    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response = {
      data: {
        status,
        data: { user },
        token,
        message: 'ok',
      },
    }

    mockAxios.patch.mockImplementationOnce(() => Promise.resolve(response))

    await editUserProfile(input)(dispatch, getState, extraArg)

    expect(mockAxios.patch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(updateUserProfile(response.data.data))
    expect(dispatch).toHaveBeenCalledWith(
      setMessage(response.data.status, response.data.message)
    )
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(4)
  })
})

describe('#userLogIn', () => {
  it('calls axios and returns a user', async () => {
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
      id: 'id_1',
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
    const status: Severity = 'success'
    const credentials: ILogInCredentials = {
      email: 'test@test',
      password: 'test_password',
    }
    const dispatch = jest.fn()
    const getState = jest.fn()
    const extraArg = 'extra'
    const response = {
      data: {
        status,
        data: { user },
        message: 'test_message',
        token,
      },
    }

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response))

    await userLogIn(credentials)(dispatch, getState, extraArg)

    expect(mockAxios.post).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(appLoading())
    expect(dispatch).toHaveBeenCalledWith(logInSuccessUser(response.data))
    expect(dispatch).toHaveBeenCalledWith(
      setMessage(response.data.status, response.data.message)
    )
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading())
    expect(dispatch).toHaveBeenCalledTimes(4)
  })
})

describe('#userLogOut', () => {
  it('dispatches six actions', () => {
    const dispatch = jest.fn()

    userLogOut()(dispatch)
    expect(dispatch).toHaveBeenCalledWith(logOutUser())
    expect(dispatch).toHaveBeenCalledWith(setMessage('success', 'Tot ziens!'))
    expect(dispatch).toHaveBeenCalledWith(resetAllScores())
    expect(dispatch).toHaveBeenCalledWith(resetPlayers())
    expect(dispatch).toHaveBeenCalledWith(resetAllPredictions())
    expect(dispatch).toHaveBeenCalledWith(resetAllTeams())
    expect(dispatch).toHaveBeenCalledTimes(6)
  })
})

// describe('#getUserWithStoredToken', () => {
//   it('returns user', async () => {
//     const team: ITeam = {
//       id: 1,
//       name: 'test_name',
//       logo: 'test_logo',
//     };
//     const fixture: IFixtureWithScoreAndPredictions = {
//       awayTeamId: 1,
//       awayTeamLogo: 'test',
//       awayTeamName: 'test',
//       createdAt: 'test',
//       eventTimeStamp: 1,
//       goalsAwayTeam: null,
//       goalsHomeTeam: null,
//       homeTeamId: 1,
//       homeTeamLogo: 'test',
//       homeTeamName: 'test',
//       id: 1,
//       round: 'test',
//       status: 'test',
//       updatedAt: 'test',
//       score: 'scores',
//       predictions: {
//         pGoalsAwayTeam: null,
//         pGoalsHomeTeam: null,
//       },
//     };
//     const currentRound: ICurrentRound = {
//       roundNumber: 1,
//       totoRoundNumber: 1,
//       fixtures: [fixture],
//     };
//     const user: IUserWithCurrentRound = {
//       admin: true,
//       email: 'test@test.com',
//       firstName: 'test',
//       id: 1,
//       lastName: 'test',
//       phoneNumber: 'test',
//       team,
//       totaalToto: true,
//       userName: 'test',
//       token: 'test_token',
//       currentRound,
//     };
//     const dispatch = jest.fn();
//     const getState = jest.fn();
//     const extraArg = 'extra';
//     const response = { data: user };

//     mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

//     await getUserWithStoredToken()(dispatch, getState, extraArg);

//     expect(mockAxios.get).toHaveBeenCalledTimes(1);
//     expect(dispatch).toHaveBeenCalledWith(appLoading());
//     expect(dispatch).toHaveBeenCalledWith(tokenUserStillValid(response.data));
//     expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
//     expect(dispatch).toHaveBeenCalledTimes(3);
//   });
// });
