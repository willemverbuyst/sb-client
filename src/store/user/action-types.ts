import { IUser } from '../../models/player.model';

export enum ActionType {
  LOG_IN_SUCCESS_USER,
  LOG_OUT_USER,
  TOKEN_STILL_VALID_USER,
  UPDATE_USER_PROFILE,
}

export type LogInSuccessUser = {
  type: ActionType.LOG_IN_SUCCESS_USER;
  payload: IUser;
};

export type LogOutUser = {
  type: ActionType.LOG_OUT_USER;
};

export type TokenUserStillValid = {
  type: ActionType.TOKEN_STILL_VALID_USER;
  payload: IUser;
};

export type UpdateUserProfile = {
  type: ActionType.UPDATE_USER_PROFILE;
  payload: IUser;
};

export type UserActions = LogInSuccessUser | LogOutUser | TokenUserStillValid | UpdateUserProfile;
