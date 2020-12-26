import { APP_LOADING, APP_DONE_LOADING, SET_MESSAGE, AppLoading, AppDoneLoading, SetMessage } from './types';

export const appDoneLoading = (): AppDoneLoading => ({
  type: APP_DONE_LOADING,
});

export const appLoading = (): AppLoading => ({ type: APP_LOADING });

export const setMessage = (severity: 'success' | 'info' | 'warning' | 'error', text: string): SetMessage => {
  return {
    type: SET_MESSAGE,
    payload: {
      severity,
      text,
    },
  };
};
