import { IUser } from '../../models/player.model';
import { ICurrentRound } from '../../models/toto.models';
import {
  ActionType,
  LogInSuccessUser,
  LogOutUser,
  TokenUserStillValid,
  UpdateUserProfile,
} from './action-types';

interface IUserWithCurrentRound extends IUser {
  currentRound: ICurrentRound;
}

interface ApiResponse {
  status: string;
  data: { user: IUserWithCurrentRound };
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
  user: IUserWithCurrentRound,
): TokenUserStillValid => {
  return { type: ActionType.TOKEN_STILL_VALID_USER, payload: user };
};

export const updateUserProfile = (
  user: IUserWithCurrentRound,
): UpdateUserProfile => {
  return { type: ActionType.UPDATE_USER_PROFILE, payload: user };
};
