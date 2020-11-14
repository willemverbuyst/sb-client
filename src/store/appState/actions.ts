import { DEFAULT_MESSAGE_TIMEOUT } from '../../config/constants';
import { Dispatch } from 'redux';
import {
  APP_LOADING,
  APP_DONE_LOADING,
  SET_MESSAGE,
  CLEAR_MESSAGE,
  AppLoading,
  AppDoneLoading,
  ClearMessage,
  SetMessage,
} from './types';

export const appLoading = (): AppLoading => ({ type: APP_LOADING });

export const appDoneLoading = (): AppDoneLoading => ({
  type: APP_DONE_LOADING,
});

export const clearMessage = (): ClearMessage => ({ type: CLEAR_MESSAGE });

export const setMessage = (
  severity: 'success' | 'info' | 'warning' | 'error',
  text: string
): SetMessage => {
  return {
    type: SET_MESSAGE,
    payload: {
      severity,
      text,
    },
  };
};

export const showMessageWithTimeout = (
  severity: 'success' | 'info' | 'warning' | 'error',
  text: string,
  timeOutMilliSeconds: number
) => {
  return (dispatch: Dispatch) => {
    dispatch(setMessage(severity, text));

    const timeout = timeOutMilliSeconds || DEFAULT_MESSAGE_TIMEOUT;

    setTimeout(() => dispatch(clearMessage()), timeout);
  };
};
