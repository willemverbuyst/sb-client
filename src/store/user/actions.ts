import { IUser } from '../../models/player.model';
import { ICurrentRound } from '../../models/toto.models';
import { ActionType, LogInSuccessUser, LogOutUser, TokenUserStillValid, UpdateUserProfile } from './action-types';

interface IUserWithCurrentRound extends IUser {
  currentRound: ICurrentRound;
}

export const logInSuccessUser = (user: IUserWithCurrentRound): LogInSuccessUser => {
  return {
    type: ActionType.LOG_IN_SUCCESS_USER,
    payload: user,
  };
};

export const logOutUser = (): LogOutUser => ({
  type: ActionType.LOG_OUT_USER,
});

export const tokenUserStillValid = (user: IUserWithCurrentRound): TokenUserStillValid => ({
  type: ActionType.TOKEN_STILL_VALID_USER,
  payload: user,
});

export const updateUserProfile = (user: IUserWithCurrentRound): UpdateUserProfile => ({
  type: ActionType.UPDATE_USER_PROFILE,
  payload: user,
});
