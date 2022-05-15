import { Severity } from '../../../models/app.models'
import {
  ActionType,
  AppDoneLoading,
  AppLoading,
  SetMessage,
} from '../action-types'
import reducer, { IAppState } from '../reducer'

describe('#appStateReducer', () => {
  describe('w/ initial state and SET_MESSAGE action', () => {
    const initialState: IAppState = {
      loading: false,
      message: null,
    }
    const severity: Severity = 'success'
    const text = 'test_message'
    const action: SetMessage = {
      type: ActionType.SET_MESSAGE,
      payload: { severity, text },
    }
    const newState: IAppState = reducer(initialState, action)

    test('returns a state', () => {
      expect(newState).not.toEqual(initialState)
      expect(newState).toEqual({
        loading: false,
        message: action.payload,
      })
      expect(newState.message).toEqual(action.payload)
      expect(newState.loading).toBe(false)
    })
  })

  describe('w/ initial state and APP_LOADING action', () => {
    const initialState: IAppState = {
      loading: false,
      message: null,
    }
    const action: AppLoading = { type: ActionType.APP_LOADING }
    const newState: IAppState = reducer(initialState, action)

    test('returns a new state with loading set to true', () => {
      expect(newState).not.toEqual(initialState)
      expect(newState.loading).toBe(true)
    })
  })

  describe('w/ state and APP_DONE_LOADING action', () => {
    const initialState: IAppState = {
      loading: false,
      message: null,
    }
    const action: AppDoneLoading = { type: ActionType.APP_DONE_LOADING }
    const newState: IAppState = reducer(initialState, action)

    test('returns a new state with loading set to false', () => {
      expect(newState).toEqual(initialState)
      expect(newState.loading).toBe(false)
    })
  })
})
