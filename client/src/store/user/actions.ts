import { IUpdatedPrediction } from '../../models/predictions.model'
import { IApiResponseUser, IUpdatedUser } from '../../models/user.models'
import {
  ActionType,
  LogInSuccessUser,
  LogOutUser,
  TokenUserStillValid,
  UpdateUserCurrentRound,
  UpdateUserProfile,
} from './action-types'

export const logInSuccessUser = (
  apiResponse: IApiResponseUser
): LogInSuccessUser => ({
  type: ActionType.LOG_IN_SUCCESS_USER,
  payload: apiResponse,
})

export const logOutUser = (): LogOutUser => ({
  type: ActionType.LOG_OUT_USER,
})

export const tokenUserStillValid = (
  apiResponse: IApiResponseUser
): TokenUserStillValid => ({
  type: ActionType.TOKEN_STILL_VALID_USER,
  payload: apiResponse,
})

export const updateUserProfile = (
  apiResponse: IUpdatedUser
): UpdateUserProfile => ({
  type: ActionType.UPDATE_USER_PROFILE,
  payload: apiResponse,
})

export const updateUserCurrentRound = (
  updatedPrediction: IUpdatedPrediction
): UpdateUserCurrentRound => ({
  type: ActionType.UPDATE_USER_CURRENT_ROUND,
  payload: updatedPrediction,
})
