import { IUser } from '../../models/player.model';

export const LOG_IN_SUCCESS_USER = 'LOGIN_SUCCESS_USER';
export const LOG_OUT_USER = 'LOG_OUT_USER';
export const TOKEN_STILL_VALID_USER = 'TOKEN_STILL_VALID_USER';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

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

export type UpdateUserProfile = {
  type: typeof UPDATE_USER_PROFILE;
  user: IUser;
};

export type UserActionTypes = LogInSuccessUser | LogOutUser | TokenUserStillValid | UpdateUserProfile;
