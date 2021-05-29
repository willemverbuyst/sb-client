import { IMessage } from '../../models/app.models';
import { ActionType } from './action-types';

export type AppDoneLoading = {
  type: typeof ActionType.APP_DONE_LOADING;
};

export type AppLoading = {
  type: typeof ActionType.APP_LOADING;
};

export type SetMessage = {
  type: typeof ActionType.SET_MESSAGE;
  payload: IMessage;
};

export type AppStateTypes = AppDoneLoading | AppLoading | SetMessage;
