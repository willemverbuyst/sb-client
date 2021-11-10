import { IUpdatedPrediction } from '../../models/predictions.model'
import { IApiResponseUser, IUpdatedUser } from '../../models/user.models'

export enum ActionType {
  LOG_IN_SUCCESS_USER = 'LOG_IN_SUCCESS_USER',
  LOG_OUT_USER = 'LOG_OUT_USER',
  TOKEN_STILL_VALID_USER = 'TOKEN_STILL_VALID_USER',
  UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE',
  UPDATE_USER_CURRENT_ROUND = 'UPDATE_USER_CURRENT_ROUND',
}

export type LogInSuccessUser = {
  type: ActionType.LOG_IN_SUCCESS_USER
  payload: IApiResponseUser
}

export type LogOutUser = {
  type: ActionType.LOG_OUT_USER
}

export type TokenUserStillValid = {
  type: ActionType.TOKEN_STILL_VALID_USER
  payload: IApiResponseUser
}

export type UpdateUserProfile = {
  type: ActionType.UPDATE_USER_PROFILE
  payload: IUpdatedUser
}

export type UpdateUserCurrentRound = {
  type: ActionType.UPDATE_USER_CURRENT_ROUND
  payload: IUpdatedPrediction
}

export type UserActions =
  | LogInSuccessUser
  | LogOutUser
  | TokenUserStillValid
  | UpdateUserProfile
  | UpdateUserCurrentRound
