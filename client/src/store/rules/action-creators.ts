import axios, { AxiosError } from 'axios'
import { Dispatch, Action } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { GO_SERVICE_URL } from '../../config/apiUrl'
import { AppStateActions } from '../appState/action-types'
import { appDoneLoading, appLoading, setMessage } from '../appState/actions'
import { StoreState } from '../types'
import { RulesActions } from './action-types'
import { storeAllRules } from './actions'

export const fetchAllRules =
  (): ThunkAction<void, StoreState, unknown, Action<string>> =>
  async (dispatch: Dispatch<AppStateActions | RulesActions>) => {
    dispatch(appLoading())
    try {
      const response = await axios.get(`${GO_SERVICE_URL}/rules`)

      console.log('response.data', response.data)
      dispatch(storeAllRules({ rules: response.data }))
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
