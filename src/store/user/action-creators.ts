import axios from 'axios'
import { Dispatch, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import API_URL from '../../config/apiUrl'
import {
  ILogInCredentials,
  IProfileDetails,
} from '../../models/credentials.model'
import { AppStateActions } from '../appState/action-types'
import { appDoneLoading, appLoading, setMessage } from '../appState/actions'
import { resetPlayers } from '../players/actions'
import { resetAllPredictions } from '../predictions/actions'
import { resetAllScores } from '../scores/actions'
import { resetAllTeams } from '../teams/actions'
import { StoreState } from '../types'
import { UserActions } from './action-types'
import {
  logInSuccessUser,
  logOutUser,
  tokenUserStillValid,
  updateUserProfile,
} from './actions'

export const changePassword =
  (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | UserActions>) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.patch(
        `${API_URL}/users/changePassword`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      dispatch(setMessage(response.data.status, response.data.message))
      dispatch(appDoneLoading())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message)
        dispatch(setMessage('error', error.response.data.message))
      } else {
        console.log(error.message)
        dispatch(setMessage('error', error.message))
      }
      dispatch(appDoneLoading())
    }
  }

export const editUserProfile = (
  profileDetails: IProfileDetails
): ThunkAction<void, StoreState, unknown, Action<string>> => {
  const {
    userName,
    firstName,
    lastName,
    email,
    phoneNumber,
    totaalToto,
    teamId,
  } = profileDetails
  return async (dispatch: Dispatch<AppStateActions | UserActions>) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.patch(
        `${API_URL}/users/profile`,
        {
          userName,
          firstName,
          lastName,
          email,
          phoneNumber,
          totaalToto,
          teamId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      dispatch(updateUserProfile(response.data.data))
      dispatch(setMessage(response.data.status, response.data.message))
      dispatch(appDoneLoading())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message)
        dispatch(setMessage('error', error.response.data.message))
      } else {
        console.log(error.message)
        dispatch(setMessage('error', error.message))
      }
      dispatch(appDoneLoading())
    }
  }
}

export const userLogIn =
  (
    credentials: ILogInCredentials
  ): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | UserActions>) => {
    dispatch(appLoading())
    try {
      const { email, password } = credentials
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      })

      dispatch(logInSuccessUser(response.data))
      dispatch(setMessage(response.data.status, response.data.message))
      dispatch(appDoneLoading())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message)
        dispatch(setMessage('error', error.response.data.message))
      } else {
        console.log(error.message)
        dispatch(setMessage('error', error.message))
      }
      dispatch(appDoneLoading())
    }
  }

export const userLogOut =
  (): ((dispatch: Dispatch) => void) => (dispatch: Dispatch) => {
    dispatch(logOutUser())
    dispatch(setMessage('success', 'Tot ziens!'))
    dispatch(resetAllScores())
    dispatch(resetPlayers())
    dispatch(resetAllPredictions())
    dispatch(resetAllTeams())
  }

export const getUserWithStoredToken =
  (): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | UserActions>) => {
    const token = localStorage.getItem('user_token')
    if (!token) return

    dispatch(appLoading())
    try {
      // if token check if valid
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(tokenUserStillValid(response.data))
      dispatch(appDoneLoading())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.message)
        dispatch(setMessage('error', error.response.data.message))
      } else {
        console.log(error.message)
        dispatch(setMessage('error', error.message))
      }
      userLogOut()(dispatch)
      dispatch(appDoneLoading())
    }
  }

export const requestEmailForNewPassword =
  (email: string): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | UserActions>) => {
    dispatch(appLoading())
    try {
      const response = await axios.post(`${API_URL}/users/forgotPassword`, {
        email,
      })

      dispatch(setMessage(response.data.status, response.data.message))
      dispatch(appDoneLoading())
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message)
        dispatch(setMessage('error', error.response.data.message))
      } else {
        console.log(error.message)
        dispatch(setMessage('error', error.message))
      }
      dispatch(appDoneLoading())
    }
  }
