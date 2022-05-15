import axios from 'axios'
import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import API_URL from '../../config/apiUrl'
import { IProfileDetails } from '../../models/credentials.model'
import { AppStateActions } from '../appState/action-types'
import { appDoneLoading, appLoading, setMessage } from '../appState/actions'
import { StoreState } from '../types'
import { PlayersActions } from './action-types'
import { addNewPlayer, deletePlayer, storeAllPlayers } from './actions'

export const addPlayer = (
  signUpCredentials: IProfileDetails
): ThunkAction<void, StoreState, unknown, Action<string>> => {
  const {
    userName,
    firstName,
    lastName,
    email,
    phoneNumber,
    totaalToto,
    teamId,
  } = signUpCredentials
  return async (dispatch: Dispatch<PlayersActions | AppStateActions>) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.post(
        `${API_URL}/players/signup`,
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

      dispatch(addNewPlayer(response.data.data))
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

export const fetchAllPlayers =
  (): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<PlayersActions | AppStateActions>) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.get(`${API_URL}/players`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch(storeAllPlayers(response.data.data))
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

export const playerDelete =
  (id: string): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<PlayersActions | AppStateActions>) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.delete(`${API_URL}/players/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch(deletePlayer(id))
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
