import { Dispatch } from 'react';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { ActionTypeAppState } from './appState/action-types';
import { AppStateActions } from './appState/actions';
import { StoreState } from './types';

interface IError {
  response: { data: { message: string } };
  message: string;
}

export const handleError = (error: IError): ThunkAction<void, StoreState, unknown, Action<string>> => async (
  dispatch: Dispatch<AppStateActions>,
) => {
  if (error.response) {
    console.log(error.response.data.message);
    dispatch({
      type: ActionTypeAppState.SET_MESSAGE,
      payload: {
        severity: 'error',
        text: error.response.data.message,
      },
    });
  } else {
    console.log(error.message);
    dispatch({
      type: ActionTypeAppState.SET_MESSAGE,
      payload: {
        severity: 'error',
        text: error.message,
      },
    });
  }
  dispatch({
    type: ActionTypeAppState.APP_DONE_LOADING,
  });
};
