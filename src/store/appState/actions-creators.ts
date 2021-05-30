import { Severity } from '../../models/app.models';
import { ActionTypeAppState } from './action-types';
import { AppDoneLoading, AppLoading, SetMessage } from './actions';

export const appDoneLoading = (): AppDoneLoading => ({
  type: ActionTypeAppState.APP_DONE_LOADING,
});

export const appLoading = (): AppLoading => ({ type: ActionTypeAppState.APP_LOADING });

export const setMessage = (severity: Severity, text: string): SetMessage => {
  return {
    type: ActionTypeAppState.SET_MESSAGE,
    payload: {
      severity,
      text,
    },
  };
};
