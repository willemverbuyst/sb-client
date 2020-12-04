import axios from 'axios';
import {
  LOG_IN_SUCCESS_USER,
  LOG_OUT_USER,
  TOKEN_STILL_VALID_USER,
  LogInSuccessUser,
  LogOutUser,
  TokenUserStillValid,
  UserState,
  UserActionTypes,
} from '../types';
import { IUser } from '../../../models/player.model';
import { ITeam } from '../../../models/toto.models';
import { logInSuccessUser } from '../actions';

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
});
