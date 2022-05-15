import axios from 'axios'
import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

import API_URL from '../../config/apiUrl'
import { IPrediction } from '../../models/predictions.model'
import { AppStateActions } from '../appState/action-types'
import { appDoneLoading, appLoading, setMessage } from '../appState/actions'
import { StoreState } from '../types'
import { UserActions } from '../user/action-types'
import { updateUserCurrentRound } from '../user/actions'
import { PredictionActions } from './action-types'
import {
  postPrediction,
  resetAllPredictions,
  storeAllPredictions,
  updatePrediction,
} from './actions'

export const getAllPredictions =
  (id: string): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | PredictionActions>) => {
    dispatch(resetAllPredictions())
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.get(`${API_URL}/predictions/player/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch(storeAllPredictions(response.data.data))
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

export const changePrediction =
  ({
    pGoalsHomeTeam,
    pGoalsAwayTeam,
    fixtureId,
  }: IPrediction): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (
    dispatch: Dispatch<AppStateActions | PredictionActions | UserActions>
  ) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.patch(
        `${API_URL}/predictions/${fixtureId}`,
        {
          pGoalsHomeTeam,
          pGoalsAwayTeam,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      dispatch(setMessage(response.data.status, response.data.message))
      dispatch(updatePrediction(response.data.data))
      dispatch(updateUserCurrentRound(response.data.data))
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

export const postNewPrediction =
  ({
    pGoalsHomeTeam,
    pGoalsAwayTeam,
    fixtureId,
  }: IPrediction): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (
    dispatch: Dispatch<AppStateActions | PredictionActions | UserActions>
  ) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.post(
        `${API_URL}/predictions/${fixtureId}`,
        {
          pGoalsHomeTeam,
          pGoalsAwayTeam,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      dispatch(setMessage(response.data.status, response.data.message))
      dispatch(postPrediction(response.data.data))
      dispatch(updateUserCurrentRound(response.data.data))
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
