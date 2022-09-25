import { IUpdatedPrediction } from '../../models/predictions.model'
import { IApiResponseUser, IUpdatedUser } from '../../models/user.models'
import { Action, ActionWithPayload } from '../types'

export enum ActionType {
  LOG_IN_SUCCESS_USER = 'LOG_IN_SUCCESS_USER',
  LOG_OUT_USER = 'LOG_OUT_USER',
  TOKEN_STILL_VALID_USER = 'TOKEN_STILL_VALID_USER',
  UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE',
  UPDATE_USER_CURRENT_ROUND = 'UPDATE_USER_CURRENT_ROUND',
}

export type LogInSuccessUser = ActionWithPayload<
  ActionType.LOG_IN_SUCCESS_USER,
  IApiResponseUser
>

export type LogOutUser = Action<ActionType.LOG_OUT_USER>

export type TokenUserStillValid = ActionWithPayload<
  ActionType.TOKEN_STILL_VALID_USER,
  IApiResponseUser
>

export type UpdateUserProfile = ActionWithPayload<
  ActionType.UPDATE_USER_PROFILE,
  IUpdatedUser
>

export type UpdateUserCurrentRound = ActionWithPayload<
  ActionType.UPDATE_USER_CURRENT_ROUND,
  IUpdatedPrediction
>

export type UserActions =
  | LogInSuccessUser
  | LogOutUser
  | TokenUserStillValid
  | UpdateUserProfile
  | UpdateUserCurrentRound
