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

export default fetchAllTeams
