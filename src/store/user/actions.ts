import { IApiResponseUser } from '../../models/user.models';
import {
  ActionType,
  LogInSuccessUser,
  LogOutUser,
  TokenUserStillValid,
  UpdateUserProfile,
} from './action-types';

export const logInSuccessUser = (
  apiResponse: IApiResponseUser,
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
  apiResponse: IApiResponseUser,
): TokenUserStillValid => {
  return { type: ActionType.TOKEN_STILL_VALID_USER, payload: apiResponse };
};

export const updateUserProfile = (
  apiResponse: IApiResponseUser,
): UpdateUserProfile => {
  return { type: ActionType.UPDATE_USER_PROFILE, payload: apiResponse };
};
