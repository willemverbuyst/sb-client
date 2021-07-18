import { IUser } from '../../models/player.model';
import { ICurrentRound } from '../../models/toto.models';
import {
  ActionType,
  LogInSuccessUser,
  LogOutUser,
  TokenUserStillValid,
  UpdateUserProfile,
} from './action-types';

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

export const logInSuccessUser = (
  apiResponse: ApiResponse,
): LogInSuccessUser => {
  return {
    type: ActionType.LOG_IN_SUCCESS_USER,
    payload: apiResponse,
  };
};

export const logOutUser = (): LogOutUser => {
  return {
    type: ActionType.LOG_OUT_USER,
  };
};

export const tokenUserStillValid = (
  apiResponse: ApiResponse,
): TokenUserStillValid => {
  return { type: ActionType.TOKEN_STILL_VALID_USER, payload: apiResponse };
};

export const updateUserProfile = (
  apiResponse: ApiResponse,
): UpdateUserProfile => {
  return { type: ActionType.UPDATE_USER_PROFILE, payload: apiResponse };
};
