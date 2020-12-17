import axios from 'axios';
import {
  LOG_IN_SUCCESS_USER,
  LOG_OUT_USER,
  TOKEN_STILL_VALID_USER,
  LogInSuccessUser,
  LogOutUser,
  TokenUserStillValid,
} from '../types';
import { ILogInCredentials } from '../../../models/credentials.model';
import { IUser } from '../../../models/player.model';
import { ITeam } from '../../../models/toto.models';
import {
  logInSuccessUser,
  logOutUser,
  tokenUserStillValid,
  userLogIn,
  userLogOut,
  getUserWithStoredToken,
} from '../actions';
import { appLoading, appDoneLoading, setMessage } from '../../appState/actions';
import { removeAllPlayers } from '../../players/actions';
import { removeAllFixtures } from '../../predictions/actions';
import { removeAllTeams } from '../../teams/actions';
import { removeAllScores } from '../../scores/actions';

const mockAxios = axios as jest.Mocked<typeof axios>;

beforeEach(() => {
  jest.resetAllMocks();
});

describe('#userState', () => {
  describe('#logInSuccessUser w/ user', () => {
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    };
    const user: IUser = {
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
    };
    const expected: LogInSuccessUser = {
      type: LOG_IN_SUCCESS_USER,
      user,
    };
    test('returns an action w/ type LOG_IN_SUCCESS_USER and user as payload', () => {
      expect(logInSuccessUser(user)).toEqual(expected);
      expect(logInSuccessUser(user).user).not.toBe(undefined);
    });
  });
  describe('#logOutUser', () => {
    const action: LogOutUser = {
      type: LOG_OUT_USER,
    };
    test('should return an object containing type LOG_OUT_STUDENT and no payload', () => {
      expect(logOutUser()).toEqual(action);
      expect(logOutUser()).not.toHaveProperty('user');
    });
  });
  describe('#tokenUserStillValid', () => {
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    };
    const user: IUser = {
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
    };
    const action: TokenUserStillValid = {
      type: TOKEN_STILL_VALID_USER,
      user,
    };
    test('returns an action w/ type TOKEN_STILL_VALID_USER and user as payload', () => {
      expect(tokenUserStillValid(user)).toEqual(action);
      expect(tokenUserStillValid(user).user).not.toBeUndefined();
    });
  });
});

describe('#userLogIn', () => {
  it('calls axios and returns a user', async () => {
    const team: ITeam = {
      id: 1,
      name: 'test_name',
      logo: 'test_logo',
    };
    const user: IUser = {
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
    };
    const credentials: ILogInCredentials = {
      email: 'test@test',
      password: 'test_password',
    };
    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: { userData: user, message: 'test_message' } };

    mockAxios.post.mockImplementationOnce(() => Promise.resolve(response));

    await userLogIn(credentials)(dispatch, getState);

    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(
      logInSuccessUser(response.data.userData)
    );
    expect(dispatch).toHaveBeenCalledWith(
      setMessage('success', response.data.message)
    );
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(4);
  });
});

describe('#userLogOut', () => {
  it('dispatches six actions', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    userLogOut(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith(logOutUser());
    expect(dispatch).toHaveBeenCalledWith(setMessage('success', 'Tot ziens!'));
    expect(dispatch).toHaveBeenCalledWith(removeAllScores());
    expect(dispatch).toHaveBeenCalledWith(removeAllPlayers());
    expect(dispatch).toHaveBeenCalledWith(removeAllFixtures());
    expect(dispatch).toHaveBeenCalledWith(removeAllTeams());
    expect(dispatch).toHaveBeenCalledTimes(6);
  });
});

describe('#getUserWithStoredToken', () => {
  const team: ITeam = {
    id: 1,
    name: 'test_name',
    logo: 'test_logo',
  };
  const user: IUser = {
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
  };
  it('returns user', async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const response = { data: user };

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(response));

    await getUserWithStoredToken(dispatch, getState);

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(appLoading());
    expect(dispatch).toHaveBeenCalledWith(tokenUserStillValid(response.data));
    expect(dispatch).toHaveBeenCalledWith(appDoneLoading());
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});
