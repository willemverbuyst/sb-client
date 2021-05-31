import { IUser } from '../../models/player.model';
import { ActionType, LogInSuccessUser, LogOutUser, TokenUserStillValid, UpdateUserProfile } from './action-types';

export const logInSuccessUser = (user: IUser): LogInSuccessUser => {
  return {
    type: ActionType.LOG_IN_SUCCESS_USER,
    payload: user,
  };
};

export const logOutUser = (): LogOutUser => ({
  type: ActionType.LOG_OUT_USER,
});

export const tokenUserStillValid = (user: IUser): TokenUserStillValid => ({
  type: ActionType.TOKEN_STILL_VALID_USER,
  payload: user,
});

export const updateUserProfile = (user: IUser): UpdateUserProfile => ({
  type: ActionType.UPDATE_USER_PROFILE,
  payload: user,
});
