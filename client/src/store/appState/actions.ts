import { Severity } from '../../models/app.models'
import {
  ActionType,
  AppDoneLoading,
  AppLoading,
  SetMessage,
} from './action-types'

export const appDoneLoading = (): AppDoneLoading => ({
  type: ActionType.APP_DONE_LOADING,
})

export const appLoading = (): AppLoading => ({ type: ActionType.APP_LOADING })

export const setMessage = (severity: Severity, text: string): SetMessage => ({
  type: ActionType.SET_MESSAGE,
  payload: {
    severity,
    text,
  },
})
