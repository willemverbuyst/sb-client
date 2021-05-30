import { IMessage } from '../../models/app.models';
import { ActionTypeAppState } from './action-types';

export type AppDoneLoading = {
  type: ActionTypeAppState.APP_DONE_LOADING;
};

export type AppLoading = {
  type: ActionTypeAppState.APP_LOADING;
};

export type SetMessage = {
  type: ActionTypeAppState.SET_MESSAGE;
  payload: IMessage;
};

export type AppStateActions = AppDoneLoading | AppLoading | SetMessage;
