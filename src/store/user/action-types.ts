import { IApiResponseUser } from '../../models/user.models';

export enum ActionType {
  LOG_IN_SUCCESS_USER = 'LOG_IN_SUCCESS_USER',
  LOG_OUT_USER = 'LOG_OUT_USER',
  TOKEN_STILL_VALID_USER = 'TOKEN_STILL_VALID_USER',
  UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE',
}

export type LogInSuccessUser = {
  type: ActionType.LOG_IN_SUCCESS_USER;
  payload: IApiResponseUser;
};

export type LogOutUser = {
  type: ActionType.LOG_OUT_USER;
};

export type TokenUserStillValid = {
  type: ActionType.TOKEN_STILL_VALID_USER;
  payload: IApiResponseUser;
};

export type UpdateUserProfile = {
  type: ActionType.UPDATE_USER_PROFILE;
  payload: IApiResponseUser;
};

export type UserActions =
  | LogInSuccessUser
  | LogOutUser
  | TokenUserStillValid
  | UpdateUserProfile;
