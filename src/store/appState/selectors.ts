import { IMessage } from '../../models/app.models'
import { StoreState } from '../types'

export const selectAppLoading = (state: StoreState): boolean =>
  state.appState.loading

export const selectMessage = (state: StoreState): IMessage | null =>
  state.appState.message
