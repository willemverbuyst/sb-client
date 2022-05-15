import { IMessage } from '../../models/app.models'

export enum ActionType {
  APP_LOADING = 'APP_LOADING',
  APP_DONE_LOADING = 'APP_DONE_LOADING',
  SET_MESSAGE = 'SET_MESSAGE',
}

export type AppDoneLoading = {
  type: ActionType.APP_DONE_LOADING
}

export type AppLoading = {
  type: ActionType.APP_LOADING
}

export type SetMessage = {
  type: ActionType.SET_MESSAGE
  payload: IMessage
}

export type AppStateActions = AppDoneLoading | AppLoading | SetMessage
