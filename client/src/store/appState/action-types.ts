import { IMessage } from '../../models/app.models'
import { Action, ActionWithPayload } from '../types'

export enum ActionType {
  APP_LOADING = 'APP_LOADING',
  APP_DONE_LOADING = 'APP_DONE_LOADING',
  SET_MESSAGE = 'SET_MESSAGE',
}

export type AppDoneLoading = Action<ActionType.APP_DONE_LOADING>

export type AppLoading = Action<ActionType.APP_LOADING>

export type SetMessage = ActionWithPayload<ActionType.SET_MESSAGE, IMessage>

export type AppStateActions = AppDoneLoading | AppLoading | SetMessage
