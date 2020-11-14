import { appLoading, appDoneLoading, setMessage } from '../actions';
import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  AppLoading,
  AppDoneLoading,
  SetMessage,
} from '../types';

describe('#appState', () => {
  describe('#setMessage with severity and text', () => {
    const severity = 'success';
    const text = 'test_text';
    const expected: SetMessage = {
      type: SET_MESSAGE,
      payload: { severity, text },
    };
    test('returns an action w/ type SET_MESSAGE and payload w/ severity and text', () => {
      expect(setMessage(severity, text)).toEqual(expected);
      expect(setMessage(severity, text).payload).toEqual(expected.payload);
    });
  });
  describe('#appLoading', () => {
    const expected: AppLoading = {
      type: APP_LOADING,
    };
    test('returns an action w/ type APP_LOADING', () => {
      expect(appLoading()).toEqual(expected);
      expect(appLoading().type).not.toBeUndefined();
    });
  });
  describe('#appDoneLoading', () => {
    const expected: AppDoneLoading = {
      type: APP_DONE_LOADING,
    };
    test('returns an action w/ type APP_DONE_LOADING', () => {
      expect(appDoneLoading()).toEqual(expected);
      expect(appDoneLoading().type).toBe(expected.type);
    });
  });
});
