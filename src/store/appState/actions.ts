import { APP_DONE_LOADING, APP_LOADING, AppDoneLoading, AppLoading, SET_MESSAGE, SetMessage } from './types';

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
