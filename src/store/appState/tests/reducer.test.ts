import reducer from '../reducer';
import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  AppLoading,
  AppDoneLoading,
  SetMessage,
  AppState,
} from '../types';

describe('#appStateReducer', () => {
  const initialState: AppState = {
    loading: false,
    message: null,
  };
  describe('if given no state and a random action', () => {
    test('returns the inital state', () => {
      const newState: AppState = reducer(undefined, { type: APP_DONE_LOADING });
      expect(newState).toEqual(initialState);
    });
    test('returns the inital state', () => {
      const newState: AppState = reducer(undefined, { type: APP_LOADING });
      expect(newState.loading).toBe(true);
      expect(newState.message).toBeNull;
    });
  });
  describe('if given SET_MESSAGE action type', () => {
    test('returns a new state with the payload containing correct values', () => {
      const severity = 'success';
      const text = 'test_message';
      const action: SetMessage = {
        type: SET_MESSAGE,
        payload: { severity, text },
      };
      const newState: AppState = reducer(initialState, action);
      expect(newState).toEqual({
        loading: false,
        message: action.payload,
      });
      expect(newState.message).toEqual(action.payload);
      expect(newState.loading).toBe(false);
    });
  });
  describe('if given APP_LOADING action type', () => {
    test('returns a new state with loading set to true', () => {
      const action: AppLoading = { type: APP_LOADING };
      const newState: AppState = reducer(initialState, action);
      expect(newState).toEqual({ loading: true, message: null });
      expect(newState.loading).toBe(true);
    });
  });
  describe('if given #APP_DONE_LOADING action type', () => {
    test('returns a new state with loading set to false', () => {
      const action: AppDoneLoading = { type: APP_DONE_LOADING };
      const newState: AppState = reducer(initialState, action);
      expect(newState).toEqual({ loading: false, message: null });
      expect(newState.loading).toBe(false);
    });
  });
});
