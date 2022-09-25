import axios from 'axios'
import { Dispatch, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import API_URL from '../../config/apiUrl'
import { AppStateActions } from '../appState/action-types'
import { appDoneLoading, appLoading, setMessage } from '../appState/actions'
import { StoreState } from '../types'
import { TeamsActions } from './action-types'
import { storeAllTeams } from './actions'

const fetchAllTeams =
  (): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | TeamsActions>) => {
    dispatch(appLoading())
    try {
      const token = localStorage.getItem('user_token')
      const response = await axios.get(`${API_URL}/teams`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      dispatch(storeAllTeams(response.data.data))
      dispatch(appDoneLoading())
    } catch (error: unknown) {
      let message
      if (axios.isAxiosError(error) && error.response) {
        message = error.response.data.message
      } else {
        message = String(error)
      }
      console.log(message)
      dispatch(setMessage('error', message))
      dispatch(appDoneLoading())
    }
  }

export default fetchAllTeams
