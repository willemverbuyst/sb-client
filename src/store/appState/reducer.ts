import { IMessage } from '../../models/app.models';
import { ActionType } from './action-types';
import { AppStateTypes } from './actions';

export interface IAppState {
  loading: boolean;
  message: IMessage | null;
}

const initialState: IAppState = {
  loading: false,
  message: null,
};

const appStateReducer = (state = initialState, action: AppStateTypes): IAppState => {
  switch (action.type) {
    case ActionType.APP_LOADING:
      return { ...state, loading: true };

    case ActionType.APP_DONE_LOADING:
      return { ...state, loading: false };

    case ActionType.SET_MESSAGE:
      return { ...state, message: { ...action.payload } };

    default:
      return state;
  }
};

export default appStateReducer;
