import { Dispatch } from 'react';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { AppStateActions } from './appState/action-types';
import { appDoneLoading, setMessage } from './appState/actions';
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
    dispatch(setMessage('error', error.response.data.message));
  } else {
    console.log(error.message);
    dispatch(setMessage('error', error.message));
  }
  dispatch(appDoneLoading());
};
