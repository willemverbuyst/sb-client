import { ActionType } from './action-types';
import { AppDoneLoading, AppLoading, SetMessage } from './actions';

export const appDoneLoading = (): AppDoneLoading => ({
  type: ActionType.APP_DONE_LOADING,
});

export const appLoading = (): AppLoading => ({ type: ActionType.APP_LOADING });

export const setMessage = (severity: 'success' | 'info' | 'warning' | 'error', text: string): SetMessage => {
  return {
    type: ActionType.SET_MESSAGE,
    payload: {
      severity,
      text,
    },
  };
};
