import { Severity } from '../../../models/app.models'
import {
  ActionType,
  AppDoneLoading,
  AppLoading,
  SetMessage,
} from '../action-types'
import { appDoneLoading, appLoading, setMessage } from '../actions'

describe('#appState', () => {
  describe('#setMessage', () => {
    const severity: Severity = 'success'
    const text = 'test_text'
    const expected: SetMessage = {
      type: ActionType.SET_MESSAGE,
      payload: { severity, text },
    }

    test('returns an anction w/ type SET_MESSAGE and payload sevirity and text', () => {
      expect(setMessage(severity, text)).toEqual(expected)
      expect(setMessage(severity, text).type).toEqual(ActionType.SET_MESSAGE)
      expect(setMessage(severity, text).payload).toEqual(expected.payload)
    })
  })

  describe('#appLoading', () => {
    const expected: AppLoading = {
      type: ActionType.APP_LOADING,
    }
    test('returns an action w/ type APP_LOADING and no payload', () => {
      expect(appLoading()).toEqual(expected)
      expect(appLoading().type).toEqual(ActionType.APP_LOADING)
      expect(appLoading()).not.toHaveProperty('payload')
    })
  })

  describe('#appDoneLoading', () => {
    const expected: AppDoneLoading = {
      type: ActionType.APP_DONE_LOADING,
    }
    test('returns an action w/ type APP_DONE_LOADING and no payload', () => {
      expect(appDoneLoading()).toEqual(expected)
      expect(appDoneLoading().type).toEqual(ActionType.APP_DONE_LOADING)
      expect(appDoneLoading()).not.toHaveProperty('payload')
    })
  })
})
