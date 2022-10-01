import axios, { AxiosError } from 'axios'
import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { API_URL } from '../../config/apiUrl'
import { AppStateActions } from '../appState/action-types'
import { appDoneLoading, appLoading, setMessage } from '../appState/actions'
import { StoreState } from '../types'
import { ScoresActions } from './action-types'
import {
  resetScoresPlayer,
  storePlayerScores,
  storeScoresFixture,
  storeScoresRound,
  storeScoresTotalToto,
  storeScoresTotoRound,
} from './actions'

export const fetchScoresFixture =
  (id: number): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | ScoresActions>) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.get(`${API_URL}/fixtures/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch(storeScoresFixture(response.data.data))
      dispatch(appDoneLoading())
    } catch (error: unknown) {
      let message
      if (error instanceof AxiosError && error.response?.data?.message) {
        message = error.response.data.message
      } else {
        message = String(error)
      }
      console.log(message)
      dispatch(setMessage('error', message))
      dispatch(appDoneLoading())
    }
  }

export const fetchScoresRound =
  (id: number): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | ScoresActions>) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.get(`${API_URL}/scores/rounds/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch(storeScoresRound(response.data.data))
      dispatch(appDoneLoading())
    } catch (error: unknown) {
      let message
      if (error instanceof AxiosError && error.response?.data?.message) {
        message = error.response.data.message
      } else {
        message = String(error)
      }
      console.log(message)
      dispatch(setMessage('error', message))
      dispatch(appDoneLoading())
    }
  }

export const fetchScoresTotalToto =
  (): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | ScoresActions>) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.get(`${API_URL}/scores/totalToto`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch(storeScoresTotalToto(response.data.data))
      dispatch(appDoneLoading())
    } catch (error: unknown) {
      let message
      if (error instanceof AxiosError && error.response?.data?.message) {
        message = error.response.data.message
      } else {
        message = String(error)
      }
      console.log(message)
      dispatch(setMessage('error', message))
      dispatch(appDoneLoading())
    }
  }

export const fetchScoresTotoRound =
  (id: number): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | ScoresActions>) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.get(`${API_URL}/scores/totoRounds/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch(storeScoresTotoRound(response.data.data))
      dispatch(appDoneLoading())
    } catch (error: unknown) {
      let message
      if (error instanceof AxiosError && error.response?.data?.message) {
        message = error.response.data.message
      } else {
        message = String(error)
      }
      console.log(message)
      dispatch(setMessage('error', message))
      dispatch(appDoneLoading())
    }
  }

export const fetchPlayerScores =
  (id: string): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | ScoresActions>) => {
    dispatch(resetScoresPlayer())
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.get(`${API_URL}/scores/players/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch(storePlayerScores(response.data.data))
      dispatch(appDoneLoading())
    } catch (error: unknown) {
      let message
      if (error instanceof AxiosError && error.response?.data?.message) {
        message = error.response.data.message
      } else {
        message = String(error)
      }
      console.log(message)
      dispatch(setMessage('error', message))
      dispatch(appDoneLoading())
    }
  }
