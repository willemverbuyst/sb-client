import reducer from '../reducer';
import {
  LOG_IN_SUCCESS_USER,
  LOG_OUT_USER,
  TOKEN_STILL_VALID_USER,
  LogInSuccessUser,
  LogOutUser,
  TokenUserStillValid,
  UserState,
} from '../types';
import { IUser } from '../../../models/player.model';
import { ITeam } from '../../../models/toto.models';

describe('#logInSuccessUser', () => {
  const initialState: UserState = {
    token: null,
    user: null,
  };
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
  const action: LogInSuccessUser = {
    type: LOG_IN_SUCCESS_USER,
    user,
  };
  describe('with initial state and LOG_IN_SUCCESS_USER action', () => {
    test('returns the new state with user', () => {
      const newState = reducer(initialState, action);
      expect(newState.token).not.toBeNull();
      expect(newState.token).not.toBe(initialState.token);
      expect(newState.token).toBe(user.token);
      expect(newState).toEqual({ token: user.token, user });
      expect(newState).not.toEqual(initialState);
    });
  });
});

describe('#logOutUser', () => {
  const initialState: UserState = {
    token: null,
    user: null,
  };
  const action: LogOutUser = {
    type: LOG_OUT_USER,
  };
  describe('with given state and LOG_OUT_USER action', () => {
    test('returns the initial state', () => {
      const newState = reducer(initialState, action);
      expect(newState).toEqual(initialState);
      expect(newState.token).toBeNull();
      expect(initialState.token).toBeNull();
      newState.token = 'x';
      const newerState = reducer(newState, action);
      expect(newState.token).not.toEqual(initialState.token);
      expect(newerState.token).toBeNull();
      expect(initialState.token).toBeNull();
    });
  });
});

describe('#tokenUserStillValid', () => {
  const initialState: UserState = {
    token: null,
    user: null,
  };
  const state: UserState = {
    token: 'test_token',
    user: null,
  };
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
  describe('on TOKEN_STILL_VALID_STUDENT action', () => {
    test('returns the new state with student', () => {
      const newState = reducer(state, action);
      expect(newState.token).not.toBeNull();
      expect(newState.token).not.toBe(initialState.token);
      expect(newState.token).toBe(user.token);
      expect(newState).toEqual({ token: user.token, user });
      expect(newState).not.toEqual(initialState);
    });
  });
});
