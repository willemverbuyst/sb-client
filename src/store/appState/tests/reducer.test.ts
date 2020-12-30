import reducer from '../reducer';
import { APP_DONE_LOADING, APP_LOADING, AppDoneLoading, AppLoading, AppState, SET_MESSAGE, SetMessage } from '../types';

describe('#appStateReducer', () => {
  const initialState: AppState = {
    loading: false,
    message: null,
  };
  describe('if given SET_MESSAGE action type', () => {
    const severity = 'success';
    const text = 'test_message';
    const action: SetMessage = {
      type: SET_MESSAGE,
      payload: { severity, text },
    };
    const newState: AppState = reducer(initialState, action);

    test('returns a new state with the payload containing correct values', () => {
      expect(newState).toEqual({
        loading: false,
        message: action.payload,
      });
      expect(newState.message).toEqual(action.payload);
      expect(newState.loading).toBe(false);
    });
  });

  describe('if given APP_LOADING action type', () => {
    const action: AppLoading = { type: APP_LOADING };
    const newState: AppState = reducer(initialState, action);

    test('returns a new state with loading set to true', () => {
      expect(newState).toEqual({ loading: true, message: null });
      expect(newState.loading).toBe(true);
    });
  });

  describe('if given APP_DONE_LOADING action type', () => {
    const action: AppDoneLoading = { type: APP_DONE_LOADING };
    const newState: AppState = reducer(initialState, action);

    test('returns a new state with loading set to false', () => {
      expect(newState).toEqual({ loading: false, message: null });
      expect(newState.loading).toBe(false);
    });
  });
});
