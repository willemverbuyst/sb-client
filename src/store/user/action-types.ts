import { IUser } from '../../models/player.model';
import { ICurrentRound } from '../../models/toto.models';

interface ApiResponse {
  status: string;
  data: {
    user: {
      profile: IUser;
      currentRound: ICurrentRound;
    };
  };
  token: string;
}

export enum ActionType {
  LOG_IN_SUCCESS_USER = 'LOG_IN_SUCCESS_USER',
  LOG_OUT_USER = 'LOG_OUT_USER',
  TOKEN_STILL_VALID_USER = 'TOKEN_STILL_VALID_USER',
  UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE',
}

export type LogInSuccessUser = {
  type: ActionType.LOG_IN_SUCCESS_USER;
  payload: ApiResponse;
};

export type LogOutUser = {
  type: ActionType.LOG_OUT_USER;
};

export type TokenUserStillValid = {
  type: ActionType.TOKEN_STILL_VALID_USER;
  payload: ApiResponse;
};

export type UpdateUserProfile = {
  type: ActionType.UPDATE_USER_PROFILE;
  payload: ApiResponse;
};

export type UserActions =
  | LogInSuccessUser
  | LogOutUser
  | TokenUserStillValid
  | UpdateUserProfile;
