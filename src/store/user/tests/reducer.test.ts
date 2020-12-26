import reducer from '../reducer';
import {
  LOG_IN_SUCCESS_USER,
  LOG_OUT_USER,
  TOKEN_STILL_VALID_USER,
  UPDATE_USER_PROFILE,
  LogInSuccessUser,
  LogOutUser,
  TokenUserStillValid,
  UpdateUserProfile,
  UserState,
} from '../types';
import { IUser } from '../../../models/player.model';
import { ITeam } from '../../../models/toto.models';

describe('#userReducer', () => {
  describe('with initial state and LOG_IN_SUCCESS_USER action', () => {
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
    const newState = reducer(initialState, action);

    test('returns the new state with user', () => {
      expect(newState.token).not.toBeNull();
      expect(newState.token).not.toBe(initialState.token);
      expect(newState.token).toBe(user.token);
      expect(newState).toEqual({ token: user.token, user });
      expect(newState).not.toEqual(initialState);
    });
  });

  describe('with given state and LOG_OUT_USER action', () => {
    const initialState: UserState = {
      token: null,
      user: null,
    };
    const action: LogOutUser = {
      type: LOG_OUT_USER,
    };
    const newState = reducer(initialState, action);
    const newerState = reducer({ token: 'x', user: null }, action);

    test('returns the initial state', () => {
      expect(newState).toEqual(initialState);
      expect(newState.token).toBeNull();
      expect(initialState.token).toBeNull();
      expect(newState.token).not.toBe('x');
      expect(newerState.token).toBeNull();
      expect(newerState.user).toBeNull();
      expect(initialState.token).toBeNull();
    });
  });

  describe('on TOKEN_STILL_VALID_STUDENT action', () => {
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
    const newState = reducer(state, action);

    test('returns the new state with student', () => {
      expect(newState.token).not.toBeNull();
      expect(newState.token).not.toBe(initialState.token);
      expect(newState.token).toBe(user.token);
      expect(newState).toEqual({ token: user.token, user });
      expect(newState).not.toEqual(initialState);
    });

    describe('on UPDATE_USER_PROFILE action', () => {
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
      const state: UserState = {
        token: 'test_token',
        user,
      };
      const userUpdated: IUser = {
        admin: true,
        email: 'test@test.com',
        firstName: 'test_updated',
        id: 1,
        lastName: 'test_updated',
        phoneNumber: 'test',
        team,
        totaalToto: true,
        userName: 'test',
        token: 'test_token',
      };
      const action: UpdateUserProfile = {
        type: UPDATE_USER_PROFILE,
        user: userUpdated,
      };
      const newState = reducer(state, action);

      test('returns the new state with student', () => {
        expect(newState.token).not.toBeNull();
        expect(newState.token).toBe(state.token);
        expect(newState).toEqual({ token: user.token, user: userUpdated });
        expect(newState).not.toEqual(state);
        expect(newState.user?.firstName).toBe('test_updated');
      });
    });
  });
});
