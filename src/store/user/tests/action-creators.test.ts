import axios from 'axios';

import { ILogInCredentials } from '../../../models/credentials.model';
import { ICurrentRound, IFixtureWithScoreAndPredictions, ITeam } from '../../../models/toto.models';
import { appDoneLoading, appLoading, setMessage } from '../../appState/actions';
import { resetPlayers } from '../../players/actions';
import { resetAllFixtures } from '../../predictions/actions';
import { resetAllScores } from '../../scores/actions';
import { resetAllTeams } from '../../teams/actions';
import { changePassword, editUserProfile, getUserWithStoredToken, userLogIn, userLogOut } from '../action-creators';
import { logInSuccessUser, logOutUser, tokenUserStillValid, updateUserProfile } from '../actions';
import { IUserWithCurrentRound } from '../reducer';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#changePassword', () => {
  it('returns a succes message', async () => {
    const password = 'test_password';
    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: { message: 'ok' } };

    mockAxios.patch.mockImplementationOnce(() => Promise.resolve(response));

    await changePassword(password)(dispatch, getState, extraArg);

    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(setMessage('success', response.data.message));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});

describe('#editUserProfile', () => {
  it('returns a user and a succes message', async () => {
    const user = {
      userName: 'test',
      firstName: 'test',
      lastName: 'test',
      email: 'test@test',
      phoneNumber: '123',
      admin: false,
      totaalToto: true,
      teamId: 1,
    };
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    };
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
    };
    const currentRound: ICurrentRound = {
      roundNumber: 1,
      totoRoundNumber: 1,
      fixtures: [fixture],
    };
    const updatedUser: IUserWithCurrentRound = {
      admin: true,
      email: 'test@test.com',
      firstName: 'test',
      id: 1,
      lastName: 'test',
      phoneNumber: 'test',
      team,
      totaalToto: true,
      userName: 'test',
      token: 'test_token',
      currentRound,
    };
    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: { message: 'ok', userData: updatedUser } };

    mockAxios.patch.mockImplementationOnce(() => Promise.resolve(response));

    await editUserProfile(user)(dispatch, getState, extraArg);

    expect(mockAxios.patch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toBeCalledWith(updateUserProfile(response.data.userData));
    expect(dispatch).toHaveBeenCalledWith(setMessage('success', response.data.message));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('#userLogIn', () => {
  it('calls axios and returns a user', async () => {
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    };
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
    };
    const currentRound: ICurrentRound = {
      roundNumber: 1,
      totoRoundNumber: 1,
      fixtures: [fixture],
    };
    const user: IUserWithCurrentRound = {
      admin: true,
      email: 'test@test.com',
      firstName: 'test',
      id: 1,
      lastName: 'test',
      phoneNumber: 'test',
      team,
      totaalToto: true,
      userName: 'test',
      token: 'test_token',
      currentRound,
    };
    const credentials: ILogInCredentials = {
      email: 'test@test',
      password: 'test_password',
    };
    const dispatch = jest.fn();
    const getState = jest.fn();
    const extraArg = 'extra';
    const response = { data: { userData: user, message: 'test_message' } };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));

    await userLogIn(credentials)(dispatch, getState, extraArg);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(logInSuccessUser(response.data.userData));
    expect(dispatch).toHaveBeenCalledWith(setMessage('success', response.data.message));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('#userLogOut', () => {
  it('dispatches six actions', () => {
    const dispatch = jest.fn();

    userLogOut()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(logOutUser());
    expect(dispatch).toHaveBeenCalledWith(setMessage('success', 'Tot ziens!'));
    expect(dispatch).toHaveBeenCalledWith(resetAllScores());
    expect(dispatch).toHaveBeenCalledWith(resetPlayers());
    expect(dispatch).toHaveBeenCalledWith(resetAllFixtures());
    expect(dispatch).toHaveBeenCalledWith(resetAllTeams());
    expect(dispatch).toHaveBeenCalledTimes(6);
  });
});

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
