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
