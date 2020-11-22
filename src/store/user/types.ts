import { IUser } from '../../models/player.model';
import { ITeam } from '../../models/toto.models';

export const LOG_IN_SUCCESS_USER = 'LOGIN_SUCCESS_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const TOKEN_STILL_VALID_USER = 'TOKEN_STILL_VALID_USER';

export type UserState = {
  token: string | null;
  user: IUser | null;
};

export type LogInSuccessUser = {
  type: typeof LOG_IN_SUCCESS_USER;
  user: IUser;
};

export type LogOutUser = {
  type: typeof LOG_OUT_USER;
};

export type TokenUserStillValid = {
  type: typeof TOKEN_STILL_VALID_USER;
  user: IUser;
};

export type UserActionTypes =
  | LogInSuccessUser
  | LogOutUser
  | TokenUserStillValid;
